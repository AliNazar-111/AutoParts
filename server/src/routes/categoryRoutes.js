const express = require('express');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/parents', categoryController.getParentCategories);
router.get('/:id', categoryController.getCategory);

const upload = require('../utils/upload');

// Admin-only routes (protected)
router.use(authController.protect, authController.restrictTo('admin'));

router.post('/', upload.single('image'), categoryController.createCategory);
router.patch('/:id', upload.single('image'), categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
