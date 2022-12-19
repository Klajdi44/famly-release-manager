import express from "express";
import {
  getAllSegments,
  getOneSegment,
  getSegmentConstruction,
  createSegment,
  updateOneSegment,
  deleteOneSegment,
} from "../controllers/segments";

const router = express.Router();

router
  .get("/segment-construction/", getSegmentConstruction)
  .get("/", getAllSegments)
  .get("/:id", getOneSegment)
  .post("/", createSegment)
  .patch("/:id", updateOneSegment)
  .delete("/:id", deleteOneSegment);

export { router };
