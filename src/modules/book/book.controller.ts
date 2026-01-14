
//  book controller here

import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BookValidations } from "../../validations/book.validations";
import { bookService } from "./book.service";
import { IBook } from "./book.interface";
import { AppError } from "../../error/appError";

import { uploadToCloudinary } from "../../config/cloudinary";

const createBook = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body);

    // Zod validation
    const validatedData = BookValidations.createBook.parse({...req.body, totalPages: Number(req.body.totalPages)});

    // uploaded cover image handling
    if (!req.file) {
        throw new AppError("Cover image is required", 400); 
    }

  
    //    uplod cloudinary logic here
    const uploadedImage= await uploadToCloudinary(req.file.buffer, "books/coverImages");
    const coverImage= uploadedImage.secure_url;

    

    // Service call to create book
    const result = await bookService.createBook({ ...validatedData, coverImage } as unknown as IBook);

    // Send response
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: result
    });
});

// update book controller here

const updateBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Zod validation
    const validatedData = BookValidations.updateBook.parse(req.body);

    //    uplod cloudinary logic here
    let coverImage;
    if (req.file) {
        const uploadedImage = await uploadToCloudinary(req.file.buffer, "books/coverImages");
        coverImage = uploadedImage.secure_url;
    }


    // Service call to update book
    const result = await bookService.updateBook(id as string, {...validatedData, coverImage } as Partial<IBook>);

    // Send response
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: result
    });
}       );

// soft delete book controller here

const softDeleteBook= catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;              

    // Service call to soft delete book
    const result = await bookService.softDeleteBook(id as string);
    
    // Send response

    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: result
    });
}
);

// get all books controller here

const getAllBooks= catchAsync(async (req: Request, res: Response) => {
    // Service call to get all books
    const result = await bookService.getAllBooks();

    // Send response
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: result
    });
}
);

// get book by id controller here

const getBookById= catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    // Service call to get book by id
    const result = await bookService.getBookById(id as string);     

    // Send response    
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: result
    });
}
);



export const bookController = {
 createBook,
 updateBook,
 softDeleteBook,
 getAllBooks,
 getBookById,
};