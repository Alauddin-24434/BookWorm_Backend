import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { IUser } from "../modules/user/user.interface";

interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

export interface AuthRequest extends Request {
  user?: IUser
}

// Authentication Middleware
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;
    
    // console.log(req.headers.authorization);

  // Token check (header Authorization: Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET || "default-secret";
      const decoded = jwt.verify(token, secret) as JwtPayload;
      // console.log(decoded);

    // user find
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    req.user = user; // attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
