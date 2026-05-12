import { config } from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable');
}

async function fixServiceIds() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('carolyn_booking');

    console.log('Connected to MongoDB');

    // Get the first service to use as default
    const services = await db.collection('services').find().toArray();

    if (services.length === 0) {
      console.log('No services found. Please seed the database first.');
      return;
    }

    const defaultServiceId = services[0]._id;
    console.log(`Default service: ${services[0].name} (${defaultServiceId})`);

    // Find appointments with null or missing service_id
    const appointmentsToUpdate = await db
      .collection('appointments')
      .find({ $or: [{ service_id: null }, { service_id: { $exists: false } }] })
      .toArray();

    console.log(`Found ${appointmentsToUpdate.length} appointments with missing service_id`);

    if (appointmentsToUpdate.length > 0) {
      const result = await db.collection('appointments').updateMany(
        { $or: [{ service_id: null }, { service_id: { $exists: false } }] },
        { $set: { service_id: defaultServiceId } }
      );

      console.log(`Updated ${result.modifiedCount} appointments`);
    }

    // Also show some sample appointments
    const samples = await db
      .collection('appointments')
      .find({})
      .limit(3)
      .toArray();

    console.log('\nSample appointments:');
    samples.forEach((apt: any) => {
      console.log(
        `  - ${apt.client_name}: service_id=${apt.service_id}, price=$${apt.total_price}`
      );
    });

    console.log('\n✅ Migration complete!');
  } finally {
    await client.close();
  }
}

fixServiceIds().catch(console.error);
