import {Router} from 'express';
import { register , login , logout, myData } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// protected user check
router.get("/me" , authMiddleware , myData);

export default router;

