'use client';

import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import { HeroSection } from '@/components/HeroSection';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { BenefitCard } from '@/components/BenefitCard';
import { ParallaxPhotoSection } from '@/components/ParallaxPhotoSection';
import { brandColors } from '@/lib/theme';
import { content } from '@/lib/content';
import { getUnsplashImage } from '@/lib/unsplash-photos';

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
                  I help people who{' '}
                  <span style={{ color: brandColors.terracotta, fontStyle: 'italic' }}>
                    feel like they've tried everything
                  </span>
                </Typography>
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
                  {content.about.intro}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: brandColors.inkSoft,
                  }}
                >
                  {content.about.philosophy}
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
            <ScrollReveal delay={0.1}>
              <BenefitCard
                icon="📍"
                title="Root Cause Focus"
                description="Address underlying restrictions, not just symptoms"
                accent="terracotta"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <BenefitCard
                icon="🤝"
                title="Gentle Approach"
                description="Sustainable healing without aggressive force"
                accent="moss"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <BenefitCard
                icon="⏱️"
                title="Lasting Results"
                description="Real recovery that improves over time"
                accent="gold"
              />
            </ScrollReveal>
          </Box>
        </Container>
      </Box>

      {/* Services Overview */}
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
              gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
              gap: 3,
            }}
          >
            {/* Featured Service */}
            <Box>
              <ScrollReveal delay={0.1}>
                <Card
                  sx={{
                    backgroundColor: brandColors.cream,
                    borderLeft: `6px solid ${brandColors.terracotta}`,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(232, 148, 79, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ padding: '2rem' }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '1.75rem',
                        fontWeight: 600,
                        marginBottom: 1,
                        color: brandColors.ink,
                      }}
                    >
                      {content.services.featured.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: brandColors.terracotta,
                        fontWeight: 600,
                        marginBottom: 2,
                      }}
                    >
                      FEATURED OFFERING
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: brandColors.inkSoft,
                        lineHeight: 1.8,
                        marginBottom: 2,
                      }}
                    >
                      Gentle, sustained pressure techniques to release fascial restrictions and support deep healing.
                    </Typography>
                    <Box sx={{ marginTop: 2 }}>
                      {content.services.featured.pricing.map((item, idx) => (
                        <Typography key={idx} variant="body2" sx={{ marginBottom: 0.5 }}>
                          {item.duration}: <strong>{item.price}</strong>
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </Box>

            {/* Secondary Service */}
            <Box>
              <ScrollReveal delay={0.2}>
                <Card
                  sx={{
                    backgroundColor: brandColors.cream,
                    borderLeft: `6px solid ${brandColors.moss}`,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(125, 168, 159, 0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ padding: '2rem' }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '1.75rem',
                        fontWeight: 600,
                        marginBottom: 1,
                        color: brandColors.ink,
                      }}
                    >
                      {content.services.secondary.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: brandColors.inkSoft,
                        lineHeight: 1.8,
                        marginBottom: 2,
                      }}
                    >
                      Customized to your needs, incorporating various techniques for relaxation and relief.
                    </Typography>
                    <Box sx={{ marginTop: 2 }}>
                      {content.services.secondary.pricing.map((item, idx) => (
                        <Typography key={idx} variant="body2" sx={{ marginBottom: 0.5 }}>
                          {item.duration}: <strong>{item.price}</strong>
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Parallax Photo Section */}
      <ParallaxPhotoSection
        imageUrl={getUnsplashImage('therapeuticHands', 'hero')}
        title="Experience"
        description="Step into a space designed for healing, comfort, and transformation. Every detail supports your journey toward lasting wellness."
      />

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
                href={`tel:${content.booking.phone}`}
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
                Call {content.booking.phone}
              </Button>
              <Button
                variant="outlined"
                href={`mailto:${content.booking.email}`}
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
                Send Email
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
