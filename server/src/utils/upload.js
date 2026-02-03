const multer = require('multer');
const path = require('path');

// 1) Configure storage (Local storage for now, easily swappable for Cloudinary/S3)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/products');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `product-${uniqueSuffix}.${ext}`);
    }
});

// 2) File filter (Validation: only images)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

// 3) Initialize multer with size limits
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

module.exports = upload;
