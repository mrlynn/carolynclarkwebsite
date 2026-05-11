'use client';

import { Box, Typography } from '@mui/material';
import { brandColors } from '@/lib/theme';

interface Props {
  name: string;
  hex: string;
  role: string;
  usage: string;
}

export default function ColorSwatch({ name, hex, role, usage }: Props) {
  const isLight = ['#f7f1e8', '#efe6d6', '#d4a574'].includes(hex.toLowerCase());
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          background: hex,
          height: 180,
          borderRadius: 3,
          border: isLight ? `1px solid ${brandColors.creamDeep}` : 'none',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          p: 2.5,
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'var(--font-fraunces, serif)',
            fontStyle: 'italic',
            fontSize: '1.25rem',
            color: isLight ? brandColors.ink : brandColors.cream,
          }}
        >
          {name}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontFamily: 'monospace',
          fontSize: '0.8125rem',
          color: brandColors.inkSoft,
          mb: 1,
          letterSpacing: '0.05em',
        }}
      >
        {hex.toUpperCase()}
      </Typography>
      <Typography sx={{ fontSize: '0.9375rem', color: brandColors.ink, mb: 0.5, fontWeight: 500 }}>
        {role}
      </Typography>
      <Typography sx={{ fontSize: '0.875rem', color: brandColors.inkSoft }}>
        {usage}
      </Typography>
    </Box>
  );
}
