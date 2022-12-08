import express from "express";
import {
  getAllSites,
  getOneSite,
  createSite,
  updateOneSite,
  deleteOneSite,
} from "../controllers/sites";

import * as Auth from "../middlewares/auth.middleware";

const router = express.Router();

// route without auth:
router
  .get("/", getAllSites)
  .get("/:id", getOneSite)
  .post("/", createSite)
  .patch("/:id", updateOneSite)
  .delete("/:id", deleteOneSite);

// route with JWT auth:
// router.get("/", Auth.authorize(['getAllFeatures']));

export { router };
