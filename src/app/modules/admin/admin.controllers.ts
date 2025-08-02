import { Request, Response } from "express";
import { pick } from "../../../utils";
import { filterableFields } from "./admin.constant";
import { AdminServices } from "./admin.services";

// get admin
const getAdmins = async (req: Request, res: Response) => {
  try {
    const query = pick(req.query, filterableFields);
    const filteringOptions = pick(req.query, [
      "limit",
      "page",
      "sortBy",
      "sortOrder",
    ]);

    const admins = await AdminServices.getAdmins(query, filteringOptions);
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

// get admin by ID
const getAdminByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const admin = await AdminServices.getAdminByID(id);
    res.status(200).json({
      success: true,
      message: "Admin fetched successfully",
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
// update admin by id
const updateAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedData = await AdminServices.updateAdmin(id, data);
    res.status(200).json({
      success: true,
      message: "Admin is updated successfully",
      data: updatedData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name || "Internal server error",
      error: error,
    });
  }
};
export const AdminControllers = { getAdmins, getAdminByID, updateAdmin };
