import express from "express";
import * as dotenv from "dotenv";
import { router as releaseToggleRouter } from "./routes/releaseToggles";
import { router as siteRouter } from "./routes/sites";
import { router as segmentRouter } from "./routes/segments";
import { router as prismaRouter } from "./routes/scheduleRelease";
import { router as authRouter } from "./routes/auth";
import { router as countryRouter } from "./routes/country";
import { router as subscriptionRouter } from "./routes/subscription";
import { router as isActiveForSiteRouter } from "./routes/isActiveForSite";

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
app.use("/api/v1/sites", siteRouter);
app.use("/api/v1/segments", segmentRouter);
app.use("/api/v1/schedule", prismaRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/countries", countryRouter);
app.use("/api/v1/is-active-for-site", isActiveForSiteRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `### The app is listening at http://localhost:${process.env.PORT} ###`
  );
});
