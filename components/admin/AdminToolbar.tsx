'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { brandColors } from '@/lib/theme';
import { LogoutButton } from '@/components/admin/LogoutButton';

const NAV_LINKS: { href: string; label: string; isActive: (pathname: string) => boolean }[] = [
  {
    href: '/admin',
    label: 'Dashboard',
    isActive: (p) => p === '/admin' || p === '/admin/',
  },
  {
    href: '/admin/services',
    label: 'Services',
    isActive: (p) => p.startsWith('/admin/services'),
  },
  {
    href: '/admin/availability',
    label: 'Availability',
    isActive: (p) => p === '/admin/availability',
  },
  {
    href: '/admin/availability/rules',
    label: 'Weekly hours',
    isActive: (p) => p.startsWith('/admin/availability/rules'),
  },
  {
    href: '/admin/appointments',
    label: 'Appointments',
    isActive: (p) => p.startsWith('/admin/appointments'),
  },
  {
    href: '/admin/testimonials',
    label: 'Testimonials',
    isActive: (p) => p.startsWith('/admin/testimonials'),
  },
];

function desktopLinkSx(active: boolean) {
  return {
    textTransform: 'none' as const,
    fontWeight: active ? 600 : 500,
    fontSize: '0.9rem',
    color: active ? brandColors.terracottaDeep : brandColors.inkSoft,
    backgroundColor: active ? `${brandColors.terracotta}16` : 'transparent',
    minWidth: 'auto',
    px: 1.5,
    py: 0.75,
    borderRadius: 2,
    '&:hover': {
      backgroundColor: `${brandColors.terracotta}12`,
      color: brandColors.ink,
    },
  };
}

export function AdminToolbar({ userEmail }: { userEmail: string | null }) {
  const pathname = usePathname() || '';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{
        backgroundColor: brandColors.creamDeep,
        color: brandColors.ink,
        boxShadow: '0 1px 0 rgba(43, 36, 32, 0.08)',
        borderBottom: `1px solid rgba(43, 36, 32, 0.06)`,
      }}
    >
      <Toolbar
        sx={{
          color: brandColors.ink,
          flexWrap: 'nowrap',
          gap: 1,
          py: 1,
        }}
      >
        {isMobile && (
          <>
            <IconButton
              edge="start"
              aria-label="Open admin navigation"
              onClick={() => setDrawerOpen(true)}
              sx={{ color: brandColors.ink, mr: 0.5 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box
                sx={{ width: 280, pt: 2 }}
                role="navigation"
                aria-label="Admin sections"
              >
                <Typography
                  variant="subtitle2"
                  sx={{ px: 2, pb: 1, color: brandColors.inkMute, textTransform: 'uppercase', letterSpacing: '0.08em' }}
                >
                  Admin
                </Typography>
                <List dense>
                  {NAV_LINKS.map(({ href, label, isActive }) => {
                    const active = isActive(pathname);
                    return (
                      <ListItemButton
                        key={href}
                        component={Link}
                        href={href}
                        selected={active}
                        onClick={() => setDrawerOpen(false)}
                        sx={{
                          '&.Mui-selected': {
                            backgroundColor: `${brandColors.terracotta}18`,
                            borderLeft: `4px solid ${brandColors.terracotta}`,
                          },
                          '&.Mui-selected:hover': {
                            backgroundColor: `${brandColors.terracotta}24`,
                          },
                        }}
                      >
                        <ListItemText
                          primary={label}
                          slotProps={{
                            primary: {
                              sx: {
                                fontWeight: active ? 600 : 400,
                                color: brandColors.ink,
                              },
                            },
                          }}
                        />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Box>
            </Drawer>
          </>
        )}

        <Typography
          variant="h6"
          component={Link}
          href="/admin"
          sx={{
            fontWeight: 600,
            color: brandColors.ink,
            textDecoration: 'none',
            flexShrink: 0,
            minWidth: 0,
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            '&:hover': { color: brandColors.terracottaDeep },
          }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Carolyn Clark — Admin
          </Box>
          <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
            Admin
          </Box>
        </Typography>

        {!isMobile && (
          <Box
            component="nav"
            aria-label="Admin sections"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 0.5,
              flex: 1,
              ml: 1,
              minWidth: 0,
            }}
          >
            {NAV_LINKS.map(({ href, label, isActive }) => (
              <Button
                key={href}
                component={Link}
                href={href}
                disableElevation
                sx={desktopLinkSx(isActive(pathname))}
              >
                {label}
              </Button>
            ))}
          </Box>
        )}

        {isMobile && <Box sx={{ flex: 1 }} />}

        {userEmail && (
          <Typography
            variant="body2"
            component="span"
            sx={{
              display: { xs: 'none', sm: 'block' },
              marginRight: { sm: 1, md: 2 },
              color: brandColors.inkSoft,
              maxWidth: { sm: 160, md: 280 },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flexShrink: 1,
              textAlign: 'right',
            }}
            title={userEmail}
          >
            {userEmail}
          </Typography>
        )}

        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}
