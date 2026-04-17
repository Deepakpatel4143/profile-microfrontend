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
import { DashboardData } from '../stores/dashboardStore'

interface DashboardCardProps {
  dashboard: DashboardData
  onEdit: () => void
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ dashboard, onEdit }) => {
  return (
    <Card sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={dashboard.avatar}
            sx={{ width: 80, height: 80, mr: 2 }}
          >
            {dashboard.firstName[0]}{dashboard.lastName[0]}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" component="h1">
              {dashboard.firstName} {dashboard.lastName}
            </Typography>
            {dashboard.bio && (
              <Typography variant="body1" color="text.secondary">
                {dashboard.bio}
              </Typography>
            )}
          </Box>
          <IconButton onClick={onEdit} color="primary">
            <EditIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          {dashboard.email && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{dashboard.email}</Typography>
            </Box>
          )}
          {dashboard.phone && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{dashboard.phone}</Typography>
            </Box>
          )}
          {dashboard.location && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{dashboard.location}</Typography>
            </Box>
          )}
          {dashboard.website && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Language sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">{dashboard.website}</Typography>
            </Box>
          )}
        </Box>

        {dashboard.skills.length > 0 && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {dashboard.skills.map((skill) => (
                <Chip key={skill} label={skill} size="small" />
              ))}
            </Box>
          </>
        )}

        {dashboard.experience.length > 0 && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Experience
            </Typography>
            {dashboard.experience.map((exp) => (
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