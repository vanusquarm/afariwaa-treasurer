import mongoose, { Schema } from 'mongoose';
import { IDocument } from '@types/index';

const documentSchema = new Schema<IDocument>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    fileUrl: {
      type: String,
      required: [true, 'Please provide a file URL'],
    },
    fileType: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    size: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

documentSchema.index({ category: 1 });
documentSchema.index({ uploadedBy: 1 });

export const Document = mongoose.model<IDocument>('Document', documentSchema);
