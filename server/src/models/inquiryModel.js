const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: [true, 'An inquiry must be associated with a product']
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'An inquiry must be associated with a user']
        },
        type: {
            type: String,
            enum: {
                values: ['general', 'quote'],
                message: 'Inquiry type is either: general, quote'
            },
            default: 'general'
        },
        message: {
            type: String,
            required: [true, 'Please provide a message for your inquiry'],
            trim: true
        },
        status: {
            type: String,
            enum: ['pending', 'contacted', 'resolved', 'closed'],
            default: 'pending'
        },
        adminNotes: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Populate product and user details on find
inquirySchema.pre(/^find/, function (next) {
    this.populate({
        path: 'product',
        select: 'name sku price'
    }).populate({
        path: 'user',
        select: 'name email'
    });
    next();
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
