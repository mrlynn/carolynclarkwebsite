'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { HeroSection } from '@/components/HeroSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { BenefitCard } from '@/components/BenefitCard';
import { LandingPageServices } from '@/components/LandingPageServices';
import { ParallaxPhotoSection } from '@/components/ParallaxPhotoSection';
import { SituationCards } from '@/components/SituationCards';
import { brandColors } from '@/lib/theme';
import { content } from '@/lib/content';
import { FeaturedImage } from '@/components/FeaturedImage';

export default function Home() {
  return (
    <Box>
      <Navigation />

      {/* Hero Section with Parallax */}
      <HeroSection />

      {/* About Section */}
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
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 400,
                    marginBottom: 2,
                    color: brandColors.ink,
                  }}
                >
                  {content.about.homeTitle}{' '}
                  <span style={{ color: brandColors.terracotta, fontStyle: 'italic' }}>
                    {content.about.homeTitleEmphasis}
                  </span>
                </Typography>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <Box
                  sx={{
                    maxWidth: { xs: 320, sm: 360 },
                    mx: { xs: 'auto', md: 0 },
                    marginTop: 1,
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
                    marginBottom: 2,
                  }}
                >
                  {content.about.homePhilosophy}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: brandColors.inkSoft,
                  }}
                >
                  {content.about.homeSessions}
                </Typography>
              </ScrollReveal>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Quick Benefits Highlight */}
      <Box
        sx={{
          backgroundColor: `linear-gradient(135deg, ${brandColors.terracotta}08 0%, ${brandColors.moss}08 100%)`,
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
              Why Choose Myofascial Release
            </Typography>
          </ScrollReveal>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {content.home.whyMfrCards.map((card, idx) => (
              <ScrollReveal key={card.title} delay={0.1 + idx * 0.1}>
                <BenefitCard title={card.title} description={card.description} accent={card.accent} />
              </ScrollReveal>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Services Overview - Database Driven */}
      <LandingPageServices />

      {/* Parallax Photo Section */}
      <ParallaxPhotoSection
        title={content.home.experienceParallax.title}
        titleEmphasis={content.home.experienceParallax.titleEmphasis}
        description={content.home.experienceParallax.description}
      />

      {/* Is This Right For Me - Situation Cards */}
      <SituationCards situations={content.situations} />

      {/* Testimonials Section */}
      <Box
        sx={{
          backgroundColor: brandColors.cream,
          padding: { xs: '4rem 2rem', md: '6rem 2rem' },
          borderTop: `1px solid ${brandColors.terracotta}40`,
        }}
      >
        <Container maxWidth="lg">
          <ScrollReveal>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 400,
                marginBottom: 2,
                textAlign: 'center',
                color: brandColors.ink,
              }}
            >
              What Our Clients Say
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: brandColors.inkSoft,
                marginBottom: 4,
                textAlign: 'center',
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              {content.home.testimonialsIntro}
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                href="/testimonials"
                sx={{
                  backgroundColor: brandColors.terracotta,
                  color: brandColors.cream,
                  padding: '14px 32px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '999px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: brandColors.terracottaDeep,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Read Client Stories
              </Button>
            </Box>
          </ScrollReveal>
        </Container>
      </Box>

      {/* CTA Section */}
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
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                href="/booking/service"
                sx={{
                  backgroundColor: brandColors.terracotta,
                  color: brandColors.cream,
                  padding: '16px 32px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '999px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: brandColors.terracottaDeep,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Book Now
              </Button>
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
            </Box>
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

      {/* Footer */}
      <Footer />
    </Box>
  );
}
