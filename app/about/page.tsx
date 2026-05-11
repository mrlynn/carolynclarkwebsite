'use client';

import { Box, Container, Typography } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { FeaturedImage } from '@/components/FeaturedImage';
import { Navigation } from '@/components/Navigation';
import { ParallaxPhotoSection } from '@/components/ParallaxPhotoSection';
import { getUnsplashImage } from '@/lib/unsplash-photos';

export default function AboutPage() {
  return (
    <Box>
      <Navigation />

      {/* Hero */}
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
                Carolyn
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
              Licensed Massage Therapist specializing in John F. Barnes Myofascial Release. Based in Kimberton / Phoenixville, PA.
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Photo Section */}
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
            <FeaturedImage
              src={getUnsplashImage('professionalPortrait', 'portrait')}
              alt="Peaceful moment of rest in a treatment setting"
              aspectRatio={3 / 4}
            />
            <Box>
              <ScrollReveal>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 400,
                    color: brandColors.ink,
                    marginBottom: 2,
                  }}
                >
                  Holding Space for Healing
                </Typography>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 2,
                    color: brandColors.inkSoft,
                    marginBottom: 2,
                  }}
                >
                  My approach is rooted in two core principles: holding space for clients to feel safe and comfortable, and addressing the root causes of pain rather than just offering temporary relief.
                </Typography>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 2,
                    color: brandColors.inkSoft,
                  }}
                >
                  Every body has its own wisdom about healing. I listen carefully, work patiently, and create an environment where true recovery can happen. My clients are people ready to take an active role in their healing journey.
                </Typography>
              </ScrollReveal>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Philosophy */}
      <Box
        sx={{
          backgroundColor: brandColors.creamDeep,
          padding: { xs: '3rem 2rem', md: '5rem 2rem' },
        }}
      >
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
              My Philosophy
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                lineHeight: 2,
                color: brandColors.inkSoft,
                marginBottom: 2,
              }}
            >
              I believe that healing isn't just physical—it's a conversation between therapist and client, between hands and body, between present moment and past experiences. When you come in, you're not just receiving treatment; you're beginning a partnership in your own recovery.
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                lineHeight: 2,
                color: brandColors.inkSoft,
                marginBottom: 2,
              }}
            >
              Pain often isn't random. It's your body's intelligent way of communicating that something needs attention. My work focuses on listening to that communication and addressing what's truly going on beneath the surface.
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Box
              sx={{
                padding: '2rem',
                backgroundColor: brandColors.cream,
                borderLeft: `6px solid ${brandColors.moss}`,
                borderRadius: '8px',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 2,
                  color: brandColors.inkSoft,
                  fontStyle: 'italic',
                }}
              >
                "I help people who feel like they've tried everything—people who are ready to take on a more active role in their healing journey."
              </Typography>
            </Box>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Parallax Section */}
      <ParallaxPhotoSection
        imageUrl={getUnsplashImage('healingSpace', 'hero')}
        title="Creating a Space for"
        description="Safe, comfortable, and supportive environment where healing becomes possible."
      />

      {/* Credentials & Experience */}
      <Box
        sx={{
          padding: { xs: '3rem 2rem', md: '5rem 2rem' },
        }}
      >
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
              }}
            >
              <Box
                sx={{
                  fontSize: '2rem',
                  color: brandColors.terracotta,
                  marginTop: '0.5rem',
                }}
              >
                ✓
              </Box>
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
                <Typography
                  variant="body2"
                  sx={{
                    color: brandColors.inkSoft,
                  }}
                >
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
              }}
            >
              <Box
                sx={{
                  fontSize: '2rem',
                  color: brandColors.terracotta,
                  marginTop: '0.5rem',
                }}
              >
                ✓
              </Box>
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
                <Typography
                  variant="body2"
                  sx={{
                    color: brandColors.inkSoft,
                  }}
                >
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
