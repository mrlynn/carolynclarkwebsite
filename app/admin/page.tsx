'use client';

import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { brandColors } from '@/lib/theme';

export default function AdminDashboard() {
  const router = useRouter();
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          marginBottom: 4,
          color: brandColors.ink,
          fontWeight: 600,
        }}
      >
        Welcome to Admin Dashboard
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2, color: brandColors.ink }}>
              📅 Availability
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 3, color: brandColors.inkSoft }}>
              Manage your weekly schedule and working hours.
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push('/admin/availability')}
              sx={{
                backgroundColor: brandColors.terracotta,
                color: brandColors.cream,
                textTransform: 'none',
              }}
            >
              Manage Availability
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2, color: brandColors.ink }}>
              📋 Appointments
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 3, color: brandColors.inkSoft }}>
              View and manage all client appointments.
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push('/admin/appointments')}
              sx={{
                backgroundColor: brandColors.moss,
                color: brandColors.cream,
                textTransform: 'none',
              }}
            >
              View Appointments
            </Button>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ marginTop: 4, padding: 2, backgroundColor: `${brandColors.terracotta}10`, borderRadius: 1 }}>
        <Typography variant="body2" sx={{ color: brandColors.ink }}>
          <strong>Phase 1 Complete!</strong> You can now:
        </Typography>
        <ul style={{ marginTop: 8, color: brandColors.ink }}>
          <li>Log in with your credentials</li>
          <li>Access the admin dashboard</li>
          <li>Next: Set up your availability schedule</li>
        </ul>
      </Box>
    </Box>
  );
}
