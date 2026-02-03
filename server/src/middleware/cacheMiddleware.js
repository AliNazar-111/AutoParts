const NodeCache = require('node-cache');

// Default TTL of 10 minutes
const cache = new NodeCache({ stdTTL: 600 });

/**
 * Cache middleware for Express
 * @param {number} duration Cache duration in seconds
 */
const cacheMiddleware = (duration) => (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
        return next();
    }

    const key = req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        res.setHeader('X-Cache', 'HIT');
        return res.status(200).json(cachedResponse);
    }

    // Capture the response.json call to store it in cache
    const originalJson = res.json;
    res.json = (body) => {
        res.setHeader('X-Cache', 'MISS');
        // Only cache successful JSON responses
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache.set(key, body, duration);
        }
        return originalJson.call(res, body);
    };

    next();
};

module.exports = cacheMiddleware;
