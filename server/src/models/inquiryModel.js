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
        vehicleInfo: {
            make: { type: String, required: [true, 'Please provide vehicle make'] },
            model: { type: String, required: [true, 'Please provide vehicle model'] },
            year: { type: Number, required: [true, 'Please provide vehicle year'] },
            vin: { type: String, trim: true } // Optional VIN for precision
        },
        contactInfo: {
            phone: { type: String, required: [true, 'Please provide a contact phone number'] },
            email: { type: String, required: [true, 'Please provide a contact email'] }
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
            enum: ['new', 'contacted', 'closed'],
            default: 'new'
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
