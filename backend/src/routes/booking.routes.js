import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { book, downloadTicket, getBookings } from "../controllers/booking.controller.js";

const router = Router();
router.post("/" , authMiddleware , book);
router.get("/" , authMiddleware , getBookings)
router.get("/ticket/:pnr" , authMiddleware , downloadTicket);

export default router;