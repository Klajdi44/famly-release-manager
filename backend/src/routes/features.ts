import express from "express";
import { getAllFeatures } from "../controllers/featureController";

const router = express.Router();

router.get("/", getAllFeatures);

export { router };
