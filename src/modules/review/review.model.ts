import { model, Schema } from "mongoose";
import { IReview, Status } from "./review.interface";

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
        },
        book: {
            type: Schema.Types.ObjectId,
            ref: "Book",
            required:true
        },
        rating: {
            type: Number,
            required: true

        },
        comment: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved"],
            default: Status.PENDING
         }
  },
  { timestamps: true, versionKey: false }
);

export const Review = model<IReview>("Ireview", reviewSchema);
