import { RequestHandler } from "express";

/**
 * Wraps async controllers to avoid repetitive try-catch
 */
export const catchAsync = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
