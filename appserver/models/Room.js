import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
    {
        hotel:{
            type: mongoose.Schema.Types.ObjectId,   
            ref: "Hotel",
            required: true,
        },
        roomType:{
            type: String, //"deluxe", "standard", ""single"" 
            required: true,
        },
        pricePerNight: {
            type: Number,
            required: true,
        },
        maxGuests: {
            type: Number,
            required: true,
        },
        amenities: {
            type: [String],
            default: [],
        }, 
        photos: {
            type: [String],
            default: [],    
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
    
export default mongoose.model("Room", RoomSchema);