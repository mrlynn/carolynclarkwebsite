'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { brandColors } from '@/lib/theme';

export function FasciaIllustration() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        viewBox="0 0 400 300"
        style={{ width: '100%', height: '100%', maxWidth: '500px' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="fasciaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={brandColors.terracotta} />
            <stop offset="50%" stopColor={brandColors.gold} />
            <stop offset="100%" stopColor={brandColors.moss} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background subtle gradient */}
        <rect width="400" height="300" fill={`${brandColors.cream}`} />

        {/* Central body form */}
        <motion.ellipse
          cx="200"
          cy="150"
          rx="80"
          ry="120"
          fill={`${brandColors.moss}15`}
          stroke={brandColors.moss}
          strokeWidth="2"
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Fascia web network - animated flowing lines */}
        <motion.path
          d="M 80 80 Q 150 100, 200 150 T 320 200"
          stroke={brandColors.terracotta}
          strokeWidth="2"
          fill="none"
          opacity="0.7"
          strokeDasharray="5,5"
          initial={{ strokeDashoffset: 10 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M 120 60 Q 200 120, 280 150 T 300 250"
          stroke={brandColors.gold}
          strokeWidth="2"
          fill="none"
          opacity="0.6"
          strokeDasharray="5,5"
          initial={{ strokeDashoffset: 10 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
        />
        <motion.path
          d="M 60 150 Q 150 180, 250 200 T 340 220"
          stroke={brandColors.moss}
          strokeWidth="2"
          fill="none"
          opacity="0.5"
          strokeDasharray="5,5"
          initial={{ strokeDashoffset: 10 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1 }}
        />

        {/* Restriction points - pulsing circles */}
        {[
          { cx: 150, cy: 100, color: brandColors.terracotta },
          { cx: 280, cy: 120, color: brandColors.gold },
          { cx: 200, cy: 200, color: brandColors.moss },
          { cx: 100, cy: 220, color: brandColors.terracotta },
        ].map((point, idx) => (
          <motion.circle
            key={idx}
            cx={point.cx}
            cy={point.cy}
            r="8"
            fill={point.color}
            opacity="0.8"
            animate={{
              r: [8, 12, 8],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: idx * 0.3,
            }}
            filter="url(#glow)"
          />
        ))}

        {/* Release waves - subtle pulsing background */}
        <motion.circle
          cx="200"
          cy="150"
          r="40"
          fill="none"
          stroke={brandColors.gold}
          strokeWidth="1"
          opacity="0.3"
          animate={{
            r: [40, 100, 160],
            opacity: [0.3, 0.1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
        <motion.circle
          cx="200"
          cy="150"
          r="20"
          fill="none"
          stroke={brandColors.moss}
          strokeWidth="1"
          opacity="0.3"
          animate={{
            r: [20, 80, 140],
            opacity: [0.3, 0.1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.3,
          }}
        />
      </svg>
    </Box>
  );
}
