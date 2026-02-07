/**
 * Tracking Utilities
 * 
 * Centralized tracking functions for Google Tag Manager, Google Analytics,
 * and Meta Pixel (Facebook) integration.
 */

// Type definitions
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export interface TrackingEventData {
  event_name: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_data?: Record<string, any>;
}

export interface MetaCookies {
  fbp: string | null;
  fbc: string | null;
}

export interface MetaCAPIPayload {
  eventName: string;
  eventId: string;
  eventTime: number;
  eventSourceUrl: string;
  userData: {
    fbp: string | null;
    fbc: string | null;
    client_ip_address?: string;
    client_user_agent?: string;
  };
  customData?: Record<string, any | undefined>;
}

/**
 * Generate a unique event ID for deduplication
 * Used to prevent duplicate counting between client-side and server-side events
 */
export function generateEventId(prefix: string = ""): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `${prefix}${timestamp}_${random}`;
}

/**
 * Check if Google Tag Manager is configured (hardcoded in index.html)
 */
function isGTMConfigured(): boolean {
  return typeof window !== "undefined" && !!window.dataLayer;
}

/**
 * Check if Meta Pixel is configured (hardcoded in index.html)
 */
function isPixelConfigured(): boolean {
  return typeof window !== "undefined" && !!window.fbq;
}

/**
 * Get Meta (Facebook) cookies for tracking
 * These cookies are used for attribution and deduplication
 */
export function getMetaCookies(): MetaCookies {
  if (typeof document === "undefined") {
    return { fbp: null, fbc: null };
  }

  const cookies = document.cookie;
  
  return {
    fbp: cookies.match(/_fbp=([^;]+)/)?.[1] || null,
    fbc: cookies.match(/_fbc=([^;]+)/)?.[1] || null,
  };
}

/**
 * Track page view across all platforms
 */
export function trackPageView(pagePath?: string): void {
  const path = pagePath || window.location.pathname + window.location.search;

  // Google Tag Manager - DataLayer
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "page_view",
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  // Google Analytics 4 - gtag
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  // Meta Pixel is already tracking PageView on init
  // No need to track again unless it's a virtual page view in SPA
}

/**
 * Track custom event to Google Tag Manager DataLayer
 */
export function trackToGTM(eventData: Record<string, any>): void {
  if (!isGTMConfigured()) {
    console.warn("GTM not configured - VITE_GTM_ID environment variable is missing");
    return;
  }

  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(eventData);
  } else if (typeof window !== "undefined") {
    console.warn("GTM DataLayer not initialized - tracking script may not have loaded");
  }
}

/**
 * Track custom event to Google Analytics 4
 */
export function trackToGA4(
  eventName: string,
  eventParams?: Record<string, any>
): void {
  if (!isGTMConfigured()) {
    console.warn("GTM not configured - GA4 tracking will not work");
    return;
  }

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  } else if (typeof window !== "undefined") {
    console.warn("GA4 gtag not initialized - GTM tracking script may not have loaded");
  }
}

/**
 * Track custom event to Meta Pixel
 */
export function trackToMetaPixel(
  eventName: string,
  eventParams?: Record<string, any>,
  options?: { eventID?: string }
): void {
  if (!isPixelConfigured()) {
    console.warn("Meta Pixel not configured - VITE_PIXEL_ID environment variable is missing");
    return;
  }

  if (typeof window !== "undefined" && window.fbq) {
    if (options?.eventID) {
      window.fbq("track", eventName, eventParams, options);
    } else {
      window.fbq("track", eventName, eventParams);
    }
  } else if (typeof window !== "undefined") {
    console.warn("Meta Pixel fbq not initialized - tracking script may not have loaded");
  }
}

/**
 * Universal event tracking - sends to all platforms
 */
export function trackEvent(data: {
  eventName: string;
  eventCategory?: string;
  eventLabel?: string;
  buttonLocation?: string;
  value?: number;
  customData?: Record<string, any>;
  utmParams?: Record<string, string>;
}): string {
  const eventId = generateEventId();
  const {
    eventName,
    eventCategory,
    eventLabel,
    buttonLocation,
    value,
    customData,
    utmParams,
  } = data;

  // Google Tag Manager
  trackToGTM({
    event: eventName,
    event_category: eventCategory,
    event_label: eventLabel,
    button_location: buttonLocation,
    value: value,
    utm_source: utmParams?.utm_source || "direct",
    utm_medium: utmParams?.utm_medium || "none",
    utm_campaign: utmParams?.utm_campaign || "organic",
    ...customData,
  });

  // Google Analytics 4
  trackToGA4(eventName, {
    event_category: eventCategory,
    event_label: eventLabel,
    button_location: buttonLocation,
    value: value,
    utm_source: utmParams?.utm_source,
    utm_medium: utmParams?.utm_medium,
    utm_campaign: utmParams?.utm_campaign,
    ...customData,
  });

  // Meta Pixel (Facebook)
  trackToMetaPixel(
    eventName,
    {
      content_category: eventCategory,
      content_name: eventLabel,
      value: value,
      custom_data: {
        button_location: buttonLocation,
        ...utmParams,
        ...customData,
      },
    },
    { eventID: eventId }
  );

  return eventId;
}

/**
 * Send event to Meta Conversions API (Server-Side)
 * This should be called after client-side tracking for deduplication
 */
export async function sendToMetaCAPI(payload: MetaCAPIPayload): Promise<void> {
  const endpoint = "https://webhook.noblecompany.digital/webhook/adv-lp/lead-conversion";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Meta CAPI error:", response.statusText);
    }
  } catch (error) {
    console.error("Failed to send to Meta CAPI:", error);
  }
}

/**
 * Track WhatsApp CTA click
 */
export function trackWhatsAppClick(data: {
  buttonLocation: string;
  messageKey: string;
  variant?: string;
  utmParams?: Record<string, string>;
}): string {
  return trackEvent({
    eventName: "whatsapp_click",
    eventCategory: "engagement",
    eventLabel: `WhatsApp - ${data.messageKey}`,
    buttonLocation: data.buttonLocation,
    customData: {
      message_key: data.messageKey,
      variant: data.variant,
    },
    utmParams: data.utmParams,
  });
}

/**
 * Track form events
 */
export function trackFormEvent(
  action: "open" | "submit" | "close" | "field_interaction",
  formName: string,
  formData?: Record<string, any>,
  utmParams?: Record<string, string>
): void {
  trackEvent({
    eventName: `form_${action}`,
    eventCategory: "form",
    eventLabel: formName,
    customData: formData,
    utmParams,
  });
}

/**
 * Track calculator interaction
 */
export function trackCalculatorInteraction(data: {
  action: "slider_change" | "result_view" | "cta_click";
  calculatedValues?: Record<string, number>;
  utmParams?: Record<string, string>;
}): void {
  trackEvent({
    eventName: "calculator_interaction",
    eventCategory: "engagement",
    eventLabel: data.action,
    customData: data.calculatedValues,
    utmParams: data.utmParams,
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percentage: number): void {
  trackEvent({
    eventName: "scroll_depth",
    eventCategory: "engagement",
    eventLabel: `${percentage}%`,
    value: percentage,
  });
}

/**
 * Track section visibility
 */
export function trackSectionView(sectionName: string): void {
  trackEvent({
    eventName: "section_view",
    eventCategory: "engagement",
    eventLabel: sectionName,
  });
}
