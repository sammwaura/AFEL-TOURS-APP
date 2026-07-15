import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        owner:{
            type: String, //Salesperson ID of the hotel owner/admin
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        address:{
            type: String,   
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        photos:{
            type: [String],
            default: [],
        },
        rating:{
            type: Number,
            default: 0,
        },
        featured:{
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
    
export default mongoose.model("Hotel", HotelSchema);