'use client';

import { Box, Card, CardContent, Typography, Stack } from '@mui/material';
import { BookingHeatmapData } from '@/lib/analytics';

interface BookingHeatmapProps {
  data: BookingHeatmapData[];
}

export default function BookingHeatmap({ data }: BookingHeatmapProps) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  // Create a grid map for easier lookup
  const heatmapGrid: { [key: string]: number } = {};
  let maxCount = 0;

  data.forEach((item) => {
    const key = `${item.day}-${item.hour}`;
    heatmapGrid[key] = item.count;
    maxCount = Math.max(maxCount, item.count);
  });

  const getColor = (count: number): string => {
    if (maxCount === 0) return '#f5e6d3';
    const intensity = count / maxCount;
    if (intensity === 0) return '#f5e6d3';
    if (intensity < 0.25) return '#f5d9b8';
    if (intensity < 0.5) return '#f5a860';
    if (intensity < 0.75) return '#e89a4a';
    return '#d4754d';
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #fef8f3 0%, #fff9f5 100%)',
        border: '1px solid #f5e6d3',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
          Booking Activity Heatmap
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
          Peak times show when you're busiest (darker = more bookings)
        </Typography>

        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <td style={{ width: 50 }} />
                {daysOfWeek.map((day) => (
                  <td key={day} style={{ width: 50, textAlign: 'center', fontWeight: 600, fontSize: '0.8rem', padding: '8px 4px' }}>
                    {day}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour) => (
                <tr key={hour}>
                  <td style={{ fontWeight: 600, fontSize: '0.8rem', width: 50, padding: '8px 4px' }}>
                    {hour > 12 ? hour - 12 : hour}
                    {hour >= 12 ? 'P' : 'A'}
                  </td>
                  {Array.from({ length: 7 }, (_, dayIdx) => {
                    const dayNum = dayIdx + 1;
                    const key = `${dayNum}-${hour}`;
                    const count = heatmapGrid[key] || 0;

                    return (
                      <td
                        key={key}
                        style={{
                          width: 50,
                          height: 50,
                          textAlign: 'center',
                          backgroundColor: getColor(count),
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          padding: '4px',
                          border: '1px solid #f5e6d3',
                        }}
                        title={`${daysOfWeek[dayIdx]} ${hour}:00 - ${count} bookings`}
                      >
                        {count > 0 && <span style={{ fontWeight: 600, fontSize: '0.7rem' }}>{count}</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        {/* Legend */}
        <Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            Intensity:
          </Typography>
          <Box sx={{ width: 20, height: 20, backgroundColor: '#f5e6d3', border: '1px solid #ddd', borderRadius: 1 }} />
          <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
            Low
          </Typography>
          <Box sx={{ width: 20, height: 20, backgroundColor: '#f5a860', border: '1px solid #ddd', borderRadius: 1 }} />
          <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
            Medium
          </Typography>
          <Box sx={{ width: 20, height: 20, backgroundColor: '#d4754d', border: '1px solid #ddd', borderRadius: 1 }} />
          <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
            High
          </Typography>
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1.5, textAlign: 'center' }}>
          Consider these peak times for scheduling breaks or limiting bookings
        </Typography>
      </CardContent>
    </Card>
  );
}
