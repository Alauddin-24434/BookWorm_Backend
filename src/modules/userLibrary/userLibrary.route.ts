import { Router } from "express";
import { userLibraryController } from "./userLibrary.controller";


const router = Router();





router.post("/add-book", userLibraryController.addBookToUserLibrary);
router.get("/:userId", userLibraryController.getUserLibrary);
router.get("/", userLibraryController.getAllUserLibraries);

// Define other routes for user library as needed

export const userLibraryRoutes = router;