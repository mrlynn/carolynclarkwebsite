'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { FeaturedImage } from '@/components/FeaturedImage';
import { BenefitCard } from '@/components/BenefitCard';
import { FasciaIllustration } from '@/components/FasciaIllustration';
import { Navigation } from '@/components/Navigation';
import { ParallaxPhotoSection } from '@/components/ParallaxPhotoSection';
import { getUnsplashImage } from '@/lib/unsplash-photos';

export default function MFRPage() {
  return (
    <Box>
      <Navigation />

      {/* Hero Section */}
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
              Addressing root causes instead of managing symptoms. Gentle, sustained pressure techniques to release fascial restrictions and support lasting healing.
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Featured Image */}
      <Box sx={{ padding: { xs: '2rem', md: '4rem 2rem' } }}>
        <Container maxWidth="lg">
          <FeaturedImage
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=600&fit=crop"
            alt="Myofascial Release Therapy"
            aspectRatio={16 / 9}
          />
        </Container>
      </Box>

      {/* What is Fascia - with Illustration */}
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
              marginBottom: 4,
            }}
          >
            <ScrollReveal>
              <FasciaIllustration />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 2,
                    color: brandColors.inkSoft,
                    marginBottom: 2,
                  }}
                >
                  Fascia is a continuous web of connective tissue that surrounds and supports every structure in the body. It connects muscles, bones, organs, and nerves, creating an integrated system of communication and support.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 2,
                    color: brandColors.inkSoft,
                  }}
                >
                  This tissue responds to injury, stress, and trauma by tightening and restricting as a form of protection. Over time, these restrictions create pressure on pain-sensitive structures, contributing to chronic pain and limited mobility.
                </Typography>
              </Box>
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

          <Box sx={{ marginBottom: 4 }}>
            <ScrollReveal>
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
                  The John F. Barnes Myofascial Release Approach uses <strong>gentle, sustained pressure</strong> to engage the fascial system and allow areas of restriction to gradually soften and release without force. Rather than working aggressively against the body, this approach emphasizes careful listening, patience, and working with the body's natural healing processes.
                </Typography>
              </Box>
            </ScrollReveal>
          </Box>

          <Box sx={{ marginBottom: 4 }}>
            <ScrollReveal delay={0.1}>
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
                  This technique respects the body's wisdom. By applying consistent, mindful pressure over time, we allow the fascia to respond and release. The body's intelligence guides the process—we don't force a result, but rather create the conditions for healing to occur.
                </Typography>
              </Box>
            </ScrollReveal>
          </Box>
        </Container>
      </Box>

      {/* Benefits Grid */}
      <Box sx={{ padding: { xs: '3rem 2rem', md: '5rem 2rem' } }}>
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
              Benefits of Myofascial Release
            </Typography>
          </ScrollReveal>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 3,
              marginBottom: 4,
            }}
          >
            <ScrollReveal delay={0.1}>
              <BenefitCard
                icon="😌"
                title="Pain Reduction"
                description="Release fascial restrictions that contribute to chronic pain and discomfort."
                accent="terracotta"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <BenefitCard
                icon="🧘"
                title="Better Mobility"
                description="Improved movement range, flexibility, and reduced tension patterns."
                accent="moss"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <BenefitCard
                icon="🧠"
                title="Nervous System Healing"
                description="Regulation and stress relief as trauma and tension release."
                accent="gold"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <BenefitCard
                icon="⚡"
                title="Faster Recovery"
                description="Support for healing from injury, surgery, or intensive activity."
                accent="terracotta"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <BenefitCard
                icon="🏃"
                title="Athletic Performance"
                description="Enhanced flexibility and reduced restrictions for optimal movement."
                accent="moss"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <BenefitCard
                icon="💫"
                title="Emotional Release"
                description="Support for trauma recovery and emotional processing."
                accent="gold"
              />
            </ScrollReveal>
          </Box>
        </Container>
      </Box>

      {/* Parallax Section */}
      <ParallaxPhotoSection
        imageUrl={getUnsplashImage('massageTherapy', 'hero')}
        title="Myofascial Release"
        description="Gentle, sustained pressure techniques that allow your body to heal naturally."
      />

      {/* Root Cause Focus */}
      <Box
        sx={{
          backgroundColor: `linear-gradient(135deg, ${brandColors.terracotta}10 0%, ${brandColors.gold}08 100%)`,
          padding: { xs: '3rem 2rem', md: '4rem 2rem' },
        }}
      >
        <Container maxWidth="lg" sx={{ maxWidth: '800px' }}>
          <ScrollReveal>
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: '2rem',
                  fontWeight: 400,
                  color: brandColors.ink,
                  marginBottom: 2,
                }}
              >
                Addressing Root{' '}
                <span style={{ color: brandColors.terracotta, fontStyle: 'italic' }}>
                  Causes
                </span>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 2,
                  color: brandColors.inkSoft,
                }}
              >
                Instead of just managing symptoms, myofascial release targets the underlying fascial restrictions contributing to pain and dysfunction. By releasing these restrictions, we support the body's ability to heal at a deeper level—creating lasting change, not temporary relief.
              </Typography>
            </Box>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Sessions Include */}
      <Box sx={{ padding: { xs: '3rem 2rem', md: '5rem 2rem' } }}>
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
              What's Included in a Session
            </Typography>
          </ScrollReveal>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
            }}
          >
            {[
              { emoji: '📋', title: 'Assessment', desc: 'Discussion of your goals and health history' },
              { emoji: '🙌', title: 'Hands-On Work', desc: 'Gentle, sustained pressure on restricted areas' },
              { emoji: '📚', title: 'Education', desc: 'Understanding your restrictions and healing' },
              { emoji: '🏠', title: 'Home Care', desc: 'Self-treatment techniques for continued progress' },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: brandColors.creamDeep,
                    borderRadius: '12px',
                    border: `2px solid ${brandColors.gold}30`,
                  }}
                >
                  <Box sx={{ fontSize: '2.5rem', marginBottom: 1 }}>{item.emoji}</Box>
                  <Typography
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: brandColors.ink,
                      marginBottom: 0.5,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: brandColors.inkSoft,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Box>
              </ScrollReveal>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          backgroundColor: brandColors.ink,
          color: brandColors.cream,
          padding: { xs: '3rem 2rem', md: '4rem 2rem' },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <ScrollReveal>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                fontWeight: 400,
                marginBottom: 2,
                color: brandColors.gold,
              }}
            >
              Ready to explore myofascial release?
            </Typography>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                marginBottom: 3,
              }}
            >
              Schedule your first session and begin your healing journey.
            </Typography>
            <Button
              variant="contained"
              href="/booking/service"
              sx={{
                backgroundColor: brandColors.terracotta,
                color: brandColors.cream,
                padding: '16px 40px',
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
          </ScrollReveal>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
