import express from "express";
import {
  getAllReleaseToggles,
  getOneReleaseToggle,
  createReleaseToggle,
  updateOneReleaseToggle,
  deleteOneReleaseToggle,
} from "../controllers/releaseToggles";

const router = express.Router();

// route without auth:
router
  .get("/", getAllReleaseToggles)
  .get("/:id", getOneReleaseToggle)
  .post("/", createReleaseToggle)
  .patch("/:id", updateOneReleaseToggle)
  .delete("/:id", deleteOneReleaseToggle);

export { router };
