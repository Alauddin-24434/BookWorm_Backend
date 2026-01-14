import express from "express";


const router= express.Router();
import { authController } from "./auth.controller";
import { upload } from "../../utils/upload";
import { protect } from "../../middlewares/authenticationMiddleawre";

router.post("/signup", upload.single("profilePhoto"), authController.craeteUser);
router.post("/login", authController.loginUser);
router.get("/stats", protect, authController.statsWithUserRole);

export const authRoutes= router;