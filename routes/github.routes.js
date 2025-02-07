import express from "express";
import { getProjects } from "../controllers/github.controller.js"

const router = express.Router();

router.post("/getProjects", getProjects);

export default router;