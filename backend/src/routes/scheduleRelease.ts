import express from "express";
import {
  scheduleReleaseToggle,
  deleteScheduleForReleaseToggle,
} from "../controllers/prisma";

const router = express.Router();

router
  .post("/schedule", scheduleReleaseToggle)
  .patch("/delete", deleteScheduleForReleaseToggle);

export { router };
