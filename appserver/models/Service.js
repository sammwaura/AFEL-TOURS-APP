import mongoose from 'mongoose'


const ServiceSchema =  new mongoose.Schema(
    {
        name: {
            type: String, // eg 'Safari Itinerary & Logistics'
            require: true,
        },
        slug: {
            type: String, // eg 'safari-itinerary' used in the url
            required: true,
            unique: true,
        },
        category: {
            type: String,
            enum: [
                'hotel-booking',
                'safari',
                'hiking-camping',
                'conference',
                'social-group',
                'honeymoon',
                'family',
            ],
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        description: {
            type: String, // full details for the service page
            required: true,
        },
        photos: {
            type: [String],
            default: [],
        },
        highlights: {
            type: [String], // eg. ['Airport pickup', 'Professional guide', 'All Meals Included' ]
            default: [],
        },
        startingPrice: {
            type: Number, // Optional 'from Kes X' indicator
        },
        featured: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);


export default mongoose.model('Service', ServiceSchema);