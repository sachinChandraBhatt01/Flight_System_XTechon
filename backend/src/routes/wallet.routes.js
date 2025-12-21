import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getWallet } from "../controllers/wallet.controller.js";

const router = Router();

router.get("/" , authMiddleware , getWallet);

export default router
