const express = require('express');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

const router = express.Router();

const cacheMiddleware = require('../middleware/cacheMiddleware');

// Public routes
router.get('/', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hours
    next();
}, cacheMiddleware(86400), categoryController.getAllCategories);

router.get('/parents', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hours
    next();
}, cacheMiddleware(86400), categoryController.getParentCategories);

router.get('/:id', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
    next();
}, cacheMiddleware(3600), categoryController.getCategory);

const upload = require('../utils/upload');

// Admin-only routes (protected)
router.use(authController.protect, authController.restrictTo('admin'));

router.post('/', upload.single('image'), categoryController.createCategory);
router.patch('/:id', upload.single('image'), categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
