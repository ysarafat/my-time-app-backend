import { NextFunction, Request, Response } from "express";
import { pick, sendResponse } from "../../../utils";
import { filterableFields } from "./admin.constant";
import { AdminServices } from "./admin.services";

// get admin
const getAdmins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = pick(req.query, filterableFields);
    const filteringOptions = pick(req.query, [
      "limit",
      "page",
      "sortBy",
      "sortOrder",
    ]);

    const admins = await AdminServices.getAdmins(query, filteringOptions);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admins fetched successfully",
      meta: admins?.metadata,
      data: admins?.admins,
    });
  } catch (error: any) {
    next(error);
  }
};

// get admin by ID
const getAdminByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const admin = await AdminServices.getAdminByID(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin fetched successfully",
      data: admin,
    });
  } catch (error: any) {
    next(error);
  }
};
// update admin by id
const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedData = await AdminServices.updateAdmin(id, data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin is updated successfully",
      data: updatedData,
    });
  } catch (error: any) {
    next(error);
  }
};
// delete admin by id
const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const deletedData = await AdminServices.deleteAdmin(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin is deleted successfully",
      data: deletedData,
    });
  } catch (error: any) {
    next(error);
  }
};
// soft delete admin by id
const softDeleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const updatedData = await AdminServices.softDeleteAdmin(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin is deleted successfully",
      data: updatedData,
    });
  } catch (error: any) {
    next(error);
  }
};

export const AdminControllers = {
  getAdmins,
  getAdminByID,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
