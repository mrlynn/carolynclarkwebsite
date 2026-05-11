'use client';

import { Box, Card, CardContent, Rating, Typography } from '@mui/material';
import { Testimonial } from '@/lib/models/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
  featured?: boolean;
}

export default function TestimonialCard({ testimonial, featured = false }: TestimonialCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)',
        },
        backgroundColor: 'var(--color-cream)',
        border: featured ? '2px solid var(--color-terracotta)' : '1px solid #e0e0e0',
      }}
    >
      {featured && (
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            right: 20,
            backgroundColor: 'var(--color-terracotta)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            zIndex: 1,
          }}
        >
          Featured
        </Box>
      )}

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', pt: featured ? 3 : 2 }}>
        <Box sx={{ mb: 1.5 }}>
          <Rating
            value={testimonial.rating}
            readOnly
            size="small"
            sx={{
              color: 'var(--color-terracotta)',
            }}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontFamily: 'Fraunces, serif',
            fontWeight: 600,
            color: 'var(--color-ink)',
            lineHeight: 1.3,
          }}
        >
          {testimonial.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 2,
            flex: 1,
            color: '#555',
            lineHeight: 1.6,
          }}
        >
          {testimonial.content}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Typography
            variant="caption"
            sx={{
              color: '#999',
              fontSize: '0.875rem',
            }}
          >
            — {testimonial.client_name}
          </Typography>

          {testimonial.service && testimonial.service !== 'other' && (
            <Typography
              variant="caption"
              sx={{
                backgroundColor: 'var(--color-moss)',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
              }}
            >
              {testimonial.service === 'myofascial_release' ? 'MFR' : 'Massage'}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
