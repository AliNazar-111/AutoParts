const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');

// Create and sign JWT token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

// Send token response
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

// SIGNUP
exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });

        createSendToken(newUser, 201, res);
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// LOGIN
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1) Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password!'
            });
        }

        // 2) Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password'
            });
        }

        // 3) Send token to client
        createSendToken(user, 200, res);
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// PROTECT MIDDLEWARE - Check if user is logged in
exports.protect = async (req, res, next) => {
    try {
        // 1) Getting token and check if it's there
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in! Please log in to get access.'
            });
        }

        // 2) Verify token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'The user belonging to this token no longer exists.'
            });
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        next();
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: 'Invalid token. Please log in again!'
        });
    }
};

// RESTRICT TO ROLES - Authorization
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin']. role='user'
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to perform this action'
            });
        }
        next();
    };
};
