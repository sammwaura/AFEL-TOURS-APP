import express from 'express';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', (req, res) => {
    upload.array('photos', 5)(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).json({
                success: false,
                message: 'Upload failed',
                error: err.message,
            });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded',
            });
        }

        const fileUrls = req.files.map((file) => file.path);

        res.status(200).json({
            success: true,
            message: 'Files uploaded successfully',
            data: fileUrls,
        });
    });
});

export default router;