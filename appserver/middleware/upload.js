import multer from 'multer'
import path from 'path'

const storage  =  multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb){
        //unique filename: timestamp + original name(this avoids overwriting duplicates)
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null,uniqueName)
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp' ];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg, .png and .webp files are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024}, //5MB max per file
});

export default upload;
