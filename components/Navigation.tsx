'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { brandColors } from '@/lib/theme';
import Link from 'next/link';

export function Navigation() {
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Myofascial Release', href: '/mfr' },
    { label: 'Therapeutic Massage', href: '/massage' },
    { label: 'What to Expect', href: '/what-to-expect' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <Box
      component="nav"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: `${brandColors.cream}f0`,
        borderBottom: `1px solid ${brandColors.creamDeep}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem 0',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: brandColors.ink,
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: brandColors.terracotta,
                },
              }}
            >
              Carolyn Clark
            </Typography>
          </Link>

          {/* Desktop Nav */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 3,
              alignItems: 'center',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    color: brandColors.inkSoft,
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: brandColors.terracotta,
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      width: '0%',
                      height: '2px',
                      backgroundColor: brandColors.terracotta,
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  {link.label}
                </Typography>
              </Link>
            ))}
          </Box>

          {/* CTA Button */}
          <Button
            variant="contained"
            href="tel:+1-610-555-1234"
            sx={{
              backgroundColor: brandColors.terracotta,
              color: brandColors.cream,
              padding: '10px 24px',
              fontSize: '0.9rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '999px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: brandColors.terracottaDeep,
                transform: 'translateY(-2px)',
              },
            }}
          >
            Call Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
