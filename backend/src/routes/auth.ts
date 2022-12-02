import express from "express";
import { login, refresh } from "../controllers/auth";

const router = express.Router();

router.post("/login", login);

router.post("/refresh", refresh);

export { router };
