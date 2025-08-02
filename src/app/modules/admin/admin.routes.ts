import { Router } from "express";
import { AdminControllers } from "./admin.controllers";

const router = Router();

router.get("/", AdminControllers.getAdmins);
router.get("/:id", AdminControllers.getAdminByID);
router.patch("/update/:id", AdminControllers.updateAdmin);

export const AdminRoutes = router;
