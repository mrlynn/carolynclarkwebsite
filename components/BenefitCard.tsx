import { Box, Typography } from '@mui/material';
import { brandColors } from '@/lib/theme';

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
  accent?: 'terracotta' | 'moss' | 'gold';
}

export function BenefitCard({
  icon,
  title,
  description,
  accent = 'terracotta',
}: BenefitCardProps) {
  const accentColor = brandColors[accent];
  const accentLight = accent === 'terracotta' ? '#f5a86030' : accent === 'moss' ? '#7fbaa530' : '#f5c66f30';

  return (
    <Box
      sx={{
        padding: '2rem',
        backgroundColor: accentLight,
        borderRadius: '16px',
        border: `2px solid ${accentColor}20`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 12px 32px ${accentColor}20`,
          borderColor: `${accentColor}40`,
        },
      }}
    >
      <Box
        sx={{
          fontSize: '3rem',
          marginBottom: 1.5,
          height: '3rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {icon}
      </Box>
      <Typography
        sx={{
          fontSize: '1.2rem',
          fontWeight: 600,
          color: brandColors.ink,
          marginBottom: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: '1rem',
          lineHeight: 1.6,
          color: brandColors.inkSoft,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
