'use client';

import { Grid, Card, CardContent, Box, Typography, Stack, Chip } from '@mui/material';
import {
  TrendingUp,
  EventNote,
  CheckCircle,
  Star,
  People,
  ShoppingCart,
  WarningAmber,
} from '@mui/icons-material';
import { MetricsData } from '@/lib/analytics';

interface MetricsOverviewProps {
  metrics: MetricsData;
}

const MetricCard = ({
  label,
  value,
  icon: Icon,
  unit = '',
  trend = null,
  color = 'primary',
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  unit?: string;
  trend?: number | null;
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
}) => (
  <Card
    sx={{
      height: '100%',
      background: 'linear-gradient(135deg, #fef8f3 0%, #fff9f5 100%)',
      border: '1px solid #f5e6d3',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 8px 24px rgba(245, 168, 96, 0.15)',
        transform: 'translateY(-2px)',
      },
    }}
  >
    <CardContent>
      <Stack spacing={1.5}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Icon sx={{ color: `${color}.main`, fontSize: 28, opacity: 0.8 }} />
          {trend !== null && (
            <Chip
              label={`${trend > 0 ? '+' : ''}${trend}%`}
              size="small"
              color={trend >= 0 ? 'success' : 'error'}
              variant="outlined"
              sx={{ height: 20 }}
            />
          )}
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
            {label}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mt: 0.5,
            }}
          >
            {value}
            {unit && <span style={{ fontSize: '0.8em', marginLeft: '4px' }}>{unit}</span>}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export default function MetricsOverview({ metrics }: MetricsOverviewProps) {
  const metricCards = [
    {
      label: 'This Month Revenue',
      value: `$${metrics.thisMonthRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'success' as const,
    },
    {
      label: 'Appointments Booked',
      value: metrics.appointmentsBooked,
      icon: EventNote,
      color: 'info' as const,
    },
    {
      label: 'Completion Rate',
      value: `${metrics.completionRate}%`,
      icon: CheckCircle,
      color: 'success' as const,
    },
    {
      label: 'Avg Rating',
      value: metrics.avgRating,
      icon: Star,
      color: 'warning' as const,
      unit: '/ 5',
    },
    {
      label: 'New Clients',
      value: metrics.newClients,
      icon: People,
      color: 'info' as const,
    },
    {
      label: 'Return Client Rate',
      value: `${metrics.returnClientRate}%`,
      icon: ShoppingCart,
      color: 'success' as const,
    },
    {
      label: 'Services Sold',
      value: metrics.totalServicesSold,
      icon: ShoppingCart,
      color: 'info' as const,
    },
    {
      label: 'Cancellation Rate',
      value: `${metrics.cancellationRate}%`,
      icon: WarningAmber,
      color: 'error' as const,
    },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
        Key Metrics
      </Typography>
      <Grid container spacing={2}>
        {metricCards.map((card, idx) => (
          <Grid key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
            <MetricCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
