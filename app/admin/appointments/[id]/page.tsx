'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Chip,
} from '@mui/material';
import { brandColors } from '@/lib/theme';
import { format } from 'date-fns';

interface AppointmentDetail {
  _id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_notes: string;
  service_name: string;
  scheduled_at: string;
  duration_minutes: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  confirmation_sent: boolean;
  reminder_sent: boolean;
  created_at: string;
  updated_at: string;
}

export default function AppointmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const appointmentId = params.id as string;

  const [appointment, setAppointment] = useState<AppointmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [editNotes, setEditNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showResendDialog, setShowResendDialog] = useState(false);
  const [emailTypeToResend, setEmailTypeToResend] = useState<'confirmation' | 'reminder'>('confirmation');

  useEffect(() => {
    fetchAppointment();
  }, [appointmentId]);

  const fetchAppointment = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/appointments/${appointmentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch appointment');
      }
      const data = await response.json();
      setAppointment(data);
      setEditNotes(data.client_notes);
      setNewStatus(data.status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!appointment || newStatus === appointment.status) {
      return;
    }

    setUpdating(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/admin/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update appointment');
      }

      setSuccess('Status updated successfully');
      setAppointment({ ...appointment, status: newStatus as any });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update appointment');
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateNotes = async () => {
    if (!appointment) return;

    setUpdating(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/admin/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_notes: editNotes }),
      });

      if (!response.ok) {
        throw new Error('Failed to update notes');
      }

      setSuccess('Notes updated successfully');
      setAppointment({ ...appointment, client_notes: editNotes });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update notes');
    } finally {
      setUpdating(false);
    }
  };

  const handleResendEmail = async () => {
    if (!appointment) return;

    setUpdating(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/appointments/${appointmentId}/resend-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailType: emailTypeToResend }),
      });

      if (!response.ok) {
        throw new Error('Failed to resend email');
      }

      setSuccess(`${emailTypeToResend} email sent successfully`);
      setShowResendDialog(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend email');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelAppointment = async () => {
    if (!appointment) return;

    setUpdating(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/appointments/${appointmentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }

      setSuccess('Appointment cancelled');
      setTimeout(() => {
        router.push('/admin/appointments');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel appointment');
    } finally {
      setUpdating(false);
      setShowCancelDialog(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!appointment) {
    return (
      <Box>
        <Alert severity="error">{error || 'Appointment not found'}</Alert>
        <Button
          variant="outlined"
          onClick={() => router.push('/admin/appointments')}
          sx={{
            borderColor: brandColors.moss,
            color: brandColors.moss,
            textTransform: 'none',
            marginTop: 2,
          }}
        >
          ← Back to Appointments
        </Button>
      </Box>
    );
  }

  const appointmentDate = new Date(appointment.scheduled_at);
  const dateStr = format(appointmentDate, 'MMMM d, yyyy');
  const timeStr = format(appointmentDate, 'h:mm a');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#7B9B6E';
      case 'completed':
        return '#2196F3';
      case 'cancelled':
        return '#F44336';
      default:
        return '#FF9800';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="h6" sx={{ color: brandColors.ink }}>
          Appointment Details
        </Typography>
        <Button
          variant="outlined"
          onClick={() => router.push('/admin/appointments')}
          sx={{
            borderColor: brandColors.moss,
            color: brandColors.moss,
            textTransform: 'none',
          }}
        >
          ← Back
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          {success}
        </Alert>
      )}

      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ marginBottom: 2, color: brandColors.ink, fontWeight: 600 }}>
            Appointment Information
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, marginBottom: 3 }}>
            <Box>
              <Typography variant="caption" sx={{ color: brandColors.inkSoft }}>Service</Typography>
              <Typography variant="body1" sx={{ color: brandColors.ink, fontWeight: 600 }}>
                {appointment.service_name}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: brandColors.inkSoft }}>Date</Typography>
              <Typography variant="body1" sx={{ color: brandColors.ink, fontWeight: 600 }}>
                {dateStr}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: brandColors.inkSoft }}>Time</Typography>
              <Typography variant="body1" sx={{ color: brandColors.ink, fontWeight: 600 }}>
                {timeStr}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: brandColors.inkSoft }}>Duration</Typography>
              <Typography variant="body1" sx={{ color: brandColors.ink, fontWeight: 600 }}>
                {appointment.duration_minutes} minutes
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: brandColors.inkSoft }}>Price</Typography>
              <Typography variant="body1" sx={{ color: brandColors.terracotta, fontWeight: 600 }}>
                ${appointment.total_price.toFixed(2)}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: brandColors.inkSoft }}>Status</Typography>
              <Chip
                label={appointment.status}
                size="small"
                sx={{
                  backgroundColor: getStatusColor(appointment.status),
                  color: 'white',
                  textTransform: 'capitalize',
                  marginTop: 0.5,
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="Status"
              disabled={updating}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>

          {newStatus !== appointment.status && (
            <Button
              variant="contained"
              onClick={handleUpdateStatus}
              disabled={updating}
              fullWidth
              sx={{
                backgroundColor: brandColors.terracotta,
                color: brandColors.cream,
                textTransform: 'none',
                marginBottom: 2,
              }}
            >
              Update Status
            </Button>
          )}
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ marginBottom: 2, color: brandColors.ink, fontWeight: 600 }}>
            Client Information
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="caption" sx={{ color: brandColors.inkSoft }}>Name</Typography>
              <Typography variant="body1" sx={{ color: brandColors.ink, fontWeight: 500 }}>
                {appointment.client_name}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: brandColors.inkSoft }}>Email</Typography>
              <Typography variant="body1" sx={{ color: brandColors.ink, fontWeight: 500 }}>
                {appointment.client_email}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: brandColors.inkSoft }}>Phone</Typography>
              <Typography variant="body1" sx={{ color: brandColors.ink, fontWeight: 500 }}>
                {appointment.client_phone}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ marginBottom: 2, color: brandColors.ink, fontWeight: 600 }}>
            Notes
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            placeholder="Add or edit internal notes..."
            disabled={updating}
            sx={{ marginBottom: 2 }}
          />

          {editNotes !== appointment.client_notes && (
            <Button
              variant="contained"
              onClick={handleUpdateNotes}
              disabled={updating}
              fullWidth
              sx={{
                backgroundColor: brandColors.terracotta,
                color: brandColors.cream,
                textTransform: 'none',
              }}
            >
              Save Notes
            </Button>
          )}
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ marginBottom: 2, color: brandColors.ink, fontWeight: 600 }}>
            Email Status
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            <Chip
              label={`Confirmation: ${appointment.confirmation_sent ? '✓ Sent' : '✗ Not Sent'}`}
              variant="outlined"
              size="small"
              sx={{ marginRight: 1, marginBottom: 1 }}
            />
            <Chip
              label={`Reminder: ${appointment.reminder_sent ? '✓ Sent' : '✗ Not Sent'}`}
              variant="outlined"
              size="small"
            />
          </Box>

          <Button
            variant="contained"
            onClick={() => {
              setEmailTypeToResend('confirmation');
              setShowResendDialog(true);
            }}
            disabled={updating}
            sx={{
              backgroundColor: brandColors.moss,
              color: 'white',
              textTransform: 'none',
              marginRight: 1,
            }}
          >
            Resend Confirmation
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setEmailTypeToResend('reminder');
              setShowResendDialog(true);
            }}
            disabled={updating}
            sx={{
              backgroundColor: brandColors.moss,
              color: 'white',
              textTransform: 'none',
            }}
          >
            Resend Reminder
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="subtitle2" sx={{ marginBottom: 2, color: brandColors.ink, fontWeight: 600 }}>
            Actions
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ color: brandColors.inkSoft }}>Created</Typography>
              <Typography variant="body2" sx={{ color: brandColors.ink }}>
                {format(new Date(appointment.created_at), 'MMM d, yyyy h:mm a')}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: brandColors.inkSoft }}>Last Updated</Typography>
              <Typography variant="body2" sx={{ color: brandColors.ink }}>
                {format(new Date(appointment.updated_at), 'MMM d, yyyy h:mm a')}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          {appointment.status !== 'cancelled' && (
            <Button
              fullWidth
              variant="contained"
              onClick={() => setShowCancelDialog(true)}
              disabled={updating}
              sx={{
                backgroundColor: '#d32f2f',
                color: 'white',
                textTransform: 'none',
              }}
            >
              Cancel Appointment
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={showResendDialog} onClose={() => setShowResendDialog(false)}>
        <DialogTitle>Resend Email</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to resend the {emailTypeToResend} email to {appointment.client_email}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowResendDialog(false)}>Cancel</Button>
          <Button
            onClick={handleResendEmail}
            variant="contained"
            sx={{ backgroundColor: brandColors.terracotta, color: brandColors.cream }}
          >
            Resend
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showCancelDialog} onClose={() => setShowCancelDialog(false)}>
        <DialogTitle>Cancel Appointment</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to cancel this appointment with {appointment.client_name}?
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1, color: brandColors.inkSoft }}>
            A cancellation email will be sent to {appointment.client_email}.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCancelDialog(false)}>No, Keep It</Button>
          <Button
            onClick={handleCancelAppointment}
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
