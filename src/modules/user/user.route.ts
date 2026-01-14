import { Router } from "express";

const router = Router();

import { userController } from "./user.controller";
import { authorize } from "../../middlewares/authorizationMiddleware";
import { protect } from "../../middlewares/authenticationMiddleawre";

router.get("/me", protect, userController.me);
router.get("/", authorize("admin"), userController.getAllUsers);

export const userRoutes = router;