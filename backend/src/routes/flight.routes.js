import Router from 'express';
import {getAllFlights, searchFlights} from '../controllers/flight.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/search',authMiddleware ,  searchFlights);
router.get("/" , authMiddleware , getAllFlights)

export default router;