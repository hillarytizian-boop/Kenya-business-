import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Category } from '../modules/listings/entities/category.entity';
import { User } from '../modules/users/entities/user.entity';
import * as argon2 from 'argon2';

config();

export async function seedDatabase() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'business_hub_kenya',
    entities: ['dist/**/*.entity.js'],
    synchronize: false,
  });

  await dataSource.initialize();
  console.log('📦 Connected to database');

  // Seed Categories
  const categories = [
    { id: '1', name: 'Businesses', slug: 'businesses', icon: '🏢' },
    { id: '2', name: 'Properties', slug: 'properties', icon: '🏠' },
    { id: '3', name: 'Vehicles', slug: 'vehicles', icon: '🚗' },
    { id: '4', name: 'Jobs', slug: 'jobs', icon: '💼' },
    { id: '5', name: 'Services', slug: 'services', icon: '🛠️' },
    { id: '6', name: 'Electronics', slug: 'electronics', icon: '📱' },
    { id: '7', name: 'Agriculture', slug: 'agriculture', icon: '🌾' },
    { id: '8', name: 'Fashion', slug: 'fashion', icon: '👗' },
    { id: '9', name: 'Education', slug: 'education', icon: '📚' },
    { id: '10', name: 'Healthcare', slug: 'healthcare', icon: '🏥' },
    { id: '11', name: 'Products', slug: 'products', icon: '📦' },
    { id: '12', name: 'Finance', slug: 'finance', icon: '💰' },
  ];

  for (const cat of categories) {
    await dataSource.createQueryBuilder()
      .insert()
      .into(Category)
      .values(cat)
      .orIgnore()
      .execute();
  }
  console.log('✅ Categories seeded');

  // Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@businesshubkenya.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@2025Secure!';
  
  const hashedPassword = await argon2.hash(adminPassword, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });

  await dataSource.createQueryBuilder()
    .insert()
    .into(User)
    .values({
      email: adminEmail,
      phone: '+254700000000',
      password_hash: hashedPassword,
      full_name: 'Admin',
      role: 'admin',
      is_active: true,
      is_email_verified: true,
      business_verified: 'verified',
    })
    .orIgnore()
    .execute();
  console.log('✅ Admin user seeded');

  await dataSource.destroy();
  console.log('🎉 Seeding complete!');
}

seedDatabase().catch(console.error);
