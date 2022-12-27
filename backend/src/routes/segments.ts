import express from "express";
import {
  getAllSegments,
  getOneSegment,
  createSegment,
  updateOneSegment,
  deleteOneSegment,
  createSegmentRules,
} from "../controllers/segments/segments";

const router = express.Router();

router
  .get("/", getAllSegments)
  .get("/:id", getOneSegment)
  .post("/", createSegment)
  .post("/:id", createSegmentRules)
  .patch("/:id", updateOneSegment)
  .delete("/:id", deleteOneSegment);

export { router };
