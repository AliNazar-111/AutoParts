const Product = require('../models/productModel');

// API Features Helper Logic
const filterProducts = (query, queryObj) => {
    // 1) Handle vehicle-specific filtering (Advanced compatibility search)
    const vehicleFilter = {};
    if (queryObj.make) vehicleFilter.make = queryObj.make;
    if (queryObj.model) vehicleFilter.model = queryObj.model;
    if (queryObj.year) {
        const searchYear = Number(queryObj.year);
        vehicleFilter.yearStart = { $lte: searchYear };
        vehicleFilter.yearEnd = { $gte: searchYear };
    }

    if (Object.keys(vehicleFilter).length > 0) {
        query = query.find({
            compatibility: { $elemMatch: vehicleFilter }
        });
    }

    // 2) Generic filtering
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search', 'make', 'model', 'year'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering (e.g., gte, gt, lte, lt)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    return query.find(JSON.parse(queryStr));
};

const searchProducts = (query, search) => {
    if (search) {
        const searchRegex = { $regex: search, $options: 'i' };
        return query.find({
            $or: [
                { name: searchRegex },
                { description: searchRegex },
                { sku: searchRegex }
            ]
        });
    }
    return query;
};

const sortProducts = (query, sort) => {
    if (sort) {
        const sortBy = sort.split(',').join(' ');
        return query.sort(sortBy);
    }
    return query.sort('-createdAt');
};

const paginateProducts = (query, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return query.skip(skip).limit(Number(limit));
};

// --- CONTROLLERS ---

// GET all products (Public)
exports.getAllProducts = async (req, res) => {
    try {
        let query = Product.find().populate('category');

        // 1) Search
        query = searchProducts(query, req.query.search);

        // 2) Filter
        query = filterProducts(query, { ...req.query });

        // 3) Sort
        query = sortProducts(query, req.query.sort);

        // 4) Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 12;
        query = paginateProducts(query, page, limit);

        const products = await query;
        const total = await Product.countDocuments(query.getFilter());

        res.status(200).json({
            status: 'success',
            results: products.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: {
                products
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// GET single product (Public)
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');

        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'No product found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// CREATE product (Admin only)
exports.createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                product: newProduct
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// UPDATE product (Admin only)
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'No product found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// DELETE product (Admin only)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'No product found with that ID'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
