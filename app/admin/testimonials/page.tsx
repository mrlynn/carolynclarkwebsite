'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Delete as DeleteIcon,
  Star as FeaturedIcon,
} from '@mui/icons-material';
import { brandColors } from '@/lib/theme';
import { Testimonial } from '@/lib/models/testimonial';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AdminTestimonialsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [testimonials, setTestimonials] = useState<Record<string, Testimonial[]>>({
    pending: [],
    approved: [],
    rejected: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'feature' | 'delete'>('approve');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError('');

      const statuses = ['pending', 'approved', 'rejected'];
      const newTestimonials: Record<string, Testimonial[]> = {};

      for (const status of statuses) {
        const response = await fetch(`/api/admin/testimonials?status=${status}&limit=100`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(`Failed to fetch ${status} testimonials`);
        }

        newTestimonials[status] = data.testimonials;
      }

      setTestimonials(newTestimonials);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!selectedTestimonial) return;

    try {
      let payload: any = {
        testimonialId: selectedTestimonial._id?.toString(),
        status: selectedTestimonial.status,
      };

      if (actionType === 'approve') {
        payload.status = 'approved';
      } else if (actionType === 'reject') {
        payload.status = 'rejected';
      } else if (actionType === 'feature') {
        payload.is_featured = !selectedTestimonial.is_featured;
      } else if (actionType === 'delete') {
        const response = await fetch(
          `/api/admin/testimonials?id=${selectedTestimonial._id?.toString()}`,
          { method: 'DELETE' }
        );

        if (!response.ok) {
          setError('Failed to delete testimonial');
          return;
        }

        fetchTestimonials();
        setActionDialogOpen(false);
        setSelectedTestimonial(null);
        return;
      }

      if (actionType === 'approve' || actionType === 'reject' || actionType === 'feature') {
        const response = await fetch('/api/admin/testimonials', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          setError('Failed to update testimonial');
          return;
        }
      }

      fetchTestimonials();
      setActionDialogOpen(false);
      setSelectedTestimonial(null);
    } catch (err) {
      setError('Failed to perform action');
      console.error('Error:', err);
    }
  };

  const openAction = (testimonial: Testimonial, type: 'approve' | 'reject' | 'feature' | 'delete') => {
    setSelectedTestimonial(testimonial);
    setActionType(type);
    setActionDialogOpen(true);
  };

  const TestimonialTable = ({ status }: { status: 'pending' | 'approved' | 'rejected' }) => {
    const items = testimonials[status];
    const total = items.length;

    return (
      <Box>
        <Typography variant="body2" sx={{ mb: 2, color: brandColors.inkSoft }}>
          {total} {status === 'pending' ? 'awaiting' : ''} testimonial{total !== 1 ? 's' : ''}
        </Typography>

        {items.length === 0 ? (
          <Alert severity="info">No testimonials found</Alert>
        ) : (
          <TableContainer component={Paper} sx={{ border: `1px solid ${brandColors.cream}` }}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: `${brandColors.terracotta}20` }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Rating</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((testimonial) => (
                  <TableRow key={testimonial._id?.toString()} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{testimonial.client_name}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Rating value={testimonial.rating} readOnly size="small" />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {testimonial.title}
                    </TableCell>
                    <TableCell>
                      {testimonial.service === 'myofascial_release' ? 'MFR' : testimonial.service === 'therapeutic_massage' ? 'Massage' : 'Other'}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={status}
                        size="small"
                        color={status === 'approved' ? 'success' : status === 'rejected' ? 'error' : 'warning'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                        {status === 'pending' && (
                          <>
                            <IconButton
                              size="small"
                              onClick={() => openAction(testimonial, 'approve')}
                              title="Approve"
                              sx={{ color: brandColors.moss }}
                            >
                              <ApproveIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => openAction(testimonial, 'reject')}
                              title="Reject"
                              sx={{ color: brandColors.terracotta }}
                            >
                              <RejectIcon fontSize="small" />
                            </IconButton>
                          </>
                        )}
                        {status === 'approved' && (
                          <IconButton
                            size="small"
                            onClick={() => openAction(testimonial, 'feature')}
                            title={testimonial.is_featured ? 'Unfeature' : 'Feature'}
                            sx={{ color: testimonial.is_featured ? brandColors.gold : '#999' }}
                          >
                            <FeaturedIcon fontSize="small" />
                          </IconButton>
                        )}
                        <IconButton
                          size="small"
                          onClick={() => openAction(testimonial, 'delete')}
                          title="Delete"
                          sx={{ color: '#d32f2f' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          marginBottom: 4,
          color: brandColors.ink,
          fontWeight: 600,
        }}
      >
        📣 Testimonials & Reviews
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={(_event, newValue) => setTabValue(newValue)}
              aria-label="testimonial status tabs"
            >
              <Tab
                label={`Pending (${testimonials.pending.length})`}
                id="tab-0"
                aria-controls="tabpanel-0"
              />
              <Tab
                label={`Approved (${testimonials.approved.length})`}
                id="tab-1"
                aria-controls="tabpanel-1"
              />
              <Tab
                label={`Rejected (${testimonials.rejected.length})`}
                id="tab-2"
                aria-controls="tabpanel-2"
              />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <TestimonialTable status="pending" />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <TestimonialTable status="approved" />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <TestimonialTable status="rejected" />
          </TabPanel>
        </CardContent>
      </Card>

      {/* Action Confirmation Dialog */}
      <Dialog open={actionDialogOpen} onClose={() => setActionDialogOpen(false)}>
        <DialogTitle>
          {actionType === 'approve'
            ? 'Approve Testimonial?'
            : actionType === 'reject'
            ? 'Reject Testimonial?'
            : actionType === 'feature'
            ? (selectedTestimonial?.is_featured ? 'Unfeature' : 'Feature') + ' Testimonial?'
            : 'Delete Testimonial?'}
        </DialogTitle>
        <DialogContent>
          {selectedTestimonial && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>{selectedTestimonial.client_name}</strong> - {selectedTestimonial.title}
              </Typography>
              {actionType === 'feature' && (
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {selectedTestimonial.is_featured ? 'This testimonial will be removed from the homepage.' : 'This testimonial will be featured on the homepage.'}
                </Typography>
              )}
              {actionType === 'delete' && (
                <Alert severity="warning">This action cannot be undone.</Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAction}
            variant="contained"
            sx={{
              backgroundColor:
                actionType === 'approve'
                  ? brandColors.moss
                  : actionType === 'reject' || actionType === 'delete'
                  ? '#d32f2f'
                  : brandColors.gold,
            }}
          >
            {actionType === 'approve'
              ? 'Approve'
              : actionType === 'reject'
              ? 'Reject'
              : actionType === 'feature'
              ? selectedTestimonial?.is_featured
                ? 'Unfeature'
                : 'Feature'
              : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
