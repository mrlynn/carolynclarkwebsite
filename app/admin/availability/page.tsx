'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from '@mui/material';
import { brandColors } from '@/lib/theme';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';

interface Appointment {
  _id: string;
  client_name: string;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
}

export default function AvailabilityPage() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, [currentMonth]);

  const fetchAppointments = async () => {
    try {
      const start = startOfMonth(currentMonth);
      const end = endOfMonth(currentMonth);

      const params = new URLSearchParams({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      });

      const response = await fetch(`/api/admin/appointments?${params}`);
      if (!response.ok) throw new Error('Failed to fetch appointments');

      const data = await response.json();
      setAppointments(data);
      setError('');
    } catch (err) {
      setError('Failed to load appointments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  };

  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.scheduled_at);
      return (
        aptDate.getFullYear() === day.getFullYear() &&
        aptDate.getMonth() === day.getMonth() &&
        aptDate.getDate() === day.getDate()
      );
    });
  };

  const days = getDaysInMonth();
  const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ marginBottom: 2, color: brandColors.ink, fontWeight: 600 }}>
            Availability Calendar
          </Typography>
          <Typography variant="body2" sx={{ color: brandColors.inkSoft }}>
            View your booked appointments and availability.
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => router.push('/admin/availability/rules')}
          sx={{
            backgroundColor: brandColors.terracotta,
            color: brandColors.cream,
            textTransform: 'none',
          }}
        >
          → Set Working Hours
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ marginBottom: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: brandColors.ink }}>
          {format(currentMonth, 'MMMM yyyy')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            variant="outlined"
            size="small"
            sx={{ borderColor: brandColors.moss, color: brandColors.moss }}
          >
            ← Previous
          </Button>
          <Button
            onClick={() => setCurrentMonth(new Date())}
            variant="outlined"
            size="small"
            sx={{ borderColor: brandColors.terracotta, color: brandColors.terracotta }}
          >
            Today
          </Button>
          <Button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            variant="outlined"
            size="small"
            sx={{ borderColor: brandColors.moss, color: brandColors.moss }}
          >
            Next →
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card>
          <CardContent>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                border: '1px solid #e0e0e0',
              }}
            >
              {/* Day headers */}
              {DAYS_OF_WEEK.map((day) => (
                <Box
                  key={day}
                  sx={{
                    borderRight: '1px solid #e0e0e0',
                    padding: 1,
                    backgroundColor: brandColors.cream,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: brandColors.ink, textAlign: 'center' }}
                  >
                    {day}
                  </Typography>
                </Box>
              ))}

              {/* Calendar days */}
              {days.map((day) => {
                const dayAppointments = getAppointmentsForDay(day);
                const isCurrentDay = isToday(day);

                return (
                  <Box
                    key={day.toISOString()}
                    sx={{
                      borderRight: '1px solid #e0e0e0',
                      borderTop: '1px solid #e0e0e0',
                      padding: 1,
                      minHeight: '100px',
                      backgroundColor: isCurrentDay ? `${brandColors.terracotta}10` : 'transparent',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: isCurrentDay ? 600 : 400,
                        color: isCurrentDay ? brandColors.terracotta : brandColors.ink,
                        marginBottom: 1,
                      }}
                    >
                      {format(day, 'd')}
                    </Typography>
                    {dayAppointments.map((apt) => (
                      <Typography
                        key={apt._id}
                        variant="caption"
                        sx={{
                          display: 'block',
                          padding: '2px 4px',
                          backgroundColor: brandColors.terracotta,
                          color: brandColors.cream,
                          borderRadius: '2px',
                          marginBottom: '2px',
                          fontSize: '0.65rem',
                        }}
                      >
                        {apt.client_name}
                      </Typography>
                    ))}
                  </Box>
                );
              })}
            </Box>
          </CardContent>
        </Card>
      )}

      <Box sx={{ marginTop: 3, padding: 2, backgroundColor: `${brandColors.moss}10`, borderRadius: 1 }}>
        <Typography variant="body2" sx={{ color: brandColors.ink, fontWeight: 600, marginBottom: 1 }}>
          📋 Next Steps:
        </Typography>
        <ol style={{ marginTop: 8, color: brandColors.ink, paddingLeft: 20 }}>
          <li style={{ marginBottom: 8 }}>
            <Button
              size="small"
              variant="contained"
              onClick={() => router.push('/admin/availability/rules')}
              sx={{
                backgroundColor: brandColors.terracotta,
                color: brandColors.cream,
                textTransform: 'none',
                marginRight: 1,
              }}
            >
              Set Working Hours
            </Button>
            Set your hours (e.g., Mon-Fri 9am-5pm)
          </li>
          <li style={{ marginBottom: 8 }}>
            <Button
              size="small"
              variant="contained"
              onClick={() => router.push('/admin/availability/rules')}
              sx={{
                backgroundColor: brandColors.terracotta,
                color: brandColors.cream,
                textTransform: 'none',
                marginRight: 1,
              }}
            >
              Regenerate Slots
            </Button>
            Create time slots for the next 3 months
          </li>
          <li>Once slots are generated, clients can book through the public booking page</li>
        </ol>
      </Box>
    </Box>
  );
}
