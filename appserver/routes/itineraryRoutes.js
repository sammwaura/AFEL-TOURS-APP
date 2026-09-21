import express from 'express';
import {
    createItinerary,
    updateItinerary,
    deleteItinerary,
    getSingleItinerary,
    getItinerariesByService,
    getAllItineraries,
} from '../controllers/itineraryController.js';

const router = express.Router();

router.get('/service/:serviceId', getItinerariesByService);

router.post('/', createItinerary);
router.put('/:id', updateItinerary);
router.delete('/:id', deleteItinerary);
router.get('/:id', getSingleItinerary);
router.get('/', getAllItineraries);

export default router;