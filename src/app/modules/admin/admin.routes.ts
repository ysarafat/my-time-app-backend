import { Router } from "express";
import { AdminControllers } from "./admin.controllers";

const router = Router();
router.get("/", AdminControllers.getAdmins);
export const AdminRoutes = router;
