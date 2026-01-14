import { AppError } from "../../error/appError";
import { IGenre } from "./genre.interface";
import { Genre } from "./genre.model";

// createGenre
const createGenre = async (data: IGenre) => {
  // check genre exists
  const isExistGenre = await Genre.findOne({ name: data.name });
  if (isExistGenre) {
    throw new AppError("Genre already exists", 400);
  }

  // create new genre
  const newGenre = await Genre.create(data);
  return newGenre;
};

// getAllGenres
const getAllGenres = async () => {
  const genres = await Genre.find();
  return genres;
};

// getGenreById
const getGenreById = async (id: string) => {
  const genre = await Genre.findById(id);
  if (!genre) {
    throw new AppError("Genre not found", 404);
  }
  return genre;
};

// updateGenre
const updateGenre = async (id: string, data: Partial<IGenre>) => {
  const updatedGenre = await Genre.findByIdAndUpdate(id, data, { new: true });
  if (!updatedGenre) {
    throw new AppError("Genre not found", 404);
  }
  return updatedGenre;
};

// softDeleteGenre
const softDeleteGenre = async (id: string) => {
  const deletedGenre = await Genre.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!deletedGenre) {
    throw new AppError("Genre not found", 404);
  }
  return deletedGenre;
};

export const genreService = {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  softDeleteGenre,
};
