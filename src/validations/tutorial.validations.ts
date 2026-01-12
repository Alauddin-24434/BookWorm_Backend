import { z } from "zod";

const createTutorial = z.object({
  title: z.string( "Title is required").min(2),
  youtubeUrl: z.string("YouTube URL is required").url(),
  description: z.string().max(1000).optional(),
  createdBy: z.string("Admin ID is required"),
});


export const tutorialValidations = {
    createTutorial
}