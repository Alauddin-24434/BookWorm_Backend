import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync"
import { generateTokens } from "../../utils/tokenGenarate";
import { uservalidations } from "../../validations/user.validations"
import { IUser } from "../user/user.interface";
import { authService } from "./auth.service";
import { uploadToCloudinary } from "../../config/cloudinary";
import { AppError } from "../../error/appError";

const craeteUser = catchAsync(async (req: Request, res: Response) => {
    //  Zod validation
    const validatedData = uservalidations.registration.parse(req.body);

    //  Check profile photo
    if (!req.file) {
        throw new AppError("Profile photo is required", 400);
    }

    // Upload to Cloudinary
    const uploadedPhoto = await uploadToCloudinary(req.file.buffer, "users/profile");
    const profilePhoto = uploadedPhoto.secure_url;

    // Service call to create user
    const result = await authService.craeteUser({ ...validatedData, profilePhoto } as IUser);

    //  Generate tokens
    const { accessToken, refreshToken } = generateTokens(result);

    // Set cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });

    // 7️⃣ Send response
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: { result, accessToken }
    });
});


const loginUser = catchAsync(async (req: Request, res: Response) => {
    // console.log("Login request body:", req.body);
    // zod validation
    const validatedData = uservalidations.login.parse(req.body);
    // console.log("Validated data:", validatedData);
 

    // service call
    const result = await authService.loginUser(validatedData);

    const  {accessToken,refreshToken}= generateTokens(result);

    // cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    // response
    // console.log("Login result:", result);
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {result,accessToken}
    });
    
})

const statsWithUserRole = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?._id as string;
    const role = req.user?.role as string;

    const stats = await authService.statsWithUserRole(userId, role);

    res.status(200).json({
        success: true,
        message: "Stats fetched successfully",
        data: stats
    });
});


export const authController = {
    craeteUser,
    loginUser,
    statsWithUserRole
}