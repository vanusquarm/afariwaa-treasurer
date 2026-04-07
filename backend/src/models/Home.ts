import mongoose, { Schema } from 'mongoose';
import { IHome } from '../types/index';

const homeSchema = new Schema<IHome>(
  {
    houseNumber: {
      type: String,
      required: [true, 'Please provide a house number'],
      trim: true,
    },
    street: {
      type: String,
      required: [true, 'Please provide a street name'],
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    occupants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    monthlyDue: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPaid: {
      type: Number,
      default: 0,
      min: 0,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'unpaid', 'partial', 'overdue'],
      default: 'unpaid',
    },
  },
  {
    timestamps: true,
  }
);

homeSchema.index({ street: 1 });
homeSchema.index({ owner: 1 });

export const Home = mongoose.model<IHome>('Home', homeSchema);
