'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { brandColors } from '@/lib/theme';

interface Service {
  _id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
}

export default function ServiceSelectionPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data);
    } catch (err) {
      setError('Failed to load services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId);
    // Store selected service in session storage for next page
    sessionStorage.setItem('selectedServiceId', serviceId);
    router.push('/booking/calendar');
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
      <Typography variant="h6" sx={{ marginBottom: 3, color: brandColors.ink }}>
        What service would you like to book?
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {services.map((service) => (
          <Card
            key={service._id}
            sx={{
              cursor: 'pointer',
              border: selectedService === service._id ? `2px solid ${brandColors.terracotta}` : '1px solid #e0e0e0',
              backgroundColor: selectedService === service._id ? `${brandColors.terracotta}10` : 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'translateY(-2px)',
              },
            }}
            onClick={() => handleSelectService(service._id)}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 1, color: brandColors.ink, fontWeight: 600 }}>
                {service.name}
              </Typography>

              <Typography variant="body2" sx={{ marginBottom: 2, color: brandColors.inkSoft }}>
                {service.description}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: brandColors.inkSoft, display: 'block' }}>
                    Duration
                  </Typography>
                  <Typography variant="body1" sx={{ color: brandColors.ink, fontWeight: 600 }}>
                    {service.duration_minutes} minutes
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" sx={{ color: brandColors.inkSoft, display: 'block' }}>
                    Price
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: brandColors.terracotta, fontWeight: 600 }}
                  >
                    ${service.price}
                  </Typography>
                </Box>
              </Box>

              {selectedService === service._id && (
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    backgroundColor: brandColors.terracotta,
                    color: brandColors.cream,
                    textTransform: 'none',
                  }}
                >
                  Selected ✓
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/')}
          sx={{
            borderColor: brandColors.moss,
            color: brandColors.moss,
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!selectedService}
          onClick={() => router.push('/booking/calendar')}
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
