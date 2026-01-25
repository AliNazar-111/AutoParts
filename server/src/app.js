const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// 1. GLOBAL MIDDLEWARES

// Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Implement CORS
app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// 2. ROUTES
const authRoutes = require('./routes/authRoutes');

app.use('/api/v1/auth', authRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'AutoPart Server is healthy'
    });
});

// 3. ERROR HANDLING
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

module.exports = app;
