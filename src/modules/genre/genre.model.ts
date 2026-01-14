import { model, Schema } from "mongoose";
import { IGenre } from "./genre.interface";

const genreSchema = new Schema<IGenre>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Genre = model<IGenre>("Genre", genreSchema);
