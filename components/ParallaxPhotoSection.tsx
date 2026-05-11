'use client';

import { Box, Container, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { brandColors } from '@/lib/theme';
import Image from 'next/image';

interface ParallaxPhotoSectionProps {
  imageUrl: string;
  title?: string;
  description?: string;
}

export function ParallaxPhotoSection({
  imageUrl,
  title,
  description,
}: ParallaxPhotoSectionProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.3]);

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
      {/* Parallax Background Image */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          y,
          opacity,
        }}
      >
        <Image
          src={imageUrl}
          alt="Therapeutic healing environment"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          priority
        />
      </motion.div>

      {/* Dark overlay for text readability */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${brandColors.ink}70 0%, ${brandColors.ink}40 100%)`,
          zIndex: 1,
        }}
      />

      {/* Content */}
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
              <span
                style={{
                  color: brandColors.terracotta,
                  fontStyle: 'italic',
                  marginLeft: '0.5rem',
                }}
              >
                Healing
              </span>
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

      {/* Scroll indicator */}
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
