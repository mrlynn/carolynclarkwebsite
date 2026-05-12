'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { brandColors } from '@/lib/theme';
import { formatDisplayDateTime } from '@/lib/date-helpers';

interface Service {
  _id: string;
  name: string;
  durations: Array<{ durationMinutes: number; price: number }>;
}

export default function ConfirmationPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>(null);
  const [service, setService] = useState<Service | null>(null);
  const [durationMinutes, setDurationMinutes] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const serviceId = sessionStorage.getItem('selectedServiceId');
    const scheduledAt = sessionStorage.getItem('scheduledAt');
    const clientName = sessionStorage.getItem('clientName');
    const clientEmail = sessionStorage.getItem('clientEmail');
    const clientPhone = sessionStorage.getItem('clientPhone');
    const clientNotes = sessionStorage.getItem('clientNotes');
    const selectedDuration = sessionStorage.getItem('selectedDurationMinutes');

    if (!serviceId || !scheduledAt || !clientName || !clientEmail || !clientPhone || !selectedDuration) {
      router.push('/booking/service');
      return;
    }

    setBookingData({
      serviceId,
      scheduledAt,
      clientName,
      clientEmail,
      clientPhone,
      clientNotes,
    });

    setDurationMinutes(parseInt(selectedDuration, 10));
    fetchServiceDetails(serviceId);
  }, [router]);

  const fetchServiceDetails = async (serviceId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/services');
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      const svc = data.find((s: Service) => s._id === serviceId);
      setService(svc);
    } catch (err) {
      setError('Failed to load service details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: bookingData.serviceId,
          clientName: bookingData.clientName,
          clientEmail: bookingData.clientEmail,
          clientPhone: bookingData.clientPhone,
          clientNotes: bookingData.clientNotes,
          scheduledAt: bookingData.scheduledAt,
          duration_minutes: durationMinutes,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create booking');
      }

      // Clear session storage
      sessionStorage.removeItem('selectedServiceId');
      sessionStorage.removeItem('scheduledAt');
      sessionStorage.removeItem('clientName');
      sessionStorage.removeItem('clientEmail');
      sessionStorage.removeItem('clientPhone');
      sessionStorage.removeItem('clientNotes');
      sessionStorage.removeItem('selectedDurationMinutes');

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (success) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ marginBottom: 2, color: brandColors.terracotta, fontWeight: 600 }}>
          ✓ Booking Confirmed!
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 3, color: brandColors.inkSoft }}>
          A confirmation email has been sent to {bookingData?.clientEmail}
        </Typography>

        <Card sx={{ marginBottom: 3, backgroundColor: `${brandColors.terracotta}10` }}>
          <CardContent>
            <Typography variant="body2" sx={{ marginBottom: 1, color: brandColors.ink }}>
              <strong>Confirmation Details:</strong>
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: brandColors.inkSoft }}>
              Check your email for your confirmation link and appointment details.
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', marginTop: 1, color: brandColors.inkSoft }}>
              You can cancel or reschedule by clicking the link in the confirmation email.
            </Typography>
          </CardContent>
        </Card>

        <Button
          fullWidth
          variant="contained"
          onClick={() => router.push('/')}
          sx={{
            backgroundColor: brandColors.terracotta,
            color: brandColors.cream,
            textTransform: 'none',
          }}
        >
          Return to Home
        </Button>
      </Box>
    );
  }

  if (!bookingData || !service) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 3, color: brandColors.ink }}>
        Review Your Booking
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ marginBottom: 2, color: brandColors.ink, fontWeight: 600 }}>
            Service Details
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
              Service
            </Typography>
            <Typography variant="body1" sx={{ color: brandColors.ink, fontWeight: 600 }}>
              {service.name}
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
              Date & Time
            </Typography>
            <Typography variant="body1" sx={{ color: brandColors.ink, fontWeight: 600 }}>
              {formatDisplayDateTime(bookingData.scheduledAt)}
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
              Duration
            </Typography>
            <Typography variant="body1" sx={{ color: brandColors.ink, fontWeight: 600 }}>
              {durationMinutes} minutes
            </Typography>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
              Total
            </Typography>
            <Typography variant="h6" sx={{ color: brandColors.terracotta, fontWeight: 600 }}>
              ${service.durations.find(d => d.durationMinutes === durationMinutes)?.price || 'N/A'}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ marginBottom: 2, color: brandColors.ink, fontWeight: 600 }}>
            Your Information
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
              Name
            </Typography>
            <Typography variant="body1" sx={{ color: brandColors.ink }}>
              {bookingData.clientName}
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
              Email
            </Typography>
            <Typography variant="body1" sx={{ color: brandColors.ink }}>
              {bookingData.clientEmail}
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
              Phone
            </Typography>
            <Typography variant="body1" sx={{ color: brandColors.ink }}>
              {bookingData.clientPhone}
            </Typography>
          </Box>

          {bookingData.clientNotes && (
            <Box>
              <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
                Notes
              </Typography>
              <Typography variant="body1" sx={{ color: brandColors.ink }}>
                {bookingData.clientNotes}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/booking/info')}
          disabled={submitting}
          sx={{
            borderColor: brandColors.moss,
            color: brandColors.moss,
            textTransform: 'none',
          }}
        >
          ← Back
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleConfirmBooking}
          disabled={submitting}
          sx={{
            backgroundColor: brandColors.terracotta,
            color: brandColors.cream,
            textTransform: 'none',
            '&:disabled': {
              backgroundColor: '#ccc',
            },
          }}
        >
          {submitting ? 'Confirming...' : 'Confirm Booking'}
        </Button>
      </Box>
    </Box>
  );
}
