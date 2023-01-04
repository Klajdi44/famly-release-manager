import express from "express";
import {
  scheduleReleaseToggle,
  deleteScheduleForReleaseToggle,
} from "../controllers/scheduleRelease";

const router = express.Router();

router
  .post("/schedule", scheduleReleaseToggle)
  .patch("/delete", deleteScheduleForReleaseToggle);

export { router };
