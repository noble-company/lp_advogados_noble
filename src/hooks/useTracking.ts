/**
 * useTracking Hook
 * 
 * Central hook for all tracking operations.
 * Combines UTM parameters, Meta cookies, and tracking functions.
 */

import { useCallback } from "react";
import { useUTMParams } from "./useUTMParams";
import {
  trackWhatsAppClick as trackWhatsApp,
  trackFormEvent as trackForm,
  trackCalculatorInteraction as trackCalculator,
  trackSectionView,
  getMetaCookies,
  sendToMetaCAPI,
  generateEventId,
  type MetaCAPIPayload,
} from "../lib/tracking";

/**
 * Get UTM params from URL with fallback defaults
 * This ensures we always have UTM values for tracking
 */
function getUTMParamsWithDefaults(): Record<string, string> {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || 'direct',
    utm_campaign: urlParams.get('utm_campaign') || 'organic',
    utm_medium: urlParams.get('utm_medium') || 'none',
    utm_content: urlParams.get('utm_content') || 'none',
  };
}

/**
 * Helper function to send Meta CAPI events
 * Consolidates common Meta CAPI payload construction and sending logic
 * @param eventName - Meta CAPI event name
 * @param customData - Custom event data
 * @param eventTimestamp - Optional Unix timestamp (seconds). Uses current time if not provided.
 * @param eventId - Optional event ID for deduplication with browser pixel
 */
function sendMetaCAPIEvent(
  eventName: string,
  customData: Record<string, any>,
  eventTimestamp?: number,
  eventId?: string
): void {
  const metaCookies = getMetaCookies();
  const eventTime = eventTimestamp ?? Math.floor(Date.now() / 1000);
  const utmParams = getUTMParamsWithDefaults();
  
  const capiPayload: MetaCAPIPayload = {
    eventName,
    eventId: eventId || generateEventId(),
    eventTime,
    eventSourceUrl: window.location.href,
    userData: {
      ...metaCookies,
      client_user_agent: navigator.userAgent,
    },
    customData: {
      ...customData,
      ...utmParams,
    },
  };

  sendToMetaCAPI(capiPayload).catch((error) => {
    console.error(`Failed to send "${eventName}" to Meta CAPI:`, error);
  });
}

