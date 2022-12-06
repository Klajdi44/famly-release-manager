import express from "express";
import { getAllReleaseToggles } from "../controllers/releaseToggles";

const router = express.Router();

// route without auth:
router.get("/", getAllReleaseToggles);

export { router };
