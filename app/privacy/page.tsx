'use client';

import { Box, Container, Typography } from '@mui/material';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { brandColors } from '@/lib/theme';

export default function PrivacyPage() {
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
              Privacy Policy
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
                1. Introduction
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                Carolyn Clark (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates as a massage therapy practice. We are committed to protecting your privacy and ensuring you have a positive experience on our website and when receiving services.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                2. Information We Collect
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                <strong>Personal Information:</strong> When you book an appointment or contact us, we collect information such as your name, phone number, email address, and appointment preferences.
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                <strong>Health Information:</strong> To provide safe and effective massage therapy, we collect relevant health information including medical history, contraindications, and current medications. This information is kept confidential and is only used to inform your care.
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                <strong>Website Information:</strong> We may collect basic website usage data through cookies and analytics to improve our website experience.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                3. How We Use Your Information
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                We use the information we collect to:
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8, ml: 2 }}>
                • Schedule and manage your appointments<br />
                • Provide massage therapy services<br />
                • Send appointment reminders<br />
                • Respond to your inquiries<br />
                • Improve our services and website<br />
                • Comply with legal obligations
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                4. Confidentiality of Health Information
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                All health information you provide is treated as confidential and is protected by professional ethical standards. This information is only used for the purpose of providing you with safe, effective massage therapy and is never shared with third parties without your explicit consent, except as required by law.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                5. Data Security
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                We take reasonable measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                6. Information Sharing
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                We do not sell, trade, or share your personal information with third parties for marketing purposes. Your information is only shared as necessary to provide services or as required by law. We may use trusted service providers for email delivery or website hosting, but they are bound by confidentiality agreements.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                7. Cookies and Analytics
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                Our website may use cookies and analytics tools to improve user experience. These are used only for statistical purposes and are never used to personally identify you. You can disable cookies in your browser settings if you prefer.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                8. Your Rights
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                You have the right to:
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8, ml: 2 }}>
                • Access your personal information<br />
                • Request corrections to your information<br />
                • Request deletion of your information (subject to legal requirements)<br />
                • Opt-out of non-essential communications
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                To exercise any of these rights, please contact us directly.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                9. Retention of Information
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                We retain your personal information for as long as necessary to provide services and fulfill any legal obligations. You may request deletion of your information at any time, subject to our need to maintain records for business and legal purposes.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                10. Changes to This Policy
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of our services following any changes constitutes your acceptance of the new policy.
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                11. Contact Information
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                For questions about this Privacy Policy or to exercise your privacy rights, please contact us:
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                Carolyn Clark<br />
                Phone/Text: +1 (484) 941-2718<br />
                Email: carolyn@example.com<br />
                Location: Kimberton/Phoenixville, PA
              </Typography>

              <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 600, color: brandColors.ink }}>
                12. Legal Compliance
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 2, lineHeight: 1.8 }}>
                This Privacy Policy is designed to comply with applicable privacy laws and regulations. If you have any concerns about how your information is handled, please contact us immediately.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
