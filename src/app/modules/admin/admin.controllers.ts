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

export const AdminControllers = { getAdmins };
