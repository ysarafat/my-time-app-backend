import { Server } from "http";
import app from "./app";

async function bootstrap() {
  const server: Server = app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
  });
}

bootstrap();
