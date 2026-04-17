import { useEffect, useState } from 'react'
import { Box, Typography, Button, CircularProgress } from '@mui/material'
import { DashboardCard } from './components/DashboardCard'
import { Navbar } from './components/Navbar'
import { ImprovedDashboardDemo } from './components/ImprovedDashboardDemo'
import { SharedDataDisplay } from './components/SharedDataDisplay'
import { useDashboardStore, DashboardData } from './stores/dashboardStore'

const mockDashboard: DashboardData = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Full-stack developer with 5+ years of experience building scalable web applications.',
  location: 'San Francisco, CA',
  website: 'https://johndoe.dev',
  skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker'],
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Frontend Developer',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: 'Leading frontend development for enterprise applications using React and TypeScript.'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      startDate: '2020-03',
      endDate: '2021-12',
      current: false,
      description: 'Built responsive web applications and implemented modern frontend architectures.'
    }
  ]
}

function App() {
  const { 
    dashboard, 
    isEditing, 
    loading, 
    setDashboard, 
    setIsEditing 
  } = useDashboardStore()
  
  const [activeSection, setActiveSection] = useState('dashboard')

  useEffect(() => {
    setDashboard(mockDashboard)
  }, [setDashboard])

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleNavigation = (section: string) => {
    setActiveSection(section)
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    )
  }

  if (!dashboard) {
    return (
      <Box textAlign="center" p={4}>
        <Typography variant="h6">No dashboard found</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Navbar onNavigate={handleNavigation} />
      
      <Box sx={{ p: 2 }}>
        {activeSection === 'overview' && (
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Dashboard Overview
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Welcome to your main dashboard
            </Typography>
          </Box>
        )}

        {activeSection === 'dashboard' && (
          <>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h3" component="h1" gutterBottom>
                Dashboard Details - TEST CHANGE
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Manage your dashboard information
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleEdit}
                sx={{ mt: 2 }}
              >
                {isEditing ? 'View Mode' : 'Edit Mode'}
              </Button>
            </Box>
            
            {/* Display shared data from Main app */}
            <SharedDataDisplay />
            
            {/* Show improved Zustand demo */}
            <ImprovedDashboardDemo />
            
            <DashboardCard dashboard={dashboard} onEdit={handleEdit} />
          </>
        )}

        {activeSection === 'settings' && (
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Settings
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Configure your preferences
            </Typography>
          </Box>
        )}

        {isEditing && activeSection === 'dashboard' && (
          <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Edit Mode Active
            </Typography>
            <Typography variant="body2" color="text.secondary">
              In a real application, this would show editable forms for the dashboard data.
              The state is managed by Zustand and can be shared across microfrontends.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default App