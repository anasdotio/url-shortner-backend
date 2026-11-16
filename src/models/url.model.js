import { Schema, model } from 'mongoose';

const urlSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: [true, 'Original URL is required'],
      trim: true,
    },
    shortUrl: {
      type: String,
      required: [true, 'Short URL is required'],
      trim: true,
      unique: [true, 'Short URL already exists'],
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created by is required'],
    },
    accessCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Url = model('Url', urlSchema);
