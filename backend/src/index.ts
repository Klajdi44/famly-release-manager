import express from "express";
import * as dotenv from "dotenv";
import { generateToken } from './api/utils/jwt.utils';
import { router as featureRouter } from "./routes/features";
import * as Auth from '../src/middlewares/auth.middleware';


dotenv.config();

const app = express();

app.use(express.json());
// JWT authorize accessTypes
app.use(Auth.authorize(['getAllFeatures']));
app.use("/api/features", featureRouter);

// Only generate a token for lower level environments
if (process.env.NODE_ENV !== 'production') {
  console.log('JWT', generateToken());
}

app.listen(process.env.PORT, () => {
  console.log(`### The app is listening at http://localhost:${process.env.PORT} ###`);
});
