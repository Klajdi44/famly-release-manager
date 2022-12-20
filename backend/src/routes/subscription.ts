import express from "express";
import { getSubscriptions } from "../controllers/subscription";

const router = express.Router();

router.get("/", getSubscriptions);

export { router };
