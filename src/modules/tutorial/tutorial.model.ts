import { Schema, model, Types } from "mongoose";
import { ITutorial } from "./tutorial.interface";

const tutorialSchema = new Schema<ITutorial>(
  {
    title: { type: String, required: true, trim: true, index: true },
    youtubeUrl: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Tutorial = model<ITutorial>("Tutorial", tutorialSchema);