export function useTracking() {
  const utmParams = useUTMParams();

  /**
   * Track WhatsApp CTA click
   * Includes: Meta Pixel (Browser), GTM DataLayer, GA4, Meta CAPI
   * @param data - Click data with button location, message key, and optional variant
   * @param contextData - Optional context data (e.g., calculator values) to include in CAPI event
   */
  const trackWhatsAppClick = useCallback(
    (data: {
      buttonLocation: string;
      messageKey: string;
      variant?: string;
    }, contextData?: Record<string, any>) => {
      const eventTime = Math.floor(Date.now() / 1000);
      const eventId = generateEventId("whatsapp_");
      const utmWithDefaults = getUTMParamsWithDefaults();
      
      // Track via existing function (GTM + GA4 + Pixel)
      trackWhatsApp({
        ...data,
        utmParams,
      });

      // 1. Meta Pixel (Browser) - Contact event with eventID for deduplication
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Contact', {
          content_name: `WhatsApp - ${data.messageKey}`,
          content_category: 'whatsapp_click',
          button_location: data.buttonLocation,
        }, {
          eventID: eventId,
        });
      }

      // 2. GTM DataLayer
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'whatsapp_click',
          button_location: data.buttonLocation,
          message_key: data.messageKey,
          variant: data.variant,
          ...utmWithDefaults,
        });
      }

      // 3. GA4 Event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'contact', {
          event_category: 'engagement',
          event_label: `WhatsApp - ${data.messageKey}`,
          button_location: data.buttonLocation,
        });
      }

      // 4. Meta CAPI (Server-Side) with same eventId for deduplication
      sendMetaCAPIEvent(
        "Contact",
        {
          button_location: data.buttonLocation,
          message_key: data.messageKey,
          variant: data.variant,
          content_name: `WhatsApp - ${data.messageKey}`,
          content_category: 'whatsapp_click',
          ...contextData,
        },
        eventTime,
        eventId
      );

      return eventId;
    },
    [utmParams]
  );

  /**
   * Track form events with complete tracking stack
   * Includes: Meta Pixel (Browser), GTM DataLayer, GA4, Meta CAPI
   */
  const trackFormEvent = useCallback(
    (
      action: "open" | "submit" | "close" | "field_interaction",
      formName: string,
      formData?: Record<string, any>
    ) => {
      trackForm(action, formName, formData, utmParams);

      // Complete tracking on form submission
      if (action === "submit") {
        const eventTime = Math.floor(Date.now() / 1000);
        const eventId = generateEventId("lead_");
        const utmWithDefaults = getUTMParamsWithDefaults();

        // 1. Meta Pixel (Browser) with eventID for deduplication
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Contact Form Submission',
            content_category: 'lead_form',
            value: 0,
            currency: 'BRL',
          }, {
            eventID: eventId,
          });
        }

        // 2. GTM DataLayer
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'form_submit',
            form_name: formName,
            lead_email: formData?.email || '',
            lead_phone: formData?.phone || '',
            ...utmWithDefaults,
          });
        }

        // 3. GA4 Event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'generate_lead', {
            event_category: 'engagement',
            event_label: formName,
            value: 0,
          });
        }

        // 4. Meta CAPI (Server-Side) with same eventId for deduplication
        sendMetaCAPIEvent(
          "Lead",
          {
            form_name: formName,
            content_name: 'Contact Form Submission',
            content_category: 'lead_form',
            ...formData,
          },
          eventTime,
          eventId
        );
      }
    },
    [utmParams]
  );

  /**
   * Track calculator interaction
   * Includes: Meta Pixel (Browser), GTM DataLayer, GA4, Meta CAPI on CTA click
   */
  const trackCalculatorInteraction = useCallback(
    (data: {
      action: "slider_change" | "result_view" | "cta_click";
      calculatedValues?: Record<string, number>;
    }) => {
      trackCalculator({
        ...data,
        calculatedValues: {
          ...data.calculatedValues,
        },
        utmParams,
      });

      // Complete tracking on CTA click
      if (data.action === "cta_click") {
        const eventTime = Math.floor(Date.now() / 1000);
        const eventId = generateEventId("calc_");
        const utmWithDefaults = getUTMParamsWithDefaults();

        // 1. Meta Pixel (Browser) - InitiateCheckout with eventID for deduplication
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'InitiateCheckout', {
            content_name: 'ROI Calculator CTA',
            content_category: 'calculator',
            value: data.calculatedValues?.monthly_savings || 0,
            currency: 'BRL',
          }, {
            eventID: eventId,
          });
        }

        // 2. GTM DataLayer
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'calculator_cta_click',
            source: 'roi_calculator',
            ...data.calculatedValues,
            ...utmWithDefaults,
          });
        }

        // 3. GA4 Event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'begin_checkout', {
            event_category: 'engagement',
            event_label: 'roi_calculator',
            value: data.calculatedValues?.monthly_savings || 0,
          });
        }

        // 4. Meta CAPI (Server-Side) with same eventId for deduplication
        sendMetaCAPIEvent(
          "InitiateCheckout",
          {
            source: "roi_calculator",
            content_name: 'ROI Calculator CTA',
            content_category: 'calculator',
            ...data.calculatedValues,
          },
          eventTime,
          eventId
        );
      }
    },
    [utmParams]
  );

  /**
   * Track section view (when scrolled into view)
   */
  const trackSection = useCallback((sectionName: string) => {
    trackSectionView(sectionName);
  }, []);

  return {
    trackWhatsAppClick,
    trackFormEvent,
    trackCalculatorInteraction,
    trackSection,
    utmParams,
  };
}
