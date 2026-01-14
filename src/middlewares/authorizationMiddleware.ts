import { Request, Response, NextFunction } from "express";
import { IUser } from "../modules/user/user.interface";



export interface AuthRequest extends Request {
  user?: IUser; 
}
// Authorization Middleware (Role-based)
export const authorize = (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
  // console.log("roles", roles)
  // console.log("usr", req, req.user)
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to perform this action" });
    }

    next();
  };
