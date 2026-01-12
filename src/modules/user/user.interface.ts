import { Types } from "mongoose";

export enum Role {
    ADMIN = "admin",
    USER= "user"
}


export interface IUser {
    name: string;
    email: string;
    profilePhoto: string;
    role: Role;
    password: string;
    readingGoal?: number;
    followers?: Types.ObjectId[];
    following?: Types.ObjectId[];
}