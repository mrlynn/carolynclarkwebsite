import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || '';
const ADMIN_EMAIL = process.env.ADMIN_USER || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.GMAIL_PASS || 'carolyn';

if (!MONGODB_URI || !ADMIN_EMAIL) {
  throw new Error('Missing MONGODB_URI or ADMIN_USER environment variable');
}

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('carolyn_booking');

    console.log('Connected to MongoDB');

    // Create admin user
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await db.collection('admin_users').updateOne(
      { email: ADMIN_EMAIL },
      {
        $set: {
          email: ADMIN_EMAIL,
          password_hash: hashedPassword,
          full_name: 'Carolyn Clark',
          role: 'admin',
          updated_at: new Date(),
        },
        $setOnInsert: {
          created_at: new Date(),
        },
      },
      { upsert: true }
    );

    console.log('✓ Admin user created/updated');
    console.log(`  Email: ${ADMIN_EMAIL}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);

    // Create services with nested durations array
    const services = [
      {
        name: 'Myofascial Release',
        description: 'John F. Barnes Myofascial Release technique for pain relief and lasting change',
        category: 'therapy',
        slug: 'myofascial-release',
        status: 'active',
        featured: true,
        durations: [
          { durationMinutes: 60, price: 140 },
          { durationMinutes: 90, price: 210 },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Therapeutic Massage',
        description: 'Therapeutic massage to promote relaxation and healing',
        category: 'massage',
        slug: 'therapeutic-massage',
        status: 'active',
        featured: false,
        durations: [
          { durationMinutes: 60, price: 120 },
          { durationMinutes: 90, price: 180 },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await db.collection('services').deleteMany({});
    const insertResult = await db.collection('services').insertMany(services);

    console.log(`✓ Services created: ${insertResult.insertedCount} services`);

    // Create sample availability rules (Mon-Fri 9am-5pm, buffer 30 min)
    const rules = [];
    for (let day = 1; day <= 5; day++) {
      // Monday-Friday
      rules.push({
        day_of_week: day,
        time_start: '09:00',
        time_end: '17:00',
        buffer_minutes: 30,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await db.collection('availability_rules').deleteMany({});
    const rulesResult = await db.collection('availability_rules').insertMany(rules);

    console.log(`✓ Availability rules created: ${rulesResult.insertedCount} rules`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nNext steps:');
    console.log('1. Make sure .env.local has MONGODB_URI set');
    console.log('2. Run: npm run dev');
    console.log('3. Visit: http://localhost:3000/admin/login');
    console.log(`4. Login with: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  } finally {
    await client.close();
  }
}

seedDatabase().catch(console.error);
