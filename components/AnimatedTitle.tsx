'use client';

import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { brandColors } from '@/lib/theme';

interface AnimatedTitleProps {
  text: string;
  highlightStart?: number;
  highlightEnd?: number;
  variant?: 'h1' | 'h2' | 'h3';
}

export function AnimatedTitle({
  text,
  highlightStart,
  highlightEnd,
  variant = 'h1',
}: AnimatedTitleProps) {
  const characters = text.split('');

  return (
    <Typography
      variant={variant}
      component="span"
      sx={{
        fontSize: variant === 'h1' ? { xs: '2.5rem', md: '4rem' } : undefined,
        fontWeight: 400,
        lineHeight: 1.1,
        color: brandColors.ink,
        display: 'inline-block',
      }}
    >
      {characters.map((char, index) => {
        const isHighlighted =
          highlightStart !== undefined &&
          highlightEnd !== undefined &&
          index >= highlightStart &&
          index <= highlightEnd;

        return (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05 + 0.1,
              duration: 0.5,
            }}
            style={{
              display: 'inline-block',
              color: isHighlighted ? brandColors.terracotta : brandColors.ink,
              fontStyle: isHighlighted ? 'italic' : 'normal',
            }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        );
      })}
    </Typography>
  );
}
