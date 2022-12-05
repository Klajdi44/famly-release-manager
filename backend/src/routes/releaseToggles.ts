import express from "express";
import {
  getAllReleaseToggles,
  getOneReleaseToggle,
  createReleaseToggle,
  updateOneReleaseToggle,
  deleteOneReleaseToggle,
} from "../controllers/releaseToggles";

import * as Auth from "../middlewares/auth.middleware";

const router = express.Router();

// route without auth:
router
  .get("/", getAllReleaseToggles)
  .get("/:id", getOneReleaseToggle)
  .post("/", createReleaseToggle)
  .patch("/:id", updateOneReleaseToggle)
  .delete("/:id", deleteOneReleaseToggle);

// route with JWT auth:
// router.get("/", Auth.authorize(['getAllFeatures']));

export { router };
