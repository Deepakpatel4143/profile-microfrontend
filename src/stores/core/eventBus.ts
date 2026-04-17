// Event-driven communication between microfrontends
export interface MicroEventMap {
  'profile:updated': { profileId: string; data: any }
  'user:login': { user: any }
  'user:logout': {}
  'theme:changed': { theme: string }
  'navigation:change': { path: string }
}

type EventCallback<T = any> = (data: T) => void

class EventBus {
  private events: Map<string, EventCallback[]> = new Map()

  // Subscribe to an event
  on<K extends keyof MicroEventMap>(
    event: K, 
    callback: EventCallback<MicroEventMap[K]>
  ) {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(callback)
    
    // Return unsubscribe function
    return () => this.off(event, callback)
  }

  // Unsubscribe from an event
  off<K extends keyof MicroEventMap>(
    event: K, 
    callback: EventCallback<MicroEventMap[K]>
  ) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  // Emit an event
  emit<K extends keyof MicroEventMap>(
    event: K, 
    data: MicroEventMap[K]
  ) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
  }

  // Clear all events
  clear() {
    this.events.clear()
  }
}

// Global singleton instance
export const microEventBus = new EventBus()

// Hook for easy usage in React components
import { useEffect } from 'react'

export function useEventBus<K extends keyof MicroEventMap>(
  event: K,
  callback: EventCallback<MicroEventMap[K]>,
  deps: any[] = []
) {
  useEffect(() => {
    const unsubscribe = microEventBus.on(event, callback)
    return unsubscribe
  }, deps)
}