import z from "zod";

const createBook = z.object({
    title: z.string("title is required"),
    author: z.string("Author is required"),
    description: z.string("Description is required").max(1000),
    genre: z.string("genre is required"),
    totalPages: z.number("total pages is required"),
    createdBy: z.string(" CreatedBy is required"),
    pdfFile: z.string("PDF file is required"),
    
});

const updateBook = z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    description: z.string().max(1000).optional(),
    genre: z.string().optional(),
    totalPages: z.number().optional(),
    createdBy: z.string().optional()

})


export const BookValidations = {
    createBook,
    updateBook
}