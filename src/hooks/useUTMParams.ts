/**
 * useUTMParams Hook
 * 
 * Captures and persists UTM parameters from URL to localStorage.
 * UTM parameters are stored for 30 days and used for attribution tracking.
 * Includes robust error handling for SSR, private browsing, and quota exceeded scenarios.
 */

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  [key: string]: string | undefined;
}

const UTM_STORAGE_KEY = "noble_utm_params";
const UTM_EXPIRY_DAYS = 30;

// In-memory fallback cache for when localStorage is unavailable
let inMemoryUTMCache: { params: UTMParams; expiry: number } | null = null;

/**
 * Check if localStorage is available and accessible
 * Handles SSR, disabled storage, and private/incognito browsing
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    // Test if we can actually access localStorage
    const testKey = "__localStorage_test__";
    window.localStorage.setItem(testKey, "test");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    // localStorage is disabled, full, or in private mode
    if (error instanceof Error) {
      const errorType = error.name;
      const isQuotaError = errorType === "QuotaExceededError";
      const isSecurityError = errorType === "SecurityError";
      
      if (isQuotaError) {
        console.warn("localStorage quota exceeded - using in-memory cache");
      } else if (isSecurityError) {
        console.warn("localStorage is disabled or in private browsing mode - using in-memory cache");
      }
    }
    return false;
  }
}

/**
 * Get stored UTM parameters from localStorage or in-memory cache
 */
function getStoredUTMParams(): UTMParams | null {
  // Try localStorage first
  if (isLocalStorageAvailable()) {
    try {
      const stored = window.localStorage.getItem(UTM_STORAGE_KEY);
      if (!stored) {
        // Not in localStorage, check in-memory cache as fallback
        if (inMemoryUTMCache && Date.now() <= inMemoryUTMCache.expiry) {
          return inMemoryUTMCache.params;
        }
        return null;
      }

      const { params, expiry } = JSON.parse(stored);
      
      // Check if expired
      if (Date.now() > expiry) {
        try {
          window.localStorage.removeItem(UTM_STORAGE_KEY);
        } catch (error) {
          console.warn("Could not remove expired UTM params from localStorage:", error);
        }
        inMemoryUTMCache = null;
        return null;
      }

      // Cache in memory as backup
      inMemoryUTMCache = { params, expiry };
      return params;
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.warn("Corrupted UTM params in localStorage - clearing and using in-memory cache");
        try {
          window.localStorage.removeItem(UTM_STORAGE_KEY);
        } catch (e) {
          console.warn("Could not clear corrupted UTM params:", e);
        }
      } else {
        console.error("Error reading UTM params from storage:", error);
      }
      
      // Fallback to in-memory cache if localStorage fails
      if (inMemoryUTMCache && Date.now() <= inMemoryUTMCache.expiry) {
        return inMemoryUTMCache.params;
      }
      return null;
    }
  }

  // localStorage unavailable - use in-memory cache
  if (inMemoryUTMCache && Date.now() <= inMemoryUTMCache.expiry) {
    return inMemoryUTMCache.params;
  }
  return null;
}

/**
 * Store UTM parameters in localStorage with expiry
 * Falls back to in-memory cache if localStorage is unavailable
 */
function storeUTMParams(params: UTMParams): void {
  const expiry = Date.now() + UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  const data = { params, expiry };

  // Always update in-memory cache as backup
  inMemoryUTMCache = data;

  // Try to persist to localStorage
  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "QuotaExceededError") {
          console.warn("localStorage quota exceeded - UTM params stored in memory only");
          // Try to clear old data to make space
          try {
            window.localStorage.removeItem(UTM_STORAGE_KEY);
            window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(data));
          } catch (retryError) {
            console.warn("Could not store UTM params after clearing - using in-memory cache only");
          }
        } else {
          console.warn("Could not store UTM params to localStorage:", error);
        }
      }
    }
  }
}

/**
 * Extract UTM parameters from URL search params
 */
function extractUTMFromURL(searchParams: URLSearchParams): UTMParams | null {
  const utmParams: UTMParams = {};
  let hasUTM = false;

  const utmKeys: (keyof UTMParams)[] = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  utmKeys.forEach((key) => {
    const value = searchParams.get(key as string);
    if (value) {
      utmParams[key] = value;
      hasUTM = true;
    }
  });

  return hasUTM ? utmParams : null;
}

/**
 * Hook to capture and retrieve UTM parameters
 * 
 * Priority order:
 * 1. Current URL parameters (if present)
 * 2. Stored parameters (if not expired)
 * 3. Default to empty object
 * 
 * @returns Current UTM parameters
 */
export function useUTMParams(): UTMParams {
  const [searchParams] = useSearchParams();
  const [utmParams, setUtmParams] = useState<UTMParams>(() => {
    // Initialize with stored params
    return getStoredUTMParams() || {};
  });

  useEffect(() => {
    // Extract UTM from current URL
    const urlUTM = extractUTMFromURL(searchParams);

    if (urlUTM) {
      // New UTM params in URL - store and use them
      storeUTMParams(urlUTM);
      setUtmParams(urlUTM);
    } else {
      // No UTM in URL - use stored params if available
      const storedUTM = getStoredUTMParams();
      if (storedUTM) {
        setUtmParams(storedUTM);
      }
    }
  }, [searchParams]);

  return utmParams;
}

/**
 * Clear stored UTM parameters
 * Useful for testing or privacy requirements
 */
export function clearUTMParams(): void {
  // Clear in-memory cache
  inMemoryUTMCache = null;

  // Clear localStorage if available
  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.removeItem(UTM_STORAGE_KEY);
    } catch (error) {
      console.warn("Could not clear UTM params from localStorage:", error);
    }
  }
}

/**
 * Manually set UTM parameters
 * Useful for testing or programmatic attribution
 */
export function setUTMParams(params: UTMParams): void {
  storeUTMParams(params);
}
