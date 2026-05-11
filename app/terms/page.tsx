'use client';

import { Box, Container, Typography } from '@mui/material';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { brandColors } from '@/lib/theme';

export default function TermsPage() {
  return (
    <Box>
      <Navigation />

      <Box sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 6, md: 8 }, backgroundColor: '#fafaf8' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Fraunces, serif',
                fontWeight: 700,
                color: brandColors.ink,
                mb: 4,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Terms of Service
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#666',
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>

            <Box sx={{ '& h3': { mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink } }}>
              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                1. Acceptance of Terms
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                By booking a massage therapy session with Carolyn Clark, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not book a session.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                2. Services Provided
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                Carolyn Clark provides professional massage therapy services including Myofascial Release (John F. Barnes Method) and Therapeutic Massage. These services are designed to promote relaxation, reduce tension, and support overall wellness. Massage therapy is not a substitute for medical treatment and should not be used as such.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                3. Health and Safety
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                Clients are responsible for disclosing any health conditions, medications, or contraindications to massage therapy. It is your responsibility to inform your therapist of any medical conditions, injuries, allergies, or medications you are taking. Massage therapy should not be performed on certain conditions without medical clearance.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                4. Appointment Policies
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                <strong>Booking:</strong> Appointments are scheduled by phone or text. Please allow sufficient time for us to confirm your booking.
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                <strong>Cancellations:</strong> Cancellations must be made at least 24 hours in advance. Cancellations made less than 24 hours before your appointment may be subject to a cancellation fee equal to the session rate.
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                <strong>No-Shows:</strong> Clients who do not attend their scheduled appointment without cancellation notice will be charged the full session fee.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                5. Payment
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                Payment is due at the time of service. We accept cash and card payments. Prices are subject to change at the discretion of the therapist with advance notice.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                6. Professional Standards
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                All massage therapy is provided within professional ethical standards. Your privacy and comfort are paramount. The therapist will maintain appropriate professional boundaries at all times.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                7. Assumption of Risk
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                Clients assume all risks associated with massage therapy. While adverse reactions are rare, they can occur. Clients waive the right to hold the therapist liable for any injuries, discomfort, or other complications arising from massage therapy services, provided the therapist has acted within professional standards and the client has disclosed all relevant health information.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                8. Limitation of Liability
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                The therapist and the business are not responsible for any indirect, incidental, special, consequential, or punitive damages arising from your use of massage therapy services.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                9. Modifications to Terms
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                These Terms of Service may be updated at any time. Continued use of the services following any modifications constitutes acceptance of the new terms.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                10. Contact Information
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                For questions about these Terms of Service, please contact us:
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                Carolyn Clark<br />
                Phone/Text: +1 (484) 941-2718<br />
                Email: carolyn@example.com<br />
                Location: Kimberton/Phoenixville, PA
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
