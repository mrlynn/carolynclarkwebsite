import { config } from 'dotenv';
import { connectToDatabase } from '@/lib/db';
import { getReminderEmailTemplate } from '@/lib/email-templates';
import { sendEmail } from '@/lib/email-service';

config({ path: '.env.local' });

async function sendReminders() {
  console.log('Starting reminder email job...');

  try {
    const { db } = await connectToDatabase();

    // Find appointments scheduled for 24 hours from now (with 1 hour buffer)
    const now = new Date();
    const tomorrow24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const tomorrow25h = new Date(now.getTime() + 25 * 60 * 60 * 1000);

    const appointmentsToRemind = await db
      .collection('appointments')
      .find({
        status: 'confirmed',
        reminder_sent: false,
        scheduled_at: {
          $gte: tomorrow24h,
          $lte: tomorrow25h,
        },
      })
      .toArray();

    console.log(`Found ${appointmentsToRemind.length} appointments to remind`);

    if (appointmentsToRemind.length === 0) {
      console.log('No appointments to remind at this time');
      return;
    }

    for (const appointment of appointmentsToRemind) {
      try {
        // Get service details
        const service = await db.collection('services').findOne({
          _id: appointment.service_id,
        });

        if (!service) {
          console.log(`Service not found for appointment ${appointment._id}`);
          continue;
        }

        // Send reminder email
        const reminderHtml = getReminderEmailTemplate({
          clientName: appointment.client_name,
          serviceName: service.name,
          scheduledAt: appointment.scheduled_at,
          duration: appointment.duration_minutes,
        });

        const result = await sendEmail({
          to: appointment.client_email,
          subject: `Reminder: Your appointment with Carolyn Clark tomorrow`,
          html: reminderHtml,
        });

        if (result.success) {
          // Mark reminder as sent
          await db.collection('appointments').updateOne(
            { _id: appointment._id },
            {
              $set: {
                reminder_sent: true,
                reminder_sent_at: new Date(),
              }
            }
          );
          console.log(`✓ Reminder sent to ${appointment.client_email}`);
        } else {
          console.error(`✗ Failed to send reminder to ${appointment.client_email}:`, result.error);
        }
      } catch (error) {
        console.error(`Error processing appointment ${appointment._id}:`, error);
      }
    }

    console.log('Reminder email job completed');
  } catch (error) {
    console.error('Fatal error in reminder job:', error);
    process.exit(1);
  }
}

sendReminders();
