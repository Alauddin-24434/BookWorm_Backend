import { Router } from "express";


const router = Router();

import { bookController } from "./book.controller";
import { upload } from "../../utils/upload";

// Create Book
router.post("/", upload.single("coverImage"), bookController.createBook);

// Get All Books
router.get("/", bookController.getAllBooks);

// Get Book by ID
router.get("/:id", bookController.getBookById);

// Update Book
router.patch("/:id", bookController.updateBook);

// Soft Delete Book
router.delete("/:id", bookController.softDeleteBook);

export const bookRoutes = router;