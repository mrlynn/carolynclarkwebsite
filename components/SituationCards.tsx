'use client';

import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { ScrollReveal } from '@/components/ScrollReveal';

interface Situation {
  id: string;
  title: string;
  description: string;
  howItHelps: string;
  icon?: string;
}

interface SituationCardsProps {
  situations: Situation[];
}

export function SituationCards({ situations }: SituationCardsProps) {
  return (
    <Box sx={{ padding: { xs: '3rem 2rem', md: '5rem 2rem' } }}>
      <Container maxWidth="lg">
        <ScrollReveal>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 400,
              color: brandColors.ink,
              marginBottom: 1,
              textAlign: 'center',
            }}
          >
            Is This Right For{' '}
            <span style={{ color: brandColors.terracotta, fontStyle: 'italic' }}>
              Me?
            </span>
          </Typography>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <Typography
            sx={{
              fontSize: '1.1rem',
              color: brandColors.inkSoft,
              textAlign: 'center',
              marginBottom: 4,
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            If you're experiencing any of these situations, myofascial release may be exactly what you need.
          </Typography>
        </ScrollReveal>

        <Grid container spacing={3}>
          {situations.map((situation, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={situation.id}>
              <ScrollReveal delay={index * 0.08}>
                <Box
                  sx={{
                    padding: '2.5rem 2rem',
                    backgroundColor: brandColors.cream,
                    borderRadius: '16px',
                    border: `2px solid ${brandColors.creamDeep}`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: brandColors.creamDeep,
                      borderColor: brandColors.terracotta,
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 24px ${brandColors.terracotta}15`,
                    },
                  }}
                >
                  {situation.icon && (
                    <Typography
                      sx={{
                        fontSize: '2.5rem',
                        marginBottom: 1,
                        textAlign: 'center',
                      }}
                    >
                      {situation.icon}
                    </Typography>
                  )}

                  <Typography
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: brandColors.ink,
                      marginBottom: 1.5,
                    }}
                  >
                    {situation.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      color: brandColors.inkSoft,
                      lineHeight: 1.7,
                      marginBottom: 1.5,
                      flexGrow: 1,
                    }}
                  >
                    {situation.description}
                  </Typography>

                  <Box sx={{ marginBottom: 2 }}>
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: brandColors.terracotta,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: 0.75,
                      }}
                    >
                      How MFR helps
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.95rem',
                        color: brandColors.inkSoft,
                        lineHeight: 1.6,
                      }}
                    >
                      {situation.howItHelps}
                    </Typography>
                  </Box>

                  <Button
                    variant="outlined"
                    href="/mfr"
                    sx={{
                      color: brandColors.terracotta,
                      borderColor: brandColors.terracotta,
                      textTransform: 'none',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      marginTop: 'auto',
                      '&:hover': {
                        backgroundColor: `${brandColors.terracotta}10`,
                        borderColor: brandColors.terracottaDeep,
                        color: brandColors.terracottaDeep,
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
