'use client';

import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
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
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const currentStep = STEPS.findIndex((step) => step.path === pathname);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: brandColors.cream,
        paddingY: { xs: 2, sm: 3, md: 4 },
        paddingX: { xs: 0, sm: 0 },
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: { xs: 2, md: 4 },
            color: brandColors.ink,
            fontWeight: 600,
            textAlign: 'center',
            fontSize: { xs: '1.35rem', sm: '2rem', md: '2.125rem' },
            lineHeight: 1.25,
            px: { xs: 0.5, sm: 0 },
          }}
        >
          Book Your Appointment
        </Typography>

        <Stepper
          activeStep={currentStep >= 0 ? currentStep : 0}
          orientation={isMdUp ? 'horizontal' : 'vertical'}
          sx={{
            marginBottom: { xs: 2, md: 4 },
            '& .MuiStepLabel-label': {
              fontSize: { xs: '0.875rem', md: '1rem' },
            },
          }}
        >
          {STEPS.map((step) => (
            <Step key={step.path}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box
          sx={{
            backgroundColor: 'white',
            padding: { xs: 2, sm: 3 },
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}
