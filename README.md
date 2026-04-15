# Profile Microfrontend

A standalone microfrontend for user profile management that can be integrated into any shell application via Module Federation.

## 🏗️ Architecture

- **Remote Microfrontend**: Exposes components via Module Federation
- **Local State Management**: Zustand store for profile-specific state
- **Component Library**: Uses shared UI components from design system
- **Responsive Design**: Mobile-first approach with MUI components

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The profile app will run on http://localhost:4002

## 📁 Project Structure

```
profile-app/
├── src/
│   ├── components/
│   │   └── ProfileCard.tsx     # Main profile component
│   ├── stores/
│   │   └── profileStore.ts     # Profile state management
│   ├── types/
│   │   └── index.ts           # TypeScript definitions
│   ├── App.tsx                # Main app component
│   └── main.tsx               # Entry point for standalone mode
├── vite.config.ts             # Module Federation config
├── package.json
└── README.md
```

## 🔧 Module Federation Configuration

```typescript
federation({
  name: 'profile',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App'
  },
  shared: ['react', 'react-dom', '@mui/material', 'zustand']
})
```

### Exposed Components
- `./App`: Main profile application
- Future: `./ProfileCard`, `./ProfileForm`, etc.

## 📊 State Management

### Profile Store (Zustand)
```typescript
interface ProfileState {
  profile: ProfileData | null
  isEditing: boolean
  loading: boolean
  error: string | null
}

interface ProfileActions {
  setProfile: (profile: ProfileData) => void
  updateProfile: (updates: Partial<ProfileData>) => void
  addExperience: (experience: Experience) => void
  updateExperience: (id: string, updates: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void
}
```

### Usage Example
```typescript
function ProfileComponent() {
  const { 
    profile, 
    isEditing, 
    setProfile, 
    updateProfile,
    addSkill 
  } = useProfileStore()

  return (
    <ProfileCard 
      profile={profile}
      onEdit={() => setIsEditing(!isEditing)}
    />
  )
}
```

## 🎨 Components

### ProfileCard
Main component displaying user profile information:
- Personal details (name, email, phone, location)
- Professional experience timeline
- Skills management
- Edit/view mode toggle

### Features
- **Responsive Design**: Mobile-first responsive layout
- **Edit Mode**: Toggle between view and edit modes
- **Experience Management**: Add, edit, remove work experience
- **Skills Tracking**: Dynamic skills list management
- **Avatar Support**: Profile picture display
- **Contact Info**: Email, phone, website, location

## 🔄 Integration with Shell

### As Remote Microfrontend
```typescript
// In shell application
const ProfileApp = React.lazy(() => import('profile/App'))

<Route path="/profile/*" element={
  <Suspense fallback={<Loading />}>
    <ProfileApp />
  </Suspense>
} />
```

### State Sharing
Profile state is local but can communicate with shell:

```typescript
// Emit events to shell
window.dispatchEvent(new CustomEvent('profile:updated', {
  detail: { profileId: profile.id, changes: updates }
}))

// Listen for global state changes
useEffect(() => {
  const handleUserChange = (event) => {
    // Update profile when global user changes
    if (event.detail.userId === profile?.id) {
      setProfile(event.detail.user)
    }
  }
  
  window.addEventListener('user:updated', handleUserChange)
  return () => window.removeEventListener('user:updated', handleUserChange)
}, [profile?.id, setProfile])
```

## 🧪 Standalone Development

The profile app can run independently for development:

```bash
npm run dev
```

This allows:
- Independent development and testing
- Component isolation
- Faster development cycles
- Team autonomy

## 🏗️ Build & Deployment

### Development Build
```bash
npm run build
```

### Production Environment Variables
```bash
VITE_API_BASE_URL=https://api.production.com
VITE_SHELL_URL=https://shell.production.com
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4002
CMD ["npm", "run", "preview"]
```

### CDN Deployment
The built assets can be deployed to a CDN and referenced by the shell:

```typescript
// Shell configuration
remotes: {
  profile: 'https://cdn.example.com/profile/remoteEntry.js'
}
```

## 📈 Performance Optimization

### Code Splitting
- Automatic splitting at component boundaries
- Lazy loading of heavy components
- Dynamic imports for non-critical features

### Bundle Size
- Shared dependencies via Module Federation
- Tree shaking for unused code
- Optimized MUI imports

### Caching
- Component-level memoization
- Image optimization and lazy loading
- API response caching (when integrated with shell)

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

Test files location: `src/**/*.test.tsx`

### Component Testing
```typescript
import { render, screen } from '@testing-library/react'
import { ProfileCard } from './ProfileCard'

test('displays profile information', () => {
  render(<ProfileCard profile={mockProfile} />)
  expect(screen.getByText('John Doe')).toBeInTheDocument()
})
```

### Integration Testing
- Test Module Federation exposure
- Validate state management
- Test responsive design

## 📊 Data Model

### ProfileData Interface
```typescript
interface ProfileData {
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

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  description: string
  current: boolean
}
```

## 🔒 Security Considerations

### Input Validation
- Sanitize all user inputs
- Validate email and phone formats
- Prevent XSS in bio and description fields

### Data Privacy
- Secure handling of personal information
- GDPR compliance for data storage
- Encrypted data transmission

## 🚀 Separate Repository Setup

This profile app is designed to work as a standalone repository:

### Repository Structure (Real-world)
```
profile-microfrontend/         # This repository
├── src/
├── package.json
├── vite.config.ts
├── Dockerfile
├── .github/workflows/         # CI/CD pipelines
└── README.md
```

### Shared UI Dependency
```json
{
  "dependencies": {
    "@microfrontend/shared-ui": "^1.0.0"
  }
}
```

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy Profile Microfrontend
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and Deploy
        run: |
          npm install
          npm run build
          # Deploy to CDN/hosting platform
```

## 🔄 API Integration

### Profile API Endpoints
```typescript
// Get profile
GET /api/profiles/:id

// Update profile
PUT /api/profiles/:id

// Upload avatar
POST /api/profiles/:id/avatar

// Add experience
POST /api/profiles/:id/experience

// Update experience
PUT /api/profiles/:id/experience/:expId
```

### Error Handling
```typescript
const updateProfile = async (updates: Partial<ProfileData>) => {
  try {
    setLoading(true)
    const response = await fetch(`/api/profiles/${profile.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
    
    if (!response.ok) throw new Error('Failed to update profile')
    
    const updatedProfile = await response.json()
    setProfile(updatedProfile)
  } catch (error) {
    setError(error.message)
  } finally {
    setLoading(false)
  }
}
```

## 🤝 Contributing

1. Follow React best practices
2. Maintain TypeScript strict mode
3. Add tests for new features
4. Update documentation
5. Follow semantic versioning

## 📄 License

MIT License - See LICENSE file for details

---

This profile microfrontend demonstrates modern practices for building scalable, independent applications that integrate seamlessly with larger systems.