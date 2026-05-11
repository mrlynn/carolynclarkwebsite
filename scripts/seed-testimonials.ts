#!/usr/bin/env node

/**
 * Seed script to create mock testimonials for testing
 * Usage: npm run seed:testimonials
 */

import { MongoClient } from 'mongodb';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI environment variable not set');
  process.exit(1);
}

interface MockTestimonial {
  client_name: string;
  client_email: string;
  rating: number;
  title: string;
  content: string;
  service: string;
  source: 'internal' | 'google' | 'imported';
  status: 'pending' | 'approved' | 'rejected';
  is_featured: boolean;
  created_at: Date;
  updated_at: Date;
  approved_at?: Date;
}

const mockTestimonials: MockTestimonial[] = [
  {
    client_name: 'Sarah Mitchell',
    client_email: 'sarah.mitchell@example.com',
    rating: 5,
    title: 'Finally found relief after years of chronic pain',
    content:
      "I've tried everything - physical therapy, chiropractors, medications - nothing worked until I discovered Carolyn's Myofascial Release work. The first session was transformative. I could feel the difference immediately. After just a few sessions, my chronic back pain has reduced by 80%. Carolyn has an incredible gift for understanding where pain comes from at the root level. I can't recommend her highly enough.",
    service: 'myofascial_release',
    source: 'internal',
    status: 'approved',
    is_featured: true,
    created_at: new Date('2024-11-15'),
    updated_at: new Date('2024-11-15'),
    approved_at: new Date('2024-11-16'),
  },
  {
    client_name: 'Michael Chen',
    client_email: 'michael.chen@example.com',
    rating: 5,
    title: 'Healed my frozen shoulder',
    content:
      "After my car accident, I developed severe frozen shoulder. My doctor said I might never regain full mobility. Carolyn worked with me using Myofascial Release techniques, and within 6 weeks, I had almost complete range of motion back. She explained the fascia restrictions in a way I could understand. Truly life-changing work.",
    service: 'myofascial_release',
    source: 'internal',
    status: 'approved',
    is_featured: true,
    created_at: new Date('2024-10-22'),
    updated_at: new Date('2024-10-22'),
    approved_at: new Date('2024-10-23'),
  },
  {
    client_name: 'Jessica Rodriguez',
    client_email: 'jessica.r@example.com',
    rating: 5,
    title: 'More effective than any physical therapy',
    content:
      "I've been seeing Carolyn for therapeutic massage for 3 months now, and it's made such a difference in my quality of life. The combination of deep work and her understanding of body mechanics is unmatched. I used to go home exhausted after PT appointments, but Carolyn's work leaves me feeling restored and energized.",
    service: 'therapeutic_massage',
    source: 'internal',
    status: 'approved',
    is_featured: false,
    created_at: new Date('2024-11-01'),
    updated_at: new Date('2024-11-01'),
    approved_at: new Date('2024-11-02'),
  },
  {
    client_name: 'David Thompson',
    client_email: 'david.thompson@example.com',
    rating: 5,
    title: 'Helped my postural problems',
    content:
      "As someone who works at a desk all day, I developed serious postural issues and neck tension. Carolyn identified that my fascia was restricted and has been systematically releasing those restrictions. I'm standing straighter, my neck pain is gone, and I feel so much better. Her knowledge of body mechanics is exceptional.",
    service: 'myofascial_release',
    source: 'internal',
    status: 'approved',
    is_featured: false,
    created_at: new Date('2024-10-10'),
    updated_at: new Date('2024-10-10'),
    approved_at: new Date('2024-10-11'),
  },
  {
    client_name: 'Rachel Wilson',
    client_email: 'rachel.w@example.com',
    rating: 4,
    title: 'Great for recovery',
    content:
      "After my running injury, I needed something more targeted than general physical therapy. Carolyn's Myofascial Release sessions have been instrumental in my recovery. I'm back to running pain-free. The sessions are relaxing but also deeply therapeutic. Would definitely recommend to anyone with soft tissue injuries.",
    service: 'myofascial_release',
    source: 'internal',
    status: 'approved',
    is_featured: false,
    created_at: new Date('2024-11-05'),
    updated_at: new Date('2024-11-05'),
    approved_at: new Date('2024-11-06'),
  },
  {
    client_name: 'Amanda Foster',
    client_email: 'amanda.foster@example.com',
    rating: 5,
    title: 'Changed my perspective on healing',
    content:
      "Carolyn helped me understand that my pain wasn't just about the symptom - it was about the underlying fascia restrictions. Her approach to root-cause healing is so refreshing. She's patient, knowledgeable, and genuinely cares about her clients' outcomes. I've referred several friends already.",
    service: 'myofascial_release',
    source: 'internal',
    status: 'approved',
    is_featured: true,
    created_at: new Date('2024-09-28'),
    updated_at: new Date('2024-09-28'),
    approved_at: new Date('2024-09-29'),
  },
  {
    client_name: 'James Patterson',
    client_email: 'james.p@example.com',
    rating: 5,
    title: "Best therapeutic massage I've ever had",
    content:
      "I've been getting massages for 15 years, and this is hands down the best I've experienced. Carolyn combines knowledge, intuition, and genuine care. Every session is customized to exactly what my body needs. The post-massage feeling is incredible - relaxed but energized.",
    service: 'therapeutic_massage',
    source: 'internal',
    status: 'approved',
    is_featured: false,
    created_at: new Date('2024-11-12'),
    updated_at: new Date('2024-11-12'),
    approved_at: new Date('2024-11-13'),
  },
  {
    client_name: 'Emily Wong',
    client_email: 'emily.wong@example.com',
    rating: 5,
    title: 'Professional, knowledgeable, life-changing',
    content:
      "I came to Carolyn skeptical about whether Myofascial Release could actually help my persistent shoulder pain. I was wrong to doubt it. Within 3 sessions, I had significant improvement. Her professionalism and deep knowledge of fascia mechanics is evident in every session. Highly recommended.",
    service: 'myofascial_release',
    source: 'internal',
    status: 'approved',
    is_featured: false,
    created_at: new Date('2024-10-30'),
    updated_at: new Date('2024-10-30'),
    approved_at: new Date('2024-10-31'),
  },
  {
    client_name: 'Marcus Johnson',
    client_email: 'marcus.j@example.com',
    rating: 4,
    title: 'Excellent work on sports-related pain',
    content:
      "As a semi-competitive athlete, I'm always looking for ways to optimize recovery. Carolyn's Myofascial Release sessions have become essential to my routine. They help me maintain mobility and prevent injuries. Professional, effective, and worth every penny.",
    service: 'myofascial_release',
    source: 'internal',
    status: 'pending',
    is_featured: false,
    created_at: new Date('2024-11-18'),
    updated_at: new Date('2024-11-18'),
  },
  {
    client_name: 'Linda Chen',
    client_email: 'linda.chen@example.com',
    rating: 5,
    title: 'Relief from decades of pain',
    content:
      "I had resigned myself to living with chronic pain, but Carolyn showed me there was hope. Through her systematic approach to releasing fascia restrictions, I've experienced more relief than I thought possible. It's been a journey, but I'm finally pain-free for the first time in 20 years.",
    service: 'myofascial_release',
    source: 'internal',
    status: 'approved',
    is_featured: true,
    created_at: new Date('2024-09-15'),
    updated_at: new Date('2024-09-15'),
    approved_at: new Date('2024-09-16'),
  },
];

