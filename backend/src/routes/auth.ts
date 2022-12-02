import express from "express";
import { login } from "../controllers/auth";

const router = express.Router();

// route without auth:
router.get("/", login);

export { router };
