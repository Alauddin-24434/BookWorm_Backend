import { Router } from "express";
import { genreController } from "./genre.controller";



const router = Router();

// Create Genre
router.post("/", genreController.createGenre);

// Get All Genres
router.get("/", genreController.getAllGenres);

// Get Genre by ID
router.get("/:id", genreController.getGenreById);

// Update Genre
router.patch("/:id", genreController.updateGenre);

// Delete Genre
router.delete("/:id", genreController.softDeleteGenre);

export const genreRoutes = router;