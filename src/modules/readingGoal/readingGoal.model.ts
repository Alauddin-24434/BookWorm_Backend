import { model, Schema } from 'mongoose';

const readingGoalSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    targetBooks: {
      type: Number,
      required: true,
      min: [1, 'Target must be at least 1 book'],
    },
    booksRead: {
      type: Number,
      default: 0,
    },
    totalPages: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export const ReadingGoal = model('ReadingGoal', readingGoalSchema);


