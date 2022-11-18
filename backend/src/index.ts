import express from "express";
import * as dotenv from "dotenv";
import compression from 'compression';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import { router as featuresRouter } from "./routes/features";

dotenv.config();

const logger = require ('morgan');
const app = express();

app.use(logger('dev')); // logs all http requests
app.use(compression()); // compresses all the responses
app.use(helmet()); // adding set of security middlewares
// parse incoming request body and append data to `req.body`
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // enable all CORS request


app.use(express.json());
app.use("/api/features", featuresRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});





