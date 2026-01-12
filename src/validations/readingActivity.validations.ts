import { z } from "zod";
import { Actions } from "../modules/readingActivity/readingActivity.interface";

export const readingActivityValidationSchema = z.object({
  user: z.string("User is required" ),
  book: z.string("Book is required"),
  action: z.enum([Actions.ADDED, Actions.PROGRESS,Actions.FINISHED,Actions.RATED]),
  value: z.number("Value is required").nonnegative(),
});
