import cors from "cors";
import express, { Application, Request, Response } from "express";
import { AdminRoutes } from "./app/modules/admin/admin.routes";
import { UserRoutes } from "./app/modules/users/user.routes";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "UP",
    message: "Server is running smoothy",
  });
});
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/admins", AdminRoutes);
export default app;
