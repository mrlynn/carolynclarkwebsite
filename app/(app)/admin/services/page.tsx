'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Alert,
  Typography,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { SERVICE_CATEGORY_LABELS } from '@/lib/constants/serviceCategories';
import ServiceFormFields from '@/components/admin/ServiceFormFields';
import { CreateServiceInput } from '@/lib/schemas/serviceSchema';

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'inactive';
  durations: Array<{ durationMinutes: number; price: number }>;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (categoryFilter) params.append('category', categoryFilter);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/admin/services?${params}`);
      const data = await response.json();

      if (data.success) {
        setServices(data.services);
      } else {
        setSnackbar({ open: true, message: 'Failed to load services', severity: 'error' });
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setSnackbar({ open: true, message: 'Error loading services', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, statusFilter]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleCreateService = async (formData: CreateServiceInput) => {
    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSnackbar({ open: true, message: 'Service created successfully', severity: 'success' });
        setOpenCreateDialog(false);
        fetchServices();
      } else {
        setSnackbar({ open: true, message: data.error || 'Failed to create service', severity: 'error' });
      }
    } catch (error) {
      console.error('Error creating service:', error);
      setSnackbar({ open: true, message: 'Error creating service', severity: 'error' });
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      const data = await response.json();

      if (data.success) {
        setSnackbar({ open: true, message: 'Service deleted successfully', severity: 'success' });
        fetchServices();
      } else {
        setSnackbar({ open: true, message: data.error || 'Failed to delete service', severity: 'error' });
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      setSnackbar({ open: true, message: 'Error deleting service', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Services
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Manage service offerings, pricing, and availability
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenCreateDialog(true)}
        >
          Create Service
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 4 }}>
        <FormControl size="small">
          <InputLabel>Category</InputLabel>
          <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} label="Category">
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="massage">Massage</MenuItem>
            <MenuItem value="therapy">Therapy</MenuItem>
            <MenuItem value="wellness">Wellness</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Services Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : services.length === 0 ? (
        <Alert severity="info">No services found. Create your first service to get started.</Alert>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {services.map((service) => (
            <Box key={service._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s',
                  '&:hover': { boxShadow: 4 },
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {service.name}
                    </Typography>
                    <Chip
                      label={service.status}
                      size="small"
                      color={service.status === 'active' ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </Box>

                  <Chip
                    label={SERVICE_CATEGORY_LABELS[service.category] || service.category}
                    size="small"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />

                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {service.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                      Pricing Options:
                    </Typography>
                    {service.durations.map((duration, idx) => (
                      <Box key={idx}>
                        <Typography variant="caption">
                          {duration.durationMinutes} min: ${duration.price}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, p: 2, pt: 0 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    href={`/admin/services/${service._id}/edit`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteService(service._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {/* Create Service Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Service</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <ServiceFormFields
            onSubmit={handleCreateService}
            onCancel={() => setOpenCreateDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity={snackbar.severity as any}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}
