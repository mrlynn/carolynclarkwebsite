import { Box, Container, Typography, Button } from '@mui/material';
import { brandColors } from '@/lib/theme';
import { content } from '@/lib/content';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: brandColors.ink,
        color: brandColors.cream,
        padding: '4rem 2rem 2rem',
        marginTop: '6rem',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            marginBottom: 4,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 1 }}>
              {content.business.name}
            </Typography>
            <Typography variant="body2" sx={{ color: brandColors.gold }}>
              {content.business.tagline}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
              Contact
            </Typography>
            <Typography variant="body2">
              <a href={`tel:${content.business.phone}`} style={{ color: brandColors.cream, textDecoration: 'none' }}>
                {content.business.phone}
              </a>
            </Typography>
            <Typography variant="body2">
              <a href={`mailto:${content.business.email}`} style={{ color: brandColors.cream, textDecoration: 'none' }}>
                {content.business.email}
              </a>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
              Location
            </Typography>
            <Typography variant="body2">{content.business.location}</Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              By appointment
            </Typography>
            <Button
              variant="outlined"
              href="/booking/service"
              size="small"
              sx={{
                borderColor: brandColors.gold,
                color: brandColors.gold,
                textTransform: 'none',
                borderRadius: '999px',
                marginTop: 1.5,
                fontSize: '0.8rem',
                '&:hover': {
                  backgroundColor: brandColors.gold,
                  color: brandColors.ink,
                  borderColor: brandColors.gold,
                },
              }}
            >
              Book Online
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            borderTop: `1px solid ${brandColors.inkSoft}`,
            paddingTop: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: brandColors.inkMute }}>
            &copy; {new Date().getFullYear()} {content.business.name}. Licensed Massage Therapist.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
