import { create } from 'zustand'
import { devtools, subscribeWithSelector, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Generic store creation factory with consistent middleware setup
export function createStore<T>(
  initializer: (set: any, get: any) => T,
  options: {
    name: string
    persist?: boolean
    persistKey?: string
  }
) {
  const store = create<T>()(
    devtools(
      subscribeWithSelector(
        options.persist
          ? persist(
              immer(initializer),
              { name: options.persistKey || options.name }
            )
          : immer(initializer)
      ),
      { name: options.name }
    )
  )
  
  return store
}

// Generic async state management
export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export interface AsyncActions<T> {
  setData: (data: T) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export function createAsyncState<T>(): AsyncState<T> & AsyncActions<T> {
  return {
    data: null,
    loading: false,
    error: null,
    
    setData: (data: T) => ({ data, loading: false, error: null }),
    setLoading: (loading: boolean) => ({ loading }),
    setError: (error: string | null) => ({ error, loading: false }),
    reset: () => ({ data: null, loading: false, error: null })
  }
}