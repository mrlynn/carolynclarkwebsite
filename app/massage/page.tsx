'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { FeaturedImage } from '@/components/FeaturedImage';
import { Navigation } from '@/components/Navigation';
import { ParallaxPhotoSection } from '@/components/ParallaxPhotoSection';
import { getUnsplashImage } from '@/lib/unsplash-photos';

export default function MassagePage() {
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
              Therapeutic{' '}
              <span style={{ color: brandColors.moss, fontStyle: 'italic' }}>
                Massage
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
              Customized sessions designed to support pain relief, improved mobility, relaxation, and overall well-being.
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Featured Image */}
      <Box sx={{ padding: { xs: '2rem', md: '4rem 2rem' } }}>
        <Container maxWidth="lg">
          <FeaturedImage
            src={getUnsplashImage('massageTherapy', 'section')}
            alt="Therapeutic Massage"
            aspectRatio={16 / 9}
          />
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={{ padding: { xs: '3rem 2rem', md: '5rem 2rem' } }}>
        <Container maxWidth="lg" sx={{ maxWidth: '800px' }}>
          {/* Overview */}
          <ScrollReveal>
            <Box sx={{ marginBottom: 5 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: '2rem',
                  fontWeight: 400,
                  color: brandColors.ink,
                  marginBottom: 2,
                }}
              >
                What is Therapeutic Massage?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 2,
                  color: brandColors.inkSoft,
                }}
              >
                Each therapeutic massage session is tailored to your individual needs and designed to support pain relief, improved mobility, relaxation, and overall well-being. Depending on your goals, sessions may incorporate various evidence-based techniques to address your specific concerns.
              </Typography>
            </Box>
          </ScrollReveal>

          {/* Techniques */}
          <ScrollReveal delay={0.1}>
            <Box sx={{ marginBottom: 5 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: '2rem',
                  fontWeight: 400,
                  color: brandColors.ink,
                  marginBottom: 2,
                }}
              >
                Techniques Used
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: 2,
                  '& li': {
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    color: brandColors.inkSoft,
                    paddingLeft: '2rem',
                    position: 'relative',
                    '&:before': {
                      content: '"◆"',
                      position: 'absolute',
                      left: 0,
                      color: brandColors.moss,
                      fontSize: '0.8rem',
                      marginTop: '0.3rem',
                    },
                  },
                }}
              >
                <li>Myofascial Release</li>
                <li>Deep Tissue Massage</li>
                <li>Swedish Massage</li>
                <li>Trigger Point Therapy</li>
                <li>Assisted Stretching</li>
                <li>Energy Techniques</li>
              </Box>
            </Box>
          </ScrollReveal>

          {/* Benefits */}
          <ScrollReveal delay={0.2}>
            <Box
              sx={{
                padding: '2.5rem',
                backgroundColor: `${brandColors.moss}08`,
                borderLeft: `6px solid ${brandColors.moss}`,
                borderRadius: '8px',
                marginBottom: 5,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: brandColors.ink,
                  marginBottom: 2,
                }}
              >
                Benefits of Therapeutic Massage
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  padding: 0,
                  '& li': {
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: brandColors.inkSoft,
                    marginBottom: '1rem',
                    paddingLeft: '2rem',
                    position: 'relative',
                    '&:before': {
                      content: '"✓"',
                      position: 'absolute',
                      left: 0,
                      color: brandColors.moss,
                      fontWeight: 'bold',
                    },
                  },
                }}
              >
                <li>Reduced pain and tension</li>
                <li>Improved flexibility and range of motion</li>
                <li>Better circulation and recovery</li>
                <li>Stress relief and relaxation</li>
                <li>Enhanced sense of well-being</li>
                <li>Support for ongoing healing</li>
              </Box>
            </Box>
          </ScrollReveal>

          {/* Pricing */}
          <ScrollReveal delay={0.3}>
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
                {[
                  { duration: '60 Minutes', price: '$120' },
                  { duration: '90 Minutes', price: '$180' },
                ].map((item, idx) => (
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

          {/* Who Benefits */}
          <ScrollReveal delay={0.4}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: '2rem',
                  fontWeight: 400,
                  color: brandColors.ink,
                  marginBottom: 2,
                }}
              >
                Who Benefits
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 2,
                  color: brandColors.inkSoft,
                }}
              >
                Therapeutic massage supports anyone seeking relief from muscle tension, stress, or physical discomfort. Whether you're recovering from activity, managing chronic tension, or simply prioritizing relaxation and self-care, therapeutic massage can be an important part of your wellness routine.
              </Typography>
            </Box>
          </ScrollReveal>
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
              Ready to feel the difference?
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
              Book a therapeutic massage session tailored to your needs.
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

      {/* Parallax Section */}
      <ParallaxPhotoSection
        imageUrl={getUnsplashImage('relaxation', 'hero')}
        title="Therapeutic"
        description="Customized massage sessions designed for relaxation, relief, and your overall well-being."
      />

      <Footer />
    </Box>
  );
}
