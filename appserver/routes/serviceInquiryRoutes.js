import express from 'express';
import {
    createServiceInquiry,
    getUserServiceInquiries,
    getServiceInquiries,
    getAllServiceInquiries,
    updateServiceInquiryStatus,
} from '../controllers/serviceInquiryController.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = express.Router();

router.post('/', createServiceInquiry);
router.put('/:id/status', requireAdmin, updateServiceInquiryStatus);
router.get('/user/:userId', getUserServiceInquiries);
router.get('/service/:serviceId', getServiceInquiries);
router.get('/', requireAdmin, getAllServiceInquiries);

export default router;