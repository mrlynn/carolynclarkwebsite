'use client';

import { Box, Card, CardContent, Typography, Stack, LinearProgress, Chip } from '@mui/material';
import { TrendingUp, CheckCircle, People, Star } from '@mui/icons-material';
import { MetricsData } from '@/lib/analytics';

interface BusinessHealthScoreProps {
  metrics: MetricsData;
}

export default function BusinessHealthScore({ metrics }: BusinessHealthScoreProps) {
  // Calculate health score (0-100)
  const bookingRate = Math.min(metrics.appointmentsBooked * 10, 100); // Adjust multiplier based on expected bookings
  const completionScore = metrics.completionRate;
  const satisfactionScore = (metrics.avgRating / 5) * 100;
  const loyaltyScore = metrics.returnClientRate * 100;

  const healthScore = Math.round((bookingRate + completionScore + satisfactionScore + loyaltyScore) / 4);

  const getHealthStatus = (score: number) => {
    if (score >= 75) return { label: 'Excellent', color: '#7fbaa5' };
    if (score >= 60) return { label: 'Good', color: '#f5c66f' };
    return { label: 'Fair', color: '#d4754d' };
  };

  const status = getHealthStatus(healthScore);

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, rgba(245, 168, 96, 0.1) 0%, rgba(127, 186, 165, 0.1) 100%)`,
        border: '2px solid #f5a860',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
          Business Health Score
        </Typography>

        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              margin: '0 auto',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${status.color}20 0%, ${status.color}40 100%)`,
              border: `4px solid ${status.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: status.color }}>
                {healthScore}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                /100
              </Typography>
            </Box>
          </Box>
          <Chip label={status.label} color={healthScore >= 75 ? 'success' : healthScore >= 60 ? 'warning' : 'error'} />
        </Box>

        <Stack spacing={1.5}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                <CheckCircle sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle', color: '#7fbaa5' }} />
                Completion Rate
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {metrics.completionRate}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={metrics.completionRate} />
          </Box>

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                <Star sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle', color: '#f5c66f' }} />
                Client Satisfaction
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {((metrics.avgRating / 5) * 100).toFixed(0)}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={(metrics.avgRating / 5) * 100} />
          </Box>

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                <People sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle', color: '#f5a860' }} />
                Client Loyalty
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {metrics.returnClientRate}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={metrics.returnClientRate} />
          </Box>

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                <TrendingUp sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle', color: '#7fbaa5' }} />
                Booking Activity
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {Math.min(metrics.appointmentsBooked * 10, 100).toFixed(0)}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={Math.min(metrics.appointmentsBooked * 10, 100)} />
          </Box>
        </Stack>

        <Box sx={{ mt: 2, p: 1, backgroundColor: '#fff9f5', borderRadius: 1, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {healthScore >= 75 ? '🎉 Your business is thriving!' : healthScore >= 60 ? '📈 Keep up the momentum!' : '🚀 Room to grow!'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
