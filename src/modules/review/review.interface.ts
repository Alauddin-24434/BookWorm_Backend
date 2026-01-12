import { Types } from "mongoose";

export enum Status {
    PENDING = "pending",
    APPROVED="approved"
}

export interface IReview{
    user: Types.ObjectId,
    book: Types.ObjectId,
    rating: number;
    comment: string;
    status: Status;

}