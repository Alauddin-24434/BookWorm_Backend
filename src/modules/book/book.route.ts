import { Router } from "express";


const router = Router();

import { bookController } from "./book.controller";
import { upload } from "../../utils/upload";
import { protect } from "../../middlewares/authenticationMiddleawre";
import { authorize } from "../../middlewares/authorizationMiddleware";

// Create Book
router.post("/", protect, authorize("admin"), upload.single("coverImage"), bookController.createBook);

// Get All Books
router.get("/", bookController.getAllBooks);

// Get Book by ID
router.get("/:id", bookController.getBookById);

// Update Book
router.patch("/:id", protect,  upload.single("coverImage"),bookController.updateBook);

// Soft Delete Book
router.delete("/:id", bookController.softDeleteBook);

export const bookRoutes = router;