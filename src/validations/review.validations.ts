import z from "zod";


const createReview = z.object({
    user: z.string("User is required"),
    book: z.string("Book is required"),
    rating: z.number("Number is required"),
    comment: z.string("Comment is required"),
    
})