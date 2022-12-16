import express from "express";
import { getAllSegments, getOneSegment, createSegment, updateOneSegment, deleteOneSegment } from "../controllers/segments";

import * as Auth from "../middlewares/auth.middleware";

const router = express.Router();

// route without auth:
router.get("/", getAllSegments).get("/:id", getOneSegment).post("/", createSegment).patch("/:id", updateOneSegment).delete("/:id", deleteOneSegment);

// route with JWT auth:
// router.get("/", Auth.authorize(['getAllFeatures']));

export { router };
