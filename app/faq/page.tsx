'use client';

import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'What should I wear to my appointment?',
    answer:
      'Wear comfortable, loose-fitting clothing that allows easy access to the areas being treated. Typically, clients receive massage in undergarments. A private changing area is provided.',
  },
  {
    question: 'How long is a typical session?',
    answer:
      'Sessions are available in 60-minute or 90-minute durations. Most clients find that 90 minutes allows for deeper work and better integration of the benefits.',
  },
  {
    question: 'Is myofascial release painful?',
    answer:
      'The approach is gentle and sustained, not aggressive. You should communicate what feels right for your body. Some areas may feel tender as restrictions release, but we work within your comfort level.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'This varies greatly depending on your condition, how long restrictions have been present, and your body\'s response. Some people feel significant changes in 3-5 sessions, while others benefit from ongoing work. We\'ll discuss this after your first session.',
  },
  {
    question: 'Can myofascial release help with my specific condition?',
    answer:
      'Myofascial release can support recovery from many conditions including post-surgery recovery, injury rehabilitation, chronic pain, postural issues, and more. During your consultation, we can discuss whether this approach is right for your situation.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'Please provide at least 24 hours notice if you need to reschedule. This allows me to offer the time to other clients and ensures you get the attention your session deserves.',
  },
  {
    question: 'Do you offer gift certificates?',
    answer:
      'Gift certificates are available by contacting me directly. They make thoughtful gifts for anyone interested in healing and wellness.',
  },
  {
    question: 'What if I have questions before booking?',
    answer:
      'Please call or email with any questions. I\'m happy to discuss whether myofascial release is appropriate for your needs and what to expect during your first session.',
  },
];

export default function FAQPage() {
  return (
    <Box>
      <Navigation />

      {/* Hero */}
      <Box
        sx={{
          backgroundColor: `linear-gradient(135deg, ${brandColors.terracotta}10 0%, ${brandColors.moss}05 100%)`,
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
              Frequently Asked Questions
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      {/* FAQ Content */}
      <Box
        sx={{
          padding: { xs: '3rem 2rem', md: '5rem 2rem' },
        }}
      >
        <Container maxWidth="lg" sx={{ maxWidth: '800px' }}>
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <Accordion
                sx={{
                  marginBottom: 2,
                  backgroundColor: brandColors.cream,
                  border: `1px solid ${brandColors.creamDeep}`,
                  '&:hover': {
                    backgroundColor: brandColors.creamDeep,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: brandColors.terracotta }} />}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      marginY: 0,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: brandColors.ink,
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    borderTop: `1px solid ${brandColors.creamDeep}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      lineHeight: 1.8,
                      color: brandColors.inkSoft,
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </ScrollReveal>
          ))}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
