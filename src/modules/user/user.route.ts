import { Router } from "express";

const router = Router();

import { userController } from "./user.controller";
import { authorize } from "../../middlewares/authorizationMiddleware";
import { protect } from "../../middlewares/authenticationMiddleawre";

router.get("/me", protect, userController.me);
router.get("/", protect, authorize("admin"), userController.getAllUsers);
router.patch("/:userId/role", protect, authorize("admin"), userController.roleUpdateByAdmin);
export const userRoutes = router;