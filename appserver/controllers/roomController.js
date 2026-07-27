import Room from "../models/Room.js";

// Create a new room
export const createRoom = async (req, res) => {
    const newRoom = new Room(req.body); 

    try {
        const savedRoom = await newRoom.save();
        res.status(201).json({
            success: true,
            message: "Room created successfully",
            data: savedRoom,
        });
    
        }catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create room. Please try again.",
                error: error.message,
            });
        }
    };

    //update room
    export const updateRoom = async (req, res) => {
        const id = req.params.id;

        try{
            const updatedRoom = await Room.findByIdAndUpdate(
                id,
                {$set: req.body},
                {returnDocument: 'after'}
            );
            res.status(200).json({
                success: true,
                message: "Room updated successfully",
                data: updatedRoom,
            });



        }catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to update room. Please try again.",
                error: error.message,   
            }); 
        }
    };

    // delete room
export const deleteRoom = async (req, res) => {
    const id = req.params.id;

    try {
        await Room.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Room successfully deleted',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete room. Try again',
            error: err.message,
        });
    }
};

//get single hotel with hotel details populated
export const getSingleRoom = async (req, res) => {
    const id = req.params.id;

    try {
        const room = await Room.findById(id).populate("hotel"); // Populate the hotel details

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Room retrieved successfully',
            data: room,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve room. Try again',
            error: err.message,
        });
    }
};

//get all rooms paginated
export const getAllRooms = async (req, res) => {
    const page = parseInt(req.query.page) || 0 // Default to page 1 if not provided

    try{
        const rooms = await Room.find({})
        .populate("hotel") // Populate the hotel details
        .skip(page * 8) 
        .limit(8); // Limit to 8 rooms per page

        res.status(200).json({
            success: true,
            message: "Rooms retrieved successfully",
            data: rooms,
        });
        
    
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: "Failed to retrieve rooms. Please try again.",
            error: error.message,
        });
    }
};

//search rooms by city, guests, and price range
export const getRoomsBySearch = async (req, res) => {
    const { city, maxGuests, minPrice, maxPrice } = req.query;

    try {   
        //find hotels matching city first
        let hotelFilter = {};
        if (city) {
            hotelFilter.city = new RegExp(city, 'i'); // Case-insensitive search
        }

        const Hotel = (await import("../models/Hotel.js")).default; // Dynamically import Hotel model
        const matchingHotels = await Hotel.find(hotelFilter).select('_id');
        const hotelIds = matchingHotels.map((hotel) => hotel._id);

        const roomFilter = {
            hotel : { $in: hotelIds },
        }

       if (maxGuests) {
            roomFilter.maxGuests = { $gte: parseInt(maxGuests) };
        }

        if (minPrice || maxPrice) {
            roomFilter.pricePerNight = {};
            if (minPrice) roomFilter.pricePerNight.$gte = parseInt(minPrice);
            if (maxPrice) roomFilter.pricePerNight.$lte = parseInt(maxPrice);
        }

        const rooms = await Room.find(roomFilter).populate('hotel');

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: rooms,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Not found',
            error: err.message,
        });
    }
};

// get featured rooms
export const getFeaturedRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ featured: true })
            .populate('hotel')
            .limit(8);

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: rooms,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Not found',
            error: err.message,
        });
    }
};

// get room count
export const getRoomCount = async (req, res) => {
    try {
        const roomCount = await Room.estimatedDocumentCount();

        res.status(200).json({ success: true, data: roomCount });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch',
            error: err.message,
        });
    }
};