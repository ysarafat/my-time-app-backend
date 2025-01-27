import { Request, Response } from "express";
import { AdminServices } from "./admin.services";

// get admin
const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await AdminServices.getAdmins(req.query);
    res.status(200).json({
      success: true,
      message: "Admins fetched successfully",
      data: admins,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name || "Internal server error",
      error: error,
    });
  }
};

export const AdminControllers = { getAdmins };
