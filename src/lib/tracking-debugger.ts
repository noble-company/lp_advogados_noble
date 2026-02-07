/**
 * Tracking Debug Mode
 * 
 * Provides tools for debugging and inspecting tracking calls
 * in development and production environments.
 * 
 * Enable with: localStorage.setItem('tracking_debug_mode', 'true')
 */

export interface TrackedEvent {
  timestamp: Date
  platform: 'gtm' | 'ga4' | 'pixel' | 'capi'
  eventName: string
  eventData: Record<string, any>
  success: boolean
  error?: string
}

/**
 * Tracking event inspector
 */
class TrackingDebugger {
  private enabled: boolean
  private events: TrackedEvent[] = []
  private maxEvents = 100

  constructor() {
    this.enabled = this.isDebugModeEnabled()
  }

  /**
   * Check if debug mode is enabled
   * Can be enabled via:
   * 1. VITE_TRACKING_DEBUG=true environment variable
   * 2. localStorage.setItem('tracking_debug_mode', 'true')
   */
  private isDebugModeEnabled(): boolean {
    if (import.meta.env.VITE_TRACKING_DEBUG === 'true') {
      return true
    }

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        return window.localStorage.getItem('tracking_debug_mode') === 'true'
      } catch {
        return false
      }
    }

    return false
  }

  /**
   * Toggle debug mode
   */
  toggle(): boolean {
    this.enabled = !this.enabled

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        if (this.enabled) {
          window.localStorage.setItem('tracking_debug_mode', 'true')
          console.log(
            '🐛 Tracking Debug Mode ENABLED - All tracking calls will be logged'
          )
        } else {
          window.localStorage.removeItem('tracking_debug_mode')
          console.log('🐛 Tracking Debug Mode DISABLED')
        }
      } catch (error) {
        console.error('Failed to toggle debug mode:', error)
      }
    }

    return this.enabled
  }

  /**
   * Log a tracking call
   */
  log(
    platform: 'gtm' | 'ga4' | 'pixel' | 'capi',
    eventName: string,
    eventData: Record<string, any>,
    success: boolean = true,
    error?: string
  ): void {
    if (!this.enabled) return

    const event: TrackedEvent = {
      timestamp: new Date(),
      platform,
      eventName,
      eventData: { ...eventData },
      success,
      error,
    }

    this.events.push(event)

    // Keep only last N events
    if (this.events.length > this.maxEvents) {
      this.events.shift()
    }

    // Console output
    const status = success ? '✅' : '❌'
    const timestamp = event.timestamp.toLocaleTimeString()

    console.group(
      `${status} [${timestamp}] Tracking: ${platform.toUpperCase()} - ${eventName}`
    )
    console.log('Data:', eventData)
    if (error) {
      console.error('Error:', error)
    }
    console.groupEnd()
  }

  /**
   * Get all tracked events
   */
  getEvents(): TrackedEvent[] {
    return [...this.events]
  }

  /**
   * Get events filtered by platform
   */
  getEventsByPlatform(platform: 'gtm' | 'ga4' | 'pixel' | 'capi'): TrackedEvent[] {
    return this.events.filter((e) => e.platform === platform)
  }

  /**
   * Get events filtered by event name
   */
  getEventsByName(eventName: string): TrackedEvent[] {
    return this.events.filter((e) => e.eventName === eventName)
  }

  /**
   * Clear all tracked events
   */
  clear(): void {
    this.events = []
    console.log('🐛 Tracking debug history cleared')
  }

  /**
   * Export tracked events as JSON for analysis
   */
  export(): string {
    return JSON.stringify(this.events, null, 2)
  }

  /**
   * Print summary statistics
   */
  printSummary(): void {
    console.group('📊 Tracking Debug Summary')
    console.log('Total Events:', this.events.length)

    const byPlatform = {
      gtm: 0,
      ga4: 0,
      pixel: 0,
      capi: 0,
    }
    const byStatus = {
      success: 0,
      failure: 0,
    }

    this.events.forEach((e) => {
      byPlatform[e.platform]++
      if (e.success) {
        byStatus.success++
      } else {
        byStatus.failure++
      }
    })

    console.table({ 'By Platform': byPlatform })
    console.table({ 'By Status': byStatus })
    console.groupEnd()
  }

  /**
   * Check if enabled
   */
  isEnabled(): boolean {
    return this.enabled
  }
}


// Singleton instance
const trackingDebuggerInstance = new TrackingDebugger()

/**
 * Export singleton getter
 */
export function getTrackingDebugger(): TrackingDebugger {
  return trackingDebuggerInstance
}

/**
 * Shorthand function to log tracking
 */
export function logTracking(
  platform: 'gtm' | 'ga4' | 'pixel' | 'capi',
  eventName: string,
  eventData: Record<string, any>,
  success: boolean = true,
  error?: string
): void {
  trackingDebuggerInstance.log(platform, eventName, eventData, success, error)
}

/**
 * DevTools window object for easier debugging
 * Access in browser console: window.__TRACKING_DEBUG__
 */
if (typeof window !== 'undefined') {
  (window as any).__TRACKING_DEBUG__ = {
    toggle: () => trackingDebuggerInstance.toggle(),
    getEvents: () => trackingDebuggerInstance.getEvents(),
    getEventsByPlatform: (platform: string) => trackingDebuggerInstance.getEventsByPlatform(platform as any),
    getEventsByName: (name: string) => trackingDebuggerInstance.getEventsByName(name),
    clear: () => trackingDebuggerInstance.clear(),
    export: () => trackingDebuggerInstance.export(),
    summary: () => trackingDebuggerInstance.printSummary(),
    isEnabled: () => trackingDebuggerInstance.isEnabled(),
  }
}
