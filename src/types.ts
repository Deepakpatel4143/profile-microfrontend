// Types for cross-microfrontend shared state
export interface UserData {
  id: string
  name: string
  email: string
  avatar: string
  role: string
}

export type ThemeType = 'light' | 'dark'