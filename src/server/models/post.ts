import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true } // replaces createdAt / updatedAt
);

export default mongoose.model('Post', postSchema);