import { useState, useEffect } from 'react'
import { Box, Typography, Paper, Avatar, Chip, Badge, IconButton, Divider } from '@mui/material'
import { Brightness4, Brightness7, Notifications } from '@mui/icons-material'
import { usePubSub } from '../stores/core/pubsub'

interface MainUserData {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
}

interface MainNotification {
  id: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  timestamp: Date
  read: boolean
}

export function MainDataDisplay() {
  const [mainUser, setMainUser] = useState<MainUserData | null>(null)
  const [mainPreferences, setMainPreferences] = useState<any>(null)
  const [mainTheme, setMainTheme] = useState<'light' | 'dark'>('light')
  const [notifications, setNotifications] = useState<{ count: number; messages: MainNotification[] }>({ count: 0, messages: [] })

  // Listen for main user data
  usePubSub('main:user-data', (data) => {
    console.log('📡 Dashboard app received main user data:', data)
    setMainUser(data.user)
    setMainPreferences(data.preferences)
  }, [])

  // Listen for theme updates
  usePubSub('main:theme-update', (data) => {
    console.log('🎨 Dashboard app received theme update:', data)
    setMainTheme(data.theme)
  }, [])

  // Listen for notifications
  usePubSub('main:notifications', (data) => {
    console.log('🔔 Dashboard app received notifications:', data)
    setNotifications(data)
  }, [])

  // Listen for user login/logout
  usePubSub('user:login', (data) => {
    console.log('👤 User logged in:', data)
    setMainUser(data.user)
  }, [])

  usePubSub('user:logout', () => {
    console.log('👤 User logged out')
    setMainUser(null)
    setMainPreferences(null)
    setNotifications({ count: 0, messages: [] })
  }, [])

  if (!mainUser) {
    return (
      <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: 'warning.light', color: 'warning.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          🔗 Main App Data
        </Typography>
        <Typography variant="body2">
          Waiting for data from main app...
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

        <Box sx={{ ml: 'auto' }}>
          <Badge badgeContent={notifications.count} color="error">
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
          </Badge>
        </Box>
      </Box>

      {mainPreferences && (
        <>
          <Divider sx={{ my: 2, bgcolor: 'primary.contrastText', opacity: 0.3 }} />
          <Typography variant="subtitle2" gutterBottom>
            📋 Main App Preferences:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Chip size="small" label={`Language: ${mainPreferences.language}`} />
            <Chip size="small" label={`Timezone: ${mainPreferences.timezone}`} />
            <Chip 
              size="small" 
              label={`Email Notifications: ${mainPreferences.emailNotifications ? 'ON' : 'OFF'}`}
              color={mainPreferences.emailNotifications ? 'success' : 'default'}
            />
          </Box>
        </>
      )}

      {notifications.messages.length > 0 && (
        <>
          <Divider sx={{ my: 2, bgcolor: 'primary.contrastText', opacity: 0.3 }} />
          <Typography variant="subtitle2" gutterBottom>
            🔔 Recent Notifications ({notifications.count} unread):
          </Typography>
          <Box sx={{ maxHeight: 150, overflow: 'auto' }}>
            {notifications.messages.map((notification, index) => (
              <Box 
                key={notification.id || index}
                sx={{ 
                  p: 1, 
                  mb: 1, 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  borderRadius: 1,
                  borderLeft: 4,
                  borderLeftColor: {
                    info: 'info.main',
                    success: 'success.main',
                    warning: 'warning.main',
                    error: 'error.main'
                  }[notification.type] || 'info.main'
                }}
              >
                <Typography variant="caption" sx={{ display: 'flex', justifyContent: 'space-between', opacity: 0.8 }}>
                  {notification.type.toUpperCase()}
                  {!notification.read && <Chip size="small" label="NEW" color="error" sx={{ height: 16 }} />}
                </Typography>
                <Typography variant="body2">
                  {notification.message}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      )}

      <Typography variant="caption" sx={{ display: 'block', mt: 2, opacity: 0.7 }}>
        💡 This data is synchronized in real-time from the Main app via EventBus
      </Typography>
    </Paper>
  )
}