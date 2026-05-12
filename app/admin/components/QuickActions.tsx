'use client';

import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { UpcomingAppointmentData } from '@/lib/analytics';

interface QuickActionsProps {
  upcoming: UpcomingAppointmentData[];
}

export default function QuickActions({ upcoming }: QuickActionsProps) {
  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #fef8f3 0%, #fff9f5 100%)',
        border: '1px solid #f5e6d3',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
          Upcoming Appointments
        </Typography>

        {upcoming && upcoming.length > 0 ? (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5e6d3' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Service</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>When</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {upcoming.slice(0, 8).map((apt: UpcomingAppointmentData, idx) => (
                  <TableRow key={idx} sx={{ '&:hover': { backgroundColor: '#fff9f5' } }}>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {apt.client_name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {apt.client_email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{apt.service_name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(apt.scheduled_at).toLocaleDateString()} {new Date(apt.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {formatDistanceToNow(new Date(apt.scheduled_at), { addSuffix: true })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={apt.status}
                        size="small"
                        color={apt.status === 'confirmed' ? 'success' : 'warning'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        ${(apt.total_price || 0).toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              No upcoming appointments in the next 7 days
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
