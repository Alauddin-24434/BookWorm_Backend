import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

const app: Application = express();

/* =========================
   Middlewares
========================= */
app.use(express.json());

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
   404 Handler
========================= */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
