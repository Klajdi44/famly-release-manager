import express from "express";
import * as dotenv from "dotenv";
import { router as releaseToggleRouter } from "./routes/releaseToggles";
import { router as authRouter } from "./routes/auth";
import * as Auth from "./middlewares/auth.middleware";
import compression from "compression";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "./config";

dotenv.config();

const app = express();

app.use(express.json());
app.set("trust proxy", 1);
app.use(compression()); // compresses all the responses
app.use(helmet()); // adding set of security middlewares
app.use(bodyParser.json()); // parse incoming request body and append data to `req.body`
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(Auth.authorize()); // JWT authorize accessTypes
app.use("/api/v1/release-toggles", releaseToggleRouter);
app.use("/api/v1/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `### The app is listening at http://localhost:${process.env.PORT} ###`
  );
});
