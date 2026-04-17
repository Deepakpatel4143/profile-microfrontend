import { create } from 'zustand'
import { pubStore } from './core/pubStore'
import { UserData, ThemeType } from '../types'

// Define the shared store interface (must match main-app)
interface SharedState {
  user: UserData | null
  theme: ThemeType
  isAuthenticated: boolean
}

interface SharedActions {
  setUser: (user: UserData) => void
  logout: () => void
  toggleTheme: () => void
  setTheme: (theme: ThemeType) => void
}

export type SharedStore = SharedState & SharedActions

// Get the shared store from main-app using pubStore
// This consumes the store that main-app defines via pubStore.defineStore()
export const useSharedStore = create(pubStore.getStore<SharedStore>('shared-store'))