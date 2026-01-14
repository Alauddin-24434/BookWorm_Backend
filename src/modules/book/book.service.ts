
//   craete book service here

import { IBook } from "./book.interface";
import { Book } from "./book.model";

const createBook = async (bookData: IBook) => {
    // chek for existing book with same title

    if (await Book.findOne({ title: bookData.title })) {
        throw new Error("Book with this title already exists");
    }

    // logic to create a book
    const book = new Book(bookData);
    return await book.save();
};

//   update book service here

const updateBook = async (bookId: string, updateData: Partial<IBook>): Promise<IBook | null> => {
    // logic to update a book
    return await Book.findByIdAndUpdate(bookId, updateData, { new: true });
};

//   soft delete book service here

const softDeleteBook = async (bookId: string): Promise<IBook | null> => {
    // logic to soft delete a book
    return await Book.findByIdAndUpdate(bookId, { isDeleted: true }, { new: true });
};

//  get all books service here
const getAllBooks = async (): Promise<IBook[]> => {
    // logic to get all books
    return await Book.find({ isDeleted: { $ne: true } }).populate("genre");
};

//  get book by id service here
const getBookById = async (bookId: string): Promise<IBook | null> => {
    // logic to get a book by id
    return await Book.findOne({ _id: bookId, isDeleted: { $ne: true } });
};  







export const bookService = {
    createBook,
    updateBook,
    softDeleteBook,
    getAllBooks,
    getBookById,
}