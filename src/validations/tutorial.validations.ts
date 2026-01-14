import { z } from "zod";

const createTutorial = z.object({
  title: z.string( "Title is required").min(2),
  youtubeURL: z.string("YouTube URL is required").url(),
  createdBy: z.string("Admin ID is required"),
});


export const tutorialValidations = {
    createTutorial
}