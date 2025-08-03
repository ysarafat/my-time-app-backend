import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";

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

app.use("/api/v1", router);

export default app;
