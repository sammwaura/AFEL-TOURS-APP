import Service from '../models/Service.js';

//create a new service
export const createService = async (req, res) => {
    const newService = new Service (req.body);

    try{
        const savedService = await newService.save();
        res.status(201).json({
            success: true,
            message: 'Service successfully created',
            data: savedService,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Service not created. Try Again',
            error: err.message,
        });
    }
};

//update service
export const updateService = async (req, res) => {
    const id =req.params.id;

    try {
        const updatedService = await Service.findByIdAndUpdate(
            id,
            { $set: req.body },
            { returnDocument: 'after' }
        );
        res.status(200).json({
            success: true,
            message: 'Service successfully updated',
            data: updatedService,
        });
    } catch (err){
        res.status(500).json({
            success: false,
            message: 'Service not updated. tyr again',
            error: err.message,
        });
    }
};

//delete service
export const deleteService = async (req, res) => {
    const id = req.params.id;

    try{
        await Service.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Service successfully deleted',
        });
    } catch (err) {
        res.status(500).json({
            success:false,
            message: 'Failed to delete service. Try again',
            error: err.message,
        });
    }
};

//get single service by slug (cleaner URLs than raw ObjectId)
export const getServiceBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const service = await Service.findOne({ slug });
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved',
            data: service,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Not Found',
            error: err.message,
        });
    }
};

//get all services
export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.status(200).json({
            success: true,
            count: services.length,
            message: "successful",
            data: services,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Not found',
            error: err.message,
        });
    }
};

// get featured services (for homepage "What We Do" section)
export const getFeaturedServices = async (req, res) => {
    try {
        const services = await Service.find({ featured: true });
        res.status(200).json({
            success: true,
            message: 'Successful',
            data: services,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Not found',
            error: err.message,
        });
    }
};