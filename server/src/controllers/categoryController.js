const Category = require('../models/categoryModel');

// GET all categories (Public)
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ active: true })
            .populate('subcategories')
            .lean();

        res.status(200).json({
            status: 'success',
            results: categories.length,
            data: {
                categories
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// GET single category by ID or slug (Public)
exports.getCategory = async (req, res) => {
    try {
        const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
            ? { _id: req.params.id }
            : { slug: req.params.id };

        const category = await Category.findOne(query)
            .populate('subcategories')
            .lean();

        if (!category) {
            return res.status(404).json({
                status: 'fail',
                message: 'No category found with that ID or slug'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                category
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// GET parent categories only (Public)
exports.getParentCategories = async (req, res) => {
    try {
        const categories = await Category.find({ parent: null, active: true })
            .populate('subcategories')
            .lean();

        res.status(200).json({
            status: 'success',
            results: categories.length,
            data: {
                categories
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// CREATE category (Admin only)
exports.createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                category: newCategory
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// UPDATE category (Admin only)
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!category) {
            return res.status(404).json({
                status: 'fail',
                message: 'No category found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                category
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// DELETE category (Admin only - soft delete)
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { active: false },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({
                status: 'fail',
                message: 'No category found with that ID'
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
