import express from "express";
import { createBooking, getUserBookings, getHotelBookings, updateBookingStatus, checkAvailability } from "../controllers/bookingController.js";


const router = express.Router();

router.get('/availability', checkAvailability);
router.post('/', createBooking);
router.put('/:id/status', updateBookingStatus);
router.get('/user/:userId', getUserBookings);
router.get('/hotel/:hotelId', getHotelBookings);
export default router;

 