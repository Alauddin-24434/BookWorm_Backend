import { Types } from "mongoose";

export interface ITutorial {
  title: string;
  youtubeUrl: string;
  description?: string;
  createdBy: Types.ObjectId; 
  
}
