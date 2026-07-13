'use client';

import { Box, Container, Typography } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { content } from '@/lib/content';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { FeaturedImage } from '@/components/FeaturedImage';
import { Navigation } from '@/components/Navigation';

export default function AboutPage() {
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
              About{' '}
              <span style={{ color: brandColors.moss, fontStyle: 'italic' }}>
                Me
              </span>
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.2rem',
                color: brandColors.inkSoft,
                maxWidth: '700px',
                lineHeight: 1.8,
              }}
            >
              {content.about.intro}
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      <Box sx={{ padding: { xs: '2rem', md: '4rem 2rem' } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
              alignItems: 'center',
            }}
          >
            <ScrollReveal>
              <Box
                sx={{
                  maxWidth: { xs: 360, md: 440 },
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                <FeaturedImage
                  src="/carolyn.jpeg"
                  alt="Carolyn Clark, licensed massage therapist specializing in John F. Barnes Myofascial Release"
                  aspectRatio={3 / 4}
                  objectPosition="center 18%"
                />
              </Box>
            </ScrollReveal>
            <Box>
              <ScrollReveal>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 2,
                    color: brandColors.inkSoft,
                    marginBottom: 2,
                  }}
                >
                  {content.about.aboutParagraph1}
                </Typography>
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
                  {content.about.aboutParagraph2}
                </Typography>
              </ScrollReveal>
            </Box>
          </Box>
        </Container>
      </Box>

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
              }}
            >
              Credentials
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                marginBottom: 3,
                alignItems: 'flex-start',
                borderLeft: `4px solid ${brandColors.terracotta}`,
                paddingLeft: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: brandColors.ink,
                    marginBottom: 0.5,
                  }}
                >
                  Licensed Massage Therapist
                </Typography>
                <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
                  Certified and licensed to practice therapeutic massage in Pennsylvania
                </Typography>
              </Box>
            </Box>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                marginBottom: 3,
                alignItems: 'flex-start',
                borderLeft: `4px solid ${brandColors.terracotta}`,
                paddingLeft: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: brandColors.ink,
                    marginBottom: 0.5,
                  }}
                >
                  John F. Barnes Myofascial Release Trained
                </Typography>
                <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
                  Specialized training in the John F. Barnes approach to myofascial release
                </Typography>
              </Box>
            </Box>
          </ScrollReveal>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
