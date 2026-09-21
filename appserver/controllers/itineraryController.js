import Itinerary from '../models/Itinerary.js';

// create new itinerary
export const createItinerary = async (req, res) => {
    const newItinerary = new Itinerary(req.body);

    try {
        const savedItinerary = await newItinerary.save();
        res.status(201).json({
            success: true,
            message: 'Itinerary successfully created',
            data: savedItinerary,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Itinerary not created. Try again',
            error: err.message,
        });
    }
};

// update itinerary
export const updateItinerary = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedItinerary = await Itinerary.findByIdAndUpdate(
            id,
            { $set: req.body },
            { returnDocument: 'after' }
        );
        res.status(200).json({
            success: true,
            message: 'Itinerary successfully updated',
            data: updatedItinerary,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Itinerary not updated. Try again',
            error: err.message,
        });
    }
};

// delete itinerary
export const deleteItinerary = async (req, res) => {
    const id = req.params.id;

    try {
        await Itinerary.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Itinerary successfully deleted',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete itinerary. Try again',
            error: err.message,
        });
    }
};

// get single itinerary (with hotel populated)
export const getSingleItinerary = async (req, res) => {
    const id = req.params.id;

    try {
        const itinerary = await Itinerary.findById(id)
            .populate('nearestHotel')
            .populate('service');

        if (!itinerary) {
            return res.status(404).json({
                success: false,
                message: 'Itinerary not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Successfully retrieved',
            data: itinerary,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Not found',
            error: err.message,
        });
    }
};

// get all itineraries for a specific service
export const getItinerariesByService = async (req, res) => {
    const { serviceId } = req.params;

    try {
        const itineraries = await Itinerary.find({ service: serviceId })
            .populate('nearestHotel');

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: itineraries,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Not found',
            error: err.message,
        });
    }
};

// get all itineraries (admin listing)
export const getAllItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find({})
            .populate('nearestHotel')
            .populate('service');

        res.status(200).json({
            success: true,
            count: itineraries.length,
            message: 'Successful',
            data: itineraries,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Not found',
            error: err.message,
        });
    }
};