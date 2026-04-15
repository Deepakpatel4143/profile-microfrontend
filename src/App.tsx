import React, { useEffect } from 'react'
import { Box, Typography, Button, CircularProgress } from '@mui/material'
import { ProfileCard } from './components/ProfileCard'
import { useProfileStore, ProfileData } from './stores/profileStore'

const mockProfile: ProfileData = {
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
    profile, 
    isEditing, 
    loading, 
    setProfile, 
    setIsEditing 
  } = useProfileStore()

  useEffect(() => {
    setProfile(mockProfile)
  }, [setProfile])

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    )
  }

  if (!profile) {
    return (
      <Box textAlign="center" p={4}>
        <Typography variant="h6">No profile found</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Profile Microfrontend
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          This is a standalone microfrontend for user profiles
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleEdit}
          sx={{ mt: 2 }}
        >
          {isEditing ? 'View Mode' : 'Edit Mode'}
        </Button>
      </Box>

      <ProfileCard profile={profile} onEdit={handleEdit} />

      {isEditing && (
        <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Edit Mode Active
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In a real application, this would show editable forms for the profile data.
            The state is managed by Zustand and can be shared across microfrontends.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default App