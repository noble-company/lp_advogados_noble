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
 * Helper function to send Meta CAPI events
 * Consolidates common Meta CAPI payload construction and sending logic
 * @param eventName - Meta CAPI event name
 * @param customData - Custom event data
 * @param eventTimestamp - Optional Unix timestamp (seconds). Uses current time if not provided.
 */
function sendMetaCAPIEvent(
  eventName: string,
  customData: Record<string, any>,
  eventTimestamp?: number
): void {
  const metaCookies = getMetaCookies();
  const eventTime = eventTimestamp ?? Math.floor(Date.now() / 1000);
  
  const capiPayload: MetaCAPIPayload = {
    eventName,
    eventId: generateEventId(),
    eventTime,
    eventSourceUrl: window.location.href,
    userData: {
      ...metaCookies,
      client_user_agent: navigator.userAgent,
    },
    customData,
  };

  sendToMetaCAPI(capiPayload).catch((error) => {
    console.error(`Failed to send "${eventName}" to Meta CAPI:`, error);
  });
}

export function useTracking() {
  const utmParams = useUTMParams();

  /**
   * Track WhatsApp CTA click
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
      
      const eventId = trackWhatsApp({
        ...data,
        utmParams,
      });

      // Send to Meta CAPI for server-side tracking with consistent timestamp
      sendMetaCAPIEvent(
        "Contact",
        {
          button_location: data.buttonLocation,
          message_key: data.messageKey,
          variant: data.variant,
          ...contextData,
          ...utmParams,
        },
        eventTime
      );

      return eventId;
    },
    [utmParams]
  );

  /**
   * Track form events
   */
  const trackFormEvent = useCallback(
    (
      action: "open" | "submit" | "close" | "field_interaction",
      formName: string,
      formData?: Record<string, any>
    ) => {
      trackForm(action, formName, formData, utmParams);

      // Send form submission to Meta CAPI with consistent timestamp
      if (action === "submit") {
        const eventTime = Math.floor(Date.now() / 1000);
        sendMetaCAPIEvent(
          "Lead",
          {
            form_name: formName,
            ...formData,
            ...utmParams,
          },
          eventTime
        );
      }
    },
    [utmParams]
  );

  /**
   * Track calculator interaction
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

      // Send calculator CTA click to Meta CAPI as potential lead with consistent timestamp
      if (data.action === "cta_click") {
        const eventTime = Math.floor(Date.now() / 1000);
        sendMetaCAPIEvent(
          "InitiateCheckout",
          {
            source: "roi_calculator",
            ...data.calculatedValues,
            ...utmParams,
          },
          eventTime
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
