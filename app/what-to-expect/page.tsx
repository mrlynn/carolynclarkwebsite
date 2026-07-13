'use client';

import { Box, Container, Typography } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { content } from '@/lib/content';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';

export default function WhatToExpectPage() {
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
              {content.whatToExpect.pageTitle}
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      <Box sx={{ padding: { xs: '3rem 2rem', md: '5rem 2rem' } }}>
        <Container maxWidth="lg" sx={{ maxWidth: '900px' }}>
          <ScrollReveal>
            <Box sx={{ marginBottom: 6 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: '2rem',
                  fontWeight: 400,
                  color: brandColors.ink,
                  marginBottom: 3,
                }}
              >
                Before Your Session
              </Typography>

              <Box sx={{ display: 'grid', gap: 3 }}>
                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: brandColors.cream,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.creamDeep}`,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: brandColors.ink,
                      marginBottom: 1,
                    }}
                  >
                    Arrive 5–10 Minutes Early
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      lineHeight: 1.8,
                      color: brandColors.inkSoft,
                    }}
                  >
                    {content.whatToExpect.arriveEarly}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: brandColors.cream,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.creamDeep}`,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: brandColors.ink,
                      marginBottom: 1,
                    }}
                  >
                    {content.whatToExpect.preparingTitle}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      lineHeight: 1.8,
                      color: brandColors.inkSoft,
                    }}
                  >
                    {content.whatToExpect.preparingBody}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Box
              sx={{
                padding: '2rem',
                backgroundColor: `${brandColors.moss}08`,
                borderRadius: '12px',
                border: `1px solid ${brandColors.moss}20`,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: brandColors.ink,
                  marginBottom: 1,
                }}
              >
                What You Might Experience
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  '& li': {
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: brandColors.inkSoft,
                    marginBottom: '0.75rem',
                    paddingLeft: '1.5rem',
                    position: 'relative',
                    '&:before': {
                      content: '"◆"',
                      position: 'absolute',
                      left: 0,
                      color: brandColors.moss,
                    },
                  },
                }}
              >
                <li>Deep pressure that feels therapeutic, not painful</li>
                <li>Sensations of release, unwinding, or warmth</li>
                <li>Movement or adjustment in restricted areas</li>
                <li>Emotional release (yes, this is normal and welcome)</li>
                <li>Subtle pulsing or vibration in the tissue</li>
                <li>Relaxation and ease as tension releases</li>
              </Box>
            </Box>
          </ScrollReveal>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
