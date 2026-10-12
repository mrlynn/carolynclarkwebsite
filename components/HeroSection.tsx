'use client';

import { motion } from 'framer-motion';
import { Box, Container, Typography } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { content } from '@/lib/content';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedHeroBackground } from './AnimatedHeroBackground';

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
      <AnimatedHeroBackground />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.75rem', md: '4.5rem' },
                fontWeight: 400,
                color: brandColors.ink,
                marginBottom: 2,
                maxWidth: '900px',
                lineHeight: 1.1,
              }}
            >
              {content.hero.headline}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                fontWeight: 400,
                color: brandColors.inkSoft,
                marginBottom: 4,
                maxWidth: '700px',
                lineHeight: 1.6,
              }}
            >
              {content.hero.subheadingBeforeAccent}
              <span style={{ color: brandColors.terracotta, fontWeight: 600 }}>
                {content.hero.subheadingAccent}
              </span>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: brandColors.inkSoft,
                marginBottom: 4,
                maxWidth: '700px',
                lineHeight: 1.8,
              }}
            >
              {content.hero.body}
            </Typography>
          </motion.div>
        </motion.div>
      </Container>

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
