'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { brandColors } from '@/lib/theme';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isAfter, isBefore } from 'date-fns';

interface TimeSlot {
  time_start: string;
  time_end: string;
  is_available: boolean;
}

interface Service {
  _id: string;
  duration_minutes: number;
}

export default function CalendarPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [serviceDuration, setServiceDuration] = useState<number>(60);

  useEffect(() => {
    const id = sessionStorage.getItem('selectedServiceId');
    if (!id) {
      router.push('/booking/service');
      return;
    }
    setServiceId(id);
    fetchServiceDetails(id);
  }, [router]);

  const fetchServiceDetails = async (id: string) => {
    try {
      const response = await fetch('/api/services');
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      const service = data.find((s: Service) => s._id === id);
      if (service) {
        setServiceDuration(service.duration_minutes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAvailableSlots = async (date: Date) => {
    if (!serviceId) return;

    setLoading(true);
    setError('');

    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const response = await fetch(
        `/api/availability?date=${dateStr}T00:00:00Z&serviceDurationMinutes=${serviceDuration}`
      );

      if (!response.ok) throw new Error('Failed to fetch availability');

      const slots = await response.json();
      setTimeSlots(slots);

      if (slots.length === 0) {
        setError('No available times on this date. Please select another date.');
      }
    } catch (err) {
      setError('Failed to load available times');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    fetchAvailableSlots(date);
  };

  const handleTimeSelect = (timeStart: string) => {
    setSelectedTime(timeStart);
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select a date and time');
      return;
    }

    // Combine date and time
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const scheduledAt = `${dateStr}T${selectedTime}:00`;

    sessionStorage.setItem('scheduledAt', scheduledAt);
    router.push('/booking/info');
  };

  const today = new Date();
  const nextDays = Array.from({ length: 30 }, (_, i) => addDays(today, i));

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 3, color: brandColors.ink }}>
        Select a date and time
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant="subtitle2" sx={{ marginBottom: 2, color: brandColors.ink, fontWeight: 600 }}>
        Choose a Date
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(5, 1fr)', md: 'repeat(7, 1fr)' },
          gap: 1,
          marginBottom: 3,
        }}
      >
        {nextDays.map((date) => (
          <Paper
            key={date.toISOString()}
            onClick={() => handleDateSelect(date)}
            sx={{
              padding: 1.5,
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: selectedDate?.toDateString() === date.toDateString() ? brandColors.terracotta : 'white',
              color: selectedDate?.toDateString() === date.toDateString() ? 'white' : 'inherit',
              border: selectedDate?.toDateString() === date.toDateString() ? 'none' : `1px solid #e0e0e0`,
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Typography variant="caption" sx={{ display: 'block', fontWeight: 600 }}>
              {format(date, 'MMM d')}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
              {format(date, 'EEE')}
            </Typography>
          </Paper>
        ))}
      </Box>

      {selectedDate && (
        <>
          <Typography variant="subtitle2" sx={{ marginBottom: 2, color: brandColors.ink, fontWeight: 600 }}>
            Available Times for {format(selectedDate, 'MMMM d, yyyy')}
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
              <CircularProgress size={40} />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 1.5,
                marginBottom: 3,
              }}
            >
              {timeSlots.map((slot) => (
                <Paper
                  key={slot.time_start}
                  onClick={() => handleTimeSelect(slot.time_start)}
                  sx={{
                    padding: 1.5,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: selectedTime === slot.time_start ? brandColors.moss : 'white',
                    color: selectedTime === slot.time_start ? 'white' : 'inherit',
                    border: selectedTime === slot.time_start ? 'none' : `1px solid #e0e0e0`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {slot.time_start}
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}
        </>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/booking/service')}
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
          disabled={!selectedDate || !selectedTime}
          onClick={handleContinue}
          sx={{
            backgroundColor: brandColors.terracotta,
            color: brandColors.cream,
            textTransform: 'none',
            '&:disabled': {
              backgroundColor: '#ccc',
            },
          }}
        >
          Continue →
        </Button>
      </Box>
    </Box>
  );
}
