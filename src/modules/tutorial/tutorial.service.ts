import { AppError } from "../../error/appError";
import { ITutorial } from "./tutorial.interface";
import { Tutorial } from "./tutorial.model"

/**
 * Create a new tutorial
 * Checks for duplicate titles before saving
 */
const addTutorial = async (data: ITutorial) => {
    const isAlredyExit = await Tutorial.findOne({ title: data.title });
    if (isAlredyExit) {
        throw new AppError("Title already exists", 400);
    };

    const newtutorial = await Tutorial.create(data);
    return newtutorial;
};

/**
 * Retrieve all tutorials that are not soft-deleted
 */
const getAllTutoRials = async () => {
    const result = await Tutorial.find({ isDeleted: false });
    return result;
};

/**
 * Fetch a single tutorial by its ID
 */
const getTutorialById = async (id: string) => {
    const result = await Tutorial.findById(id);
    if (!result || result.isDeleted) {
        throw new AppError("Tutorial not found", 404);
    }
    return result;
};

/**
 * Perform a soft delete by updating the isDeleted flag to true
 */
const softDeleteTutorials = async (tutoId: string) => {
    const result = await Tutorial.findByIdAndUpdate(
        tutoId, 
        { isDeleted: true }, 
        { new: true }
    );
    
    if (!result) {
        throw new AppError("Tutorial not found", 404);
    }
    
    return result;
};

const updateTutorial = async (id: string, payload: Partial<ITutorial>) => {
  
    const isExist = await Tutorial.findById(id);
    if (!isExist || isExist.isDeleted) {
        throw new AppError("Tutorial not found or already deleted", 404);
    }

    // ২. আপডেট করা
    const result = await Tutorial.findByIdAndUpdate(
        id,
        payload,
        { new: true, runValidators: true } 
    );

    return result;
};

export const tutorialService = {
    addTutorial,
    getAllTutoRials,
    getTutorialById,
    softDeleteTutorials,
    updateTutorial
}