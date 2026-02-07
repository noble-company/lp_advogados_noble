/**
 * Tracking Platform Helpers
 * 
 * Consolidated helpers to track events across all platforms
 * (GTM, GA4, Meta Pixel, Meta CAPI) without code duplication.
 */

import { generateEventId } from './tracking'
import { getMetaCookies } from './tracking'
import { 
  TRACKING_CONFIG, 
  type MetaCAPIEventName,
  type LeadData 
} from './tracking-constants'
import { queueMetaCAPIEvent } from './meta-capi-queue'
import { logTracking } from './tracking-debugger'

/**
 * Props for tracking to all platforms
 */
export interface TrackToAllPlatformsProps {
  // Event identification
  gtmEventName: string
  ga4EventName: string
  pixelEventName: string
  metaCAPIEventName: MetaCAPIEventName
  
  // Event data
  eventData: Record<string, any>
  
  // Optional lead data for Meta CAPI
  leadData?: LeadData
  
  // Optional UTM parameters
  utmParams?: Record<string, string>
  
  // Optional custom event ID (for deduplication)
  eventId?: string
  
  // Optional value for monetization events
  value?: number
  
  // Optional content metadata
  contentName?: string
  contentCategory?: string
  
  // Optional custom deduplication ID
  pixelEventId?: string
}

/**
 * Track event to Google Tag Manager
 */
export function trackToGTM(
  eventName: string,
  eventData: Record<string, any>
): void {
  if (typeof window === 'undefined' || !window.dataLayer) {
    return
  }

  const dataToTrack = {
    event: eventName,
    ...eventData,
    timestamp: new Date().toISOString(),
  }

  window.dataLayer.push(dataToTrack)
  logTracking('gtm', eventName, eventData)
}

/**
 * Track event to Google Analytics 4
 */
export function trackToGA4(
  eventName: string,
  eventData?: Record<string, any>
): void {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  const dataToTrack = {
    ...eventData,
    timestamp: new Date().toISOString(),
  }

  window.gtag('event', eventName, dataToTrack)
  logTracking('ga4', eventName, eventData || {})
}

/**
 * Track event to Meta Pixel (Facebook)
 */
export function trackToMetaPixel(
  eventName: string,
  eventData?: Record<string, any>,
  options?: { eventID?: string }
): void {
  if (typeof window === 'undefined' || !window.fbq) {
    return
  }

  const payload = {
    ...eventData,
    timestamp: Date.now(),
  }

  if (options?.eventID) {
    window.fbq('track', eventName, payload, { eventID: options.eventID })
  } else {
    window.fbq('track', eventName, payload)
  }

  logTracking('pixel', eventName, eventData || {})
}

/**
 * Track event to Meta Conversions API (Server-Side)
 * 
 * This function queues the event for sending with automatic retry logic.
 * Events are stored in localStorage and will be retried on failed attempts.
 */
export async function trackToMetaCAPI(
  metaCAPIEventName: MetaCAPIEventName,
  eventData: Record<string, any>,
  options?: {
    eventId?: string
    leadData?: LeadData
    utmParams?: Record<string, string>
  }
): Promise<void> {
  const endpoint = import.meta.env.VITE_META_CAPI_ENDPOINT
  if (!endpoint) {
    console.warn('Meta CAPI endpoint not configured')
    return
  }

  const metaCookies = getMetaCookies()
  const eventId = options?.eventId || generateEventId()


  // Função utilitária para remover campos undefined/null
  function sanitize(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(sanitize);
    } else if (obj && typeof obj === 'object') {
      return Object.entries(obj)
        .filter(([_, v]) => v !== undefined && v !== null)
        .reduce((acc, [k, v]) => {
          acc[k] = sanitize(v);
          return acc;
        }, {} as any);
    }
    return obj;
  }

  const capiPayload = sanitize({
    eventName: metaCAPIEventName,
    eventId,
    eventData: {
      page_url: window.location.href,
      ...eventData,
      utm_source: options?.utmParams?.utm_source,
      utm_campaign: options?.utmParams?.utm_campaign,
      utm_medium: options?.utmParams?.utm_medium,
      utm_content: options?.utmParams?.utm_content,
      timestamp: new Date().toISOString(),
    },
    leadData: options?.leadData,
    userData: {
      ...metaCookies,
    },
  });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(capiPayload),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    logTracking('capi', metaCAPIEventName, eventData, true)
    return
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    logTracking('capi', metaCAPIEventName, eventData, false, errorMsg)

    // Queue for retry on failure
    console.warn(`💾 Queuing Meta CAPI event for retry: ${eventId}`)
    queueMetaCAPIEvent(eventId, capiPayload)
  }
}

/**
 * MAIN FUNCTION: Track event to all platforms simultaneously
 * 
 * This consolidates all platform tracking in one place to avoid duplication.
 * 
 * @param props - Configuration for event tracking
 * @returns Object with eventId and Meta CAPI promise for optional retry handling
 */
export function trackToAllPlatforms(
  props: TrackToAllPlatformsProps
): { eventId: string; capiPromise: Promise<void> } {
  const {
    gtmEventName,
    ga4EventName,
    pixelEventName,
    metaCAPIEventName,
    eventData,
    leadData,
    utmParams,
    eventId = generateEventId(),
    value,
    contentName,
    contentCategory,
    pixelEventId = eventId,
  } = props

  // Prepare common event data
  const gtmData = {
    ...eventData,
    value,
    content_name: contentName,
    content_category: contentCategory,
  }

  const ga4Data = {
    ...eventData,
    value,
    content_name: contentName,
    content_category: contentCategory,
  }

  const pixelData = {
    ...eventData,
    value,
    content_name: contentName,
    content_category: contentCategory,
  }

  // 1. Google Tag Manager
  trackToGTM(gtmEventName, gtmData)

  // 2. Google Analytics 4
  trackToGA4(ga4EventName, ga4Data)

  // 3. Meta Pixel (Facebook)
  trackToMetaPixel(pixelEventName, pixelData, { eventID: pixelEventId })

  // 4. Meta CAPI (Server-Side) - Async
  const capiPromise = trackToMetaCAPI(metaCAPIEventName, eventData, {
    eventId,
    leadData,
    utmParams,
  }).catch((error) => {
    // Log error but don't throw - we don't want to break user experience
    console.error('Meta CAPI tracking failed, will be retried:', error)
  })

  return { eventId, capiPromise }
}

/**
 * Debug mode: Console log all tracking calls
 * Enable by setting VITE_TRACKING_DEBUG=true in .env
 */
export function debugTrackingCall(
  platform: 'gtm' | 'ga4' | 'pixel' | 'capi',
  eventName: string,
  eventData: Record<string, any>
): void {
  if (import.meta.env.DEV && import.meta.env.VITE_TRACKING_DEBUG === 'true') {
    console.group(`🔍 [TRACKING DEBUG] ${platform.toUpperCase()}`)
    console.log('Event:', eventName)
    console.log('Data:', eventData)
    console.log('Timestamp:', new Date().toISOString())
    console.groupEnd()
  }
}
