import { model, Schema } from "mongoose";
import { Actions, IReadingActivity } from "./readingActivity.interface";

const readingActivitySchema = new Schema<IReadingActivity>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    action: {
      type: String,
      enum: [Actions.ADDED, Actions.PROGRESS, Actions.FINISHED, Actions.RATED],
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const ReadingActivity = model<IReadingActivity>(
  "ReadingActivity",
  readingActivitySchema
);
