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
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isAfter, isBefore, startOfWeek, endOfWeek, eachWeekOfInterval } from 'date-fns';
import { createScheduledAtISO, formatDisplayDate } from '@/lib/date-helpers';

interface TimeSlot {
  _id?: string;
  time_start: string;
  time_end: string;
  is_available: boolean;
}

interface Service {
  _id: string;
  name: string;
  durations: Array<{ durationMinutes: number; price: number }>;
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
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    const id = sessionStorage.getItem('selectedServiceId');
    const duration = sessionStorage.getItem('selectedDurationMinutes');
    if (!id) {
      router.push('/booking/service');
      return;
    }
    setServiceId(id);
    if (duration) {
      setServiceDuration(parseInt(duration, 10));
    }
  }, [router]);

  // Fetch availability for all dates to determine which are selectable
  useEffect(() => {
    if (!serviceDuration) return;

    const fetchAvailabilityForAllDates = async () => {
      const today = new Date();
      const calendarStart = startOfWeek(today, { weekStartsOn: 0 });
      const calendarEnd = endOfWeek(addDays(today, 29), { weekStartsOn: 0 });
      const allDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

      const available = new Set<string>();

      for (const date of allDays) {
        const dayOfWeek = date.getDay();
        // Skip weekends (0 = Sunday, 6 = Saturday)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          continue;
        }

        // Skip past dates
        if (date < today && date.toDateString() !== today.toDateString()) {
          continue;
        }

        try {
          const dateStr = format(date, 'yyyy-MM-dd');
          const response = await fetch(
            `/api/availability?date=${dateStr}T00:00:00Z&serviceDurationMinutes=${serviceDuration}`
          );

          if (response.ok) {
            const slots = await response.json();
            if (slots.length > 0) {
              available.add(date.toDateString());
            }
          }
        } catch (err) {
          console.error(`Failed to fetch availability for ${date}:`, err);
        }
      }

      setAvailableDates(available);
    };

    fetchAvailabilityForAllDates();
  }, [serviceDuration]);

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

  const isDateSelectable = (date: Date): boolean => {
    const today = new Date();
    const dayOfWeek = date.getDay();
    const isPast = date < today && date.toDateString() !== today.toDateString();

    // Can't select past dates, weekends, or days without availability
    if (isPast || dayOfWeek === 0 || dayOfWeek === 6 || !availableDates.has(date.toDateString())) {
      return false;
    }
    return true;
  };

  const handleDateSelect = (date: Date) => {
    if (!isDateSelectable(date)) return;
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

    // Create ISO format date with UTC timezone
    const scheduledAt = createScheduledAtISO(selectedDate, selectedTime);

    sessionStorage.setItem('scheduledAt', scheduledAt);
    router.push('/booking/info');
  };

  const today = new Date();
  const calendarStart = startOfWeek(today, { weekStartsOn: 0 }); // Sunday
  const calendarEnd = endOfWeek(addDays(today, 29), { weekStartsOn: 0 }); // Saturday
  const allDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

      {/* Day labels header */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 1,
          marginBottom: 1,
        }}
      >
        {dayLabels.map((day) => (
          <Typography
            key={day}
            variant="caption"
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              color: brandColors.inkSoft,
            }}
          >
            {day}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 1,
          marginBottom: 3,
        }}
      >
        {allDays.map((date) => {
          const dayOfWeek = date.getDay();
          const isPast = date < today && date.toDateString() !== today.toDateString();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          const isSelectable = isDateSelectable(date);
          const isSelected = selectedDate?.toDateString() === date.toDateString();

          return (
            <Paper
              key={date.toISOString()}
              onClick={() => handleDateSelect(date)}
              sx={{
                padding: 1.5,
                textAlign: 'center',
                cursor: isSelectable ? 'pointer' : 'default',
                backgroundColor: isSelected ? brandColors.terracotta : 'white',
                color: isSelected ? 'white' : !isSelectable ? brandColors.inkMute : 'inherit',
                opacity: isSelectable ? 1 : 0.5,
                border: isSelected ? 'none' : `1px solid ${isSelectable ? '#e0e0e0' : '#d0d0d0'}`,
                transition: 'all 0.2s ease',
                '&:hover': isSelectable ? {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                } : {},
              }}
            >
              <Typography variant="caption" sx={{ display: 'block', fontWeight: 600 }}>
                {format(date, 'd')}
              </Typography>
              {!isSelectable && (
                <Typography variant="caption" sx={{ display: 'block', fontSize: '0.65rem', color: brandColors.inkMute }}>
                  {isPast ? 'Past' : isWeekend ? 'Closed' : 'No slots'}
                </Typography>
              )}
            </Paper>
          );
        })}
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
                  key={slot._id || `${slot.time_start}-${slot.time_end}`}
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
