import express from "express";
import { clerkMiddleware } from '@clerk/express';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import hotelRoutes from "./routes/hotelRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";  
import uploadRoutes from "./routes/uploadRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import requireAdmin from "./middleware/requireAdmin.js";

dotenv.config();

const app = express();
app.use('/uploads', express.static('uploads')); // Serve static files from the "uploads" directory
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware());
app.use(express.json());


const connectDB = async () => {
    mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

app.use('/uploads', express.static('uploads'));
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/services", serviceRoutes);


app.get('/api/test-admin', requireAdmin, (req, res) => {
    res.json({ success: true, message: 'You are an admin!!' });
});


app.get("/", (req, res) => {
    res.send("Welcome to the Afel Tours API");
});


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
});