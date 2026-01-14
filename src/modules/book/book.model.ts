import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: String,
      required: true,
      index: true,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    pdfFile: {
      type: String, 
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    isDeleted: {
      type: Boolean,
      default: false,
    },  
  },
  { timestamps: true, versionKey: false }
);

export const Book = model<IBook>("Book", bookSchema);
