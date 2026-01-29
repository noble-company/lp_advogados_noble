/**
 * useScrollDepthTracking Hook
 * 
 * Tracks user scroll depth at key percentiles (25%, 50%, 75%, 100%)
 * to measure engagement and content consumption.
 * Tracks each threshold only once per session to avoid duplicate events.
 */

import { useEffect, useRef } from "react";
import { trackScrollDepth } from "@/lib/tracking";

export function useScrollDepthTracking() {
  // Track which percentiles have been recorded to avoid duplicates
  const trackedPercentages = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll depth percentage
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      
      // Guard against division by zero or invalid calculations
      if (documentHeight <= 0) return;
      
      const scrollPercentage = Math.round((scrolled / documentHeight) * 100);

      // Track at 25%, 50%, 75%, and 100% thresholds
      const thresholds = [25, 50, 75, 100];
      
      for (const threshold of thresholds) {
        if (
          scrollPercentage >= threshold &&
          !trackedPercentages.current.has(threshold)
        ) {
          trackedPercentages.current.add(threshold);
          trackScrollDepth(threshold);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
