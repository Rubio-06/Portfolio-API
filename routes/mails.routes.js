import express from "express";

import { sendMessage } from "../controllers/mails.controller.js";

const router = express.Router();

router.post("/contact-mail", sendMessage);

export default router;