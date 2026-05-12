'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Button, CircularProgress } from '@mui/material';
import { ScrollReveal } from '@/components/ScrollReveal';
import { brandColors } from '@/lib/theme';

interface DurationOption {
  durationMinutes: number;
  price: number;
}

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  slug: string;
  status: string;
  featured: boolean;
  durations: DurationOption[];
  createdAt: string;
  updatedAt: string;
}

export function LandingPageServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services?status=active&featured=true');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Unable to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: brandColors.creamDeep,
          padding: { xs: '4rem 2rem', md: '6rem 2rem' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || services.length === 0) {
    return null;
  }

  const colors = [brandColors.terracotta, brandColors.moss, brandColors.gold];

  return (
    <Box
      sx={{
        backgroundColor: brandColors.creamDeep,
        padding: { xs: '4rem 2rem', md: '6rem 2rem' },
      }}
    >
      <Container maxWidth="lg">
        <ScrollReveal>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 400,
              marginBottom: 4,
              textAlign: 'center',
              color: brandColors.ink,
            }}
          >
            Services
          </Typography>
        </ScrollReveal>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: services.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            },
            gap: 3,
          }}
        >
          {services.map((service, idx) => {
            const accentColor = colors[idx % colors.length];
            const minPrice = Math.min(...service.durations.map((d) => d.price));
            const maxPrice = Math.max(...service.durations.map((d) => d.price));
            const priceDisplay =
              minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;

            return (
              <ScrollReveal key={service._id} delay={0.1 + idx * 0.1}>
                <Card
                  sx={{
                    backgroundColor: brandColors.cream,
                    borderLeft: `6px solid ${accentColor}`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${accentColor}26`,
                    },
                  }}
                >
                  <CardContent sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '1.75rem',
                        fontWeight: 600,
                        marginBottom: 1,
                        color: brandColors.ink,
                      }}
                    >
                      {service.name}
                    </Typography>

                    {idx === 0 && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: accentColor,
                          fontWeight: 600,
                          marginBottom: 2,
                        }}
                      >
                        FEATURED OFFERING
                      </Typography>
                    )}

                    <Typography
                      variant="body1"
                      sx={{
                        color: brandColors.inkSoft,
                        lineHeight: 1.8,
                        marginBottom: 2,
                        flex: 1,
                      }}
                    >
                      {service.description}
                    </Typography>

                    <Box sx={{ marginBottom: 2 }}>
                      {service.durations.map((duration, dIdx) => (
                        <Typography key={dIdx} variant="body2" sx={{ marginBottom: 0.5, color: brandColors.inkSoft }}>
                          {duration.durationMinutes} min:{' '}
                          <strong style={{ color: brandColors.ink }}>${duration.price}</strong>
                        </Typography>
                      ))}
                    </Box>

                    <Button
                      variant="contained"
                      href="/booking/service"
                      sx={{
                        backgroundColor: accentColor,
                        color: brandColors.cream,
                        padding: '10px 24px',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: '999px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: accentColor,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 8px 16px ${accentColor}40`,
                        },
                        alignSelf: 'flex-start',
                        marginTop: 'auto',
                      }}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
