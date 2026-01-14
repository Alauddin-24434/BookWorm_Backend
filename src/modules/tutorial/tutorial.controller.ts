import { Request, Response } from "express";
import { tutorialService } from "./tutorial.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";

// ===== Create Tutorial =====
const addTutorial = catchAsync(async (req: Request, res: Response) => {
    const createdBy = req.user?._id;
    const result = await tutorialService.addTutorial({ ...req.body, createdBy });

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Tutorial created successfully",
    data: result,
  });
});

// =====Get All Tutorials =====
const getAllTutorials = catchAsync(async (req: Request, res: Response) => {
  const result = await tutorialService.getAllTutoRials();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Tutorials fetched successfully",
    data: result,
  });
});

// =====  Get Single Tutorial by ID =====
const getTutorialById = catchAsync(async (req: Request, res: Response) => {
  const tutoId = req.params.tutoId as string;
  const result = await tutorialService.getTutorialById(tutoId);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Tutorial fetched successfully",
    data: result,
  });
});
// ===== Update Tutorial (New) =====
const updateTutorial = catchAsync(async (req: Request, res: Response) => {
  const tutoId  = req.params.tutoId as string;
  const result = await tutorialService.updateTutorial(tutoId, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Tutorial updated successfully",
    data: result,
  });
});

// ===== Soft Delete Tutorial =====
const softDeleteTutorial = catchAsync(async (req: Request, res: Response) => {
  const tutoId = req.params.tutoId as string;
  await tutorialService.softDeleteTutorials(tutoId);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Tutorial deleted successfully",
    data: null,
  });
});

export const tutorialController = {
  addTutorial,
  getAllTutorials,
  getTutorialById,
    softDeleteTutorial,
  updateTutorial
};
