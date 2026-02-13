const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A category must have a name'],
            unique: true,
            trim: true,
            maxlength: [50, 'A category name must have less or equal than 50 characters']
        },
        slug: String,
        parent: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            default: null
        },
        description: {
            type: String,
            trim: true
        },
        image: String,
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Virtual for subcategories
categorySchema.virtual('subcategories', {
    ref: 'Category',
    foreignField: 'parent',
    localField: '_id'
});

// Document Middleware: runs before .save() and .create()
categorySchema.pre('save', function () {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true });
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
