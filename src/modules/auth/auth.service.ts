import { Book } from "../book/book.model";
import { Review } from "../review/review.model";
import { ILogin, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";

const craeteUser = async (data: IUser) => {
  // check alaredy user exists
  const isExitUser = await User.findOne({ email: data.email });
  if (isExitUser) {
    throw new Error("User already exists");
  }

  // password hashing
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;

  // create new user
  const newUser = await User.create(data);
  // remove password from  object before return
  const userObject = newUser.toObject();
  const { password, ...userWithoutPassword } = userObject;

  return userWithoutPassword;
};


const loginUser = async (data:ILogin) => {
  // check user exists
  const user = await User.findOne({ email:data.email });
  if (!user) {
    throw new Error("User does not exist");
  }

  // compare password
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // remove password from object before return
  const userObject = user.toObject();
  const { password: pwd, ...userWithoutPassword } = userObject;

  return userWithoutPassword;
}

// stats with use role
const statsWithUserRole = async (userId:string, role: string) => {
  if (role === "admin") {
    // --- ADMIN ANALYTICS ---
    
    // Counts basic metrics for the Admin Dashboard cards
    const adminCount = await User.countDocuments({ role: "admin" });
    const userCount = await User.countDocuments({ role: "user" });
    const booksCount = await Book.countDocuments();
    
    // Monitors content quality by counting reviews that haven't been approved yet
    const pendingReviewCount = await Review.countDocuments({ isApproved: false });

    // Chart Data: Aggregates total books available per genre
    // This feeds the Admin "Books per Genre" Pie Chart
    const genreDistribution = await Book.aggregate([
      { $unwind: "$genre" }, // Breaks down book arrays into individual genre strings
      { $group: { _id: "$genre", count: { $sum: 1 } } }
    ]);

    return { 
      adminCount, 
      userCount, 
      booksCount, 
      pendingReviewCount, 
      genreDistribution 
    };
  }

  if (role === "user") {
    // --- USER DASHBOARD & GAMIFICATION ---
    
    // 1. Yearly Challenge Stats
    // Tracks progress for the "Reading Goal" feature (e.g., Read 50 books in 2026)
    const currentYear = new Date().getFullYear();
    const booksReadThisYear = await Book.countDocuments({ 
      readers: userId,
      completionDate: { 
        $gte: new Date(`${currentYear}-01-01`), 
        $lte: new Date(`${currentYear}-12-31`) 
      }
    });

    // 2. Lifetime Impact Stats
    // Aggregates total pages read across all books for the "Total Pages" stat card
    const totalPagesReadAggregation = await Book.aggregate([
      { $match: { readers: userId } },
      { $group: { _id: null, totalPages: { $sum: "$pages" } } },
    ]);
    const totalPagesRead = totalPagesReadAggregation[0]?.totalPages || 0;

    // 3. User Engagement Metric
    // Calculates the average rating the user has given to books they reviewed
    const averageRatingAggregation = await Review.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);
    const averageRating = averageRatingAggregation[0]?.avgRating || 0;

    // 4. Favorite Genre Breakdown (User Pie Chart)
    // Identifies which genres the user reads most for personal analytics
    const genreBreakdown = await Book.aggregate([
      { $match: { readers: userId } },
      { $unwind: "$genre" },
      { $group: { _id: "$genre", value: { $sum: 1 } } }
    ]);

    // 5. Monthly Progress Tracking (User Bar/Line Chart)
    // Groups books read by month to show reading consistency throughout the year
    const monthlyStats = await Book.aggregate([
      { $match: { readers: userId } },
      {
        $group: {
          _id: { $month: "$completionDate" }, // Groups by month number (1-12)
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } } // Ensures months appear in chronological order
    ]);

    // 6. User Specific Settings
    // Fetches the user's custom goal and their current consecutive daily reading streak
    const userData = await User.findById(userId).select('annualGoal readingStreak');
    const annualGoal = userData?.annualGoal || 12; // Defaults to 12 if not set

    return { 
      booksReadThisYear, 
      totalPagesRead, 
      averageRating: averageRating.toFixed(1), // Formats to 1 decimal place (e.g., 4.5)
      genreBreakdown, 
      monthlyStats,
      annualGoal,
      readingStreak: userData?.readingStreak || 0
    };
  }
};






export const authService = {
  craeteUser,
  loginUser,
  statsWithUserRole,
};


