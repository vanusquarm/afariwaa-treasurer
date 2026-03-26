import mongoose, { Schema } from 'mongoose';
import { IMaintenanceRequest } from '@types/index';

const maintenanceRequestSchema = new Schema<IMaintenanceRequest>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['plumbing', 'electrical', 'structural', 'general', 'landscaping', 'security', 'other'],
      required: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['open', 'assigned', 'in-progress', 'completed', 'cancelled'],
      default: 'open',
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
      trim: true,
    },
    requesterName: {
      type: String,
      required: [true, 'Please provide requester name'],
      trim: true,
    },
    requesterPhone: {
      type: String,
      required: [true, 'Please provide requester phone'],
    },
    requesterEmail: {
      type: String,
      required: [true, 'Please provide requester email'],
      lowercase: true,
    },
    images: [
      {
        type: String,
      },
    ],
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    estimatedCost: {
      type: Number,
      default: null,
      min: 0,
    },
    actualCost: {
      type: Number,
      default: null,
      min: 0,
    },
    completionDate: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

maintenanceRequestSchema.index({ status: 1, priority: 1 });
maintenanceRequestSchema.index({ category: 1 });
maintenanceRequestSchema.index({ assignedTo: 1 });

export const MaintenanceRequest = mongoose.model<IMaintenanceRequest>(
  'MaintenanceRequest',
  maintenanceRequestSchema
);
