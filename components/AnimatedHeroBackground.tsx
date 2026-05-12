'use client';

import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { brandColors } from '@/lib/theme';

/**
 * Non-photographic hero backdrop — soft palette washes, grain, and motion
 * (per client feedback: no stock photography on the marketing site).
 */
export function AnimatedHeroBackground() {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: `linear-gradient(145deg, ${brandColors.cream} 0%, ${brandColors.creamDeep} 42%, ${brandColors.moss}14 100%)`,
        }}
      />

      <motion.div
        animate={{
          background: [
            `linear-gradient(135deg, ${brandColors.cream}e8 0%, ${brandColors.creamDeep}d8 100%)`,
            `linear-gradient(225deg, ${brandColors.cream}e4 0%, ${brandColors.creamDeep}dc 100%)`,
            `linear-gradient(315deg, ${brandColors.cream}e6 0%, ${brandColors.creamDeep}da 100%)`,
            `linear-gradient(135deg, ${brandColors.cream}e8 0%, ${brandColors.creamDeep}d8 100%)`,
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 0.35,
          mixBlendMode: 'multiply',
        }}
      />

      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, ${brandColors.terracotta}28 0%, ${brandColors.terracotta}10 70%, transparent 100%)`,
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 2,
        }}
      />

      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 100, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-3%',
          width: '450px',
          height: '450px',
          background: `radial-gradient(circle, ${brandColors.moss}22 0%, ${brandColors.moss}8 70%, transparent 100%)`,
          borderRadius: '50%',
          filter: 'blur(70px)',
          zIndex: 2,
        }}
      />

      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, 120, -80, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10%',
          width: '350px',
          height: '350px',
          background: `radial-gradient(circle, ${brandColors.gold}18 0%, ${brandColors.gold}5 70%, transparent 100%)`,
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 2,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          opacity: 0.45,
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.02) 2px,
              rgba(0, 0, 0, 0.02) 4px
            )
          `,
        }}
      />

      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.12,
          zIndex: 3,
        }}
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={brandColors.terracotta} />
            <stop offset="50%" stopColor={brandColors.moss} />
            <stop offset="100%" stopColor={brandColors.gold} />
          </linearGradient>
        </defs>

        <motion.path
          d="M 0 100 Q 300 50, 600 100 T 1200 100"
          stroke="url(#heroLineGradient)"
          strokeWidth="3"
          fill="none"
          animate={{ d: 'M 0 120 Q 300 30, 600 120 T 1200 100' }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.path
          d="M 0 200 Q 300 250, 600 200 T 1200 200"
          stroke="url(#heroLineGradient)"
          strokeWidth="2"
          fill="none"
          opacity={0.6}
          animate={{ d: 'M 0 180 Q 300 270, 600 180 T 1200 200' }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
        />
        <motion.path
          d="M 0 300 Q 300 350, 600 300 T 1200 300"
          stroke="url(#heroLineGradient)"
          strokeWidth="2"
          fill="none"
          opacity={0.4}
          animate={{ d: 'M 0 320 Q 300 330, 600 320 T 1200 300' }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', delay: 2 }}
        />
      </svg>
    </Box>
  );
}
