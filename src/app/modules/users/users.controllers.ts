import { Request, Response } from "express";
import { UserServices } from "./users.services";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await UserServices.createAdmin(req.body);
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name || "Internal server error",
      error: error,
    });
  }
};

export const UserControllers = { createAdmin };
