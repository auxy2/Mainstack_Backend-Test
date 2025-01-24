import { Request, Response, NextFunction } from "express";

/**
 * A wrapper for asynchronous functions to handle errors.
 *
 * @param fn - The asynchronous function to wrap
 * @returns An Express middleware function
 */
const asyncWrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await fn(req, res, next);
  } catch (e) {
    next(e);
  }
};

export default asyncWrapper;
