import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";

//  current login user
const me = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;

  const result = await userService.me(userId);

  res.status(200).json({
    success: true,
    message: "Current user fetched successfully",
    data: result,
  });
});

// get all users controller here
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();

  res.status(200).json({
    success: true,
    message: "All users fetched successfully",
    data: result,
  });
});

// role updae
const roleUpdateByAdmin = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId as string;
  const { role } = req.body;

  const result = await userService.roleUpdateByAdmin(userId, role);

  res.status(200).json({
    success: true,
    message: "Role update ted sucessfully",
    data: result,
  });
});

export const userController = {
  me,
    getAllUsers,
  roleUpdateByAdmin
};