async function seedTestimonials() {
  let client: MongoClient | null = null;

  try {
    console.log('🌱 Starting testimonials seed...');
    console.log(`📦 Connecting to MongoDB...`);

    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db('carolyn_booking');
    const collection = db.collection('testimonials');

    // Check if testimonials exist
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing testimonials`);
      console.log('💡 Clear them first if you want a fresh seed (in MongoDB Compass):');
      console.log('   db.testimonials.deleteMany({})');
      console.log('');
    }

    console.log(`📝 Inserting ${mockTestimonials.length} mock testimonials...`);
    const result = await collection.insertMany(mockTestimonials);

    const insertedCount = Object.keys(result.insertedIds).length;
    console.log(`\n✅ Successfully inserted ${insertedCount} testimonials!`);
    console.log('\n📊 Summary:');
    console.log(
      `  - Approved: ${mockTestimonials.filter((t) => t.status === 'approved').length}`
    );
    console.log(
      `  - Pending: ${mockTestimonials.filter((t) => t.status === 'pending').length}`
    );
    console.log(
      `  - Featured: ${mockTestimonials.filter((t) => t.is_featured).length}`
    );
    console.log(`  - 5-star: ${mockTestimonials.filter((t) => t.rating === 5).length}`);
    console.log(`  - MFR: ${mockTestimonials.filter((t) => t.service === 'myofascial_release').length}`);
    console.log(`  - Massage: ${mockTestimonials.filter((t) => t.service === 'therapeutic_massage').length}`);

    console.log('\n🚀 Next steps:');
    console.log('  1. Run: npm run dev');
    console.log('  2. Visit http://localhost:3000/testimonials to see the testimonials page');
    console.log('  3. Visit http://localhost:3000/admin/testimonials to manage them');
    console.log('  4. Click "Share Your Experience" to test the modal');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding testimonials:');
    if (error instanceof Error) {
      console.error(`   ${error.message}`);
    } else {
      console.error(error);
    }
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

seedTestimonials();
