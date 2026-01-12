import z from "zod";

const createBook = z.object({
    title: z.string("title is required"),
    author: z.string("Author is required"),
    description: z.string().max(1000).optional(),
    genre: z.string("genre is required"),
    coverImage: z.string("Cover image is required"),
    totalPages: z.number("total pages is required"),
    createdBy: z.string(" CreatedBy is required")
    
});


export const BookValidations = {
    createBook
}