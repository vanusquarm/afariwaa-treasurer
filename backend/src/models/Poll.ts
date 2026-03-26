import mongoose, { Schema } from 'mongoose';
import { IPoll } from '@types/index';

const pollSchema = new Schema<IPoll>(
  {
    question: {
      type: String,
      required: [true, 'Please provide a question'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    options: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    votes: {
      type: Map,
      of: Number,
      default: {},
    },
    voters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    endsAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'closed'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

pollSchema.index({ status: 1, endsAt: 1 });

export const Poll = mongoose.model<IPoll>('Poll', pollSchema);
