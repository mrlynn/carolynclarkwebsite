'use client';

import { Button } from '@mui/material';
import { brandColors } from '@/lib/theme';

export function LogoutButton() {
  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <Button
      onClick={handleLogout}
      sx={{
        color: brandColors.terracotta,
        fontWeight: 600,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: `${brandColors.terracotta}10`,
        },
      }}
    >
      Logout
    </Button>
  );
}
