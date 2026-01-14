import z from "zod";

const createReadingGoal = z.object({
  user: z.string("User is required"),

  year: z
    .number("Year is required")
    .int("Year must be an integer")
    .min(2000, "Year must be valid"),

  targetBooks: z
    .number("Target books is required")
    .int("Target books must be an integer")
    .min(1, "Target must be at least 1 book"),

  booksRead: z
    .number()
    .int("Books read must be an integer")
    .nonnegative("Books read cannot be negative")
    .optional(),

  totalPages: z
    .number()
    .int("Total pages must be an integer")
    .nonnegative("Total pages cannot be negative")
    .optional(),
});

export const readingGoalValidations = {
  createReadingGoal,
};
