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

import type { LeadData } from './tracking-constants';

export interface MetaCAPIPayload {
  eventName: string;
  eventId: string;
  eventData: {
    page_url: string;
    content_name?: string;
    content_category?: string;
    utm_source: string;
    utm_campaign: string;
    utm_medium: string;
    utm_content: string;
    [key: string]: any;
  };
  leadData?: LeadData;
  userData: {
    fbp: string | null;
    fbc: string | null;
  };
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

