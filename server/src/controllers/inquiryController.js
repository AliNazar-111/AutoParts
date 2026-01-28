const Inquiry = require('../models/inquiryModel');

// CREATE inquiry (Authenticated User)
exports.createInquiry = async (req, res) => {
    try {
        // Add user ID from authenticated request
        req.body.user = req.user.id;

        const newInquiry = await Inquiry.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                inquiry: newInquiry
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// GET all inquiries (Admin only)
exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort('-createdAt');

        res.status(200).json({
            status: 'success',
            results: inquiries.length,
            data: {
                inquiries
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// GET single inquiry (Admin only)
exports.getInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({
                status: 'fail',
                message: 'No inquiry found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                inquiry
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// UPDATE inquiry status/notes (Admin only)
exports.updateInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!inquiry) {
            return res.status(404).json({
                status: 'fail',
                message: 'No inquiry found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                inquiry
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// DELETE inquiry (Admin only)
exports.deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

        if (!inquiry) {
            return res.status(404).json({
                status: 'fail',
                message: 'No inquiry found with that ID'
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
