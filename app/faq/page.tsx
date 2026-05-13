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
    question: 'What does a session feel like?',
    answer:
      'During myofascial release, you\'ll experience sustained, gentle pressure applied to areas of restriction. You may feel the fascia "releasing" or softening under the pressure—sometimes accompanied by subtle popping or stretching sensations. Many clients describe it as both relaxing and therapeutic. Pressure is held for 90 to 120 seconds in each area, allowing time for the tissue to respond. If you\'re receiving therapeutic massage, the experience varies based on the techniques used, but it\'s typically very relaxing and grounding.',
  },
  {
    question: 'Is myofascial release painful?',
    answer:
      'Myofascial release is not painful, but you may feel sensation—especially in areas with chronic restriction. I describe it as "good pressure," not sharp pain. Think of it like the difference between a tender muscle and an injury. You should communicate what feels right for your body. Some areas may feel tender as restrictions release, but we work within your comfort level. If something doesn\'t feel right, just let me know and I\'ll adjust. The goal is to create a healing experience, not discomfort.',
  },
  {
    question: 'What if a session makes my pain worse?',
    answer:
      'This is a real concern, and I want to be honest: sometimes, pain can temporarily increase after a release session as your nervous system processes the change. This is often called a "healing response." It\'s different from reinjury—it usually subsides within a day or two and is followed by improvement. That said, this shouldn\'t happen often with careful, patient work. If you experience increased pain after a session, please reach out—we can adjust the approach for your next visit. Your comfort and confidence matter.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'This varies greatly depending on your condition, how long restrictions have been present, and your body\'s response. For chronic pain, I typically see meaningful progress within 4-6 sessions, though some people notice changes after 2-3. Post-surgery or post-injury recovery often requires a shorter series. Some clients benefit from ongoing monthly sessions to maintain progress. We\'ll discuss a realistic timeline after your first session based on what you\'re experiencing.',
  },
  {
    question: 'What\'s the difference between myofascial release and regular massage?',
    answer:
      'Great question, and I\'m glad you\'re thinking about this. Therapeutic massage focuses on relieving tension and promoting relaxation through various techniques—deep tissue, Swedish massage, trigger point therapy. It\'s wonderful for stress relief and muscle tension. Myofascial release, specifically the John F. Barnes approach, targets the fascia itself—the connective tissue web that surrounds and supports muscles. Because fascia is continuous throughout your body, a restriction in one area can cause pain elsewhere. MFR uses sustained pressure to allow fascia to release naturally. If you\'ve tried massage and still feel stuck, or if you\'re dealing with persistent pain that hasn\'t responded to other approaches, MFR may be worth trying.',
  },
  {
    question: 'Can myofascial release help with my specific condition?',
    answer:
      'Myofascial release can support recovery from many conditions including post-surgery recovery, injury rehabilitation, chronic pain, postural issues, and more. During your consultation, we can discuss whether this approach is right for your situation.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'I ask for at least 24 hours notice if you need to reschedule. This allows me to offer the time to other clients and ensures you get the attention your session deserves. Life happens, so just reach out and we\'ll find another time that works for you.',
  },
  {
    question: 'Do you offer gift certificates?',
    answer:
      'Gift certificates are available by contacting me directly. They can be a thoughtful option for someone interested in massage or myofascial release.',
  },
  {
    question: 'What if I have questions before booking?',
    answer:
      'Please call or text with any questions. I\'m happy to discuss whether myofascial release is appropriate for your needs and what to expect during your first session. No pressure—I want you to feel confident before you come in.',
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
