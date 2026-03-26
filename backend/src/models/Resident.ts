import mongoose from 'mongoose';
import { User } from './User';
import { IResident } from '@types/index';

const residentSchema = new mongoose.Schema<IResident>(
  {
    occupants: {
      type: Number,
      default: 1,
      min: [1, 'At least one occupant required'],
    },
    occupantNames: [
      {
        type: String,
        trim: true,
      },
    ],
    paymentStatus: {
      type: String,
      enum: ['paid', 'unpaid', 'partial', 'overdue'],
      default: 'unpaid',
    },
    totalDuesOwed: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastPaymentDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Resident = User.discriminator<IResident>('Resident', residentSchema);
