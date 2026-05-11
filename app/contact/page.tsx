'use client';

import { Box, Container, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (selector: string, options: any) => string;
      reset: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
    };
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string>('');

  // Load Turnstile script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setTurnstileReady(true);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Render Turnstile widget after script loads
  useEffect(() => {
    if (turnstileReady && window.turnstile && !turnstileWidgetId) {
      const widgetId = window.turnstile.render('#turnstile-container', {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
        theme: 'light',
      });
      setTurnstileWidgetId(widgetId);
    }
  }, [turnstileReady, turnstileWidgetId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      if (!turnstileReady || !window.turnstile || !turnstileWidgetId) {
        throw new Error('Verification is not ready. Please try again.');
      }

      // Get Turnstile token
      const token = window.turnstile.getResponse(turnstileWidgetId);
      if (!token) {
        throw new Error('Please complete the verification.');
      }

      // Submit form to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          turnstileToken: token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Reset Turnstile widget
      if (window.turnstile && turnstileWidgetId) {
        window.turnstile.reset(turnstileWidgetId);
      }

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Reset Turnstile widget on error
      if (window.turnstile && turnstileWidgetId) {
        window.turnstile.reset(turnstileWidgetId);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Navigation />

      {/* Hero */}
      <Box
        sx={{
          backgroundColor: `linear-gradient(135deg, ${brandColors.terracotta}10 0%, ${brandColors.moss}05 100%)`,
          padding: { xs: '3rem 2rem', md: '5rem 2rem' },
        }}
      >
        <Container maxWidth="lg">
          <ScrollReveal>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 400,
                color: brandColors.ink,
                marginBottom: 2,
              }}
            >
              Get in Touch
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                color: brandColors.inkSoft,
                maxWidth: '700px',
              }}
            >
              Have questions? Ready to schedule? I'd love to hear from you. Contact me via phone, email, or the form below.
            </Typography>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Contact Info & Form */}
      <Box
        sx={{
          padding: { xs: '3rem 2rem', md: '5rem 2rem' },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
            }}
          >
            {/* Contact Info */}
            <ScrollReveal>
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    color: brandColors.ink,
                    marginBottom: 3,
                  }}
                >
                  Contact Information
                </Typography>

                <Box sx={{ marginBottom: 3 }}>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: brandColors.terracotta,
                      textTransform: 'uppercase',
                      marginBottom: 0.5,
                    }}
                  >
                    Phone
                  </Typography>
                  <Typography
                    component="a"
                    href="tel:+1-610-555-1234"
                    sx={{
                      fontSize: '1.2rem',
                      color: brandColors.ink,
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        color: brandColors.terracotta,
                      },
                    }}
                  >
                    +1 (610) 555-1234
                  </Typography>
                </Box>

                <Box sx={{ marginBottom: 3 }}>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: brandColors.terracotta,
                      textTransform: 'uppercase',
                      marginBottom: 0.5,
                    }}
                  >
                    Email
                  </Typography>
                  <Typography
                    component="a"
                    href="mailto:carolyn@example.com"
                    sx={{
                      fontSize: '1.1rem',
                      color: brandColors.ink,
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        color: brandColors.terracotta,
                      },
                    }}
                  >
                    carolyn@example.com
                  </Typography>
                </Box>

                <Box sx={{ marginBottom: 3 }}>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: brandColors.terracotta,
                      textTransform: 'uppercase',
                      marginBottom: 0.5,
                    }}
                  >
                    Location
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      color: brandColors.ink,
                      lineHeight: 1.8,
                    }}
                  >
                    Kimberton / Phoenixville, PA
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: brandColors.terracotta,
                      textTransform: 'uppercase',
                      marginBottom: 0.5,
                    }}
                  >
                    Availability
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: brandColors.inkSoft,
                    }}
                  >
                    By appointment. Call or email for current availability.
                  </Typography>
                </Box>
              </Box>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={0.1}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {error && (
                  <Alert severity="error" sx={{ marginBottom: 1 }}>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert severity="success" sx={{ marginBottom: 1 }}>
                    Thank you for reaching out! I'll get back to you soon.
                  </Alert>
                )}
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: brandColors.creamDeep,
                      },
                      '&:hover fieldset': {
                        borderColor: brandColors.terracotta,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: brandColors.terracotta,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: brandColors.inkSoft,
                    },
                  }}
                />

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: brandColors.creamDeep,
                      },
                      '&:hover fieldset': {
                        borderColor: brandColors.terracotta,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: brandColors.terracotta,
                      },
                    },
                  }}
                />

                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: brandColors.creamDeep,
                      },
                      '&:hover fieldset': {
                        borderColor: brandColors.terracotta,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: brandColors.terracotta,
                      },
                    },
                  }}
                />

                <TextField
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={5}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: brandColors.creamDeep,
                      },
                      '&:hover fieldset': {
                        borderColor: brandColors.terracotta,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: brandColors.terracotta,
                      },
                    },
                  }}
                />

                <div id="turnstile-container" style={{ marginTop: '16px', marginBottom: '16px' }}></div>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading || !turnstileReady}
                  sx={{
                    backgroundColor: brandColors.terracotta,
                    color: brandColors.cream,
                    padding: '16px 32px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '8px',
                    marginTop: 1,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    '&:hover:not(:disabled)': {
                      backgroundColor: brandColors.terracottaDeep,
                      transform: 'translateY(-2px)',
                    },
                    '&:disabled': {
                      opacity: 0.6,
                      cursor: 'not-allowed',
                    },
                  }}
                >
                  {loading && <CircularProgress size={20} sx={{ color: 'inherit' }} />}
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>

                <Typography variant="caption" sx={{ color: brandColors.inkSoft, textAlign: 'center', fontSize: '0.75rem' }}>
                  This site is protected by Cloudflare Turnstile and the
                  <Box component="span" sx={{ color: brandColors.terracotta, mx: 0.5 }}>
                    <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                      Privacy Policy
                    </a>
                  </Box>
                  applies.
                </Typography>
              </Box>
            </ScrollReveal>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
