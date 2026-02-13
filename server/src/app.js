const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// 1. GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());

// Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same API (Global)
const limiter = rateLimit({
    max: 100,
    windowMs: 15 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in 15 minutes!'
});
app.use('/api', limiter);

// Specific Rate Limiter for Inquiries (Spam Prevention)
const inquiryLimiter = rateLimit({
    max: 5,
    windowMs: 60 * 60 * 1000, // 5 per hour
    message: 'Too many inquiries submitted from this IP, please try again in an hour.'
});
app.use('/api/v1/inquiries', inquiryLimiter);

// Specific Rate Limiter for Auth (Brute Force Protection)
const authLimiter = rateLimit({
    max: 10,
    windowMs: 15 * 60 * 1000,
    message: 'Too many login/registration attempts, please try again in 15 minutes.'
});
app.use('/api/v1/auth', authLimiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());

// Prevent HTTP Parameter Pollution
app.use(hpp({
    whitelist: ['price', 'stockStatus', 'category', 'make', 'model', 'year']
}));

// Payload compression
app.use(compression());

// Serving static files with caching
app.use(express.static('public', {
    maxAge: '1y',
    immutable: true
}));

// 2. ROUTES
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/inquiries', inquiryRoutes);
app.use('/api/v1/admin', adminRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'AutoPart Server is healthy'
    });
});

// 3. ERROR HANDLING
app.all('*path', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
