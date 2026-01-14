import { Schema, model, Types } from "mongoose";
import { ITutorial } from "./tutorial.interface";

const tutorialSchema = new Schema<ITutorial>(
  {
    title: { type: String, required: true, trim: true, index: true },
    youtubeURL: { type: String, required: true, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: {type: Boolean, default:false}
  },
  { timestamps: true, versionKey: false }
);

export const Tutorial = model<ITutorial>("Tutorial", tutorialSchema);
