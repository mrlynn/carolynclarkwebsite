'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Rating,
  Box,
  Typography,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface TestimonialModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  appointmentId?: string;
  clientEmail?: string;
  clientName?: string;
}

export default function TestimonialModal({
  open,
  onClose,
  onSuccess,
  appointmentId,
  clientEmail,
  clientName: initialClientName,
}: TestimonialModalProps) {
  const [formData, setFormData] = useState({
    client_name: initialClientName || '',
    client_email: clientEmail || '',
    rating: 5,
    title: '',
    content: '',
    service: 'other',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleRatingChange = (_event: React.SyntheticEvent, value: number | null) => {
    setFormData((prev) => ({
      ...prev,
      rating: value || 5,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        appointment_id: appointmentId,
      };

      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit review');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        onSuccess?.();
        setSuccess(false);
        setFormData({
          client_name: '',
          client_email: '',
          rating: 5,
          title: '',
          content: '',
          service: 'other',
        });
      }, 2000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const isValid =
    formData.client_name.trim() &&
    formData.client_email.trim() &&
    formData.rating > 0 &&
    formData.title.trim() &&
    formData.content.trim().length >= 20;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--color-cream)',
          fontFamily: 'Fraunces, serif',
          fontSize: '1.5rem',
        }}
      >
        Share Your Experience
        <Button
          onClick={onClose}
          sx={{
            minWidth: 'auto',
            padding: '8px',
            color: 'var(--color-ink)',
          }}
        >
          <CloseIcon fontSize="small" />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {success ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h6" sx={{ color: 'var(--color-moss)', mb: 2 }}>
              ✓ Thank you for your review!
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              We appreciate your feedback. Your review is pending approval and will be featured on our site shortly.
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#999' }}>
              You can also{' '}
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-terracotta)', textDecoration: 'none' }}
              >
                leave a review on Google
              </a>{' '}
              to help other clients discover Carolyn.
            </Typography>
          </Box>
        ) : (
          <form id="testimonial-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Name"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
              variant="outlined"
              size="small"
            />

            <TextField
              label="Email"
              name="client_email"
              type="email"
              value={formData.client_email}
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
              variant="outlined"
              size="small"
            />

            <FormControl fullWidth size="small">
              <InputLabel>Service (Optional)</InputLabel>
              <Select
                name="service"
                value={formData.service}
                onChange={handleChange}
                label="Service (Optional)"
                disabled={loading}
              >
                <MenuItem value="myofascial_release">Myofascial Release</MenuItem>
                <MenuItem value="therapeutic_massage">Therapeutic Massage</MenuItem>
                <MenuItem value="other">Other / Not Sure</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#555' }}>
                Rating
              </Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
                size="large"
                disabled={loading}
                sx={{
                  color: 'var(--color-terracotta)',
                }}
              />
            </Box>

            <TextField
              label="Review Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
              variant="outlined"
              size="small"
              placeholder="e.g., 'This changed my life' or 'Finally found relief'"
            />

            <TextField
              label="Your Review"
              name="content"
              value={formData.content}
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
              multiline
              rows={5}
              variant="outlined"
              placeholder="Share your experience (minimum 20 characters)..."
              helperText={`${formData.content.length} characters (minimum 20)`}
            />
          </form>
        )}
      </DialogContent>

      {!success && (
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="testimonial-form"
            variant="contained"
            disabled={!isValid || loading}
            sx={{
              backgroundColor: 'var(--color-terracotta)',
              '&:hover': {
                backgroundColor: 'var(--color-terracottaDeep)',
              },
              textTransform: 'none',
            }}
          >
            {loading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null}
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
