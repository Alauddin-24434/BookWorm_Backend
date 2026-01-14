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

export const userService = {
    me,
    getAllUsers
};