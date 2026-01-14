import { Types } from "mongoose";

export enum Role {
    ADMIN = "admin",
    USER= "user"
}


export interface IUser {
    _id: string
    name: string;
    email: string;
    profilePhoto: string;
    annualGoal: number;
    readingStreak: number;
    role: Role;
    password: string;
    followers?: Types.ObjectId[];
    following?: Types.ObjectId[];
    library?: Types.ObjectId[];
    history?: Types.ObjectId[];
    isDeleted: boolean;
}


export interface ILogin {

   
    email: string;
    password: string;
}