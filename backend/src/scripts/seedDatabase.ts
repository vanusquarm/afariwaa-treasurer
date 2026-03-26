import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '@models/User';
import { Home } from '@models/Home';
import { Transaction } from '@models/Transaction';
import { Bill } from '@models/Bill';
import { Event } from '@models/Event';
import { Announcement } from '@models/Announcement';
import { MaintenanceRequest } from '@models/MaintenanceRequest';
import { connectDatabase, disconnectDatabase } from '@config/database';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Home.deleteMany({}),
      Transaction.deleteMany({}),
      Bill.deleteMany({}),
      Event.deleteMany({}),
      Announcement.deleteMany({}),
      MaintenanceRequest.deleteMany({}),
    ]);

    console.log('✅ Cleared existing data');

    const users = await User.create([
      {
        name: 'Dr. Gifty Naa Larteley Addico',
        email: 'gifty@estate.com',
        phone: '+233241234567',
        password: 'password123',
        role: 'admin',
        houseNumber: '1',
        street: 'Densu Street',
        isActive: true,
        isEmailVerified: true,
      },
      {
        name: 'Madam Matilda Arthur',
        email: 'matilda@estate.com',
        phone: '+233242345678',
        password: 'password123',
        role: 'treasurer',
        houseNumber: '2',
        street: 'Densu Street',
        isActive: true,
        isEmailVerified: true,
      },
      {
        name: 'Mr. T V/H Wallace',
        email: 'wallace@estate.com',
        phone: '+233243456789',
        password: 'password123',
        role: 'resident',
        houseNumber: '1',
        street: 'Rose Avenue',
        isActive: true,
        isEmailVerified: true,
      },
      {
        name: 'Madam Jackie King',
        email: 'jackie@estate.com',
        phone: '+233244567890',
        password: 'password123',
        role: 'resident',
        houseNumber: '5',
        street: 'Rose Avenue',
        isActive: true,
        isEmailVerified: true,
      },
      {
        name: 'Mr. Edem Apasu',
        email: 'edem@estate.com',
        phone: '+233245678901',
        password: 'password123',
        role: 'resident',
        houseNumber: '3',
        street: 'Hibiscus Avenue',
        isActive: true,
        isEmailVerified: true,
      },
    ]);

    console.log('✅ Created users');

    const homes = await Home.create([
      {
        houseNumber: 'House No. 1',
        street: 'Densu Street',
        owner: users[0]._id,
        occupants: [users[0]._id],
        monthlyDue: 150,
        totalPaid: 0,
        balance: 0,
        paymentStatus: 'unpaid',
      },
      {
        houseNumber: 'House No. 2',
        street: 'Densu Street',
        owner: users[1]._id,
        occupants: [],
        monthlyDue: 150,
        totalPaid: 0,
        balance: 0,
        paymentStatus: 'unpaid',
      },
      {
        houseNumber: 'House No. 1',
        street: 'Rose Avenue',
        owner: users[2]._id,
        occupants: [users[2]._id],
        monthlyDue: 150,
        totalPaid: 900,
        balance: 750,
        paymentStatus: 'paid',
      },
      {
        houseNumber: 'House No. 5',
        street: 'Rose Avenue',
        owner: users[3]._id,
        occupants: [users[3]._id],
        monthlyDue: 150,
        totalPaid: 1800,
        balance: 1650,
        paymentStatus: 'paid',
      },
      {
        houseNumber: 'House No. 3',
        street: 'Hibiscus Avenue',
        owner: users[4]._id,
        occupants: [],
        monthlyDue: 150,
        totalPaid: 450,
        balance: 300,
        paymentStatus: 'partial',
      },
    ]);

    console.log('✅ Created homes');

    await Transaction.create([
      {
        title: 'Monthly Dues - January 2025',
        amount: 150,
        type: 'credit',
        category: 'Dues',
        date: new Date('2025-01-15'),
        status: 'completed',
        homeId: homes[2]._id,
        createdBy: users[0]._id,
      },
      {
        title: 'Monthly Dues - February 2025',
        amount: 150,
        type: 'credit',
        category: 'Dues',
        date: new Date('2025-02-15'),
        status: 'completed',
        homeId: homes[2]._id,
        createdBy: users[0]._id,
      },
      {
        title: 'Road Maintenance Contribution',
        amount: 500,
        type: 'credit',
        category: 'Projects',
        date: new Date('2025-01-20'),
        status: 'completed',
        homeId: homes[2]._id,
        createdBy: users[0]._id,
      },
      {
        title: 'Security Improvement Fund',
        amount: 100,
        type: 'credit',
        category: 'Other',
        date: new Date('2025-02-01'),
        status: 'completed',
        homeId: homes[2]._id,
        createdBy: users[0]._id,
      },
    ]);

    console.log('✅ Created transactions');

    await Bill.create([
      {
        homeId: homes[2]._id,
        amount: 150,
        dueDate: new Date('2025-03-01'),
        type: 'monthly_dues',
        description: 'Monthly Dues - March 2025',
        isPaid: false,
      },
      {
        homeId: homes[2]._id,
        amount: 300,
        dueDate: new Date('2025-03-15'),
        type: 'monthly_dues',
        description: 'Monthly Dues - January - December 2025',
        isPaid: false,
      },
      {
        homeId: homes[2]._id,
        amount: 150,
        dueDate: new Date('2025-02-01'),
        type: 'monthly_dues',
        description: 'Monthly Dues - February 2025',
        isPaid: true,
      },
    ]);

    console.log('✅ Created bills');

    await Event.create([
      {
        title: 'Annual General Meeting',
        description: 'Yearly AGM for estate residents',
        startDate: new Date('2025-03-15'),
        endDate: new Date('2025-03-15'),
        location: 'Community Hall',
        status: 'upcoming',
        attendees: [users[0]._id],
        organizer: users[0]._id,
      },
    ]);

    console.log('✅ Created events');

    await Announcement.create([
      {
        title: 'Payment Reminder',
        content: 'Your monthly dues of GHS 150 is due on March 1st, 2025. Please ensure timely payment.',
        priority: 'high',
        category: 'Payment',
        author: users[0]._id,
        authorRole: 'admin',
      },
      {
        title: 'Maintenance Notice',
        content: 'Planned water maintenance on Saturday morning. Plan accordingly.',
        priority: 'medium',
        category: 'Maintenance',
        author: users[1]._id,
        authorRole: 'treasurer',
      },
    ]);

    console.log('✅ Created announcements');

    await MaintenanceRequest.create([
      {
        title: 'Pothole on Street',
        description: 'Large pothole near house 3 needs immediate repair',
        category: 'general',
        priority: 'high',
        status: 'open',
        location: 'Densu Street',
        requesterName: 'John Doe',
        requesterPhone: '+233241234567',
        requesterEmail: 'john@estate.com',
      },
      {
        title: 'Water Leak',
        description: 'Water leaking from main pipe',
        category: 'plumbing',
        priority: 'urgent',
        status: 'open',
        location: 'Rose Avenue',
        requesterName: 'Jane Smith',
        requesterPhone: '+233242345678',
        requesterEmail: 'jane@estate.com',
      },
    ]);

    console.log('✅ Created maintenance requests');

    console.log('✅ Database seeded successfully');
    await disconnectDatabase();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await disconnectDatabase();
    process.exit(1);
  }
};

seedDatabase();
