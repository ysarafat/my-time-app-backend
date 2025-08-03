import { Router } from "express";
import { AdminControllers } from "./admin.controllers";

const router = Router();

router.get("/", AdminControllers.getAdmins);
router.get("/:id", AdminControllers.getAdminByID);
router.patch("/update/:id", AdminControllers.updateAdmin);
router.delete("/delete/:id", AdminControllers.deleteAdmin);
router.delete("/soft-delete/:id", AdminControllers.softDeleteAdmin);

// export routes
export const AdminRoutes = router;
