'use client';

import { Box, Typography, Grid, Button, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { brandColors } from '@/lib/theme';
import { DashboardData } from '@/lib/analytics';
import MetricsOverview from './components/MetricsOverview';
import RevenueChart from './components/RevenueChart';
import BookingHeatmap from './components/BookingHeatmap';
import ClientMetrics from './components/ClientMetrics';
import ServiceAnalytics from './components/ServiceAnalytics';
import TestimonialSummary from './components/TestimonialSummary';
import QuickActions from './components/QuickActions';
import WeeklySummary from './components/WeeklySummary';
import BusinessHealthScore from './components/BusinessHealthScore';
import IncomeProjection from './components/IncomeProjection';

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/analytics');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const dashboardData = await response.json();
        setData(dashboardData);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Unable to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, color: brandColors.ink, fontWeight: 600 }}>
          Dashboard
        </Typography>
        <Alert severity="error">{error || 'Failed to load dashboard data'}</Alert>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ mt: 2, backgroundColor: brandColors.terracotta, color: brandColors.cream, textTransform: 'none' }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            color: brandColors.ink,
            fontWeight: 600,
          }}
        >
          Business Dashboard
        </Typography>
        <Button
          variant="outlined"
          onClick={() => window.location.reload()}
          sx={{ color: brandColors.terracotta, borderColor: brandColors.terracotta, textTransform: 'none' }}
        >
          Refresh
        </Button>
      </Box>

      {/* Key Metrics */}
      <MetricsOverview metrics={data.metrics} />

      {/* Main Charts */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <RevenueChart data={data.revenue} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <TestimonialSummary data={data.testimonials} />
        </Grid>
      </Grid>

      {/* Analytics Grids */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <BookingHeatmap data={data.bookingHeatmap} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ServiceAnalytics data={data.services} />
        </Grid>
      </Grid>

      {/* Client & Income */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ClientMetrics data={data.clients} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <IncomeProjection
            upcomingValue={data.upcomingValue}
            projectedRevenue={data.projectedRevenue}
            thisMonthRevenue={data.metrics.thisMonthRevenue}
          />
        </Grid>
      </Grid>

      {/* Weekly Summary & Health Score */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <WeeklySummary data={data.weeklySummary} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <BusinessHealthScore metrics={data.metrics} />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12 }}>
          <QuickActions upcoming={data.upcoming} />
        </Grid>
      </Grid>

      {/* Navigation Buttons */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => router.push('/admin/appointments')}
            sx={{
              backgroundColor: brandColors.moss,
              color: brandColors.cream,
              textTransform: 'none',
              py: 1.5,
            }}
          >
            Manage Appointments
          </Button>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => router.push('/admin/availability')}
            sx={{
              backgroundColor: brandColors.terracotta,
              color: brandColors.cream,
              textTransform: 'none',
              py: 1.5,
            }}
          >
            Manage Availability
          </Button>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => router.push('/admin/testimonials')}
            sx={{
              backgroundColor: brandColors.gold,
              color: brandColors.ink,
              textTransform: 'none',
              py: 1.5,
            }}
          >
            Manage Testimonials
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
