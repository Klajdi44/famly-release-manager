import express from "express";
import {
  getAllReleaseToggles,
  getOneReleaseToggle,
  createReleaseToggle,
  updateOneReleaseToggle,
  deleteOneReleaseToggle,
  addSegmentToReleaseToggle,
  deleteSegmentFromReleaseToggle,
  toggleReleaseToggle,
} from "../controllers/releaseToggles";

const router = express.Router();

router.post("/add-segment-to-release-toggle/:id", addSegmentToReleaseToggle);
router.delete(
  "/delete-segment-from-release-toggle/:id",
  deleteSegmentFromReleaseToggle
);
router.patch("/toggle-release-toggle", toggleReleaseToggle);

router
  .get("/", getAllReleaseToggles)
  .get("/:id", getOneReleaseToggle)
  .post("/", createReleaseToggle)
  .patch("/:id", updateOneReleaseToggle)
  .delete("/:id", deleteOneReleaseToggle);

export { router };
