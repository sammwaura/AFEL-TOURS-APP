import express from "express";
import { createRoom, 
    updateRoom, 
    deleteRoom, 
    getAllRooms, 
    getSingleRoom, 
    getRoomsBySearch, 
    getFeaturedRooms, 
    getRoomCount,
    getRoomsByHotel,
} from "../controllers/roomController.js";

const router = express.Router();

//Specific routes BEFORE dynamic /:id routes, or Express will treat 'search' or 'featured' as an :id value
router.get("/search/getRoomsBySearch", getRoomsBySearch);
router.get("/featured/getFeaturedRooms", getFeaturedRooms);
router.get("/getRoomCount", getRoomCount);


router.post("/", createRoom);   
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.get("/", getAllRooms);
router.get("/hotel/:hotelId", getRoomsByHotel);
router.get("/:id", getSingleRoom);

export default router;