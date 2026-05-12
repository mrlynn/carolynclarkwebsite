'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { brandColors } from '@/lib/theme';
import { format } from 'date-fns';

interface Appointment {
  _id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  service_name: string;
  scheduled_at: string;
  total_price: number | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

type SortField = 'scheduled_at' | 'created_at' | 'client_name' | 'status';
type SortDirection = 'asc' | 'desc';

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('scheduled_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/appointments');
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments
    .filter((apt) => {
      if (statusFilter && apt.status !== statusFilter) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          apt.client_name.toLowerCase().includes(query) ||
          apt.client_email.toLowerCase().includes(query) ||
          apt.client_phone.includes(query) ||
          apt.service_name.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      let aVal = a[sortField] as string | number;
      let bVal = b[sortField] as string | number;

      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="h6" sx={{ color: brandColors.ink }}>
          Appointments
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.refresh()}
          sx={{
            backgroundColor: brandColors.terracotta,
            color: brandColors.cream,
            textTransform: 'none',
          }}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="subtitle2" sx={{ marginBottom: 2, color: brandColors.ink, fontWeight: 600 }}>
          Filters & Search
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2 }}>
          <TextField
            fullWidth
            placeholder="Search by name, email, phone, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
          />

          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: `${brandColors.terracotta}20` }}>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 600, cursor: 'pointer' }}
                onClick={() => {
                  setSortField('client_name');
                  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                }}
              >
                Client {sortField === 'client_name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Service</TableCell>
              <TableCell
                sx={{ fontWeight: 600, cursor: 'pointer' }}
                onClick={() => {
                  setSortField('scheduled_at');
                  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                }}
              >
                Date & Time {sortField === 'scheduled_at' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, cursor: 'pointer' }}
                onClick={() => {
                  setSortField('status');
                  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                }}
              >
                Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} sx={{ textAlign: 'center', padding: 3, color: brandColors.inkSoft }}>
                  No appointments found
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment._id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell sx={{ fontWeight: 500 }}>{appointment.client_name}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{appointment.client_email}</TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }}>{appointment.client_phone}</TableCell>
                  <TableCell>{appointment.service_name}</TableCell>
                  <TableCell>
                    {format(new Date(appointment.scheduled_at), 'MMM d, yyyy h:mm a')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={appointment.status}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(appointment.status),
                        color: 'white',
                        textTransform: 'capitalize',
                      }}
                    />
                  </TableCell>
                  <TableCell>${appointment.total_price ? appointment.total_price.toFixed(2) : '—'}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => router.push(`/admin/appointments/${appointment._id}`)}
                      sx={{
                        borderColor: brandColors.moss,
                        color: brandColors.moss,
                        textTransform: 'none',
                        fontSize: '0.85rem',
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="caption" sx={{ display: 'block', marginTop: 2, color: brandColors.inkSoft }}>
        Showing {filteredAppointments.length} of {appointments.length} appointments
      </Typography>
    </Box>
  );
}
