import mongoose from 'mongoose';

const ItinerarySchema = new mongoose.Schema(
    {
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true,
        },
        name: {
            type: String, // e.g. "3-Day Maasai Mara Explorer"
            required: true,
        },
        park: {
            type: String, // e.g. "Maasai Mara National Reserve"
            required: true,
        },
        nights: {
            type: Number,
            required: true,
        },
        days: {
            type: Number,
            required: true,
        },
        maxGroupSize: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        nearestHotel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hotel',
        },
        photos: {
            type: [String],
            default: [],
        },
        highlights: {
            type: [String],
            default: [],
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Itinerary', ItinerarySchema);