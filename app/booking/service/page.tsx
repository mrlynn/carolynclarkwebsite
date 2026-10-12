'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { brandColors } from '@/lib/theme';

interface DurationOption {
  durationMinutes: number;
  price: number;
}

interface Service {
  _id: string;
  name: string;
  description: string;
  durations: DurationOption[];
  status: 'active' | 'inactive';
}

interface SelectionState {
  serviceId: string;
  durationMinutes: number;
}

const getBenefitForDuration = (serviceName: string, duration: number): string => {
  if (duration === 60) {
    return serviceName === 'Myofascial Release'
      ? 'Quick reset for targeted areas'
      : 'Perfect for maintenance and relaxation';
  }
  return serviceName === 'Myofascial Release'
    ? 'Deep work + home care guidance for lasting results'
    : 'Complete relaxation with integrated techniques';
};

const getPerMinutePrice = (price: number, duration: number): number => {
  return Math.round((price / duration) * 100) / 100;
};

export default function ServiceSelectionPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<SelectionState | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services?status=active');
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data);

      // Pre-select the recommended option: 90-min MFR
      const mfrService = data.find((s: Service) => s.name === 'Myofascial Release');
      if (mfrService) {
        setSelected({
          serviceId: mfrService._id,
          durationMinutes: 90,
        });
      }
    } catch (err) {
      setError('Failed to load services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDuration = (serviceId: string, durationMinutes: number) => {
    setSelected({ serviceId, durationMinutes });
  };

  const handleContinue = () => {
    if (!selected) return;
    sessionStorage.setItem('selectedServiceId', selected.serviceId);
    sessionStorage.setItem('selectedDurationMinutes', selected.durationMinutes.toString());
    router.push('/booking/calendar');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          marginBottom: 4,
          color: brandColors.ink,
          fontWeight: 400,
          fontSize: { xs: '1.75rem', md: '2rem' },
        }}
      >
        What service would you like to book?
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {services.map((service) => (
          <Box key={service._id}>
            {/* Service Title */}
            <Typography
              variant="h6"
              sx={{
                marginBottom: 3,
                color: brandColors.ink,
                fontWeight: 600,
                fontSize: '1.25rem',
              }}
            >
              {service.name}
            </Typography>

            {/* Service Description */}
            <Typography
              variant="body2"
              sx={{
                marginBottom: 3,
                color: brandColors.inkSoft,
                lineHeight: 1.7,
                maxWidth: '600px',
              }}
            >
              {service.description}
            </Typography>

            {/* Duration Options Grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
              {service.durations
                .sort((a, b) => a.durationMinutes - b.durationMinutes)
                .map((duration) => {
                  const isSelected =
                    selected?.serviceId === service._id &&
                    selected?.durationMinutes === duration.durationMinutes;
                  const isRecommended = duration.durationMinutes === 90;
                  const perMinutePrice = getPerMinutePrice(duration.price, duration.durationMinutes);
                  const benefit = getBenefitForDuration(service.name, duration.durationMinutes);

                  return (
                    <Card
                      key={duration.durationMinutes}
                      onClick={() => handleSelectDuration(service._id, duration.durationMinutes)}
                      sx={{
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'visible',
                        border: isSelected
                          ? `3px solid ${brandColors.terracotta}`
                          : `1px solid ${brandColors.creamDeep}`,
                        backgroundColor: isSelected ? `${brandColors.terracotta}08` : brandColors.cream,
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          borderColor: brandColors.terracotta,
                          boxShadow: `0 8px 24px ${brandColors.terracotta}15`,
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      {/* Recommended Badge */}
                      {isRecommended && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -12,
                            right: 16,
                          }}
                        >
                          <Chip
                            label="Recommended"
                            size="small"
                            sx={{
                              backgroundColor: brandColors.terracotta,
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              height: 24,
                            }}
                          />
                        </Box>
                      )}

                      <CardContent sx={{ padding: 3 }}>
                        {/* Duration & Price Header */}
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: 2,
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: brandColors.ink,
                              }}
                            >
                              {duration.durationMinutes} minutes
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: '0.85rem',
                                color: brandColors.inkMute,
                                marginTop: 0.5,
                              }}
                            >
                              ${perMinutePrice}/min
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography
                              sx={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                color: brandColors.terracotta,
                              }}
                            >
                              ${duration.price}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Benefit Statement */}
                        <Box
                          sx={{
                            padding: '12px 0',
                            borderTop: `1px solid ${brandColors.creamDeep}`,
                            borderBottom: `1px solid ${brandColors.creamDeep}`,
                            marginBottom: 2,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '0.95rem',
                              color: brandColors.inkSoft,
                              fontStyle: 'italic',
                              lineHeight: 1.5,
                            }}
                          >
                            {benefit}
                          </Typography>
                        </Box>

                        {/* Selection Indicator */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 32,
                            borderRadius: 1,
                            backgroundColor: isSelected ? `${brandColors.terracotta}20` : 'transparent',
                            border: isSelected ? `2px solid ${brandColors.terracotta}` : '2px solid transparent',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          {isSelected && (
                            <Typography
                              sx={{
                                color: brandColors.terracotta,
                                fontWeight: 600,
                                fontSize: '0.9rem',
                              }}
                            >
                              ✓ Selected
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}
            </Box>

            {/* Divider between services */}
            {service !== services[services.length - 1] && (
              <Box
                sx={{
                  marginTop: 5,
                  paddingTop: 5,
                  borderTop: `1px solid ${brandColors.creamDeep}`,
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* Action Buttons */}
      <Box sx={{ marginTop: 6, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/')}
          sx={{
            borderColor: brandColors.moss,
            color: brandColors.moss,
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!selected}
          onClick={handleContinue}
          sx={{
            backgroundColor: brandColors.terracotta,
            color: brandColors.cream,
            textTransform: 'none',
            fontWeight: 600,
            paddingX: 4,
            '&:disabled': {
              backgroundColor: brandColors.inkMute,
              color: brandColors.cream,
            },
          }}
        >
          Continue →
        </Button>
      </Box>
    </Box>
  );
}
