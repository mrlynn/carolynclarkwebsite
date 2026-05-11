'use client';

import { motion } from 'framer-motion';
import { Box, Container, Typography, Button } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedHeroBackground } from './AnimatedHeroBackground';
import { AnimatedTitle } from './AnimatedTitle';

export function HeroSection() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 400], [0, 80]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: brandColors.cream,
      }}
    >
      {/* Animated background */}
      <AnimatedHeroBackground />

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <Box sx={{ marginBottom: 3 }}>
            <AnimatedTitle
              text="Healing that goes deeper"
              highlightStart={12}
              highlightEnd={16}
              variant="h1"
            />
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.25rem', md: '1.75rem' },
                fontWeight: 400,
                color: brandColors.inkSoft,
                marginBottom: 4,
                maxWidth: '700px',
                lineHeight: 1.6,
              }}
            >
              John F. Barnes Myofascial Release for{' '}
              <span style={{ color: brandColors.terracotta, fontWeight: 600 }}>
                pain relief and lasting change
              </span>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: brandColors.terracotta,
                color: brandColors.cream,
                padding: '16px 40px',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '999px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 8px 24px rgba(232, 148, 79, 0.25)`,
                '&:hover': {
                  backgroundColor: brandColors.terracottaDeep,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 16px 40px rgba(232, 148, 79, 0.35)`,
                },
              }}
            >
              Call to schedule
            </Button>

            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  padding: '12px 20px',
                  borderRadius: '999px',
                  border: `2px solid ${brandColors.moss}`,
                  background: `${brandColors.moss}08`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: `${brandColors.moss}15`,
                    borderColor: brandColors.mossDeep,
                  },
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: '1.2rem' }}
                >
                  ✓
                </motion.span>
                <Typography
                  variant="body2"
                  sx={{
                    color: brandColors.moss,
                    fontWeight: 600,
                  }}
                >
                  Licensed MT • By appointment
                </Typography>
              </Box>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Box
          sx={{
            width: '30px',
            height: '50px',
            border: `2px solid ${brandColors.terracotta}`,
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '8px 0',
          }}
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: '4px',
              height: '8px',
              backgroundColor: brandColors.terracotta,
              borderRadius: '2px',
            }}
          />
        </Box>
      </motion.div>
    </Box>
  );
}
