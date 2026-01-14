import { model, Schema } from "mongoose";
import { IUserLibrary, Shelf } from "./userLibrary.interface";

const userLibrarySchema = new Schema<IUserLibrary>(
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
    shelfType: {
      type: String,
      enum:Object.values(Shelf),
      default: Shelf.WantToRead,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    startedAt: {
      type: Date,
      default: null,
    },
    finishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

export const UserLibrary = model<IUserLibrary>(
  "UserLibrary",
  userLibrarySchema
);
