import ServiceInquiry  from "../models/ServiceInquiry.js";
import Service from "../models/Service.js";

//create a newq service inquiry
export const createServiceInquiry = async (req, res) => {
    const {
        service,
        userId,
        userEmail,
        userPhone,
        preferredStartDate,
        prefferedEndDate,
        groupSize,
        destination,
        budgetRange,
        notes,
    } = req.body;

    try {
        if (new Date(preferredStartDate) >= new Date(prefferedEndDate)) {
            return res.status(400).json({
                success: false,
                message: 'End Date must be after start date',
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
        prefferedEndDate,
        groupSize,
        destination,
        budgetRange,
        notes,
    });

    const savedInquiry = await newInquiry.save();
}
}

