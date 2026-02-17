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
  trackToMetaCAPI,
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
   * Includes: GTM DataLayer, GA4, Meta CAPI (NO Meta Pixel)
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

      const eventData = {
        button_location: data.buttonLocation,
        message_key: data.messageKey,
        variant: data.variant,
        content_name: `WhatsApp - ${data.messageKey}`,
        content_category: 'whatsapp_click',
        ...contextData,
      };

      // Track to GTM, GA4, and CAPI only (Pixel removed for better privacy)
      trackToGTM(TRACKING_EVENT_NAMES.WHATSAPP_CLICK, eventData);
      trackToGA4('contact', eventData);
      trackToMetaCAPI(META_CAPI_EVENT_NAMES.CONTACT, eventData, {
        eventId,
        utmParams: utmWithDefaults,
      });

      return eventId;
    },
    [utmParams]
  );

  /**
   * Track form events with complete tracking stack
   * Form Submit: GTM, GA4, Meta CAPI only (NO Meta Pixel)
   * Other events: GTM, GA4, Meta Pixel
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

      // Full tracking on form submission (Pixel removed - GTM, GA4, CAPI only)
      if (action === "submit") {
        const eventId = generateEventId("lead_");

        const eventData = {
          form_name: formName,
          lead_email: formData?.email || '',
          lead_phone: formData?.phone || '',
          content_name: 'Contact Form Submission',
          content_category: 'lead_form',
        };

        const leadData: LeadData = {
          name: formData?.name || '',
          email: formData?.email || '',
          phone: formData?.phone || '',
          instagram: formData?.instagram || '',
        };

        // Track to GTM, GA4, and CAPI only (Pixel removed for better privacy)
        trackToGTM(TRACKING_EVENT_NAMES.FORM_SUBMIT, eventData);
        trackToGA4('generate_lead', eventData);
        trackToMetaCAPI(META_CAPI_EVENT_NAMES.LEAD, eventData, {
          eventId,
          leadData,
          utmParams: utmWithDefaults,
        });
      }
    },
    [utmParams]
  );

  /**
   * Track calculator interaction
   * CTA Click: GTM, GA4, Meta CAPI only (NO Meta Pixel)
   * Other events: GTM, GA4, Meta Pixel
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

      // Full tracking on CTA click (Pixel removed - GTM, GA4, CAPI only)
      if (data.action === "cta_click") {
        const eventId = generateEventId("calc_");

        const eventData = {
          source: "roi_calculator",
          content_name: 'ROI Calculator CTA',
          content_category: 'calculator',
          value: data.calculatedValues?.monthly_savings || 0,
          ...data.calculatedValues,
        };

        // Track to GTM, GA4, and CAPI only (Pixel removed for better privacy)
        trackToGTM(TRACKING_EVENT_NAMES.CALCULATOR_CTA_CLICK, eventData);
        trackToGA4('begin_checkout', eventData);
        trackToMetaCAPI(META_CAPI_EVENT_NAMES.INITIATE_CHECKOUT, eventData, {
          eventId,
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
