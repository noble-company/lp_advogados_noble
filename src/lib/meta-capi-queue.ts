/**
 * Meta CAPI Retry & Queue System
 * 
 * Implements robust event queuing with exponential backoff retry logic
 * to ensure events are delivered even with temporary network issues.
 */

import { TRACKING_CONFIG } from './tracking-constants'
import type { MetaCAPIPayload } from './tracking'

/**
 * Stores queued event for retry
 */
interface QueuedEvent {
  id: string
  payload: MetaCAPIPayload
  timestamp: number
  attempts: number
  nextRetryAt: number
  lastError?: string
}

const QUEUE_STORAGE_KEY = 'meta_capi_event_queue'
const MAX_QUEUE_SIZE = 100

/**
 * Event queue for Meta CAPI with localStorage persistence
 */
class MetaCAPIEventQueue {
  private queue: QueuedEvent[] = []
  private isProcessing = false
  private retryTimer: NodeJS.Timeout | null = null

  constructor() {
    this.loadFromStorage()
    this.startProcessing()
  }

  /**
   * Add event to queue with retry metadata
   */
  add(eventId: string, payload: MetaCAPIPayload): void {
    if (this.queue.length >= MAX_QUEUE_SIZE) {
      console.warn('Meta CAPI queue full - oldest event dropped')
      this.queue.shift()
    }

    const queuedEvent: QueuedEvent = {
      id: eventId,
      payload,
      timestamp: Date.now(),
      attempts: 0,
      nextRetryAt: Date.now(),
    }

    this.queue.push(queuedEvent)
    this.saveToStorage()

    if (!this.isProcessing) {
      this.process().catch(console.error)
    }
  }

  /**
   * Process queued events with retry logic
   */
  private async process(): Promise<void> {
    if (this.isProcessing) return

    this.isProcessing = true

    while (this.queue.length > 0) {
      const event = this.queue[0]

      // Check if it's time to retry this event
      if (event.nextRetryAt > Date.now()) {
        // Schedule next check
        this.scheduleNextCheck()
        break
      }

      try {
        await this.sendEvent(event)
        
        // Success - remove from queue
        this.queue.shift()
        this.saveToStorage()
        
        if (import.meta.env.DEV) {
          console.log(`✅ Meta CAPI queued event sent: ${event.id}`)
        }
      } catch (error) {
        // Failure - schedule retry with exponential backoff
        event.attempts++
        event.lastError = error instanceof Error ? error.message : String(error)

        if (event.attempts >= TRACKING_CONFIG.META_CAPI_RETRY_MAX_ATTEMPTS) {
          // Max attempts reached - log to dead letter and remove from queue
          console.error(`❌ Meta CAPI event failed after ${event.attempts} attempts:`, {
            eventId: event.id,
            lastError: event.lastError,
            payload: event.payload,
          })
          this.queue.shift()
        } else {
          // Schedule next retry
          const delayMs = this.getExponentialBackoffDelay(event.attempts)
          event.nextRetryAt = Date.now() + delayMs

          if (import.meta.env.DEV) {
            console.log(
              `⏱️ Meta CAPI event retry scheduled in ${delayMs}ms:`,
              event.id
            )
          }
        }

        this.saveToStorage()
        this.scheduleNextCheck()
        break // Wait for next check
      }
    }

    this.isProcessing = false
  }

