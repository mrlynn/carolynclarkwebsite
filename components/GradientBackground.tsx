'use client';

import { Box } from '@mui/material';
import { brandColors } from '@/lib/theme';

interface GradientBackgroundProps {
  variant?: 'hero' | 'section' | 'light';
  height?: string | number;
  className?: string;
  children?: React.ReactNode;
}

export function GradientBackground({
  variant = 'section',
  height = '400px',
  className,
  children,
}: GradientBackgroundProps) {
  const getGradient = () => {
    switch (variant) {
      case 'hero':
        return `linear-gradient(135deg, ${brandColors.cream} 0%, ${brandColors.creamDeep} 50%, ${brandColors.moss}15 100%)`;
      case 'light':
        return `linear-gradient(135deg, ${brandColors.cream} 0%, ${brandColors.terracotta}08 100%)`;
      case 'section':
      default:
        return `linear-gradient(135deg, ${brandColors.creamDeep} 0%, ${brandColors.moss}10 50%, ${brandColors.terracotta}08 100%)`;
    }
  };

  return (
    <Box
      className={className}
      sx={{
        position: 'relative',
        height,
        background: getGradient(),
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, ${brandColors.moss}08 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${brandColors.terracotta}05 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, ${brandColors.gold}05 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.02) 2px,
              rgba(0, 0, 0, 0.02) 4px
            )
          `,
          pointerEvents: 'none',
          opacity: 0.5,
        },
      }}
    >
      {children && (
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}
