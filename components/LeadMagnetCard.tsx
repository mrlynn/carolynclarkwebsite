'use client';

import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import { brandColors } from '@/lib/theme';
import { useState, useEffect, useId } from 'react';
import type { Resource } from '@/lib/resources';

declare global {
  interface Window {
    turnstile?: {
      render: (selector: string, options: any) => string;
      reset: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
    };
  }
}

interface LeadMagnetCardProps {
  resource: Resource;
}

export function LeadMagnetCard({ resource }: LeadMagnetCardProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string>('');

  const uniqueId = useId();
  const containerId = `turnstile-${uniqueId.replace(/:/g, '')}`;

  useEffect(() => {
    if (document.querySelector('script[src*="turnstile"]')) {
      if (window.turnstile) {
        setTurnstileReady(true);
      } else {
        const check = setInterval(() => {
          if (window.turnstile) {
            setTurnstileReady(true);
            clearInterval(check);
          }
        }, 100);
        return () => clearInterval(check);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => setTurnstileReady(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (
      turnstileReady &&
      window.turnstile &&
      !turnstileWidgetId &&
      document.getElementById(containerId)
    ) {
      const widgetId = window.turnstile.render(`#${containerId}`, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
        theme: 'light',
      });
      setTurnstileWidgetId(widgetId);
    }
  }, [turnstileReady, turnstileWidgetId, containerId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!turnstileReady || !window.turnstile || !turnstileWidgetId) {
        throw new Error('Verification is not ready. Please try again.');
      }

      const token = window.turnstile.getResponse(turnstileWidgetId);
      if (!token) {
        throw new Error('Please complete the verification.');
      }

      const response = await fetch('/api/resources/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          resourceSlug: resource.slug,
          turnstileToken: token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      if (window.turnstile && turnstileWidgetId) {
        window.turnstile.reset(turnstileWidgetId);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: brandColors.creamDeep,
        borderRadius: '24px',
        overflow: 'hidden',
        border: `1px solid ${brandColors.creamDeep}`,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          borderColor: brandColors.terracotta,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        },
      }}
    >
      <Box sx={{ padding: { xs: '24px', md: '40px' } }}>
        <Chip
          label={resource.subtitle}
          sx={{
            backgroundColor: `${brandColors.moss}20`,
            color: brandColors.moss,
            fontWeight: 600,
            fontSize: '0.8rem',
            mb: 2,
          }}
        />

        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Fraunces, serif',
            fontWeight: 700,
            color: brandColors.ink,
            mb: 1.5,
            fontSize: { xs: '1.4rem', md: '1.75rem' },
            lineHeight: 1.3,
          }}
        >
          {resource.title}
        </Typography>

        <Typography
          sx={{
            color: brandColors.inkSoft,
            mb: 3,
            fontSize: '1rem',
            lineHeight: 1.7,
          }}
        >
          {resource.description}
        </Typography>

        <Typography
          sx={{
            color: brandColors.inkSoft,
            fontSize: '0.85rem',
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          PDF &middot; {resource.pageCount}
        </Typography>

        {success ? (
          <Box
            sx={{
              backgroundColor: `${brandColors.moss}15`,
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: brandColors.moss,
                fontFamily: 'Fraunces, serif',
                fontWeight: 600,
                mb: 1,
              }}
            >
              Check your email!
            </Typography>
            <Typography sx={{ color: brandColors.inkSoft, fontSize: '0.95rem' }}>
              We&apos;ve sent a download link to <strong>{email}</strong>.
              The link expires in 72 hours.
            </Typography>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>
                {error}
              </Alert>
            )}

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1.5,
                mb: 1.5,
              }}
            >
              <TextField
                name="firstName"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                size="small"
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white',
                  },
                }}
              />
              <TextField
                name="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                size="small"
                sx={{
                  flex: 1.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white',
                  },
                }}
              />
            </Box>

            <div id={containerId} style={{ marginBottom: '12px' }} />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
              sx={{
                backgroundColor: brandColors.terracotta,
                color: 'white',
                padding: '12px 32px',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '999px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: brandColors.terracottaDeep,
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  backgroundColor: brandColors.terracotta,
                  opacity: 0.7,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Get Your Free Guide'
              )}
            </Button>

            <Typography
              sx={{
                color: brandColors.inkSoft,
                fontSize: '0.75rem',
                mt: 1.5,
                textAlign: 'center',
                opacity: 0.7,
              }}
            >
              No spam, ever. We&apos;ll send your guide and that&apos;s it.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
