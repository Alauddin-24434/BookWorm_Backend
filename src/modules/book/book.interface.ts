import { Types } from "mongoose";

export interface IBook{
    title: string;
    author: string;
    description: string;
    genre: Types.ObjectId,
    coverImage: string;
    totalPages: number;
    averageRating: number;
    totalReviews: number;
    createdBy: Types.ObjectId;
  
}