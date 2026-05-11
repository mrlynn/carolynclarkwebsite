'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import TestimonialCard from '@/components/TestimonialCard';
import TestimonialModal from '@/components/TestimonialModal';
import { Testimonial } from '@/lib/models/testimonial';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, [refreshKey]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/testimonials?limit=20&page=1');
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError('Failed to load testimonials');
        return;
      }

      setTestimonials(data.testimonials);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessfulSubmission = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Box>
      <Navigation />

      <Box sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 6, md: 8 }, backgroundColor: '#fafaf8' }}>
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Fraunces, serif',
                fontWeight: 700,
                color: 'var(--color-ink)',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              What Our Clients Say
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                maxWidth: '600px',
                mx: 'auto',
                mb: 4,
              }}
            >
              Hear from people who've experienced the healing power of Myofascial Release and therapeutic massage.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
              sx={{
                backgroundColor: 'var(--color-terracotta)',
                color: 'white',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'var(--color-terracottaDeep)',
                },
              }}
            >
              Share Your Experience
            </Button>
          </Box>

          {/* Error State */}
          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {/* Loading State */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress sx={{ color: 'var(--color-terracotta)' }} />
            </Box>
          ) : testimonials.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="body1" sx={{ color: '#999', mb: 3 }}>
                Be the first to share your experience!
              </Typography>
              <Button
                variant="contained"
                onClick={() => setModalOpen(true)}
                sx={{
                  backgroundColor: 'var(--color-moss)',
                  '&:hover': {
                    backgroundColor: 'var(--color-mossDeep)',
                  },
                  textTransform: 'none',
                }}
              >
                Leave Your Review
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: 3,
                mb: 6,
              }}
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id?.toString() || Math.random()}
                  testimonial={testimonial}
                  featured={testimonial.is_featured}
                />
              ))}
            </Box>
          )}

          {/* CTA Section */}
          {testimonials.length > 0 && (
            <Box
              sx={{
                backgroundColor: 'var(--color-cream)',
                borderRadius: 2,
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                border: '1px solid #e0e0e0',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'Fraunces, serif',
                  mb: 2,
                  color: 'var(--color-ink)',
                }}
              >
                Help Others Discover Healing
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  mb: 3,
                  maxWidth: '500px',
                  mx: 'auto',
                }}
              >
                Have you experienced the benefits of Carolyn's healing work? Your story could inspire someone who's been searching for relief.
              </Typography>
              <Button
                variant="contained"
                onClick={() => setModalOpen(true)}
                sx={{
                  backgroundColor: 'var(--color-terracotta)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  mr: 2,
                  '&:hover': {
                    backgroundColor: 'var(--color-terracottaDeep)',
                  },
                }}
              >
                Share Your Story
              </Button>
              <Button
                variant="outlined"
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderColor: 'var(--color-moss)',
                  color: 'var(--color-moss)',
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(123, 155, 110, 0.05)',
                    borderColor: 'var(--color-mossDeep)',
                  },
                }}
              >
                Leave a Review on Google
              </Button>
            </Box>
          )}

          {/* Testimonial Modal */}
          <TestimonialModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSuccess={handleSuccessfulSubmission}
          />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
