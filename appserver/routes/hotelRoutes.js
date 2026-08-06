import express from "express";
import { createHotel,
     updateHotel, 
     deleteHotel, 
     getOwnerHotels, 
     getAllHotels,
     getSingleHotel, 
     getHotelsBySearch } from "../controllers/hotelController.js";

const router = express.Router();


router.get('/search/getHotelsBySearch', getHotelsBySearch);
router.get("/owner/:ownerId", getOwnerHotels);
router.get("/:id", getSingleHotel);
router.get("/", getAllHotels);
router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);


export default router;