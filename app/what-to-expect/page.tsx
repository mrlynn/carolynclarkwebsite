'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';

export default function WhatToExpectPage() {
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
              What to{' '}
              <span style={{ color: brandColors.moss, fontStyle: 'italic' }}>
                Expect
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
              A guide to your first session and what happens during myofascial release therapy.
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={{ padding: { xs: '3rem 2rem', md: '5rem 2rem' } }}>
        <Container maxWidth="lg" sx={{ maxWidth: '900px' }}>
          {/* Before Your Session */}
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
                {/* Preparation */}
                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: brandColors.cream,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.creamDeep}`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        fontSize: '2rem',
                        color: brandColors.terracotta,
                        minWidth: '3rem',
                        textAlign: 'center',
                      }}
                    >
                      
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: brandColors.ink,
                          marginBottom: 1,
                        }}
                      >
                        Arrive 5-10 Minutes Early
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: brandColors.inkSoft,
                        }}
                      >
                        This allows time to settle in, fill out any necessary paperwork, and discuss your health history and goals for the session.
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Wear Comfortable Clothing */}
                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: brandColors.cream,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.creamDeep}`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        fontSize: '2rem',
                        color: brandColors.terracotta,
                        minWidth: '3rem',
                        textAlign: 'center',
                      }}
                    >
                      
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: brandColors.ink,
                          marginBottom: 1,
                        }}
                      >
                        Wear Comfortable Clothing
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: brandColors.inkSoft,
                        }}
                      >
                        Loose-fitting clothes are ideal. You'll change into comfortable garments for the session, and a private changing area is provided. Typically, clients wear undergarments during the massage.
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Hydration */}
                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: brandColors.cream,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.creamDeep}`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        fontSize: '2rem',
                        color: brandColors.terracotta,
                        minWidth: '3rem',
                        textAlign: 'center',
                      }}
                    >
                      
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: brandColors.ink,
                          marginBottom: 1,
                        }}
                      >
                        Stay Hydrated
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: brandColors.inkSoft,
                        }}
                      >
                        Drink plenty of water in the days before your appointment. Avoid heavy meals 1-2 hours before your session, but don't come hungry either. A light snack is fine.
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Clear Schedule */}
                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: brandColors.cream,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.creamDeep}`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        fontSize: '2rem',
                        color: brandColors.terracotta,
                        minWidth: '3rem',
                        textAlign: 'center',
                      }}
                    >
                      âœ
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: brandColors.ink,
                          marginBottom: 1,
                        }}
                      >
                        Clear Your Schedule
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: brandColors.inkSoft,
                        }}
                      >
                        Plan to relax after your session rather than rush back to work or demanding activities. The body continues integrating the work after you leave, so gentle rest is beneficial.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </ScrollReveal>

          {/* During Your Session */}
          <ScrollReveal delay={0.1}>
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
                During Your Session
              </Typography>

              <Box sx={{ display: 'grid', gap: 3 }}>
                {/* Assessment */}
                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: `${brandColors.moss}08`,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.moss}20`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        fontSize: '2rem',
                        color: brandColors.moss,
                        minWidth: '3rem',
                        textAlign: 'center',
                      }}
                    >
                      
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: brandColors.ink,
                          marginBottom: 1,
                        }}
                      >
                        Initial Assessment (5-10 minutes)
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: brandColors.inkSoft,
                        }}
                      >
                        We'll discuss your health history, any injuries, current pain patterns, and what you hope to achieve. This conversation helps me understand your unique needs and tailor the session accordingly.
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* The Work */}
                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: `${brandColors.moss}08`,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.moss}20`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        fontSize: '2rem',
                        color: brandColors.moss,
                        minWidth: '3rem',
                        textAlign: 'center',
                      }}
                    >
                      
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: brandColors.ink,
                          marginBottom: 1,
                        }}
                      >
                        Hands-On Myofascial Release (45-85 minutes)
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: brandColors.inkSoft,
                          marginBottom: 1,
                        }}
                      >
                        You'll lie on a comfortable treatment table, and I'll use gentle, sustained pressure to engage the fascial system. The pressure is typically sustained for 60-90 seconds or longer, allowing restrictions to gradually release.
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: brandColors.inkSoft,
                        }}
                      >
                        The work is never aggressive or forced. You're in controlâ€”if something feels uncomfortable, let me know and I'll adjust. Communication is key.
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* What You Might Feel */}
                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: `${brandColors.moss}08`,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.moss}20`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        fontSize: '2rem',
                        color: brandColors.moss,
                        minWidth: '3rem',
                        textAlign: 'center',
                      }}
                    >
                      
                    </Box>
                    <Box>
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
                          '& li': {
                            fontSize: '1rem',
                            lineHeight: 1.8,
                            color: brandColors.inkSoft,
                            marginBottom: '0.75rem',
                            paddingLeft: '1.5rem',
                            position: 'relative',
                            '&:before': {
                              content: '"â—†"',
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
                  </Box>
                </Box>

                {/* Communication */}
                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: `${brandColors.moss}08`,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.moss}20`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        fontSize: '2rem',
                        color: brandColors.moss,
                        minWidth: '3rem',
                        textAlign: 'center',
                      }}
                    >
                      
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: brandColors.ink,
                          marginBottom: 1,
                        }}
                      >
                        Speak Up
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: brandColors.inkSoft,
                        }}
                      >
                        You can talk during the session or rest silentlyâ€”whatever serves you best. If pressure is too intense, if you need a break, or if you want to discuss what you're feeling, just let me know. Your comfort and safety are paramount.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </ScrollReveal>

          {/* After Your Session */}
          <ScrollReveal delay={0.2}>
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
                After Your Session
              </Typography>

              <Box sx={{ display: 'grid', gap: 3 }}>
                {/* Integration Period */}
                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: `${brandColors.terracotta}08`,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.terracotta}20`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        fontSize: '2rem',
                        color: brandColors.terracotta,
                        minWidth: '3rem',
                        textAlign: 'center',
                      }}
                    >
                      
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: brandColors.ink,
                          marginBottom: 1,
                        }}
                      >
                        Take Time to Integrate
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: brandColors.inkSoft,
                        }}
                      >
                        The body continues processing the release for hours after your session. Rest, avoid strenuous activity, and allow yourself to feel what's happening. Many clients feel deeply relaxed and may want to rest or sleep.
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Hydrate */}
                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: `${brandColors.terracotta}08`,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.terracotta}20`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        fontSize: '2rem',
                        color: brandColors.terracotta,
                        minWidth: '3rem',
                        textAlign: 'center',
                      }}
                    >
                      
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: brandColors.ink,
                          marginBottom: 1,
                        }}
                      >
                        Drink Plenty of Water
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: brandColors.inkSoft,
                        }}
                      >
                        The work mobilizes fluid in the tissues. Hydrate well for at least 24-48 hours after your session to support the body's natural detoxification and healing processes.
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Self-Care */}
                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: `${brandColors.terracotta}08`,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.terracotta}20`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        fontSize: '2rem',
                        color: brandColors.terracotta,
                        minWidth: '3rem',
                        textAlign: 'center',
                      }}
                    >
                      
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: brandColors.ink,
                          marginBottom: 1,
                        }}
                      >
                        Gentle Self-Care
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: brandColors.inkSoft,
                          marginBottom: 1,
                        }}
                      >
                        A warm bath or shower within a few hours can help your body continue integrating the work. Gentle stretching, walks, or relaxing activities are wonderful. Avoid intense exercise for at least 24 hours.
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: brandColors.inkSoft,
                        }}
                      >
                        I'll provide self-treatment techniques and home care recommendations to support your continued progress between sessions.
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* What to Expect in Days Following */}
                <Box
                  sx={{
                    padding: '2rem',
                    backgroundColor: `${brandColors.terracotta}08`,
                    borderRadius: '12px',
                    border: `1px solid ${brandColors.terracotta}20`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      sx={{
                        fontSize: '2rem',
                        color: brandColors.terracotta,
                        minWidth: '3rem',
                        textAlign: 'center',
                      }}
                    >
                      
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          color: brandColors.ink,
                          marginBottom: 1,
                        }}
                      >
                        In the Days Following
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
                            marginBottom: '0.75rem',
                            paddingLeft: '1.5rem',
                            position: 'relative',
                            '&:before': {
                              content: '"â†"',
                              position: 'absolute',
                              left: 0,
                              color: brandColors.terracotta,
                            },
                          },
                        }}
                      >
                        <li>You may feel soreness or tenderness (mild, not sharp pain)</li>
                        <li>Increased awareness of your body and posture</li>
                        <li>Improved movement and reduced tension</li>
                        <li>Better sleep quality</li>
                        <li>Emotional shifts or insights as trauma releases</li>
                        <li>Gradual improvement in your condition</li>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </ScrollReveal>

          {/* Important Notes */}
          <ScrollReveal delay={0.3}>
            <Box
              sx={{
                padding: '3rem',
                backgroundColor: brandColors.creamDeep,
                borderRadius: '16px',
                borderLeft: `8px solid ${brandColors.moss}`,
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
                Important Notes
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
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: brandColors.inkSoft,
                    paddingLeft: '1.5rem',
                    position: 'relative',
                    '&:before': {
                      content: '"âœ"',
                      position: 'absolute',
                      left: 0,
                      color: brandColors.moss,
                      fontWeight: 'bold',
                    },
                  },
                }}
              >
                <li>This is not a relaxation massageâ€”it's therapeutic work</li>
                <li>Results improve with repeated sessions</li>
                <li>Your body heals at its own pace</li>
                <li>Honesty about your experience helps me serve you better</li>
                <li>You're always in control of your session</li>
                <li>Every body responds differentlyâ€”trust the process</li>
              </Box>
            </Box>
          </ScrollReveal>

          {/* Ready for Your Session */}
          <ScrollReveal delay={0.4}>
            <Box
              sx={{
                padding: '3rem 2rem',
                textAlign: 'center',
                marginTop: 6,
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
                Ready for your first session?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  color: brandColors.inkSoft,
                  marginBottom: 3,
                }}
              >
                I&apos;m here to answer any questions you have.
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
                Book Your First Session
              </Button>
            </Box>
          </ScrollReveal>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
