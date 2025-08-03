import { Response } from "express";

export const sendResponse = <T>(
  response: Response,
  data: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: {
      page: number;
      limit: number;
      total: number;
    };
    data: T | null | undefined;
  }
) => {
  response.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta || null || undefined,
    data: data?.data || null || undefined,
  });
};
