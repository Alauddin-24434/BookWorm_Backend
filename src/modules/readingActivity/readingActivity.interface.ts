import { Types } from "mongoose";

export enum Actions{
    ADDED = "added",
    PROGRESS = "progress",
    FINISHED = "finished",
    RATED= "rated"
}

export interface IReadingActivity{
    user: Types.ObjectId,
    book: Types.ObjectId,
    action: Actions;
    value: number;
    
}

