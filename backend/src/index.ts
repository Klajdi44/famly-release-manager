import express from "express";
import * as dotenv from "dotenv";

import { router as featureRouter } from "./routes/features";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/features", featureRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
