import express from "express";
import { getCountries } from "../controllers/country";

const router = express.Router();

router.get("/", getCountries);

export { router };
