import { Router } from "express";
import { AdminRoutes } from "../modules/admin/admin.routes";
import { UserRoutes } from "../modules/users/user.routes";
const router = Router();
const appRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
];
appRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
