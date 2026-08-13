import express from 'express';
import {
    createService, 
    updateService,
    deleteService,
    getServiceBySlug,
    getAllServices,
    getFeaturedServices,
} from '../controllers/serviceController.js';


const router = express.Router();


router.get('/featured', getFeaturedServices);
router.get('/slug/:slug', getServiceBySlug);

router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);
router.get('/', getAllServices);


export default router;