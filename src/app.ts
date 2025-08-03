import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorHandler, notFoundRoute } from "./app/middlewares";
import router from "./app/routes";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server health checking
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "UP",
    message: "Server is running smoothy",
  });
});

// app routes
app.use("/api/v1", router);

// global error handler middleware
app.use(globalErrorHandler);

// handle not found route
app.use(notFoundRoute);

// export app
export default app;
