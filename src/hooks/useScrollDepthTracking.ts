/**
 * useScrollDepthTracking Hook
 * 
 * Tracks user scroll depth at key percentiles (25%, 50%, 75%, 100%)
 * to measure engagement and content consumption.
 * Tracks each threshold only once per session to avoid duplicate events.
 */

import { useEffect, useRef } from "react";
import { trackToGTM, trackToGA4, trackToMetaPixel } from "@/lib/tracking-helpers";

export function useScrollDepthTracking() {
  // Track which percentiles have been recorded to avoid duplicates
  const trackedPercentages = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Função throttle
    function throttle(fn: () => void, wait: number) {
      let lastTime = 0;
      return function () {
        const now = Date.now();
        if (now - lastTime >= wait) {
          lastTime = now;
          fn();
        }
      };
    }

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
          const scrollData = {
            event_category: "engagement",
            event_label: `${threshold}%`,
            value: threshold,
          };
          trackToGTM("scroll_depth", scrollData);
          trackToGA4("scroll_depth", scrollData);
          trackToMetaPixel("scroll_depth", scrollData);
        }
      }
    };

    const throttledScroll = throttle(handleScroll, 250);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);
}
