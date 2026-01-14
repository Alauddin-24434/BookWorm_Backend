import { AppError } from "../../error/appError";
import { User } from "./user.model";



//  get currentUser login user
const me= async (userId: string) => {
    const result = await User.findById(userId).select("-password").populate("followers following library history");
    return result;
};

// get all users service here

const getAllUsers = async () => {
    const result = await User.find().select("-password");
    return result;
};  
const roleUpdateByAdmin = async (userId: string, newRole: string) => {

  
    const user = await User.findOne({ _id: userId});


    if (!user) {
        throw new AppError( "User not found or is already deleted!", 404);
    }


    const result = await User.updateOne(
        { _id: userId }, 
        { role: newRole },
        { runValidators: true }
    );

  
    if (result.modifiedCount === 0) {
        throw new AppError("Update failed or no changes made.", 400);
    }

    const updatedUser = await User.findById(userId);
    return updatedUser;
};
export const userService = {
    me,
    getAllUsers,
    roleUpdateByAdmin
};