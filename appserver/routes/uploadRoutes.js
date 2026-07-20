import express, { Router } from 'express'
import upload from '../middleware/upload.js';


const router = express.Router();


//accepts upto 5 Photos at once, field name must be "photos"
router.post('/', upload.array('photos', 5), (req, res) => {
    if(!req.files || req.files.length === 0 ){
        return res.status(400).json({
            success: false,
            message: 'No uploaded files'
        });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrls = req.files.map((file) => `${baseUrl}/uploads/${file.filename}`);
    
    res.status(200).json({
        success: true,
        message:'Files successfully Uploaded',
        data: fileUrls
    });
});

export default router;