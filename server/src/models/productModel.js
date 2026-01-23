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
            type: String,
            required: [true, 'A product must belong to a category'],
            enum: {
                values: ['Engine', 'Suspension', 'Brakes', 'Electrical', 'Interior', 'Body'],
                message: 'Category is either: Engine, Suspension, Brakes, Electrical, Interior, Body'
            }
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
            url: String,
            modelType: {
                type: String,
                enum: ['sketchfab', 'gltf'],
                default: 'sketchfab'
            }
        },
        compatibility: [String],
        specification: [
            {
                label: String,
                value: String
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Indexes for performance
productSchema.index({ name: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ category: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
