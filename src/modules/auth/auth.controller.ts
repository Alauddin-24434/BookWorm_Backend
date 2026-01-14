import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { generateTokens } from "../../utils/tokenGenarate";
import { uservalidations } from "../../validations/user.validations";
import { IUser } from "../user/user.interface";
import { authService } from "./auth.service";
import { uploadToCloudinary } from "../../config/cloudinary";
import { AppError } from "../../error/appError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";

const craeteUser = catchAsync(async (req: Request, res: Response) => {
  //  Zod validation
  const validatedData = uservalidations.registration.parse(req.body);

  //  Check profile photo
  if (!req.file) {
    throw new AppError("Profile photo is required", 400);
  }

  // Upload to Cloudinary
  const uploadedPhoto = await uploadToCloudinary(
    req.file.buffer,
    "users/profile"
  );
  const profilePhoto = uploadedPhoto.secure_url;

  // Service call to create user
  const result = await authService.craeteUser({
    ...validatedData,
    profilePhoto,
  } as IUser);

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
    data: { result, accessToken },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  // console.log("Login request body:", req.body);
  // zod validation
  const validatedData = uservalidations.login.parse(req.body);
  // console.log("Validated data:", validatedData);

  // service call
  const result = await authService.loginUser(validatedData);

  const { accessToken, refreshToken } = generateTokens(result);

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
    data: { result, accessToken },
  });
});

const statsWithUserRole = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id as string;
  const role = req.user?.role as string;

  const stats = await authService.statsWithUserRole(userId, role);

  res.status(200).json({
    success: true,
    message: "Stats fetched successfully",
    data: stats,
  });
});
/**
 * @desc    Generate a new Access Token using Refresh Token from Cookie
 * @route   POST /api/auth/refresh-token
 * @access  Public (Requires Cookie)
 */
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  // 1. Extract refresh token from cookies
  const { refreshToken: existingToken } = req.cookies;

  if (!existingToken) {
    throw new AppError("Refresh token is missing", httpStatus.UNAUTHORIZED);
  }

  // 2. Verify the refresh token using the secret key
  let decoded;
  try {
    decoded = jwt.verify(
      existingToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;
  } catch (err) {
    throw new AppError(
      "Refresh token is expired or invalid",
      httpStatus.UNAUTHORIZED
    );
  }

  // 3. Generate new tokens using the decoded user data
  // Note: Use a different name to avoid conflict with 'existingToken'
  const { accessToken, refreshToken: newRefreshToken } =
    generateTokens(decoded);

  // 4. Update the refresh token cookie (Optional but recommended for rotation)
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days
  });

  // 5. Send only the new access token to the client
  res.status(httpStatus.OK).json({
    success: true,
    message: "Access token retrieved successfully",
    data: { accessToken },
  });
});

export const authController = {
  craeteUser,
  loginUser,
    statsWithUserRole,
  refreshToken
};
