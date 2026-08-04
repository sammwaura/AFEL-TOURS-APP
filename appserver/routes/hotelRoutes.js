import express from "express";
import { createHotel,
     updateHotel, 
     deleteHotel, 
     getOwnerHotels, 
     getAllHotels,
     getSingleHotel, 
     getHotelsBySearch } from "../controllers/hotelController.js";

const router = express.Router();

router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/", getAllHotels);
router.get("/owner/:ownerId", getOwnerHotels);
router.get("/:id", getSingleHotel);
router.get('/search/getHotelsBySearch', getHotelsBySearch);

export default router;