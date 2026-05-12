'use client';

import { Box, Container, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { brandColors } from '@/lib/theme';

interface ParallaxPhotoSectionProps {
  title?: string;
  /** Optional second line or clause shown in terracotta italic after the title. */
  titleEmphasis?: string;
  description?: string;
}

/**
 * Full-viewport parallax band using palette gradients only (no stock photography).
 */
export function ParallaxPhotoSection({
  title,
  titleEmphasis,
  description,
}: ParallaxPhotoSectionProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.85]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: '-12%',
          zIndex: 0,
          y,
          opacity,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${brandColors.ink} 0%, ${brandColors.moss}35 55%, ${brandColors.terracotta}28 100%)`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 80% 60% at 20% 40%, ${brandColors.terracotta}25 0%, transparent 55%),
              radial-gradient(ellipse 70% 50% at 85% 70%, ${brandColors.moss}22 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 50% 90%, ${brandColors.gold}12 0%, transparent 45%)
            `,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.35,
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 2px,
                rgba(255, 255, 255, 0.03) 4px
              )
            `,
          }}
        />
      </motion.div>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${brandColors.ink}88 0%, ${brandColors.ink}55 100%)`,
          zIndex: 1,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: brandColors.cream,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {title && (
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 400,
                marginBottom: 2,
                color: brandColors.cream,
              }}
            >
              {title}
              {titleEmphasis ? (
                <span
                  style={{
                    color: brandColors.terracotta,
                    fontStyle: 'italic',
                    marginLeft: '0.35rem',
                  }}
                >
                  {titleEmphasis}
                </span>
              ) : null}
            </Typography>
          )}

          {description && (
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                lineHeight: 1.8,
                maxWidth: '700px',
                margin: '0 auto',
                color: brandColors.gold,
              }}
            >
              {description}
            </Typography>
          )}
        </motion.div>
      </Container>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            width: '30px',
            height: '50px',
            border: `2px solid ${brandColors.gold}`,
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
              backgroundColor: brandColors.gold,
              borderRadius: '2px',
            }}
          />
        </Box>
      </motion.div>
    </Box>
  );
}
