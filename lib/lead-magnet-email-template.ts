interface LeadMagnetEmailData {
  firstName: string;
  resourceTitle: string;
  downloadUrl: string;
}

export function getLeadMagnetEmailTemplate(data: LeadMagnetEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #E8A87C; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #F5F0EC; padding: 20px; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; background: #7B9B6E; color: white; padding: 14px 32px; text-decoration: none; border-radius: 4px; margin: 20px 0; font-weight: 600; font-size: 16px; }
    .footer { font-size: 12px; color: #999; margin-top: 20px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your Free Guide is Ready</h1>
    </div>
    <div class="content">
      <p>Hi ${data.firstName},</p>
      <p>Thank you for your interest in learning more about myofascial release. Your free guide, <strong>${data.resourceTitle}</strong>, is ready to download.</p>

      <div style="text-align: center;">
        <a href="${data.downloadUrl}" class="button">Download Your Guide</a>
      </div>

      <p style="font-size: 0.9rem; color: #666;">This download link expires in 72 hours. If it expires, you can request a new one from the <a href="${process.env.NEXT_PUBLIC_SITE_URL}/resources" style="color: #7B9B6E;">resources page</a>.</p>

      <p>If you have questions about myofascial release or want to explore whether it might be right for you, I&rsquo;d love to hear from you. Feel free to <a href="${process.env.NEXT_PUBLIC_SITE_URL}/contact" style="color: #7B9B6E;">get in touch</a> or <a href="${process.env.NEXT_PUBLIC_SITE_URL}/booking/service" style="color: #7B9B6E;">book a session</a>.</p>

      <p>Warmly,<br><strong>Carolyn Clark</strong></p>

      <div class="footer">
        <p>You received this email because you requested a free guide from carolynclark.com.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
