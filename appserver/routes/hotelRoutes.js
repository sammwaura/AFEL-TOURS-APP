import express from "express";
import { getAllHotels, createHotel, updateHotel, deleteHotel, getOwnerHotels, getSingleHotel } from "../controllers/hotelController.js";

const router = express.Router();

router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/", getAllHotels);
router.get("/owner/:ownerId", getOwnerHotels);
router.get("/:id", getSingleHotel);

export default router;