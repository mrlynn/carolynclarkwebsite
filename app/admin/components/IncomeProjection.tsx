'use client';

import { Box, Card, CardContent, Typography, Stack, LinearProgress, Chip } from '@mui/material';
import { TrendingUp, MonetizationOn } from '@mui/icons-material';

interface IncomeProjectionProps {
  upcomingValue: number;
  projectedRevenue: number;
  thisMonthRevenue: number;
}

export default function IncomeProjection({ upcomingValue, projectedRevenue, thisMonthRevenue }: IncomeProjectionProps) {
  const completionPercentage = Math.round((thisMonthRevenue / projectedRevenue) * 100);
  const remainingDays = Math.ceil((new Date().getDate() / new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()) * 100);

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #fef8f3 0%, #fff9f5 100%)',
        border: '1px solid #f5e6d3',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
          <MonetizationOn sx={{ color: '#f5a860' }} />
          Income Forecast
        </Typography>

        <Stack spacing={2.5}>
          {/* Current Month Progress */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                This Month Progress
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#f5a860' }}>
                ${thisMonthRevenue.toLocaleString()} / ${projectedRevenue.toLocaleString()}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={completionPercentage}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: '#f5e6d3',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#f5a860',
                  borderRadius: 5,
                },
              }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
              {completionPercentage}% of projected revenue
            </Typography>
          </Box>

          {/* Upcoming Bookings */}
          <Box sx={{ p: 1.5, backgroundColor: '#fff9f5', borderRadius: 1, border: '1px solid #f5e6d3' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Confirmed Bookings (Next 30 Days)
              </Typography>
              <Chip label={`+$${upcomingValue.toLocaleString()}`} color="success" size="small" />
            </Box>
            <Typography variant="h6" sx={{ color: '#7fbaa5', fontWeight: 600 }}>
              ${upcomingValue.toLocaleString()}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Expected from confirmed appointments
            </Typography>
          </Box>

          {/* Projected Total */}
          <Box sx={{ p: 1.5, backgroundColor: '#f5a86010', borderRadius: 1, border: '2px solid #f5a860' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 0.5 }}>
              Projected Month Total
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#f5a860' }}>
                ${projectedRevenue.toLocaleString()}
              </Typography>
              <TrendingUp sx={{ color: '#7fbaa5', fontSize: 20 }} />
            </Box>
          </Box>

          {/* Days Remaining */}
          <Box sx={{ p: 1, backgroundColor: '#f5e6d3', borderRadius: 1, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {Math.max(0, 100 - remainingDays)}% of month remaining
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
