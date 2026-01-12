import z from "zod";

const createGenre = z.object({
    name: z.string("name is required"),
    description: z.string().optional(),
});


export const genreValidations={
 createGenre
}