'use client';

import { Box, Card, CardContent, Typography, Stack, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { People } from '@mui/icons-material';
import { ClientData } from '@/lib/analytics';

interface ClientMetricsProps {
  data: ClientData;
}

export default function ClientMetrics({ data }: ClientMetricsProps) {
  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #fef8f3 0%, #fff9f5 100%)',
        border: '1px solid #f5e6d3',
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
            <People sx={{ color: 'primary.main' }} />
            Client Insights
          </Typography>

          <Stack direction="row" spacing={2}>
            <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#fff9f5', borderRadius: 1, border: '1px solid #f5e6d3' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Total Clients
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#f5a860' }}>
                {data.total}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#fff9f5', borderRadius: 1, border: '1px solid #f5e6d3' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                New This Month
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#7fbaa5' }}>
                {data.newThisMonth}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, p: 1.5, backgroundColor: '#fff9f5', borderRadius: 1, border: '1px solid #f5e6d3' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Return Rate
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#f5c66f' }}>
                {Math.round(data.returnRate * 100)}%
              </Typography>
            </Box>
          </Stack>

          {data.topByBookings && data.topByBookings.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Top Clients by Bookings
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5e6d3' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>
                        Bookings
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>
                        Revenue
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.topByBookings.slice(0, 5).map((client: any, idx) => (
                      <TableRow key={idx} sx={{ '&:hover': { backgroundColor: '#fff9f5' } }}>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {client.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {client.email}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Chip label={client.bookings} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            ${client.revenue.toFixed(2)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
