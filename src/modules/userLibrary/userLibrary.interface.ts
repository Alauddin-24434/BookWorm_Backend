import { Types } from "mongoose";

export enum Shelf {
  WantToRead = "wantToRead",
  CurrentlyReading = "currentlyReading",
  Read = "read",
}

export interface IUserLibrary {
  user: Types.ObjectId;
  book: Types.ObjectId;
  shelfType: Shelf;
  progress?: number;
  startedAt?: Date | null;
  finishedAt?: Date | null;
}
