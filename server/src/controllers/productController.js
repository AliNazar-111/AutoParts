const Product = require('../models/productModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// GET all products (Public)
exports.getAllProducts = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Product.find({ active: { $ne: false } }).populate('category'), req.query)
        .search()
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const products = await features.query;

    // We need to get total count for pagination UI
    const countFeatures = new APIFeatures(Product.find({ active: { $ne: false } }), req.query)
        .search()
        .filter();
    const total = await Product.countDocuments(countFeatures.query.getFilter());

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;

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
});

// GET single product (Public)
exports.getProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
        return next(new AppError('No product found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
});

// CREATE product (Admin only)
exports.createProduct = catchAsync(async (req, res, next) => {
    if (req.file) req.body.imageUrl = `/img/products/${req.file.filename}`;
    const newProduct = await Product.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct
        }
    });
});

// UPDATE product (Admin only)
exports.updateProduct = catchAsync(async (req, res, next) => {
    if (req.file) req.body.imageUrl = `/img/products/${req.file.filename}`;
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!product) {
        return next(new AppError('No product found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
});

// DELETE product (Admin only - soft delete)
exports.deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        { active: false },
        { new: true }
    );

    if (!product) {
        return next(new AppError('No product found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

