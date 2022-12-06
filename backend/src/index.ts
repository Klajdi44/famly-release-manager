import express from "express";
import * as dotenv from "dotenv";
import { generateToken } from "./api/utils/jwt.utils";
import { router as releaseToggleRouter } from "./routes/releaseToggles";
import { router as siteRouter } from "./routes/sites";
import compression from "compression";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "./config";
import { createClient } from "redis";
import connectRedis from "connect-redis";
import session from "express-session";

dotenv.config();

const app = express();

// app.use(express.json());
// app.use(Auth.authorize(["getAllFeatures"])); // JWT authorize accessTypes
// app.use(compression()); // compresses all the responses
// app.use(helmet()); // adding set of security middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse incoming request body and append data to `req.body`
// app.use(cors()); // enable all CORS request

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

const RedisStore = connectRedis(session);
//Configure redis client

const redisUrl = "redis://redis:6379";
const redisClient = createClient({
  url: redisUrl,
  legacyMode: true,
});

redisClient.connect().catch(console.error);

//Configure session middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.isProduction, // if true only transmit cookie over https
      httpOnly: config.isProduction, // if true prevent client side JS from reading the cookie
      maxAge: 10 * 24 * 60 * 60 * 1000, // session max age in miliseconds: 10 days
    },
  })
);

app.use("/api/v1/release-toggles", releaseToggleRouter);
app.use("/api/v1/sites", siteRouter);

// Only generate a token for lower level environments
if (config.isProduction === false) {
  console.log("*** JWT:", generateToken());
}

app.listen(process.env.PORT, () => {
  console.log(
    `### The app is listening at http://localhost:${process.env.PORT} ###`
  );
});
