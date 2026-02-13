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
            enum: ['In Stock', 'Low Stock', 'Out of Stock', 'On Backorder'],
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

// --- INDEXES FOR PERFORMANCE ---

// 1. Text Search Index
productSchema.index(
    { name: 'text', description: 'text', sku: 'text' },
    { weights: { name: 10, description: 5, sku: 2 }, name: 'ProductTextIndex' }
);

// 2. Catalog Filtering (Compound)
// Most common pattern: category + make + active status
productSchema.index({ category: 1, 'compatibility.make': 1, active: 1 });

// 3. Vehicle Search (Compound)
productSchema.index({
    'compatibility.make': 1,
    'compatibility.model': 1,
    'compatibility.yearStart': 1,
    'compatibility.yearEnd': 1
});

// 4. Price & Availability
productSchema.index({ price: 1, stockStatus: 1 });

// 5. Unique Identifiers
productSchema.index({ sku: 1 }, { unique: true });
productSchema.index({ name: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
