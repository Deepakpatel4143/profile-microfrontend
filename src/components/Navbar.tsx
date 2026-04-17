import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from '@mui/material'
import { Person, Dashboard, Settings } from '@mui/icons-material'

interface NavbarProps {
  onNavigate?: (section: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const handleNavigation = (section: string) => {
    onNavigate?.(section)
  }

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Person sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Raman
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            color="inherit" 
            startIcon={<Dashboard />}
            onClick={() => handleNavigation('overview')}
          >
            PPPPP
          </Button>
          <Button 
            color="inherit" 
            startIcon={<Person />}
            onClick={() => handleNavigation('dashboard')}
          >
            Dashboard
          </Button>
          <Button 
            color="inherit" 
            startIcon={<Settings />}
            onClick={() => handleNavigation('settings')}
          >
            Settings
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}