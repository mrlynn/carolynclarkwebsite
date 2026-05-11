'use client';

import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to MongoDB or email service
    console.log('Form submitted:', formData);
    alert('Thank you for reaching out! I will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
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

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
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
                    '&:hover': {
                      backgroundColor: brandColors.terracottaDeep,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </ScrollReveal>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
