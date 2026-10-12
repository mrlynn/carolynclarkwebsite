'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { content } from '@/lib/content';

interface PricingItem {
  duration: string;
  price: string;
}

export default function MassagePage() {
  const [massagePricing, setMassagePricing] = useState<PricingItem[]>(
    content.services.secondary.pricing
  );

  useEffect(() => {
    const fetchMassageServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) throw new Error('Failed to fetch services');

        const services = await response.json();
        const massageService = services.find((s: { name: string }) => s.name === 'Therapeutic Massage');

        if (massageService?.durations && Array.isArray(massageService.durations)) {
          const pricing = massageService.durations
            .sort((a: { durationMinutes: number }, b: { durationMinutes: number }) => a.durationMinutes - b.durationMinutes)
            .map((d: { durationMinutes: number; price: number }) => ({
              duration: `${d.durationMinutes} minutes`,
              price: `$${d.price}`,
            }));
          setMassagePricing(pricing);
        }
      } catch (error) {
        console.error('Failed to fetch massage pricing:', error);
      }
    };

    fetchMassageServices();
  }, []);

  return (
    <Box>
      <Navigation />

      <Box
        sx={{
          backgroundColor: `linear-gradient(135deg, ${brandColors.moss}10 0%, ${brandColors.terracotta}05 100%)`,
          padding: { xs: '3rem 2rem', md: '5rem 2rem' },
        }}
      >
        <Container maxWidth="lg">
          <ScrollReveal>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 400,
                color: brandColors.ink,
                marginBottom: 2,
              }}
            >
              Therapeutic{' '}
              <span style={{ color: brandColors.moss, fontStyle: 'italic' }}>
                Massage
              </span>
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      <Box sx={{ padding: { xs: '3rem 2rem', md: '5rem 2rem' } }}>
        <Container maxWidth="lg" sx={{ maxWidth: '800px' }}>
          <ScrollReveal>
            <Box sx={{ marginBottom: 5 }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 2,
                  color: brandColors.inkSoft,
                }}
              >
                {content.services.secondary.aboutBody}
              </Typography>
            </Box>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Box sx={{ marginBottom: 5 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: '2rem',
                  fontWeight: 400,
                  color: brandColors.ink,
                  marginBottom: 3,
                }}
              >
                Pricing
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: 2,
                }}
              >
                {massagePricing.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      padding: '2rem',
                      backgroundColor: brandColors.creamDeep,
                      borderRadius: '12px',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: brandColors.ink,
                        marginBottom: 1,
                      }}
                    >
                      {item.duration}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '2rem',
                        fontWeight: 600,
                        color: brandColors.terracotta,
                      }}
                    >
                      {item.price}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </ScrollReveal>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
