'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { brandColors } from '@/lib/theme';

export default function ClientInfoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientNotes: '',
    agreedToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const serviceId = sessionStorage.getItem('selectedServiceId');
    const scheduledAt = sessionStorage.getItem('scheduledAt');

    if (!serviceId || !scheduledAt) {
      router.push('/booking/service');
    }
  }, [router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Name is required';
    }

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Invalid email address';
    }

    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.clientPhone.replace(/\D/g, ''))) {
      newErrors.clientPhone = 'Phone number must be at least 10 digits';
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the booking terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const serviceId = sessionStorage.getItem('selectedServiceId');
      const scheduledAt = sessionStorage.getItem('scheduledAt');

      if (!serviceId || !scheduledAt) {
        throw new Error('Missing booking information');
      }

      // Store in session storage for confirmation page
      sessionStorage.setItem('clientName', formData.clientName);
      sessionStorage.setItem('clientEmail', formData.clientEmail);
      sessionStorage.setItem('clientPhone', formData.clientPhone);
      sessionStorage.setItem('clientNotes', formData.clientNotes);

      router.push('/booking/confirmation');
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 3, color: brandColors.ink }}>
        Your Information
      </Typography>

      {errors.general && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errors.general}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Full Name"
        value={formData.clientName}
        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
        margin="normal"
        error={!!errors.clientName}
        helperText={errors.clientName}
        disabled={loading}
      />

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        value={formData.clientEmail}
        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
        margin="normal"
        error={!!errors.clientEmail}
        helperText={errors.clientEmail}
        disabled={loading}
      />

      <TextField
        fullWidth
        label="Phone Number"
        value={formData.clientPhone}
        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
        margin="normal"
        error={!!errors.clientPhone}
        helperText={errors.clientPhone}
        placeholder="(555) 555-5555"
        disabled={loading}
      />

      <TextField
        fullWidth
        label="Notes (Optional)"
        multiline
        rows={3}
        value={formData.clientNotes}
        onChange={(e) => setFormData({ ...formData, clientNotes: e.target.value })}
        margin="normal"
        placeholder="Any special requests or information we should know?"
        disabled={loading}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.agreedToTerms}
            onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
            disabled={loading}
          />
        }
        label="I agree to the cancellation and rescheduling policy"
        sx={{ marginTop: 2, marginBottom: 2 }}
      />

      {errors.agreedToTerms && (
        <Typography variant="caption" sx={{ color: '#d32f2f', display: 'block', marginBottom: 2 }}>
          {errors.agreedToTerms}
        </Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, marginTop: 4 }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/booking/calendar')}
          disabled={loading}
          sx={{
            borderColor: brandColors.moss,
            color: brandColors.moss,
            textTransform: 'none',
          }}
        >
          ← Back
        </Button>
        <Button
          variant="contained"
          onClick={handleContinue}
          disabled={loading}
          sx={{
            backgroundColor: brandColors.terracotta,
            color: brandColors.cream,
            textTransform: 'none',
            '&:disabled': {
              backgroundColor: '#ccc',
            },
          }}
        >
          {loading ? 'Processing...' : 'Review Booking →'}
        </Button>
      </Box>
    </Box>
  );
}
