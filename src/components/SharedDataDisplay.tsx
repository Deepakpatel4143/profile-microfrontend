import { Box, Typography, Paper, Avatar, Chip, Divider } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useSharedStore } from '../stores/sharedStore'
import { UserData, ThemeType } from '../types'

export function SharedDataDisplay() {
  // Use shared store from main-app via zustand-pub
  const { user: mainUser, theme: mainTheme } = useSharedStore()

  if (!mainUser) {
    return (
      <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: 'warning.light', color: 'warning.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          🔗 Main App Data
        </Typography>
        <Typography variant="body2">
          Waiting for user data from main app...
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        🔗 Shared Data from Main App
        <Chip 
          size="small" 
          label={`Theme: ${mainTheme}`} 
          icon={mainTheme === 'dark' ? <Brightness4 /> : <Brightness7 />}
          sx={{ ml: 'auto' }}
        />
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Avatar 
          src={mainUser.avatar} 
          alt={mainUser.name}
          sx={{ width: 56, height: 56 }}
        >
          {mainUser.name.split(' ').map(n => n[0]).join('')}
        </Avatar>
        
        <Box>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {mainUser.name}
            <Chip 
              size="small" 
              label={mainUser.role.toUpperCase()} 
              color={mainUser.role === 'admin' ? 'error' : 'success'}
            />
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {mainUser.email}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            ID: {mainUser.id}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2, bgcolor: 'primary.contrastText', opacity: 0.3 }} />
      
      <Typography variant="caption" sx={{ display: 'block', opacity: 0.7 }}>
        💡 This data is synchronized in real-time from the Main app via zustand-pub
      </Typography>
      <Typography variant="caption" sx={{ display: 'block', opacity: 0.7 }}>
        🎨 Theme changes in main automatically update here
      </Typography>
    </Paper>
  )
}