  /**
   * Send single event to Meta CAPI
   */
  private async sendEvent(event: QueuedEvent): Promise<void> {
    const endpoint = import.meta.env.VITE_META_CAPI_ENDPOINT

    if (!endpoint) {
      throw new Error('Meta CAPI endpoint not configured')
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(
      () => controller.abort(),
      TRACKING_CONFIG.META_CAPI_TIMEOUT_MS
    )

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event.payload),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (import.meta.env.DEV) {
        console.log(`✅ Meta CAPI response:`, data)
      }
    } finally {
      clearTimeout(timeoutId)
    }
  }

  /**
   * Get exponential backoff delay with jitter
   */
  private getExponentialBackoffDelay(attempts: number): number {
    const baseDelay = Math.min(
      TRACKING_CONFIG.META_CAPI_RETRY_INITIAL_DELAY_MS *
        Math.pow(2, attempts - 1),
      TRACKING_CONFIG.META_CAPI_RETRY_MAX_DELAY_MS
    )

    // Add jitter (±20%)
    const jitter = baseDelay * 0.2
    const randomJitter = (Math.random() - 0.5) * jitter * 2
    
    return Math.round(baseDelay + randomJitter)
  }

  /**
   * Schedule next processing check
   */
  private scheduleNextCheck(): void {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer)
    }

    const nextEvent = this.queue[0]
    if (!nextEvent) return

    const delayUntilRetry = Math.max(0, nextEvent.nextRetryAt - Date.now())
    const checkDelay = Math.min(delayUntilRetry + 1000, 30000) // Max 30s check interval

    this.retryTimer = setTimeout(() => {
      this.process().catch(console.error)
    }, checkDelay)
  }

  /**
   * Load queue from localStorage
   */
  private loadFromStorage(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return
    }

    try {
      const stored = window.localStorage.getItem(QUEUE_STORAGE_KEY)
      if (stored) {
        this.queue = JSON.parse(stored)

        // Remove events older than 24 hours
        const now = Date.now()
        const maxAge = 24 * 60 * 60 * 1000
        this.queue = this.queue.filter(
          (event) => now - event.timestamp < maxAge
        )

        if (import.meta.env.DEV && this.queue.length > 0) {
          console.log(
            `📦 Loaded ${this.queue.length} queued Meta CAPI events from storage`
          )
        }
      }
    } catch (error) {
      console.error('Failed to load Meta CAPI queue from storage:', error)
    }
  }

  /**
   * Save queue to localStorage
   */
  private saveToStorage(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return
    }

    try {
      window.localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(this.queue))
    } catch (error) {
      console.error('Failed to save Meta CAPI queue to localStorage:', error)
    }
  }

  /**
   * Clear entire queue (for testing/debugging)
   */
  clear(): void {
    this.queue = []
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(QUEUE_STORAGE_KEY)
      } catch (error) {
        console.error('Failed to clear Meta CAPI queue:', error)
      }
    }
  }

  /**
   * Get current queue size
   */
  size(): number {
    return this.queue.length
  }

  /**
   * Get queue status (for debugging)
   */
  getStatus(): { size: number; events: QueuedEvent[] } {
    return {
      size: this.queue.length,
      events: this.queue.map((e) => ({
        id: e.id,
        attempts: e.attempts,
        nextRetryAt: new Date(e.nextRetryAt).toISOString(),
        lastError: e.lastError,
      })) as any[],
    }
  }

  /**
   * Cleanup on page unload
   */
  destroy(): void {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer)
    }
  }
}

// Singleton instance
let queueInstance: MetaCAPIEventQueue | null = null

/**
 * Get or create queue instance
 */
export function getMetaCAPIQueue(): MetaCAPIEventQueue {
  if (!queueInstance) {
    queueInstance = new MetaCAPIEventQueue()

    // Cleanup on page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        queueInstance?.destroy()
      })

      // Also cleanup on visibility change
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          queueInstance?.saveToStorage()
        }
      })
    }
  }

  return queueInstance
}

/**
 * Queue event for sending to Meta CAPI with retry logic
 * @param eventId - Unique event ID
 * @param payload - Meta CAPI payload
 */
export function queueMetaCAPIEvent(
  eventId: string,
  payload: MetaCAPIPayload
): void {
  const queue = getMetaCAPIQueue()
  queue.add(eventId, payload)
}

/**
 * Get current queue status (for debugging)
 */
export function getMetaCAPIQueueStatus() {
  const queue = getMetaCAPIQueue()
  return queue.getStatus()
}

/**
 * Clear Meta CAPI event queue (for testing)
 */
export function clearMetaCAPIQueue(): void {
  const queue = getMetaCAPIQueue()
  queue.clear()
}
