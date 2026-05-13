'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { GradientBackground } from '@/components/GradientBackground';
import { BenefitCard } from '@/components/BenefitCard';
import { FasciaIllustration } from '@/components/FasciaIllustration';
import { Navigation } from '@/components/Navigation';
import { ParallaxGradientSection } from '@/components/ParallaxGradientSection';
import { content } from '@/lib/content';

interface PricingItem {
  duration: string;
  price: string;
}

export default function MFRPage() {
  const [mfrPricing, setMFRPricing] = useState<PricingItem[]>([]);

  useEffect(() => {
    const fetchMFRServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) throw new Error('Failed to fetch services');

        const services = await response.json();
        const mfrService = services.find((s: any) => s.name === 'Myofascial Release');

        if (mfrService?.durations && Array.isArray(mfrService.durations)) {
          const pricing = mfrService.durations
            .sort((a: any, b: any) => a.durationMinutes - b.durationMinutes)
            .map((d: any) => ({
              duration: `${d.durationMinutes} minutes`,
              price: `$${d.price}`,
            }));
          setMFRPricing(pricing);
        }
      } catch (error) {
        console.error('Failed to fetch MFR pricing:', error);
      }
    };

    fetchMFRServices();
  }, []);

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
              {content.services.featured.heroLead}
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Why PT Alone Doesn't Always Work */}
      <Box sx={{ padding: { xs: '3rem 2rem', md: '5rem 2rem' } }}>
        <Container maxWidth="lg" sx={{ maxWidth: '900px' }}>
          <ScrollReveal>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                fontWeight: 400,
                color: brandColors.ink,
                marginBottom: 2,
              }}
            >
              Why Your Back Still Hurts After PT{' '}
              <span style={{ color: brandColors.terracotta, fontStyle: 'italic' }}>
                (And How MFR Helps)
              </span>
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
              You've done the physical therapy. You've stretched. You've strengthened. Yet the pain persists. This is a common experience—and it's not a failure on your part.
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
              Traditional physical therapy often focuses on strengthening muscles. But sometimes, chronic pain isn't about weak muscles—it's about restricted fascia. Fascia is the continuous web of connective tissue that surrounds and supports every structure in your body. When fascia becomes tight and restricted from injury, surgery, stress, or prolonged movement patterns, it can create tension and compression that muscles alone cannot resolve. PT strengthens muscles, but it may not address the underlying fascial restriction causing the pain.
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                lineHeight: 2,
                color: brandColors.inkSoft,
                marginBottom: 3,
              }}
            >
              Myofascial release takes a different approach. Rather than focusing on strengthening, it targets the fascial restrictions themselves. Using gentle, sustained pressure, it allows the fascia to soften and release naturally. Many people find that combining MFR with PT—or turning to MFR after PT—finally addresses the missing piece in their healing journey.
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Box
              sx={{
                backgroundColor: `${brandColors.terracotta}10`,
                padding: '2rem',
                borderRadius: '12px',
                border: `2px solid ${brandColors.terracotta}30`,
              }}
            >
              <Typography
                sx={{
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: brandColors.inkSoft,
                }}
              >
                <strong>Curious about the difference?</strong> Check out the FAQ section for answers to{' '}
                <Box
                  component="a"
                  href="/faq#what-is-the-difference-between-mfr-and-regular-massage"
                  sx={{
                    color: brandColors.terracotta,
                    textDecoration: 'underline',
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': { color: brandColors.terracottaDeep },
                  }}
                >
                  common questions about myofascial release
                </Box>
                . If you're ready to explore how MFR could help, read more about{' '}
                <Box
                  component="a"
                  href="/what-to-expect"
                  sx={{
                    color: brandColors.terracotta,
                    textDecoration: 'underline',
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': { color: brandColors.terracottaDeep },
                  }}
                >
                  what to expect in your first session
                </Box>
                .
              </Typography>
            </Box>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Featured Background */}
      <GradientBackground variant="section" height="200px" />

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
                  Fascia is a continuous web of connective tissue that surrounds and supports every muscle, bone, nerve, blood vessel, and organ in the body. It acts as the body's protective support system and responds during times of injury, surgery, inflammation, stress, or emotional trauma.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 2,
                    color: brandColors.inkSoft,
                  }}
                >
                  When the fascial system becomes restricted as a result of these experiences, it creates tension and compression throughout the body that can contribute to chronic pain, postural imbalance, limited mobility, and a wide range of other symptoms.
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
                  The John F. Barnes Myofascial Release Approach uses gentle, sustained pressure to engage the fascial system and allow restricted tissue to soften and release naturally, without force.
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
                  By working with the body instead of against it, this approach supports lasting change through the mind-body connection while addressing the underlying restrictions contributing to pain and dysfunction rather than simply managing symptoms temporarily.
                </Typography>
              </Box>
            </ScrollReveal>
          </Box>

          <Box sx={{ marginBottom: 4 }}>
            <ScrollReveal delay={0.2}>
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
                  Treatment may also include self-treatment instruction and home care recommendations to support continued progress between sessions.
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
                title="Pain Reduction"
                description="Release fascial restrictions that contribute to chronic pain and discomfort."
                accent="terracotta"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <BenefitCard
                title="Better Mobility"
                description="Improved movement range, flexibility, and reduced tension patterns."
                accent="moss"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <BenefitCard
                title="Nervous System Healing"
                description="Regulation and stress relief as trauma and tension release."
                accent="gold"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <BenefitCard
                title="Faster Recovery"
                description="Support for healing from injury, surgery, or intensive activity."
                accent="terracotta"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <BenefitCard
                title="Athletic Performance"
                description="Enhanced flexibility and reduced restrictions for optimal movement."
                accent="moss"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <BenefitCard
                title="Emotional Release"
                description="Support for trauma recovery and emotional processing."
                accent="gold"
              />
            </ScrollReveal>
          </Box>
        </Container>
      </Box>

      {/* Commonly Addressed Conditions */}
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
              Commonly Addressed Conditions
            </Typography>
          </ScrollReveal>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            {[
              'Neck and back pain',
              'TMJ',
              'Frozen shoulder',
              'Carpal tunnel syndrome',
              'Thoracic outlet syndrome',
              'Fibromyalgia',
              'Whiplash',
              'Anxiety / depression',
              'Emotional trauma',
              'Scoliosis',
              'C-section scarring',
              'Pelvic and menstrual pain',
              'Sports injuries',
              'Post-mastectomy scarring',
              'Plantar fasciitis',
              'Sciatica',
            ].map((condition, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05}>
                <Typography
                  sx={{
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    color: brandColors.inkSoft,
                  }}
                >
                  {condition}
                </Typography>
              </ScrollReveal>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Parallax Section */}
      <ParallaxGradientSection
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

      {/* Common Questions About MFR */}
      <Box sx={{ padding: { xs: '3rem 2rem', md: '5rem 2rem' } }}>
        <Container maxWidth="lg" sx={{ maxWidth: '800px' }}>
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
              Common Questions About MFR
            </Typography>
          </ScrollReveal>

          <Box sx={{ display: 'grid', gap: 3 }}>
            <ScrollReveal>
              <Box>
                <Typography
                  sx={{
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: brandColors.ink,
                    marginBottom: 1,
                  }}
                >
                  Is myofascial release proven to work?
                </Typography>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: brandColors.inkSoft,
                  }}
                >
                  The John F. Barnes approach has decades of clinical use and client success. Many people experience meaningful change within a few sessions. That said, myofascial release is different from symptom management—it's about addressing underlying restrictions. Results vary based on how long restrictions have been present and your body's individual response.
                </Typography>
              </Box>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Box>
                <Typography
                  sx={{
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: brandColors.ink,
                    marginBottom: 1,
                  }}
                >
                  How many sessions typically produce results?
                </Typography>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: brandColors.inkSoft,
                  }}
                >
                  Many people feel noticeable improvement within 4-6 sessions. Some experience meaningful change earlier. For chronic pain or deeply held restrictions, ongoing sessions may be beneficial. We'll create a realistic timeline based on your specific situation after your first session.
                </Typography>
              </Box>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Box>
                <Typography
                  sx={{
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: brandColors.ink,
                    marginBottom: 1,
                  }}
                >
                  Can I use MFR alongside physical therapy?
                </Typography>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: brandColors.inkSoft,
                  }}
                >
                  Absolutely. Many clients benefit from combining MFR with PT—they work well together. MFR releases the restrictions; PT strengthens the area. If you're currently in PT and not seeing the progress you hoped for, MFR may be the missing piece.
                </Typography>
              </Box>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Box
                sx={{
                  padding: '2rem',
                  backgroundColor: `${brandColors.moss}08`,
                  borderRadius: '12px',
                  marginTop: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1rem',
                    color: brandColors.inkSoft,
                    lineHeight: 1.8,
                  }}
                >
                  <strong>Have more questions?</strong> Visit our{' '}
                  <Box
                    component="a"
                    href="/faq"
                    sx={{
                      color: brandColors.moss,
                      textDecoration: 'underline',
                      fontWeight: 600,
                      cursor: 'pointer',
                      '&:hover': { color: brandColors.mossDeep },
                    }}
                  >
                    complete FAQ page
                  </Box>
                  .
                </Typography>
              </Box>
            </ScrollReveal>
          </Box>
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
              { title: 'Assessment', desc: 'Discussion of your goals and health history' },
              { title: 'Hands-On Work', desc: 'Gentle, sustained pressure on restricted areas' },
              { title: 'Education', desc: 'Understanding your restrictions and healing' },
              { title: 'Home Care', desc: 'Self-treatment techniques for continued progress' },
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

      {/* Pricing */}
      <Box sx={{ padding: { xs: '3rem 2rem', md: '5rem 2rem' } }}>
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
              Pricing
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 2,
              }}
            >
              {mfrPricing.map((item, idx) => (
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
              Schedule your first session today.
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
