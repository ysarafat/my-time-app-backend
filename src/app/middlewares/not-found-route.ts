import { NextFunction, Request, Response } from "express";

export const notFoundRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = `Route not found: ${req.originalUrl}`;

  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    error: {
      message: errorMessage,
    },
  });
};
