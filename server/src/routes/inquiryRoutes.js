const express = require('express');
const inquiryController = require('../controllers/inquiryController');
const authController = require('../controllers/authController');

const router = express.Router();

// All inquiry routes require authentication
router.use(authController.protect);

// User routes (Authenticated Users)
router.post('/', inquiryController.createInquiry);

// Admin-only routes
router.use(authController.restrictTo('admin'));

router.get('/', inquiryController.getAllInquiries);
router.get('/:id', inquiryController.getInquiry);
router.patch('/:id', inquiryController.updateInquiry);
router.delete('/:id', inquiryController.deleteInquiry);

module.exports = router;
