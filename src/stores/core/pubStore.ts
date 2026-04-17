import PubStore from 'zustand-pub'

// Use the same symbol key as main-app for cross-microfrontend state sharing
export const pubStore = new PubStore('microfrontend-shared-state')

export default pubStore