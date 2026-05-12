'use client';

import { Box, Container, Typography } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { content } from '@/lib/content';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { GradientBackground } from '@/components/GradientBackground';
import { Navigation } from '@/components/Navigation';
import { ParallaxGradientSection } from '@/components/ParallaxGradientSection';

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
            <GradientBackground variant="section" height="500px" />
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
                  {content.about.practiceSectionTitle}
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
                  {content.about.practiceSectionLead}
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
                  {content.about.practiceSectionClose}
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
              A Whole-Person Approach to Care
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
              Carolyn works with clients experiencing chronic pain, headaches, TMJ dysfunction, postural tension, and those recovering from injury, surgery, or trauma.
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
              Her approach is rooted in the understanding that the body responds to and carries our lived experiences, and that lasting change comes from addressing the underlying restrictions contributing to pain and dysfunction rather than simply managing symptoms temporarily.
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                lineHeight: 2,
                color: brandColors.inkSoft,
              }}
            >
              Sessions are individualized and guided by presence, patience, and careful listening to the body to support greater ease, mobility, and connection within the body.
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Parallax Section */}
      <ParallaxGradientSection
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
