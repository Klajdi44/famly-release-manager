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
import * as redis from "redis";
import connectRedis from "connect-redis";
import session from "express-session";

dotenv.config();

const app = express();

app.use(express.json());
// app.use(Auth.authorize(["getAllFeatures"])); // JWT authorize accessTypes
app.use(compression()); // compresses all the responses
app.use(helmet()); // adding set of security middlewares
app.use(bodyParser.json()); // parse incoming request body and append data to `req.body`
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // enable all CORS request

const RedisStore = connectRedis(session);
//Configure redis client

const redis_url = process.env.REDIS_URL || "redis://localhost:6379";
const redisClient = redis.createClient({
  url: redis_url,
});

redisClient.on("error", err => {
  console.error("Could not establish a connection with redis. " + err);
});

redisClient.on("connect", err => {
  console.error("Connected to redis successfully");
});

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

app.use("/api/features", featureRouter);

// Only generate a token for lower level environments
if (config.isProduction === false) {
  console.log("*** JWT:", generateToken());
}

app.listen(process.env.PORT, () => {
  console.log(
    `### The app is listening at http://localhost:${process.env.PORT} ###`
  );
});
