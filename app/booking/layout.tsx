'use client';

import { Box, Container, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { brandColors } from '@/lib/theme';

const STEPS = [
  { label: 'Service', path: '/booking/service' },
  { label: 'Date & Time', path: '/booking/calendar' },
  { label: 'Your Info', path: '/booking/info' },
  { label: 'Confirm', path: '/booking/confirmation' },
];

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const currentStep = STEPS.findIndex((step) => step.path === pathname);

  return (
    <Box sx={{ minHeight: '100vh', background: brandColors.cream, paddingY: 4 }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{
            marginBottom: 4,
            color: brandColors.ink,
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Book Your Appointment
        </Typography>

        <Stepper activeStep={currentStep} sx={{ marginBottom: 4 }}>
          {STEPS.map((step) => (
            <Step key={step.path}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
}
