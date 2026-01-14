import { model, Schema } from "mongoose";
import { IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: Role.USER,
    },
    password: {
      type: String,
      required: true,
    },

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    library: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserLibrary",
      },
    ],
    history: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    annualGoal: {
      type: Number,
      default: 0,
    },

    readingStreak: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default:false
    }
  },
  { timestamps: true, versionKey: false }
);

export const User = model<IUser>("User", userSchema);
