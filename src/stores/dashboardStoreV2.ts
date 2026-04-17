import { createStore, AsyncState, AsyncActions } from './core/storeFactory'
import { useSharedStore } from './sharedStore'

// Domain types (keep existing)
export interface DashboardData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  skills: string[]
  experience: Experience[]
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  description: string
  current: boolean
}

// Store state with improved async handling
interface DashboardState {
  dashboard: AsyncState<DashboardData>
  isEditing: boolean
  preferences: {
    autoSave: boolean
    theme: 'light' | 'dark'
  }
}

interface DashboardActions extends AsyncActions<DashboardData> {
  // Dashboard management
  updateDashboard: (updates: Partial<DashboardData>) => Promise<void>
  loadDashboard: (dashboardId: string) => Promise<void>
  
  // UI state
  setIsEditing: (isEditing: boolean) => void
  
  // Experience management
  addExperience: (experience: Omit<Experience, 'id'>) => void
  updateExperience: (id: string, updates: Partial<Experience>) => void
  removeExperience: (id: string) => void
  
  // Skills management
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void
  
  // Preferences
  updatePreferences: (prefs: Partial<DashboardState['preferences']>) => void
}

type DashboardStore = DashboardState & DashboardActions

// Create store using factory
export const useDashboardStoreV2 = createStore<DashboardStore>(
  (set, get) => ({
    // Initial state
    dashboard: {
      data: null,
      loading: false,
      error: null,
      setData: (data) => set(state => { state.dashboard.data = data; state.dashboard.loading = false; state.dashboard.error = null }),
      setLoading: (loading) => set(state => { state.dashboard.loading = loading }),
      setError: (error) => set(state => { state.dashboard.error = error; state.dashboard.loading = false }),
      reset: () => set(state => { state.dashboard = { data: null, loading: false, error: null, ...state.dashboard } })
    },
    isEditing: false,
    preferences: {
      autoSave: true,
      theme: 'light'
    },

    // Async dashboard operations
    loadDashboard: async (dashboardId: string) => {
      const state = get()
      state.dashboard.setLoading(true)
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        const mockDashboard: DashboardData = {
          id: dashboardId,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          skills: ['React', 'TypeScript', 'Zustand'],
          experience: []
        }
        
        state.dashboard.setData(mockDashboard)
      } catch (error) {
        state.dashboard.setError(error instanceof Error ? error.message : 'Failed to load dashboard')
      }
    },

    updateDashboard: async (updates: Partial<DashboardData>) => {
      const state = get()
      if (!state.dashboard.data) return
      
      set(state => {
        if (state.dashboard.data) {
          Object.assign(state.dashboard.data, updates)
        }
      })

      // Auto-save if enabled
      if (state.preferences.autoSave) {
        try {
          // Simulate API save
          await new Promise(resolve => setTimeout(resolve, 500))
        } catch (error) {
          state.dashboard.setError('Failed to save dashboard')
        }
      }
    },

    // UI state management
    setIsEditing: (isEditing) => set(state => { state.isEditing = isEditing }),

    // Experience management (simplified with helper)
    addExperience: (experience) => set(state => {
      if (state.dashboard.data) {
        const newExp: Experience = { ...experience, id: crypto.randomUUID() }
        state.dashboard.data.experience.push(newExp)
      }
    }),

    updateExperience: (id, updates) => set(state => {
      if (state.dashboard.data) {
        const exp = state.dashboard.data.experience.find(e => e.id === id)
        if (exp) Object.assign(exp, updates)
      }
    }),

    removeExperience: (id) => set(state => {
      if (state.dashboard.data) {
        state.dashboard.data.experience = state.dashboard.data.experience.filter(e => e.id !== id)
      }
    }),

    // Skills management
    addSkill: (skill) => set(state => {
      if (state.dashboard.data && !state.dashboard.data.skills.includes(skill)) {
        state.dashboard.data.skills.push(skill)
      }
    }),

    removeSkill: (skill) => set(state => {
      if (state.dashboard.data) {
        state.dashboard.data.skills = state.dashboard.data.skills.filter(s => s !== skill)
      }
    }),

    // Preferences management  
    updatePreferences: (prefs) => set(state => {
      Object.assign(state.preferences, prefs)
    })
  }),
  { 
    name: 'dashboard-store-v2',
    persist: true,
    persistKey: 'dashboard-preferences'
  }
)