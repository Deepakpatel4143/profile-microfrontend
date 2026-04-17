// Shared types for microfrontend communication

export type ThemeType = 'light' | 'dark'

export interface UserData {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
}

// Event types for cross-microfrontend communication
export interface MicroEventMap {
  'theme:changed': { theme: ThemeType }
  'user:updated': { user: UserData }
  'user:login': { user: UserData }
  'user:logout': {}
}

export type EventCallback<T = any> = (data: T) => void