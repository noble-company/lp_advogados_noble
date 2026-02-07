/**
 * useTracking Hook - REFACTORED
 * 
 * Central hook for all tracking operations.
 * Now uses consolidated helpers to eliminate code duplication.
 */

import { useCallback } from "react";
import { useUTMParams } from "./useUTMParams";
import { 
  generateEventId,
  type MetaCAPIPayload,
  type LeadData,
} from "../lib/tracking";
import { 
  trackToAllPlatforms,
  trackToGTM,
  trackToGA4,
  trackToMetaPixel,
} from "../lib/tracking-helpers";
import { 
  TRACKING_EVENT_NAMES,
  META_CAPI_EVENT_NAMES,
  TRACKING_CONFIG,
  getUTMDefaults,
} from "../lib/tracking-constants";

export function useTracking() {
  const utmParams = useUTMParams();

  /**
   * Track WhatsApp CTA click
   * Includes: Meta Pixel (Browser), GTM DataLayer, GA4, Meta CAPI
   */
  const trackWhatsAppClick = useCallback(
    (data: {
      buttonLocation: string;
      messageKey: string;
      variant?: string;
    }, contextData?: Record<string, any>) => {
      const eventId = generateEventId("whatsapp_");
      const utmWithDefaults = {
        ...TRACKING_CONFIG.UTM_DEFAULTS,
        ...utmParams,
      };

      // Single consolidated tracking (legacy trackWhatsAppLib removed to prevent double firing)
      trackToAllPlatforms({
        gtmEventName: TRACKING_EVENT_NAMES.WHATSAPP_CLICK,
        ga4EventName: 'contact',
        pixelEventName: 'Contact',
        metaCAPIEventName: META_CAPI_EVENT_NAMES.CONTACT,
        eventId,
        contentName: `WhatsApp - ${data.messageKey}`,
        contentCategory: 'whatsapp_click',
        eventData: {
          button_location: data.buttonLocation,
          message_key: data.messageKey,
          variant: data.variant,
          ...contextData,
        },
        utmParams: utmWithDefaults,
      });

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
      const utmWithDefaults = {
        ...TRACKING_CONFIG.UTM_DEFAULTS,
        ...utmParams,
      };

      // Track non-submit form events (open, close, field_interaction) to GTM/GA4/Pixel only
      if (action !== "submit") {
        const eventName = `form_${action}`;
        const eventData = {
          form_name: formName,
          action,
          ...formData,
        };
        trackToGTM(eventName, eventData);
        trackToGA4(eventName, eventData);
        trackToMetaPixel(eventName, eventData);
        return;
      }

      // Full tracking on form submission (legacy trackFormLib removed to prevent double firing)
      if (action === "submit") {
        const eventId = generateEventId("lead_");

        trackToAllPlatforms({
          gtmEventName: TRACKING_EVENT_NAMES.FORM_SUBMIT,
          ga4EventName: 'generate_lead',
          pixelEventName: 'Lead',
          metaCAPIEventName: META_CAPI_EVENT_NAMES.LEAD,
          eventId,
          contentName: 'Contact Form Submission',
          contentCategory: 'lead_form',
          eventData: {
            form_name: formName,
            lead_email: formData?.email || '',
            lead_phone: formData?.phone || '',
          },
          leadData: {
            name: formData?.name || '',
            email: formData?.email || '',
            phone: formData?.phone || '',
            instagram: formData?.instagram || '',
          },
          utmParams: utmWithDefaults,
        });
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
      const utmWithDefaults = {
        ...TRACKING_CONFIG.UTM_DEFAULTS,
        ...utmParams,
      };

      // Track non-CTA calculator events (slider_change, result_view) to GTM/GA4/Pixel only
      if (data.action !== "cta_click") {
        const eventData = {
          action: data.action,
          ...data.calculatedValues,
        };
        trackToGTM("calculator_interaction", eventData);
        trackToGA4("calculator_interaction", eventData);
        trackToMetaPixel("calculator_interaction", eventData);
        return;
      }

      // Full tracking on CTA click (legacy trackCalculatorLib removed to prevent double firing)
      if (data.action === "cta_click") {
        const eventId = generateEventId("calc_");

        trackToAllPlatforms({
          gtmEventName: TRACKING_EVENT_NAMES.CALCULATOR_CTA_CLICK,
          ga4EventName: 'begin_checkout',
          pixelEventName: 'InitiateCheckout',
          metaCAPIEventName: META_CAPI_EVENT_NAMES.INITIATE_CHECKOUT,
          eventId,
          contentName: 'ROI Calculator CTA',
          contentCategory: 'calculator',
          value: data.calculatedValues?.monthly_savings || 0,
          eventData: {
            source: "roi_calculator",
            ...data.calculatedValues,
          },
          utmParams: utmWithDefaults,
        });
      }
    },
    [utmParams]
  );

  /**
   * Track section view (when scrolled into view)
   * Uses individual helpers instead of legacy trackSectionView to maintain consistency
   */
  const trackSection = useCallback((sectionName: string) => {
    const utmWithDefaults = {
      ...TRACKING_CONFIG.UTM_DEFAULTS,
      ...utmParams,
    };
    const eventData = {
      section_name: sectionName,
      event_category: "engagement",
      utmParams: utmWithDefaults,
    };
    trackToGTM("section_view", eventData);
    trackToGA4("section_view", eventData);
    trackToMetaPixel("section_view", eventData);
  }, [utmParams]);

  return {
    trackWhatsAppClick,
    trackFormEvent,
    trackCalculatorInteraction,
    trackSection,
    utmParams,
  };
}
