'use client';

import { Box, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { brandColors } from '@/lib/theme';
import { content } from '@/lib/content';

export function MobilePhoneBar() {
  const phoneNumber = content.business.phone;
  const phoneLink = `tel:${phoneNumber.replace(/\D/g, '')}`;

  return (
    <Box
      component="a"
      href={phoneLink}
      sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: brandColors.terracotta,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        padding: '12px 16px',
        textDecoration: 'none',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'all 0.2s ease',
        '&:active': {
          backgroundColor: brandColors.terracottaDeep,
          transform: 'scale(0.98)',
        },
        '&:hover': {
          backgroundColor: brandColors.terracottaDeep,
        },
      }}
    >
      <PhoneIcon sx={{ fontSize: '1.2rem' }} />
      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
        }}
      >
        Call to Book: {phoneNumber}
      </Typography>
    </Box>
  );
}
