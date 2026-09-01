import ServiceInquiry from '../models/ServiceInquiry.js';
import Service from '../models/Service.js';

// create a new service inquiry
export const createServiceInquiry = async (req, res) => {
    const {
        service,
        userId,
        userEmail,
        userPhone,
        preferredStartDate,
        preferredEndDate,
        groupSize,
        destination,
        budgetRange,
        notes,
    } = req.body;

    try {
        if (new Date(preferredStartDate) >= new Date(preferredEndDate)) {
            return res.status(400).json({
                success: false,
                message: 'End date must be after start date',
            });
        }

        const serviceDoc = await Service.findById(service);
        if (!serviceDoc) {
            return res.status(404).json({
                success: false,
                message: 'Service not found',
            });
        }

        const newInquiry = new ServiceInquiry({
            service,
            userId,
            userEmail,
            userPhone,
            preferredStartDate,
            preferredEndDate,
            groupSize,
            destination,
            budgetRange,
            notes,
        });

        const savedInquiry = await newInquiry.save();

        res.status(201).json({
            success: true,
            message: 'Your request has been submitted. We will confirm shortly.',
            data: savedInquiry,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to submit request. Try again',
            error: err.message,
        });
    }
};

// get inquiries for a specific user
export const getUserServiceInquiries = async (req, res) => {
    const { userId } = req.params;

    try {
        const inquiries = await ServiceInquiry.find({ userId })
            .populate('service')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: inquiries,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch inquiries',
            error: err.message,
        });
    }
};

// get all inquiries for a specific service (for your own admin reference)
export const getServiceInquiries = async (req, res) => {
    const { serviceId } = req.params;

    try {
        const inquiries = await ServiceInquiry.find({ service: serviceId })
            .populate('service')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: inquiries,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch inquiries',
            error: err.message,
        });
    }
};

