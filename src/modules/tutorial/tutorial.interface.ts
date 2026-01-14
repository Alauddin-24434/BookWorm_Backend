import { Types } from "mongoose";

export interface ITutorial {
  title: string;
  youtubeURL: string;
  createdBy: Types.ObjectId; 
  isDeleted: boolean;
  
}
