const express = require('express');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

const router = express.Router();

// All routes here are admin-only
router.use(authController.protect, authController.restrictTo('admin'));

router.get('/stats', adminController.getStats);

module.exports = router;
