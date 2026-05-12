import { config } from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable');
}

async function fixAllServiceIds() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('carolyn_booking');

    console.log('Connected to MongoDB');

    // Get all services
    const services = await db.collection('services').find().toArray();

    if (services.length === 0) {
      console.log('No services found. Please seed the database first.');
      return;
    }

    console.log(`Found ${services.length} services:`);
    services.forEach((s: any) => {
      console.log(`  - ${s.name} (${s._id})`);
    });

    // Get the first service to use as default
    const defaultServiceId = services[0]._id;
    console.log(`\nUsing default service: ${services[0].name} (${defaultServiceId})`);

    // Find ALL appointments and update them to use the correct service_id
    const result = await db.collection('appointments').updateMany(
      {}, // Update ALL appointments
      { $set: { service_id: defaultServiceId } }
    );

    console.log(`\nUpdated ${result.modifiedCount} appointments to use service_id: ${defaultServiceId}`);

    // Show updated sample appointments
    const samples = await db
      .collection('appointments')
      .find({})
      .limit(3)
      .toArray();

    console.log('\nUpdated sample appointments:');
    samples.forEach((apt: any) => {
      console.log(
        `  - ${apt.client_name}: service_id=${apt.service_id}, price=$${apt.total_price}`
      );
    });

    console.log('\n✅ All appointments fixed!');
  } finally {
    await client.close();
  }
}

fixAllServiceIds().catch(console.error);
