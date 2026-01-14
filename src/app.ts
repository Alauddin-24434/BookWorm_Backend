import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.route";
import { AppError } from "./error/appError";
import { ZodError } from "zod";
import { baseRoute } from "./baseRoutes";
import { MongooseError } from "mongoose";

const app: Application = express();

/* =========================
   Middlewares
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true, // allow all origins (or specify domain)
    credentials: true,
  })
);

/* =========================j
   Root Route (Health Check)
========================= */
app.get("/", (req: Request, res: Response) => {
 
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

/* =========================
// Register all routes under /api/v1
 ========================= */


baseRoute(app, "/api/v1");


/* =========================
   404 Handler
========================= */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
 
  let statusCode = 500;
  let message = err.message || "Internal Server Error";
  let errors = [{path:"",message:""}];
// check instance of AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errors = [{ path: "", message: err.message }];
  
  }

  // ckeck zod error
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errors = err.issues.map((issue) => {
      return { path: issue.path.join("."), message: issue.message };
    })
   
  }

  // mongoose validation error

  else if (err.name === "ValidationError") {
    console.log("Mongoose error detected", err);
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errors: errors,
  });
});

export default app;
