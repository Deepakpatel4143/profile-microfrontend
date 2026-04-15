import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface ProfileData {
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

export interface ProfileState {
  profile: ProfileData | null
  isEditing: boolean
  loading: boolean
  error: string | null
}

export interface ProfileActions {
  setProfile: (profile: ProfileData) => void
  updateProfile: (updates: Partial<ProfileData>) => void
  setIsEditing: (isEditing: boolean) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addExperience: (experience: Omit<Experience, 'id'>) => void
  updateExperience: (id: string, updates: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void
}

export type ProfileStore = ProfileState & ProfileActions

export const useProfileStore = create<ProfileStore>()(
  devtools(
    subscribeWithSelector(
      immer((set) => ({
        profile: null,
        isEditing: false,
        loading: false,
        error: null,
        
        setProfile: (profile) =>
          set((state) => {
            state.profile = profile
          }),
          
        updateProfile: (updates) =>
          set((state) => {
            if (state.profile) {
              Object.assign(state.profile, updates)
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
            if (state.profile) {
              const newExperience: Experience = {
                ...experience,
                id: crypto.randomUUID(),
              }
              state.profile.experience.push(newExperience)
            }
          }),
          
        updateExperience: (id, updates) =>
          set((state) => {
            if (state.profile) {
              const experience = state.profile.experience.find(exp => exp.id === id)
              if (experience) {
                Object.assign(experience, updates)
              }
            }
          }),
          
        removeExperience: (id) =>
          set((state) => {
            if (state.profile) {
              state.profile.experience = state.profile.experience.filter(exp => exp.id !== id)
            }
          }),
          
        addSkill: (skill) =>
          set((state) => {
            if (state.profile && !state.profile.skills.includes(skill)) {
              state.profile.skills.push(skill)
            }
          }),
          
        removeSkill: (skill) =>
          set((state) => {
            if (state.profile) {
              state.profile.skills = state.profile.skills.filter(s => s !== skill)
            }
          }),
      }))
    ),
    { name: 'profile-store' }
  )
)