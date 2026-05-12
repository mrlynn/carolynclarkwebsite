'use client';

import { Box, Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import { CheckCircle, Star } from '@mui/icons-material';

interface WeeklySummaryProps {
  data: {
    weekRevenue: number;
    weekAppointments: { completed: number; scheduled: number; cancelled: number };
    newReviews: number;
    bestDay: { day: string; revenue: number; bookings: number };
  };
}

export default function WeeklySummary({ data }: WeeklySummaryProps) {
  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #fef8f3 0%, #fff9f5 100%)',
        border: '1px solid #f5e6d3',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
          This Week's Summary
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ p: 1.5, backgroundColor: '#fff9f5', borderRadius: 1, border: '1px solid #f5e6d3' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                Week Revenue
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#f5a860' }}>
                ${data.weekRevenue.toLocaleString()}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ p: 1.5, backgroundColor: '#fff9f5', borderRadius: 1, border: '1px solid #f5e6d3' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                Completed Appointments
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle sx={{ fontSize: 20, color: '#7fbaa5' }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.weekAppointments.completed}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ p: 1.5, backgroundColor: '#fff9f5', borderRadius: 1, border: '1px solid #f5e6d3' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                New Reviews
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Star sx={{ fontSize: 20, color: '#f5c66f' }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {data.newReviews}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ p: 1.5, backgroundColor: '#fff9f5', borderRadius: 1, border: '1px solid #f5e6d3' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                Best Day
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                {data.bestDay.day}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                ${data.bestDay.revenue} · {data.bestDay.bookings} bookings
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, p: 1.5, backgroundColor: '#f5e6d3', borderRadius: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Scheduled: <Chip label={data.weekAppointments.scheduled} size="small" variant="outlined" sx={{ ml: 1 }} /> · Cancelled:{' '}
            <Chip label={data.weekAppointments.cancelled} size="small" variant="outlined" color="error" sx={{ ml: 1 }} />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
