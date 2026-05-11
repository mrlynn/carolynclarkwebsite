'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  FormControlLabel,
  Checkbox,
  Paper,
} from '@mui/material';
import { brandColors } from '@/lib/theme';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface Rule {
  _id: string;
  day_of_week: number;
  time_start: string;
  time_end: string;
  buffer_minutes: number;
  is_active: boolean;
}

export default function AvailabilityRulesPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    day_of_week: 1,
    time_start: '09:00',
    time_end: '17:00',
    buffer_minutes: 30,
    is_active: true,
  });

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await fetch('/api/admin/availability/rules');
      if (!response.ok) throw new Error('Failed to fetch rules');
      const data = await response.json();
      setRules(data);
    } catch (err) {
      setError('Failed to load rules');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (rule?: Rule) => {
    if (rule) {
      setEditingId(rule._id);
      setFormData({
        day_of_week: rule.day_of_week,
        time_start: rule.time_start,
        time_end: rule.time_end,
        buffer_minutes: rule.buffer_minutes,
        is_active: rule.is_active,
      });
    } else {
      setEditingId(null);
      setFormData({
        day_of_week: 1,
        time_start: '09:00',
        time_end: '17:00',
        buffer_minutes: 30,
        is_active: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveRule = async () => {
    try {
      const url = editingId
        ? `/api/admin/availability/rules/${editingId}`
        : '/api/admin/availability/rules';

      const method = editingId ? 'PATCH' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save rule');

      await fetchRules();
      setOpenDialog(false);
      setError('');
    } catch (err) {
      setError('Failed to save rule');
      console.error(err);
    }
  };

  const handleDeleteRule = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this rule?')) return;

    try {
      const response = await fetch(`/api/admin/availability/rules/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete rule');

      await fetchRules();
      setError('');
    } catch (err) {
      setError('Failed to delete rule');
      console.error(err);
    }
  };

  const handleRegenerateSlots = async () => {
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 3); // 3 months ahead

      const response = await fetch('/api/admin/availability/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Failed to regenerate slots');

      const data = await response.json();
      alert(`✓ Generated ${data.slotsGenerated} availability slots for the next 3 months!`);
      setError('');
    } catch (err) {
      setError('Failed to regenerate slots');
      console.error(err);
    }
  };

  return (
    <Box>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" sx={{ marginBottom: 2, color: brandColors.ink, fontWeight: 600 }}>
          Weekly Availability Rules
        </Typography>
        <Typography variant="body2" sx={{ color: brandColors.inkSoft, marginBottom: 3 }}>
          Set your regular working hours. Time slots will be generated based on these rules.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
          <Button
            variant="contained"
            onClick={() => handleOpenDialog()}
            sx={{
              backgroundColor: brandColors.terracotta,
              color: brandColors.cream,
              textTransform: 'none',
            }}
          >
            + Add Rule
          </Button>
          <Button
            variant="outlined"
            onClick={handleRegenerateSlots}
            sx={{
              borderColor: brandColors.moss,
              color: brandColors.moss,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: `${brandColors.moss}10`,
              },
            }}
          >
            Regenerate Slots (3 months)
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: brandColors.cream }}>
                <TableCell sx={{ fontWeight: 600, color: brandColors.ink }}>Day</TableCell>
                <TableCell sx={{ fontWeight: 600, color: brandColors.ink }}>Start</TableCell>
                <TableCell sx={{ fontWeight: 600, color: brandColors.ink }}>End</TableCell>
                <TableCell sx={{ fontWeight: 600, color: brandColors.ink }}>Buffer (min)</TableCell>
                <TableCell sx={{ fontWeight: 600, color: brandColors.ink }}>Active</TableCell>
                <TableCell sx={{ fontWeight: 600, color: brandColors.ink }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule._id}>
                  <TableCell>{DAYS_OF_WEEK[rule.day_of_week]}</TableCell>
                  <TableCell>{rule.time_start}</TableCell>
                  <TableCell>{rule.time_end}</TableCell>
                  <TableCell>{rule.buffer_minutes}</TableCell>
                  <TableCell>{rule.is_active ? '✓' : '✗'}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => handleOpenDialog(rule)}
                      sx={{ color: brandColors.terracotta, textTransform: 'none' }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleDeleteRule(rule._id)}
                      sx={{ color: '#d32f2f', textTransform: 'none' }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Edit Rule' : 'Add New Rule'}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: 2 }}>
          <TextField
            select
            label="Day of Week"
            value={formData.day_of_week}
            onChange={(e) => setFormData({ ...formData, day_of_week: parseInt(e.target.value) })}
            fullWidth
            margin="normal"
            slotProps={{ htmlInput: { native: true } }}
          >
            {DAYS_OF_WEEK.map((day, idx) => (
              <option key={idx} value={idx}>
                {day}
              </option>
            ))}
          </TextField>

          <TextField
            label="Start Time"
            type="time"
            value={formData.time_start}
            onChange={(e) => setFormData({ ...formData, time_start: e.target.value })}
            fullWidth
            margin="normal"
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            label="End Time"
            type="time"
            value={formData.time_end}
            onChange={(e) => setFormData({ ...formData, time_end: e.target.value })}
            fullWidth
            margin="normal"
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            label="Buffer Between Appointments (minutes)"
            type="number"
            value={formData.buffer_minutes}
            onChange={(e) => setFormData({ ...formData, buffer_minutes: parseInt(e.target.value) })}
            fullWidth
            margin="normal"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
            }
            label="Active"
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveRule}
            variant="contained"
            sx={{
              backgroundColor: brandColors.terracotta,
              color: brandColors.cream,
              textTransform: 'none',
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
