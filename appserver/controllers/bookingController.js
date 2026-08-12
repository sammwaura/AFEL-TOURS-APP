import Booking from '../models/Booking.js';
import Room from '../models/Room.js';

//helper: check if bthe room is available on the specific dates
const isRoomAvailable = async (roomId, checkIn, checkOut, excludeBookingId = null) => {
    const filter = {
        room: roomId,
        status: { $ne: 'cancelled' },
        //overlap condition: existing.checkIn < newBooking.checkOut && existingBooking.checkOut > newBooking.checkIn
        checkIn: { $lt: new Date(checkOut) },
        checkOut: { $gt: new Date(checkIn) },
    };

    if (excludeBookingId) {
        filter._id = { $ne: excludeBookingId };
    }

    const conflictingBookings = await Booking.findOne(filter);
    return !conflictingBookings; // return true if no conflicting bookings found
};

// create a new booking
export const createBooking = async (req, res) => {
    const { room, hotel, userId, userEmail, checkIn, checkOut, guests, hasKids, kidsAges, totalPrice } = req.body;

    try {
        // Check if the room is available for the specified dates
        if(new Date(checkIn)>= new Date(checkOut)){
            return res.status(400).json({
                success: false,
                message: "Check-in date must be before check-out date.",
            });
        }

        //check if the room exists and is available on the dates provided
        const roomDoc = await Room.findById(room);
        if (!roomDoc) {
            return res.status(404).json({
                status: false,
                message: "Room not found.",
            });
        }

        const isAvailable = await isRoomAvailable(room, checkIn, checkOut);
        if (!isAvailable) { 
            return res.status(400).json({   
                success: false,
                message: "Room is not available for the selected dates.",
            });
        }

        //calculate total price
        const nights = Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        );
        const totalPrice = nights * roomDoc.pricePerNight;

        const newBooking = new Booking({
            room,
            hotel: roomDoc.hotel,
            userId,
            userEmail,
            checkIn,
            checkOut,
            guests,
            hasKids: hasKids || false,
            kidsAges: hasKids ? (kidsAges || []) : [],
            totalPrice,
        });

        const savedBooking = await newBooking.save();

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: savedBooking,
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: "Failed to create booking. Please try again.",
            error: error.message,
        });
    }
};

//get booking for a specific user (Clerk userId)
export const getUserBookings = async (req, res) => {
    const {userId} = req.params;

    try{
        const bookings = await Booking.find({ userId })
        .populate("room")
        .populate("hotel")
        .sort({ createdAt: -1 }); // Sort by check-in date ascending

        res.status(200).json({      
            success: true,
            message: "Bookings retrieved successfully", 
            data: bookings,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve bookings. Please try again.",
            error: error.message,
        });
    }
};

// get all bookings for a hotel owner (across their hotels/rooms)
export const getHotelBookings = async (req, res) => {
    const { hotelId } = req.params;

    try {
        const bookings = await Booking.find({ hotel: hotelId })
            .populate('room')
            .populate('hotel')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: bookings,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings',
            error: err.message,
        });
    }
};

// update booking status (confirm / cancel)
export const updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }

        res.status(200).json({
            success: true,
            message: `Booking ${status}`,
            data: updatedBooking,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update booking',
            error: err.message,
        });
    }
};

// check room availability for given dates (used by frontend before showing booking form)
export const checkAvailability = async (req, res) => {
    const { room, checkIn, checkOut } = req.query;

    try {
        const available = await isRoomAvailable(room, checkIn, checkOut);

        res.status(200).json({
            success: true,
            available,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to check availability',
            error: err.message,
        });
    }
};



