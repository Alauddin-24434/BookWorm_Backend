import mongoose from "mongoose";
import { User } from "../user/user.model";
import { IUserLibrary } from "./userLibrary.interface";
import { UserLibrary } from "./userLibrary.model";


 const addOrUpdateBookInUserLibrary = async (data: IUserLibrary) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // প্রথমে দেখবে user এর library তে কি book already আছে
    const existing = await UserLibrary.findOne({
      user: data.user,
      book: data.book,
    }).session(session);

    // Update values based on shelfType
    let updateData: Partial<IUserLibrary> = {
      shelfType: data.shelfType,
    };

    if (data.shelfType === "currentlyReading") {
      updateData.startedAt = existing?.startedAt ?? new Date();
      updateData.finishedAt = undefined; // reading ongoing
      updateData.progress = data.progress ?? existing?.progress ?? 0;
    } else if (data.shelfType === "read") {
      updateData.startedAt = existing?.startedAt ?? new Date();
      updateData.finishedAt = new Date();
      updateData.progress = 100;
    } else if (data.shelfType === "wantToRead") {
      updateData.startedAt = undefined;
      updateData.finishedAt = undefined;
      updateData.progress = 0;
    }

    let result;

    if (existing) {
      // Update existing entry
      result = await UserLibrary.findByIdAndUpdate(
        existing._id,
        updateData,
        { new: true, session }
      );
    } else {
      // Create new entry
      result = await UserLibrary.create([{ ...data, ...updateData }], { session });

      // User history update
      await User.findByIdAndUpdate(
        data.user,
        { $push: { history: data.book , library: result[0]._id} },
        { new: true, session }
      );
    }

    // সব ঠিক থাকলে commit
    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (err) {
    // কিছু error হলে rollback
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};


//  get user's library service here

const getUserLibrary = async (userId: string) => {
    const result = await UserLibrary.find({ user: userId }).populate("book");
    return result;
};

// get all user libraries service here

const getAllUserLibraries = async () => {
    const result = await UserLibrary.find();
    return result;
};  


export const userLibraryService = {
    addOrUpdateBookInUserLibrary,
    getUserLibrary,
    getAllUserLibraries


};