import Hotel from '../models/Hotel.js';
// create a new hotel
export const createHotel = async (req, res) => {
        const newHotel = new Hotel(req.body);

        try{
            const savedHotel = await newHotel.save();
            res.status(200).json({
                success: true,
                message: 'Hotel created successfully',
                data: savedHotel,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating hotel. Hotel not created. Try again',
                data: error,
            });
        }
    };

    // update hotel
    export const updateHotel = async (req, res) => {
        const  id = req.params.id;
        try {
            const updatedHotel = await Hotel.findByIdAndUpdate(
                id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: 'Hotel updated successfully',
                data: updatedHotel,
            });
        } catch (error) {
            res.status(500).json({
                success: false,     
                message: 'Error updating hotel. Hotel not updated. Try again',
                error: error.message,
            });
        }
    };

    // delete hotel
     export const deleteHotel = async (req, res) => {
        const id = req.params.id;

        try {
            await Hotel.findByIdAndDelete(id);
            res.status(200).json({
                success: true,
                message: 'Hotel deleted successfully',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting hotel. Hotel not deleted. Try again',
                error: error.message,
            });
        }
    };

   

    //get single hotel
    export const getSingleHotel = async (req, res) => {
        const id = req.params.id;
        try {
            const hotel = await Hotel.findById(id);
        if(!hotel){
            return res.status(404).json({
                success: false,
                message: 'No hotels found',
            });
        }
        res.status(200).json({
            success:true,
            message: 'Hotels retrieved successfully',
            data: hotel,
            });
          
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Hotel not found. Try again',
                error: error.message,
            });
        }
    };

    // get all hotels 
    export const getAllHotels = async (req, res) => {
        const page = parseInt(req.query.page) || 0;     

        try{
            const hotels = await Hotel.find({}).skip(page * 8).limit(8);
            res.status(200).json({
                success: true,
                count: hotels.length,
                message: 'Hotels retrieved successfully',
                data: hotels,
            });
        } catch (error) {
            success: false,
            res.status(500).json({
                message: 'Error retrieving hotels. Try again',
                error: error.message,
            });
        }
    };

    //get hotels owned by a specific clerk  user
    export const getOwnerHotels = async (req, res) => {
        const {ownerId } = req.params;

        try {
            const hotels = await Hotel.find({ owner: ownerId });
            res.status(200).json({
                success:true,
                data: hotels,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch hotels',
                error: err.message,
            }); 
        }
    };

    // search hotels by name and /or city
    export const getHotelsBySearch = async (req, res) => {
        const { name, city } =  req.query;

        try {
            const filter = {};

            if (name){
                filter.name = new RegExp(name, 'i'); // case-insensitive partial match
            }
            if (city){
                filter.city = new RegExp(city, 'i');
            }

            const hotels = await Hotel.find(filter);

            res.status(200).json({
                success: true,
                message: 'Successful',
                data: hotels
            });
        } catch (err) {
            res.status(500).json ({
                success:false,
                message: 'Not Found',
                error: err.message,
            });
        }
    };