import mongoose, { Schema } from 'mongoose';
import { IBill } from '@types/index';

const billSchema = new Schema<IBill>(
  {
    homeId: {
      type: Schema.Types.ObjectId,
      ref: 'Home',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

billSchema.index({ homeId: 1, dueDate: -1 });
billSchema.index({ isPaid: 1 });

export const Bill = mongoose.model<IBill>('Bill', billSchema);
