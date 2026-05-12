'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  CircularProgress,
  Stack,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { CreateServiceInput } from '@/lib/schemas/serviceSchema';

interface ServiceFormFieldsProps {
  initialData?: Partial<CreateServiceInput>;
  onSubmit: (data: CreateServiceInput) => Promise<void>;
  onCancel: () => void;
}

const DURATION_OPTIONS = [15, 30, 45, 60, 75, 90, 120];

export default function ServiceFormFields({
  initialData,
  onSubmit,
  onCancel,
}: ServiceFormFieldsProps) {
  const [formData, setFormData] = useState<CreateServiceInput>(
    (initialData || {
      name: '',
      description: '',
      category: 'massage',
      durations: [{ durationMinutes: 60, price: 100 }],
    }) as CreateServiceInput
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
    if (errors.name) setErrors({ ...errors, name: '' });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, description: e.target.value });
    if (errors.description) setErrors({ ...errors, description: '' });
  };

  const handleCategoryChange = (e: any) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleDurationChange = (
    index: number,
    field: 'durationMinutes' | 'price',
    value: number
  ) => {
    const newDurations = [...formData.durations];
    newDurations[index] = { ...newDurations[index], [field]: value };
    setFormData({ ...formData, durations: newDurations });
  };

  const handleAddDuration = () => {
    setFormData({
      ...formData,
      durations: [...formData.durations, { durationMinutes: 60, price: 100 }],
    });
  };

  const handleRemoveDuration = (index: number) => {
    if (formData.durations.length > 1) {
      const newDurations = formData.durations.filter((_, i) => i !== index);
      setFormData({ ...formData, durations: newDurations });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    }
    if (!formData.description.trim() || formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    if (formData.durations.length === 0) {
      newErrors.durations = 'At least one duration option is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Service Name"
        value={formData.name}
        onChange={handleNameChange}
        fullWidth
        error={!!errors.name}
        helperText={errors.name}
        disabled={submitting}
      />

      <TextField
        label="Description"
        value={formData.description}
        onChange={handleDescriptionChange}
        fullWidth
        multiline
        rows={3}
        error={!!errors.description}
        helperText={errors.description}
        disabled={submitting}
      />

      <FormControl fullWidth disabled={submitting}>
        <InputLabel>Category</InputLabel>
        <Select value={formData.category} onChange={handleCategoryChange} label="Category">
          <MenuItem value="massage">Massage</MenuItem>
          <MenuItem value="therapy">Therapy</MenuItem>
          <MenuItem value="wellness">Wellness</MenuItem>
        </Select>
      </FormControl>

      {/* Durations */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Pricing Options
        </Typography>
        {errors.durations && (
          <Typography color="error" variant="caption">
            {errors.durations}
          </Typography>
        )}

        {formData.durations.map((duration, index) => (
          <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth size="small" disabled={submitting}>
                  <InputLabel>Duration (minutes)</InputLabel>
                  <Select
                    value={duration.durationMinutes}
                    onChange={(e) =>
                      handleDurationChange(index, 'durationMinutes', e.target.value as number)
                    }
                    label="Duration (minutes)"
                  >
                    {DURATION_OPTIONS.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt} minutes
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Price ($)"
                  type="number"
                  value={duration.price}
                  onChange={(e) =>
                    handleDurationChange(index, 'price', parseFloat(e.target.value) || 0)
                  }
                  fullWidth
                  size="small"
                  disabled={submitting}
                />
              </Stack>

              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => handleRemoveDuration(index)}
                disabled={formData.durations.length === 1 || submitting}
                fullWidth
              >
                Remove Duration
              </Button>
            </Stack>
          </Paper>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddDuration}
          disabled={submitting}
          fullWidth
        >
          Add Duration Option
        </Button>
      </Box>

      {/* Form Actions */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={submitting}
        >
          {submitting && <CircularProgress size={20} sx={{ mr: 1 }} />}
          {submitting ? 'Saving...' : 'Save Service'}
        </Button>
      </Box>
    </Box>
  );
}
