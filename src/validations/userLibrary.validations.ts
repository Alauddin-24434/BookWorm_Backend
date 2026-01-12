import z from "zod";

const createUserLibrary = z.object({
  user: z.string("User is required"),
  book: z.string("Book is required"),
});

export const userLibraryValidations = {
  createUserLibrary,
};
