import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { genreValidations } from "../../validations/genre.validations";
import { genreService } from "./genre.service";
import { IGenre } from "./genre.interface";

//   create genre
const createGenre = catchAsync(async (req: Request, res: Response) => {
    // Zod validation
    const validatedData = genreValidations.createGenre.parse(req.body);

    // Service call to create genre
    const result = await genreService.createGenre(validatedData as IGenre);

    // Send response
    res.status(201).json({
        success: true,
        message: "Genre created successfully",
        data: result
    });
});

// get all genres

const getAllGenres = catchAsync(async (req: Request, res: Response) => {
    // Service call to get all genres
    const result = await genreService.getAllGenres();
    
    // Send response    
    res.status(200).json({
        success: true,
        message: "Genres retrieved successfully",
        data: result
    });
}

);

//  get genre by id
const getGenreById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    // Service call to get genre by id
    const result = await genreService.getGenreById(id as string);

    // Send response
    res.status(200).json({
        success: true,
        message: "Genre retrieved successfully",
        data: result
    });
});

// update genre
const updateGenre = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Zod validation
    const validatedData = genreValidations.updateGenre.parse(req.body);

    // Service call to update genre
    const result = await genreService.updateGenre(id as string, validatedData as Partial<IGenre>);

    // Send response
    res.status(200).json({
        success: true,
        message: "Genre updated successfully",
        data: result
    });
});

// soft delete genre
const softDeleteGenre = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Service call to soft delete genre
    const result = await genreService.softDeleteGenre(id as string);

    // Send response
    res.status(200).json({
        success: true,
        message: "Genre deleted successfully",
        data: result
    });
}); 


export const genreController = {
    createGenre,
    getAllGenres,
    getGenreById,
    updateGenre,
    softDeleteGenre,
}