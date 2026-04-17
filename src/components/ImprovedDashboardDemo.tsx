import React, { useEffect } from 'react'
import { 
  Box, 
  Button, 
  Typography, 
  CircularProgress, 
  Alert,
  Switch,
  FormControlLabel 
} from '@mui/material'
import { useDashboardStoreV2 } from '../stores/dashboardStoreV2'
import { useSharedStore } from '../stores/sharedStore'

export const ImprovedDashboardDemo: React.FC = () => {
  const { 
    dashboard,
    isEditing,
    preferences,
    loadDashboard,
    updateDashboard,
    setIsEditing,
    addSkill,
    updatePreferences
  } = useDashboardStoreV2()

  // Access shared store from main-app
  const { theme: sharedTheme, setTheme, user: sharedUser } = useSharedStore()

  // React to shared theme changes
  useEffect(() => {
    console.log('🎨 Shared theme from main-app:', sharedTheme)
    if (preferences.theme !== sharedTheme) {
      updatePreferences({ theme: sharedTheme })
    }
  }, [sharedTheme, preferences.theme, updatePreferences])

  // Load dashboard on mount
  useEffect(() => {
    if (!dashboard.data) {
      loadDashboard('user-123')
    }
  }, [])

  const handleAddSkill = () => {
    addSkill(`New Skill ${Date.now()}`)
  }

  const handleToggleTheme = () => {
    const newTheme = sharedTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const handleUpdateName = () => {
    updateDashboard({ firstName: 'Jane', lastName: 'Smith' })
  }

  if (dashboard.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading dashboard...</Typography>
      </Box>
    )
  }

  if (dashboard.error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error: {dashboard.error}
      </Alert>
    )
  }

  return (
    <Box sx={{ p: 3, border: '2px solid', borderColor: 'primary.main', borderRadius: 2, m: 2 }}>
      <Typography variant="h5" gutterBottom color="primary">
        🚀 Improved Zustand Architecture Demo
      </Typography>
      
      {dashboard.data && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">
            Dashboard: {dashboard.data.firstName} {dashboard.data.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Skills: {dashboard.data.skills.join(', ')}
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Button 
          variant="contained" 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Stop Editing' : 'Start Editing'}
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={handleAddSkill}
        >
          Add Random Skill
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={handleUpdateName}
        >
          Update Name to Jane Smith
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Switch 
              checked={sharedTheme === 'dark'} 
              onChange={handleToggleTheme} 
            />
          }
          label={`Theme: ${sharedTheme} (synced from main-app)`}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Switch 
              checked={preferences.autoSave} 
              onChange={(e) => updatePreferences({ autoSave: e.target.checked })} 
            />
          }
          label="Auto-save enabled (with persistence)"
        />
      </Box>

      <Alert severity="info" sx={{ mt: 2 }}>
        <strong>✨ New Features:</strong><br/>
        • Generic store factory with consistent middleware<br/>
        • Cross-microfrontend event communication<br/>
        • Built-in async state management<br/>
        • Automatic persistence for preferences<br/>
        • Type-safe event system<br/>
        • Cleaner, more maintainable code
      </Alert>

      {isEditing && (
        <Alert severity="success" sx={{ mt: 2 }}>
          <strong>Edit Mode Active:</strong> All changes auto-save {preferences.autoSave ? '✅' : '❌'}
        </Alert>
      )}
    </Box>
  )
}