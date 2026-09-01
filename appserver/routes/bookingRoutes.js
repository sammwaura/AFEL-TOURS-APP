import express from "express";
import { createBooking, getUserBookings, getHotelBookings, updateBookingStatus, checkAvailability, getAllBookings } from "../controllers/bookingController.js";
import requireAdmin from '../middleware/requireAdmin.js'


const router = express.Router();

router.get('/availability', checkAvailability);
router.post('/', createBooking);
router.put('/:id/status', updateBookingStatus);
router.get('/user/:userId', getUserBookings);
router.get('/hotel/:hotelId', getHotelBookings);
router.get('/', requireAdmin, getAllBookings);
export default router;

 