const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A product must have a name'],
            unique: true,
            trim: true,
            maxlength: [100, 'A product name must have less or equal than 100 characters']
        },
        sku: {
            type: String,
            required: [true, 'A product must have a SKU'],
            unique: true,
            trim: true
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'A product must belong to a category']
        },
        description: {
            type: String,
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'A product must have a price']
        },
        stockStatus: {
            type: String,
            enum: ['In Stock', 'Out of Stock', 'On Backorder'],
            default: 'In Stock'
        },
        imageUrl: {
            type: String,
            required: [true, 'A product must have an image']
        },
        model3D: {
            url: String, // Sketchfab or direct GLTF link
            modelType: {
                type: String,
                enum: ['sketchfab', 'gltf'],
                default: 'sketchfab'
            }
        },
        compatibility: [
            {
                make: { type: String, trim: true },
                model: { type: String, trim: true },
                yearStart: Number,
                yearEnd: Number
            }
        ],
        specification: [
            {
                label: String,
                value: String
            }
        ],
        featured: {
            type: Boolean,
            default: false
        },
        active: {
            type: Boolean,
            default: true,
            select: false
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Indexes for performance
productSchema.index({ name: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ category: 1 });
productSchema.index({ 'compatibility.make': 1 });
productSchema.index({ 'compatibility.model': 1 });
productSchema.index({ 'compatibility.yearStart': 1, 'compatibility.yearEnd': 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
