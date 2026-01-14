import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userLibraryService } from "./userLibrary.ervice";



const addBookToUserLibrary= catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    console.log(data);

    // Service call to add book to user library
    const result = await userLibraryService.addOrUpdateBookInUserLibrary(data);

    // Send response
    res.status(200).json({
        success: true,
        message: "Book added to user library successfully",
        data: result
    });
}
);


// get all books in user library controller here

const getUserLibrary= catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;

    // Service call to get user's library
    const result = await userLibraryService.getUserLibrary(userId as string);
    
    // Send response    
    res.status(200).json({
        success: true,
        message: "User library retrieved successfully",
        data: result
    });
}
);

// get all user libraries controller here

const getAllUserLibraries= catchAsync(async (req: Request, res: Response) => {
    // Service call to get all user libraries
    const result = await userLibraryService.getAllUserLibraries();
    
    // Send response
    res.status(200).json({
        success: true,
        message: "All user libraries retrieved successfully",
        data: result
    });
}   
);  


export const userLibraryController = { 
    addBookToUserLibrary,
    getUserLibrary,
    getAllUserLibraries
};

