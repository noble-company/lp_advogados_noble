// ===== LEAD DATA TYPE =====
export interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  instagram?: string;
}
/**
 * Tracking Constants & Types
 * 
 * Centralized source of truth for all tracking event names,
 * Meta CAPI event types, and tracking configuration.
 */

// ===== INTERNAL EVENT NAMES (GTM/GA4/Pixel) =====
export const TRACKING_EVENT_NAMES = {
  // WhatsApp Related
  WHATSAPP_CLICK: 'whatsapp_click',
  
  // Form Related
  FORM_OPEN: 'form_open',
  FORM_SUBMIT: 'form_submit',
  FORM_CLOSE: 'form_close',
  FORM_FIELD_INTERACTION: 'form_field_interaction',
  
  // Calculator Related
  CALCULATOR_INTERACTION: 'calculator_interaction',
  CALCULATOR_CTA_CLICK: 'calculator_cta_click',
  
  // Engagement Related
  SCROLL_DEPTH: 'scroll_depth',
  SECTION_VIEW: 'section_view',
  PAGE_VIEW: 'page_view',
} as const

export type TrackingEventName = typeof TRACKING_EVENT_NAMES[keyof typeof TRACKING_EVENT_NAMES]

// ===== META CONVERSIONS API EVENT TYPES =====
export const META_CAPI_EVENT_NAMES = {
  // Standard Meta CAPI Events
  CONTACT: 'Contact',
  LEAD: 'Lead',
  PURCHASE: 'Purchase',
  ADD_TO_CART: 'AddToCart',
  VIEW_CONTENT: 'ViewContent',
  INITIATE_CHECKOUT: 'InitiateCheckout',
  PAGE_VIEW: 'PageView',
} as const

export type MetaCAPIEventName = typeof META_CAPI_EVENT_NAMES[keyof typeof META_CAPI_EVENT_NAMES]

// ===== CALCULATOR ACTION TYPES =====
export const CALCULATOR_ACTIONS = {
  SLIDER_CHANGE: 'slider_change',
  RESULT_VIEW: 'result_view',
  CTA_CLICK: 'cta_click',
} as const

export type CalculatorAction = typeof CALCULATOR_ACTIONS[keyof typeof CALCULATOR_ACTIONS]

// ===== FORM ACTION TYPES =====
export const FORM_ACTIONS = {
  OPEN: 'open',
  SUBMIT: 'submit',
  CLOSE: 'close',
  FIELD_INTERACTION: 'field_interaction',
} as const

export type FormAction = typeof FORM_ACTIONS[keyof typeof FORM_ACTIONS]

// ===== TRACKING CONFIGURATION =====
export const TRACKING_CONFIG = {
  // Currency and Locale
  CURRENCY: 'BRL',
  LOCALE: 'pt_BR',
  
  // UTM Parameter Defaults
  UTM_DEFAULTS: {
    source: 'direct',
    medium: 'none',
    campaign: 'organic',
    content: 'none',
  },
  
  // UTM Parameters Storage
  UTM_STORAGE_KEY: 'noble_utm_params',
  UTM_EXPIRY_DAYS: 30,
  
  // Scroll Depth Tracking Thresholds (%)
  SCROLL_DEPTH_THRESHOLDS: [25, 50, 75, 100],
  
  // Default Form Names
  DEFAULT_FORM_NAME: 'conversion_form',
  
  // Meta CAPI Configuration
  META_CAPI_TIMEOUT_MS: 5000,
  META_CAPI_RETRY_MAX_ATTEMPTS: 3,
  META_CAPI_RETRY_INITIAL_DELAY_MS: 1000,
  META_CAPI_RETRY_MAX_DELAY_MS: 10000,
  META_CAPI_BATCH_SIZE: 5,
  META_CAPI_BATCH_TIMEOUT_MS: 2000,
} as const

// ===== EVENT CATEGORY TYPES =====
export const EVENT_CATEGORIES = {
  ENGAGEMENT: 'engagement',
  FORM: 'form',
  COMMERCE: 'commerce',
  NAVIGATION: 'navigation',
} as const

export type EventCategory = typeof EVENT_CATEGORIES[keyof typeof EVENT_CATEGORIES]

// ===== BUTTON LOCATION TYPES (Common Locations in App) =====
export const BUTTON_LOCATIONS = {
  // Hero Section
  HERO_CTA: 'hero_section',
  
  // How It Works Section
  HOW_IT_WORKS_CTA: 'how_it_works_section',
  
  // ROI Calculator
  CALCULATOR_CTA: 'roi_calculator',
  
  // Solution Section
  SOLUTION_CTA: 'solution_presentation_section',
  
  // Final CTA Section
  FINAL_CTA_MAIN: 'final_cta_main',
  
  // Floating Button
  FLOATING_CTA: 'floating_cta',
  
  // Header/Navigation
  NAV_CTA: 'navigation',
  
  // Footer
  FOOTER_CTA: 'footer',
  
  // Modal/Form
  FORM_CTA: 'form_submission',
  
  // Lead Capture Modal
  LEAD_MODAL_CTA: 'lead_capture_modal',
} as const

export type ButtonLocation = typeof BUTTON_LOCATIONS[keyof typeof BUTTON_LOCATIONS]

// ===== MESSAGE KEY TYPES (WhatsApp Messages) =====
export const MESSAGE_KEYS = {
  DEMO_REQUEST: 'demo_request',
  CONSULTATION: 'consultation',
  PRICING_INFO: 'pricing_info',
  FEATURE_INFO: 'feature_info',
  GENERAL_INQUIRY: 'general_inquiry',
  CALCULATOR_RESULT: 'calculator_result',
  FORM_SUBMISSION: 'form_submission',
} as const

export type MessageKey = typeof MESSAGE_KEYS[keyof typeof MESSAGE_KEYS]

// ===== HELPER FUNCTIONS =====

/**
 * Validate if an event name is valid
 * @param eventName - Event name to validate
 * @returns true if valid, false otherwise
 */
export function isValidTrackingEvent(eventName: any): eventName is TrackingEventName {
  return Object.values(TRACKING_EVENT_NAMES).includes(eventName)
}

/**
 * Validate if a Meta CAPI event name is valid
 * @param eventName - Event name to validate
 * @returns true if valid, false otherwise
 */
export function isValidMetaCAPIEvent(eventName: any): eventName is MetaCAPIEventName {
  return Object.values(META_CAPI_EVENT_NAMES).includes(eventName)
}

/**
 * Get UTM defaults merged with any provided overrides
 * @param overrides - Optional overrides for defaults
 * @returns Merged UTM parameters with defaults
 */
export function getUTMDefaults(overrides?: Partial<typeof TRACKING_CONFIG.UTM_DEFAULTS>) {
  return {
    ...TRACKING_CONFIG.UTM_DEFAULTS,
    ...overrides,
  }
}

/**
 * Get scroll depth thresholds
 * @returns Array of scroll depth percentage thresholds
 */
export function getScrollThresholds(): number[] {
  return [...TRACKING_CONFIG.SCROLL_DEPTH_THRESHOLDS]
}
