import React from 'react'
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Chip,
  IconButton,
  Divider
} from '@mui/material'
import { Edit as EditIcon, LocationOn, Language, Phone, Email } from '@mui/icons-material'
import { ProfileData } from '../stores/profileStore'

interface ProfileCardProps {
  profile: ProfileData
  onEdit: () => void
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEdit }) => {
  return (
    <Card sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={profile.avatar}
            sx={{ width: 80, height: 80, mr: 2 }}
          >
            {profile.firstName[0]}{profile.lastName[0]}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" component="h1">
              {profile.firstName} {profile.lastName}
            </Typography>
            {profile.bio && (
              <Typography variant="body1" color="text.secondary">
                {profile.bio}
              </Typography>
            )}
          </Box>
          <IconButton onClick={onEdit} color="primary">
            <EditIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          {profile.email && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{profile.email}</Typography>
            </Box>
          )}
          {profile.phone && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{profile.phone}</Typography>
            </Box>
          )}
          {profile.location && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{profile.location}</Typography>
            </Box>
          )}
          {profile.website && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Language sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{profile.website}</Typography>
            </Box>
          )}
        </Box>

        {profile.skills.length > 0 && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {profile.skills.map((skill) => (
                <Chip key={skill} label={skill} size="small" />
              ))}
            </Box>
          </>
        )}

        {profile.experience.length > 0 && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Experience
            </Typography>
            {profile.experience.map((exp) => (
              <Box key={exp.id} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {exp.position}
                </Typography>
                <Typography variant="subtitle2" color="primary">
                  {exp.company}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {exp.description}
                </Typography>
              </Box>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  )
}