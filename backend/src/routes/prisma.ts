import express from "express";
import {
  test,
  scheduleReleaseToggle,
  deleteScheduleForReleaseToggle,
} from "../controllers/prisma";

// import * as Auth from "../middlewares/auth.middleware";

const router = express.Router();

// route without auth:
router
  .get("/", test)
  .post("/schedule", scheduleReleaseToggle)
  .delete("/delete", deleteScheduleForReleaseToggle);
//  .get("/:id", getOneSegment)
//  .post("/", createSegment)
//  .patch("/:id", updateOneSegment)
//  .delete("/:id", deleteOneSegment);

// route with JWT auth:
// router.get("/", Auth.authorize(['getAllFeatures']));

export { router };
