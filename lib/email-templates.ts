interface ConfirmationEmailData {
  clientName: string;
  serviceName: string;
  scheduledAt: Date;
  duration: number;
  price: number;
  cancelLink: string;
}

interface ReminderEmailData {
  clientName: string;
  serviceName: string;
  scheduledAt: Date;
  duration: number;
}

interface CancellationEmailData {
  clientName: string;
  serviceName: string;
  scheduledAt: Date;
  refund?: number;
}

interface AdminNotificationData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientNotes?: string;
  serviceName: string;
  scheduledAt: Date;
  duration: number;
  price: number;
}

export function getConfirmationEmailTemplate(data: ConfirmationEmailData): string {
  const appointmentDate = data.scheduledAt.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const appointmentTime = data.scheduledAt.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

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
    .details { background: white; padding: 15px; border-left: 4px solid #E8A87C; margin: 20px 0; }
    .details p { margin: 8px 0; }
    .label { font-weight: 600; color: #555; }
    .button { display: inline-block; background: #7B9B6E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
    .footer { font-size: 12px; color: #999; margin-top: 20px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Appointment Confirmed</h1>
    </div>
    <div class="content">
      <p>Hi ${data.clientName},</p>
      <p>Your appointment with <strong>Carolyn Clark</strong> has been confirmed. See the details below:</p>

      <div class="details">
        <p><span class="label">Service:</span> ${data.serviceName}</p>
        <p><span class="label">Date:</span> ${appointmentDate}</p>
        <p><span class="label">Time:</span> ${appointmentTime}</p>
        <p><span class="label">Duration:</span> ${data.duration} minutes</p>
        <p><span class="label">Price:</span> $${data.price.toFixed(2)}</p>
      </div>

      <p>A reminder email will be sent 24 hours before your appointment.</p>

      <p><strong>Need to cancel or reschedule?</strong></p>
      <p>Click the button below to manage your appointment:</p>
      <div style="text-align: center;">
        <a href="${data.cancelLink}" class="button">View Appointment</a>
      </div>

      <p>If you have any questions, please don't hesitate to reach out.</p>
      <p>We look forward to seeing you!</p>
      <p>Best regards,<br><strong>Carolyn Clark</strong></p>

      <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export function getReminderEmailTemplate(data: ReminderEmailData): string {
  const appointmentTime = data.scheduledAt.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

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
    .details { background: white; padding: 15px; border-left: 4px solid #E8A87C; margin: 20px 0; }
    .details p { margin: 8px 0; }
    .label { font-weight: 600; color: #555; }
    .footer { font-size: 12px; color: #999; margin-top: 20px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Reminder</h1>
    </div>
    <div class="content">
      <p>Hi ${data.clientName},</p>
      <p>This is a reminder that your appointment with <strong>Carolyn Clark</strong> is coming up tomorrow:</p>

      <div class="details">
        <p><span class="label">Service:</span> ${data.serviceName}</p>
        <p><span class="label">Time:</span> ${appointmentTime}</p>
        <p><span class="label">Duration:</span> ${data.duration} minutes</p>
      </div>

      <p>We look forward to seeing you!</p>
      <p>Best regards,<br><strong>Carolyn Clark</strong></p>

      <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export function getCancellationEmailTemplate(data: CancellationEmailData): string {
  const appointmentDate = data.scheduledAt.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
    .details { background: white; padding: 15px; border-left: 4px solid #E8A87C; margin: 20px 0; }
    .details p { margin: 8px 0; }
    .label { font-weight: 600; color: #555; }
    .footer { font-size: 12px; color: #999; margin-top: 20px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Cancelled</h1>
    </div>
    <div class="content">
      <p>Hi ${data.clientName},</p>
      <p>Your appointment with <strong>Carolyn Clark</strong> has been cancelled.</p>

      <div class="details">
        <p><span class="label">Service:</span> ${data.serviceName}</p>
        <p><span class="label">Original Date:</span> ${appointmentDate}</p>
        ${data.refund ? `<p><span class="label">Refund Amount:</span> $${data.refund.toFixed(2)}</p>` : ''}
      </div>

      <p>If you'd like to reschedule, feel free to book another appointment at any time.</p>
      <p>Best regards,<br><strong>Carolyn Clark</strong></p>

      <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export function getAdminNotificationTemplate(data: AdminNotificationData): string {
  const appointmentDate = data.scheduledAt.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const appointmentTime = data.scheduledAt.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #7B9B6E; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #F5F0EC; padding: 20px; border-radius: 0 0 8px 8px; }
    .details { background: white; padding: 15px; border-left: 4px solid #7B9B6E; margin: 20px 0; }
    .details p { margin: 8px 0; }
    .label { font-weight: 600; color: #555; }
    .footer { font-size: 12px; color: #999; margin-top: 20px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Appointment Booked</h1>
    </div>
    <div class="content">
      <p>A new appointment has been booked:</p>

      <div class="details">
        <p><span class="label">Client:</span> ${data.clientName}</p>
        <p><span class="label">Email:</span> ${data.clientEmail}</p>
        <p><span class="label">Phone:</span> ${data.clientPhone}</p>
        ${data.clientNotes ? `<p><span class="label">Notes:</span> ${data.clientNotes}</p>` : ''}
        <p style="margin-top: 15px;"><span class="label">Service:</span> ${data.serviceName}</p>
        <p><span class="label">Date:</span> ${appointmentDate}</p>
        <p><span class="label">Time:</span> ${appointmentTime}</p>
        <p><span class="label">Duration:</span> ${data.duration} minutes</p>
        <p><span class="label">Price:</span> $${data.price.toFixed(2)}</p>
      </div>

      <div class="footer">
        <p>Log in to your admin dashboard to manage this appointment.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
