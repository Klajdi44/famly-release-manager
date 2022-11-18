import express from "express";
import * as dotenv from "dotenv";
import { router as featuresRouter } from "./routes/features";

dotenv.config();

const logger = require ('morgan');
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use("/api/features", featuresRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
