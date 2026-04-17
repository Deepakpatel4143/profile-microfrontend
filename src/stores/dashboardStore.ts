import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

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

export interface DashboardState {
  dashboard: DashboardData | null
  isEditing: boolean
  loading: boolean
  error: string | null
}

export interface DashboardActions {
  setDashboard: (dashboard: DashboardData) => void
  updateDashboard: (updates: Partial<DashboardData>) => void
  setIsEditing: (isEditing: boolean) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addExperience: (experience: Omit<Experience, 'id'>) => void
  updateExperience: (id: string, updates: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void
}

export type DashboardStore = DashboardState & DashboardActions

export const useDashboardStore = create<DashboardStore>()(
  devtools(
    subscribeWithSelector(
      immer((set) => ({
        dashboard: null,
        isEditing: false,
        loading: false,
        error: null,
        
        setDashboard: (dashboard) =>
          set((state) => {
            state.dashboard = dashboard
          }),
          
        updateDashboard: (updates) =>
          set((state) => {
            if (state.dashboard) {
              Object.assign(state.dashboard, updates)
            }
          }),
          
        setIsEditing: (isEditing) =>
          set((state) => {
            state.isEditing = isEditing
          }),
          
        setLoading: (loading) =>
          set((state) => {
            state.loading = loading
          }),
          
        setError: (error) =>
          set((state) => {
            state.error = error
          }),
          
        addExperience: (experience) =>
          set((state) => {
            if (state.dashboard) {
              const newExperience: Experience = {
                ...experience,
                id: crypto.randomUUID(),
              }
              state.dashboard.experience.push(newExperience)
            }
          }),
          
        updateExperience: (id, updates) =>
          set((state) => {
            if (state.dashboard) {
              const experience = state.dashboard.experience.find(exp => exp.id === id)
              if (experience) {
                Object.assign(experience, updates)
              }
            }
          }),
          
        removeExperience: (id) =>
          set((state) => {
            if (state.dashboard) {
              state.dashboard.experience = state.dashboard.experience.filter(exp => exp.id !== id)
            }
          }),
          
        addSkill: (skill) =>
          set((state) => {
            if (state.dashboard && !state.dashboard.skills.includes(skill)) {
              state.dashboard.skills.push(skill)
            }
          }),
          
        removeSkill: (skill) =>
          set((state) => {
            if (state.dashboard) {
              state.dashboard.skills = state.dashboard.skills.filter(s => s !== skill)
            }
          }),
      }))
    ),
    { name: 'dashboard-store' }
  )
)