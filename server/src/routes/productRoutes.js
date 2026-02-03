const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const router = express.Router();

const cacheMiddleware = require('../middleware/cacheMiddleware');

// Public routes
router.get('/', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 mins
    next();
}, cacheMiddleware(300), productController.getAllProducts);

router.get('/:id', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=600'); // 10 mins
    next();
}, cacheMiddleware(600), productController.getProduct);

const upload = require('../utils/upload');

// Admin-only routes (protected)
router.use(authController.protect, authController.restrictTo('admin'));

router.post('/', upload.single('image'), productController.createProduct);
router.patch('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
