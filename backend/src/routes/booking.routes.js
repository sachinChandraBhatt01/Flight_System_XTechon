import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { book } from "../controllers/booking.controller.js";

const router = Router();
router.post("/" , authMiddleware , book);

export default router;