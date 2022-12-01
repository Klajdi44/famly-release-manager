import express from "express";
import { getAllReleaseToggles } from "../controllers/releaseToggles";
import * as Auth from "../middlewares/auth.middleware";

const router = express.Router();

// route without auth:
router.get("/", getAllReleaseToggles);

// route with JWT auth:
// router.get("/", Auth.authorize(['getAllFeatures']));

export { router };
