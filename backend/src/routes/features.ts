import express from "express";
import { getAllFeatures } from "../controllers/featureController";
import * as Auth from '../middlewares/auth.middleware';

const router = express.Router();

// route without auth:
router.get("/", getAllFeatures);

// route with JWT auth:
// router.get("/", Auth.authorize(['getAllFeatures']));

export { router };
