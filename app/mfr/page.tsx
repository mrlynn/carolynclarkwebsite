'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { FasciaIllustration } from '@/components/FasciaIllustration';
import { Navigation } from '@/components/Navigation';
import { content } from '@/lib/content';

interface PricingItem {
  duration: string;
  price: string;
}

export default function MFRPage() {
  const [mfrPricing, setMFRPricing] = useState<PricingItem[]>(
    content.services.featured.pricing
  );

  useEffect(() => {
    const fetchMFRServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) throw new Error('Failed to fetch services');

        const services = await response.json();
        const mfrService = services.find(
          (s: { name: string; slug?: string }) =>
            s.name === 'Myofascial Release' ||
            s.name === 'John F. Barnes Myofascial Release' ||
            s.slug === 'myofascial-release'
        );

        if (mfrService?.durations && Array.isArray(mfrService.durations)) {
          const pricing = mfrService.durations
            .sort(
              (a: { durationMinutes: number }, b: { durationMinutes: number }) =>
                a.durationMinutes - b.durationMinutes
            )
            .map((d: { durationMinutes: number; price: number }) => ({
              duration: `${d.durationMinutes} minutes`,
              price: `$${d.price}`,
            }));
          setMFRPricing(pricing);
        }
      } catch (error) {
        console.error('Failed to fetch MFR pricing:', error);
      }
    };

    fetchMFRServices();
  }, []);

  return (
    <Box>
      <Navigation />

      <Box
        sx={{
          backgroundColor: `linear-gradient(135deg, ${brandColors.terracotta}15 0%, ${brandColors.moss}08 100%)`,
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
              John F. Barnes{' '}
              <span style={{ color: brandColors.terracotta, fontStyle: 'italic' }}>
                Myofascial Release
              </span>
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Understanding Fascia */}
      <Box sx={{ padding: { xs: '3rem 2rem', md: '5rem 2rem' } }}>
        <Container maxWidth="lg">
          <ScrollReveal>
            <Typography
              variant="h2"
              sx={{
                fontSize: '2rem',
                fontWeight: 400,
                color: brandColors.ink,
                marginBottom: 3,
                textAlign: 'center',
              }}
            >
              Understanding{' '}
              <span style={{ color: brandColors.terracotta, fontStyle: 'italic' }}>
                Fascia
              </span>
            </Typography>
          </ScrollReveal>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
              alignItems: 'center',
            }}
          >
            <ScrollReveal>
              <FasciaIllustration />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 2,
                  color: brandColors.inkSoft,
                }}
              >
                {content.services.featured.understandingFascia}
              </Typography>
            </ScrollReveal>
          </Box>
        </Container>
      </Box>

      {/* How MFR Works */}
      <Box
        sx={{
          backgroundColor: `${brandColors.moss}08`,
          padding: { xs: '3rem 2rem', md: '5rem 2rem' },
        }}
      >
        <Container maxWidth="lg">
          <ScrollReveal>
            <Typography
              variant="h2"
              sx={{
                fontSize: '2rem',
                fontWeight: 400,
                color: brandColors.ink,
                marginBottom: 4,
                textAlign: 'center',
              }}
            >
              How John F. Barnes{' '}
              <span style={{ color: brandColors.moss, fontStyle: 'italic' }}>
                Myofascial Release
              </span>{' '}
              Works
            </Typography>
          </ScrollReveal>

          {content.services.featured.howItWorks.map((paragraph, idx) => (
            <Box key={idx} sx={{ marginBottom: idx < content.services.featured.howItWorks.length - 1 ? 4 : 0 }}>
              <ScrollReveal delay={idx * 0.1}>
                <Box
                  sx={{
                    padding: '3rem 2rem',
                    backgroundColor: brandColors.cream,
                    borderRadius: '16px',
                    border: `2px solid ${brandColors.moss}30`,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 2,
                      color: brandColors.inkSoft,
                    }}
                  >
                    {paragraph}
                  </Typography>
                </Box>
              </ScrollReveal>
            </Box>
          ))}
        </Container>
      </Box>

      {/* Pricing */}
      <Box sx={{ padding: { xs: '3rem 2rem', md: '5rem 2rem' } }}>
        <Container maxWidth="lg" sx={{ maxWidth: '800px' }}>
          <ScrollReveal>
            <Typography
              variant="h2"
              sx={{
                fontSize: '2rem',
                fontWeight: 400,
                color: brandColors.ink,
                marginBottom: 3,
                textAlign: 'center',
              }}
            >
              Pricing
            </Typography>
          </ScrollReveal>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 2,
            }}
          >
            {mfrPricing.map((item, idx) => (
              <ScrollReveal key={idx} delay={0.1 + idx * 0.1}>
                <Box
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
              </ScrollReveal>
            ))}
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
