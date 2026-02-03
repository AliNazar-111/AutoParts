const Inquiry = require('../models/inquiryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// CREATE inquiry (Authenticated User)
exports.createInquiry = catchAsync(async (req, res, next) => {
    // Add user ID from authenticated request
    req.body.user = req.user.id;

    const newInquiry = await Inquiry.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            inquiry: newInquiry
        }
    });
});

// GET all inquiries (Admin only)
exports.getAllInquiries = catchAsync(async (req, res, next) => {
    const inquiries = await Inquiry.find()
        .sort('-createdAt')
        .lean();

    res.status(200).json({
        status: 'success',
        results: inquiries.length,
        data: {
            inquiries
        }
    });
});

// GET single inquiry (Admin only)
exports.getInquiry = catchAsync(async (req, res, next) => {
    const inquiry = await Inquiry.findById(req.params.id).lean();

    if (!inquiry) {
        return next(new AppError('No inquiry found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            inquiry
        }
    });
});

// UPDATE inquiry status/notes (Admin only)
exports.updateInquiry = catchAsync(async (req, res, next) => {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!inquiry) {
        return next(new AppError('No inquiry found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            inquiry
        }
    });
});

// DELETE inquiry (Admin only)
exports.deleteInquiry = catchAsync(async (req, res, next) => {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
        return next(new AppError('No inquiry found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
