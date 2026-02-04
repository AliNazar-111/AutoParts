const express = require('express');
const authController = require('../controllers/authController');
const { validate, authSchemas } = require('../utils/validator');

const router = express.Router();

// Public routes
router.post('/signup', validate(authSchemas.signup), authController.signup);
router.post('/login', validate(authSchemas.login), authController.login);
router.get('/logout', authController.logout);

module.exports = router;
