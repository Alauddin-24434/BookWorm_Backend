import { Schema, model, Types } from "mongoose";
import { IFollow } from "./follow.inerface";

const followSchema = new Schema<IFollow>(
  {
    follower: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    following: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true, versionKey: false }
);

export const Follow = model<IFollow>("Follow", followSchema);
