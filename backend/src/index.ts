import express from "express";
import * as dotenv from "dotenv";
import { generateToken } from "./api/utils/jwt.utils";
import { router as featureRouter } from "./routes/features";
import compression from "compression";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "./config";
import * as Auth from "../src/middlewares/auth.middleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(Auth.authorize(["getAllFeatures"])); // JWT authorize accessTypes
app.use("/api/features", featureRouter);
app.use(compression()); // compresses all the responses
app.use(helmet()); // adding set of security middlewares
app.use(bodyParser.json()); // parse incoming request body and append data to `req.body`
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // enable all CORS request

// Only generate a token for lower level environments
if (config.isProduction === false) {
  console.log("*** JWT:", generateToken());
}

app.listen(process.env.PORT, () => {
  console.log(
    `### The app is listening at http://localhost:${process.env.PORT} ###`
  );
});
