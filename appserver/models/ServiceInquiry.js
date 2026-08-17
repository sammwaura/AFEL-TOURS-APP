import mongoose from 'mongoose';

const ServiceInquirySchema = new mongoose.Schema(
    {
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true,
        },
        userId: {
            type: String, // Clerk user Id
            required: true,
        },
        userEmail: {
            type: String,
            required: true,
        },
        userPhone: {
            type: String,
        },
        preferredStartDate: {
            type: Date,
            required: true,
        },
        preferredEndDate: {
            type: Date,
            required: true,
        },
        groupSize: {
            type: Number,
            required: true,
            default: 1,
        },
        destination: {
            type: String, // eg 'Maasai Mara', 'Mount Kenya', 'specific hotels name
        },
        budgetRange: {
            type: String, // eg 'KES 50, 000 - 100, 000 ' free text, kept felxible
        },
        notes: {
            type: String // any specifics eg: 'Just Married June 2nd', 'group of 8 women'
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending',
        },
    },
    { timestamps : true }
);


export default mongoose.model('ServiceInquiry', ServiceInquirySchema);