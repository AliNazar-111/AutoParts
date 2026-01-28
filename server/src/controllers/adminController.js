const Product = require('../models/productModel');
const Inquiry = require('../models/inquiryModel');

// GET dashboard stats (Admin only)
exports.getStats = async (req, res) => {
    try {
        const productStats = await Product.aggregate([
            {
                $facet: {
                    totalProducts: [{ $match: { active: { $ne: false } } }, { $count: 'count' }],
                    outOfStock: [{ $match: { active: { $ne: false }, stockStatus: 'Out of Stock' } }, { $count: 'count' }]
                }
            }
        ]);

        const inquiryStats = await Inquiry.aggregate([
            {
                $facet: {
                    totalInquiries: [{ $count: 'count' }],
                    pendingInquiries: [{ $match: { status: 'new' } }, { $count: 'count' }]
                }
            }
        ]);

        const recentInquiries = await Inquiry.find()
            .sort('-createdAt')
            .limit(5)
            .populate('product', 'name sku')
            .populate('user', 'name email');

        res.status(200).json({
            status: 'success',
            data: {
                products: {
                    total: productStats[0].totalProducts[0]?.count || 0,
                    outOfStock: productStats[0].outOfStock[0]?.count || 0
                },
                inquiries: {
                    total: inquiryStats[0].totalInquiries[0]?.count || 0,
                    pending: inquiryStats[0].pendingInquiries[0]?.count || 0,
                    recent: recentInquiries
                }
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
