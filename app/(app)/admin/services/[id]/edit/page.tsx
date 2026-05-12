'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  Snackbar,
  Alert,
  Switch,
  Typography,
} from '@mui/material';
import ServiceFormFields from '@/components/admin/ServiceFormFields';
import { CreateServiceInput, UpdateServiceInput } from '@/lib/schemas/serviceSchema';

interface Service extends CreateServiceInput {
  _id: string;
  status: 'active' | 'inactive';
  featured?: boolean;
}

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [featured, setFeatured] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  // Resolve params
  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  // Fetch service
  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/services/${id}`);
        const data = await response.json();

        if (data.success) {
          setService(data.service);
          setStatus(data.service.status);
          setFeatured(data.service.featured ?? false);
        } else {
          setSnackbar({
            open: true,
            message: 'Service not found',
            severity: 'error',
          });
        }
      } catch (error) {
        console.error('Error fetching service:', error);
        setSnackbar({
          open: true,
          message: 'Error loading service',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleUpdateService = async (formData: CreateServiceInput) => {
    try {
      const updateData: UpdateServiceInput = {
        ...formData,
        status,
        featured,
      };

      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (data.success) {
        setSnackbar({
          open: true,
          message: 'Service updated successfully',
          severity: 'success',
        });
        setTimeout(() => router.push('/admin/services'), 1500);
      } else {
        setSnackbar({
          open: true,
          message: data.error || 'Failed to update service',
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error updating service:', error);
      setSnackbar({
        open: true,
        message: 'Error updating service',
        severity: 'error',
      });
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this service? This cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSnackbar({
          open: true,
          message: 'Service deleted successfully',
          severity: 'success',
        });
        setTimeout(() => router.push('/admin/services'), 1500);
      } else {
        setSnackbar({
          open: true,
          message: data.error || 'Failed to delete service',
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      setSnackbar({
        open: true,
        message: 'Error deleting service',
        severity: 'error',
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!service) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error">Service not found</Alert>
        <Button onClick={() => router.push('/admin/services')} sx={{ mt: 2 }}>
          Back to Services
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Edit Service
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Update service details, pricing, and availability
        </Typography>
      </Box>

      <Box sx={{ mb: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={status === 'active'}
                onChange={(e) => setStatus(e.target.checked ? 'active' : 'inactive')}
              />
            }
            label={status === 'active' ? 'Service is Active' : 'Service is Inactive'}
          />
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
            Inactive services will not appear in the booking flow
          </Typography>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
          }
          label={featured ? 'Featured on Homepage' : 'Not Featured'}
        />
        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
          Featured services will appear on the landing page
        </Typography>
      </Box>

      <ServiceFormFields
        initialData={service}
        onSubmit={handleUpdateService}
        onCancel={() => router.push('/admin/services')}
      />

      <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #e0e0e0' }}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={handleDelete}
        >
          Delete Service
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}
