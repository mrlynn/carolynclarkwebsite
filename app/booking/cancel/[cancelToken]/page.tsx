'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { brandColors } from '@/lib/theme';
import { format } from 'date-fns';

interface AppointmentDetails {
  _id: string;
  client_name: string;
  client_email: string;
  service_name: string;
  scheduled_at: string;
  duration_minutes: number;
  total_price: number;
}

export default function CancelAppointmentPage() {
  const router = useRouter();
  const params = useParams();
  const cancelToken = params.cancelToken as string;

  const [appointment, setAppointment] = useState<AppointmentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAppointment();
  }, [cancelToken]);

  const fetchAppointment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/appointments/${cancelToken}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to load appointment');
      }
      const data = await response.json();
      setAppointment(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelConfirm = async () => {
    setCancelling(true);
    setShowConfirmDialog(false);

    try {
      const response = await fetch(`/api/appointments/${cancelToken}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to cancel appointment');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel appointment');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !appointment) {
    return (
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
        <Button
          variant="outlined"
          onClick={() => router.push('/')}
          sx={{
            borderColor: brandColors.moss,
            color: brandColors.moss,
            textTransform: 'none',
          }}
        >
          Return Home
        </Button>
      </Box>
    );
  }

  if (success) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ marginBottom: 2, color: brandColors.terracotta, fontWeight: 600 }}>
          ✓ Appointment Cancelled
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 3, color: brandColors.inkSoft }}>
          A cancellation confirmation has been sent to {appointment?.client_email}
        </Typography>

        <Card sx={{ marginBottom: 3, backgroundColor: `${brandColors.terracotta}10` }}>
          <CardContent>
            <Typography variant="body2" sx={{ marginBottom: 1, color: brandColors.ink }}>
              <strong>What's Next:</strong>
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: brandColors.inkSoft }}>
              You can book a new appointment anytime by visiting our booking page.
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

  if (!appointment) {
    return null;
  }

  const appointmentDate = new Date(appointment.scheduled_at);
  const dateStr = format(appointmentDate, 'MMMM d, yyyy');
  const timeStr = format(appointmentDate, 'h:mm a');

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 3, color: brandColors.ink }}>
        Cancel Appointment
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ marginBottom: 2, color: brandColors.ink, fontWeight: 600 }}>
            Appointment Details
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
              Service
            </Typography>
            <Typography variant="body1" sx={{ color: brandColors.ink, fontWeight: 600 }}>
              {appointment.service_name}
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
              Date & Time
            </Typography>
            <Typography variant="body1" sx={{ color: brandColors.ink, fontWeight: 600 }}>
              {dateStr} at {timeStr}
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
              Duration
            </Typography>
            <Typography variant="body1" sx={{ color: brandColors.ink, fontWeight: 600 }}>
              {appointment.duration_minutes} minutes
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
            <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
              Full Refund
            </Typography>
            <Typography variant="h6" sx={{ color: brandColors.terracotta, fontWeight: 600 }}>
              ${appointment.total_price.toFixed(2)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Alert severity="warning" sx={{ marginBottom: 3 }}>
        Once you cancel this appointment, it cannot be recovered. A cancellation confirmation will be sent to your email.
      </Alert>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/')}
          disabled={cancelling}
          sx={{
            borderColor: brandColors.moss,
            color: brandColors.moss,
            textTransform: 'none',
          }}
        >
          Keep Appointment
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => setShowConfirmDialog(true)}
          disabled={cancelling}
          sx={{
            backgroundColor: '#d32f2f',
            color: 'white',
            textTransform: 'none',
            '&:disabled': {
              backgroundColor: '#ccc',
            },
          }}
        >
          {cancelling ? 'Cancelling...' : 'Cancel Appointment'}
        </Button>
      </Box>

      <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to cancel your {appointment.service_name} appointment on {dateStr} at {timeStr}?
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 2, color: brandColors.inkSoft }}>
            You will receive a full refund of ${appointment.total_price.toFixed(2)}.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>
            No, Keep It
          </Button>
          <Button
            onClick={handleCancelConfirm}
            variant="contained"
            sx={{ backgroundColor: '#d32f2f', color: 'white' }}
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
