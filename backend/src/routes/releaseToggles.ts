import express from "express";
import {
  getAllReleaseToggles,
  getOneReleaseToggle,
  createReleaseToggle,
  updateOneReleaseToggle,
  deleteOneReleaseToggle,
  addSegmentToReleaseToggle,
} from "../controllers/releaseToggles";

const router = express.Router();

router.post("/add-segment-to-release-toggle/:id", addSegmentToReleaseToggle);

router
  .get("/", getAllReleaseToggles)
  .get("/:id", getOneReleaseToggle)
  .post("/", createReleaseToggle)
  .patch("/:id", updateOneReleaseToggle)
  .delete("/:id", deleteOneReleaseToggle);

export { router };
