import mongoose, { Schema } from 'mongoose';
import { ITransaction } from '@types/index';

const transactionSchema = new Schema<ITransaction>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
      min: [0, 'Amount cannot be negative'],
    },
    type: {
      type: String,
      enum: ['credit', 'debit'],
      required: true,
    },
    category: {
      type: String,
      enum: ['Dues', 'Projects', 'Events', 'Maintenance', 'Emergency', 'Other'],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['completed', 'pending', 'failed'],
      default: 'pending',
    },
    homeId: {
      type: Schema.Types.ObjectId,
      ref: 'Home',
      default: null,
    },
    residentId: {
      type: Schema.Types.ObjectId,
      ref: 'Resident',
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    attachment: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.index({ category: 1, date: -1 });
transactionSchema.index({ homeId: 1, date: -1 });
transactionSchema.index({ createdBy: 1, date: -1 });

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);
