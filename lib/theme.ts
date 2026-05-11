'use client';

import { createTheme } from '@mui/material/styles';
import { Fraunces, Inter } from 'next/font/google';

export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz'],
  style: ['normal', 'italic'],
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

// Brand tokens — the single source of truth.
// Change these here and the entire site updates.
// Updated for Carolyn: BRIGHT, vibrant, warm, therapeutic (not clinical)
export const brandColors = {
  cream: '#fef8f3',           // brighter, warmer white
  creamDeep: '#f9f0e6',       // warmer secondary background
  terracotta: '#f5a860',      // BRIGHTER primary accent — vibrant warm gold
  terracottaDeep: '#e88d48',  // hover state — deeper but still bright
  moss: '#7fbaa5',            // BRIGHTER sage green — more vibrant, healing
  mossDeep: '#6ba390',        // hover state — deeper sage
  gold: '#f5c66f',            // BRIGHTER warm gold — vibrant tertiary accent
  ink: '#2b2420',             // primary text + inverted sections
  inkSoft: '#5a4e45',         // body text on cream
  inkMute: '#8a7d72',         // muted text
} as const;

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: brandColors.terracotta,
      dark: brandColors.terracottaDeep,
      contrastText: brandColors.cream,
    },
    secondary: {
      main: brandColors.moss,
      dark: brandColors.mossDeep,
      contrastText: brandColors.cream,
    },
    background: {
      default: brandColors.cream,
      paper: brandColors.creamDeep,
    },
    text: {
      primary: brandColors.ink,
      secondary: brandColors.inkSoft,
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontFamily: fraunces.style.fontFamily,
      fontWeight: 400,
      letterSpacing: '-0.02em',
      lineHeight: 1.05,
    },
    h2: {
      fontFamily: fraunces.style.fontFamily,
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: 1.1,
    },
    h3: {
      fontFamily: fraunces.style.fontFamily,
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: 1.15,
    },
    h4: {
      fontFamily: fraunces.style.fontFamily,
      fontWeight: 400,
      lineHeight: 1.2,
    },
    body1: { fontSize: '1rem', lineHeight: 1.65 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.6 },
    button: {
      fontWeight: 500,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      fontSize: '0.8125rem',
    },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: '14px 28px',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});

export default theme;
