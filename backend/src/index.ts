import express from "express";
import * as dotenv from "dotenv";
import { router as featureRouter } from "./routes/features";

dotenv.config();

const app = express();

// middleware
app.use(express.json());

app.use("/api/features", featureRouter);

app
  .listen(process.env.PORT, () =>
    console.log(`Listening to port: ${process.env.PORT}`)
  ) //   Fix the Error EADDRINUSE
  .on("error", () => {
    process.once("SIGUSR2", () => {
      process.kill(process.pid, "SIGUSR2");
    });
    process.on("SIGINT", () => {
      // this is only called on ctrl+c, not restart
      process.kill(process.pid, "SIGINT");
    });
  });
