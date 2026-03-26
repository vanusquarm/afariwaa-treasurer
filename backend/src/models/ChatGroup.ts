import mongoose, { Schema } from 'mongoose';
import { IChatGroup } from '@types/index';

const chatGroupSchema = new Schema<IChatGroup>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a group name'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    members: [
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
    icon: {
      type: String,
      default: null,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ChatGroup = mongoose.model<IChatGroup>('ChatGroup', chatGroupSchema);
