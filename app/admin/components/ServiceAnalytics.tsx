'use client';

import { Box, Card, CardContent, Typography, Stack, LinearProgress, Chip } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { ServiceData } from '@/lib/analytics';

interface ServiceAnalyticsProps {
  data: ServiceData[];
}

export default function ServiceAnalytics({ data }: ServiceAnalyticsProps) {
  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #fef8f3 0%, #fff9f5 100%)',
        border: '1px solid #f5e6d3',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
          Service Performance
        </Typography>

        <Stack spacing={2.5}>
          {data.map((service: ServiceData, idx) => (
            <Box key={idx}>
              <Stack sx={{ mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {service.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {service.unitsThisMonth} units · ${service.revenueThisMonth.toLocaleString()} revenue
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip
                    label={`${service.percentOfTotal}%`}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                  {service.trend > 0 ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#7fbaa5' }}>
                      <TrendingUp fontSize="small" />
                      <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 600 }}>
                        +{service.trend}%
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#d4754d' }}>
                      <TrendingDown fontSize="small" />
                      <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 600 }}>
                        {service.trend}%
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={service.percentOfTotal}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#f5e6d3',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    backgroundColor: '#f5a860',
                  },
                }}
              />

              <Stack direction="row" spacing={2} sx={{ mt: 1, justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Avg: ${service.avgPricePerBooking.toFixed(2)}/booking
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {Math.round((service.revenueThisMonth / (service.revenueThisMonth + 100)) * 100)}% of total
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
