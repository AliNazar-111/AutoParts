const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

const upload = require('../utils/upload');

// Admin-only routes (protected)
router.use(authController.protect, authController.restrictTo('admin'));

router.post('/', upload.single('image'), productController.createProduct);
router.patch('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
