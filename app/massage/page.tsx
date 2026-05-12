'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { GradientBackground } from '@/components/GradientBackground';
import { Navigation } from '@/components/Navigation';
import { ParallaxGradientSection } from '@/components/ParallaxGradientSection';
import { content } from '@/lib/content';

export default function MassagePage() {
  const [massagePricing, setMassagePricing] = useState<Array<{ duration: string; price: string }>>([]);

  useEffect(() => {
    const fetchMassageServices = async () => {
      try {
        const response = await fetch('/api/services');
        const services = await response.json();
        const massageServices = services
          .filter((s: any) => s.name === 'Therapeutic Massage')
          .sort((a: any, b: any) => a.duration_minutes - b.duration_minutes)
          .map((s: any) => ({
            duration: `${s.duration_minutes} Minutes`,
            price: `$${s.price}`,
          }));
        setMassagePricing(massageServices);
      } catch (error) {
        console.error('Failed to fetch massage pricing:', error);
      }
    };

    fetchMassageServices();
  }, []);

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
              {content.services.secondary.heroLead}
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Featured Background */}
      <GradientBackground variant="section" height="400px" />

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
                Therapeutic massage sessions are individualized to each client's needs and may include a combination of deep tissue work, myofascial release, Swedish massage, assisted stretching, trigger point therapy and energy work to relieve pain and tension, increase mobility and promote overall relaxation and well-being.
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
                  listStyle: 'disc',
                  paddingLeft: '1.25rem',
                  margin: 0,
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: 2,
                  '& li': {
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    color: brandColors.inkSoft,
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
                  listStyle: 'disc',
                  paddingLeft: '1.25rem',
                  margin: 0,
                  '& li': {
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: brandColors.inkSoft,
                    marginBottom: '1rem',
                  },
                }}
              >
                <li>Reduced pain and tension</li>
                <li>Improved flexibility and range of motion</li>
                <li>Better circulation and recovery</li>
                <li>Stress relief and relaxation</li>
                <li>Improved ease in day-to-day movement</li>
                <li>Support alongside injury or post-surgical recovery</li>
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
                {content.services.secondary.whoBenefitsBody}
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
      <ParallaxGradientSection
        title="Therapeutic"
        description={content.services.secondary.parallaxBlurb}
      />

      <Footer />
    </Box>
  );
}
