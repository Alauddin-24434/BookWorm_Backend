import { Types } from "mongoose";

export interface IReadingGoal {
  user: Types.ObjectId;
  year: number;
  targetBooks: number;
  booksRead: number;
  totalPages: number;
  createdAt?: Date;
  updatedAt?: Date;
}
