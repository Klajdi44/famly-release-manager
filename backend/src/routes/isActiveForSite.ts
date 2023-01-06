import express from "express";
import { isActiveForSite } from "../controllers/isActiveForSite";

const router = express.Router();

router.post("/", isActiveForSite);

export { router };
