import z from "zod";

// craete genre validation
const createGenre = z.object({
  name: z.string("name is required"),
  description: z.string().optional(),
});

//  update genre validation
const updateGenre = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export const genreValidations = {
  createGenre,
  updateGenre,
};
