'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { HeroSection } from '@/components/HeroSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { LandingPageServices } from '@/components/LandingPageServices';
import { brandColors } from '@/lib/theme';
import { content } from '@/lib/content';
import { FeaturedImage } from '@/components/FeaturedImage';

export default function Home() {
  return (
    <Box>
      <Navigation />

      <HeroSection />

      {/* About / philosophy band */}
      <Box
        sx={{
          backgroundColor: brandColors.cream,
          padding: { xs: '4rem 2rem', md: '6rem 2rem' },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Box>
              <ScrollReveal>
                <Box
                  sx={{
                    maxWidth: { xs: 320, sm: 360 },
                    mx: { xs: 'auto', md: 0 },
                  }}
                >
                  <FeaturedImage
                    src="/carolyn.jpeg"
                    alt="Carolyn Clark, licensed massage therapist"
                    aspectRatio={3 / 4}
                    objectPosition="center 18%"
                  />
                </Box>
              </ScrollReveal>
            </Box>
            <Box>
              <ScrollReveal delay={0.2}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: brandColors.inkSoft,
                    marginBottom: 2,
                  }}
                >
                  {content.about.homeIntro}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: brandColors.inkSoft,
                  }}
                >
                  {content.about.homePhilosophy}
                </Typography>
              </ScrollReveal>
            </Box>
          </Box>
        </Container>
      </Box>

      <LandingPageServices />

      {/* Soft contact CTA — no Book Now button */}
      <Box
        sx={{
          backgroundColor: brandColors.ink,
          color: brandColors.cream,
          padding: { xs: '4rem 2rem', md: '6rem 2rem' },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <ScrollReveal>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 400,
                marginBottom: 2,
                color: brandColors.gold,
              }}
            >
              {content.booking.heading}
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                marginBottom: 3,
                color: brandColors.cream,
              }}
            >
              {content.booking.subheading}
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Button
              variant="outlined"
              href="/contact"
              sx={{
                borderColor: brandColors.gold,
                color: brandColors.gold,
                padding: '16px 32px',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '999px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: brandColors.gold,
                  color: brandColors.ink,
                  borderColor: brandColors.gold,
                },
              }}
            >
              Contact Me
            </Button>
          </ScrollReveal>

          <Typography
            variant="body2"
            sx={{
              marginTop: 3,
              color: brandColors.inkMute,
              fontSize: '0.9rem',
            }}
          >
            {content.booking.note}
          </Typography>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
