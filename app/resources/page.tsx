'use client';

import { Box, Container, Typography } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { LeadMagnetCard } from '@/components/LeadMagnetCard';
import { resources } from '@/lib/resources';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ResourcesContent() {
  const searchParams = useSearchParams();
  const expired = searchParams.get('expired') === 'true';

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: brandColors.cream,
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <ScrollReveal>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Fraunces, serif',
                fontWeight: 700,
                color: brandColors.ink,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Free Resources
            </Typography>
            <Typography
              sx={{
                color: brandColors.inkSoft,
                fontSize: { xs: '1.05rem', md: '1.2rem' },
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              Practical guides for self-care between sessions. Download a free guide and take the next step when you are ready.
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Expired Link Notice */}
      {expired && (
        <Container maxWidth="md" sx={{ mt: -4 }}>
          <Box
            sx={{
              backgroundColor: `${brandColors.terracotta}15`,
              border: `1px solid ${brandColors.terracotta}40`,
              borderRadius: '16px',
              padding: '16px 24px',
              textAlign: 'center',
            }}
          >
            <Typography sx={{ color: brandColors.ink, fontSize: '0.95rem' }}>
              Your download link has expired. Enter your email below to get a
              fresh link.
            </Typography>
          </Box>
        </Container>
      )}

      {/* Resources Grid */}
      <Box sx={{ backgroundColor: brandColors.cream, py: { xs: 4, md: 8 } }}>
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr' },
              gap: 4,
            }}
          >
            {resources.map((resource) => (
              <ScrollReveal key={resource.slug}>
                <LeadMagnetCard resource={resource} />
              </ScrollReveal>
            ))}
          </Box>

          {/* More Coming Soon */}
          <ScrollReveal>
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Typography
                sx={{
                  color: brandColors.inkSoft,
                  fontSize: '1rem',
                  lineHeight: 1.7,
                }}
              >
                More resources coming soon. Have a topic you&apos;d like to
                learn about?{' '}
                <Link
                  href="/contact"
                  style={{
                    color: brandColors.terracotta,
                    textDecoration: 'underline',
                  }}
                >
                  Let me know
                </Link>
                .
              </Typography>
            </Box>
          </ScrollReveal>
        </Container>
      </Box>

      <Footer />
    </>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense>
      <ResourcesContent />
    </Suspense>
  );
}
