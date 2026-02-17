/**
 * TOYOTA AUTOPARTS DATABASE - QUERY HELPER FUNCTIONS
 * 
 * This file contains helper functions to query and manage the autoparts database
 * Use these in your API routes or backend logic
 */

const mongoose = require('mongoose');

// ============== QUERY HELPERS ==============

/**
 * Find all products by category
 * @param {string} categoryName - Category name
 * @returns {Promise<Array>} Array of products
 */
async function getProductsByCategory(categoryName) {
    const category = await mongoose.model('Category').findOne({ name: categoryName });
    if (!category) return [];
    return mongoose.model('Product').find({ category: category._id }).populate('category');
}

/**
 * Find products compatible with a specific Toyota model
 * @param {string} make - Make (e.g., 'Toyota')
 * @param {string} model - Model (e.g., 'Corolla')
 * @param {number} year - Year (e.g., 2020)
 * @returns {Promise<Array>} Compatible products
 */
async function getCompatibleProducts(make, model, year) {
    return mongoose.model('Product').find({
        $and: [
            { 'compatibility.make': make },
            { 'compatibility.model': model },
            { 'compatibility.yearStart': { $lte: year } },
            { 'compatibility.yearEnd': { $gte: year } }
        ]
    }).populate('category');
}

/**
 * Search products by text (name, description, SKU)
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Matching products
 */
async function searchProducts(searchTerm) {
    return mongoose.model('Product').find(
        { $text: { $search: searchTerm } },
        { score: { $meta: 'textScore' } }
    )
        .sort({ score: { $meta: 'textScore' } })
        .populate('category')
        .limit(20);
}

/**
 * Get products within a price range
 * @param {number} minPrice - Minimum price in PKR
 * @param {number} maxPrice - Maximum price in PKR
 * @returns {Promise<Array>} Products in price range
 */
async function getProductsByPriceRange(minPrice, maxPrice) {
    return mongoose.model('Product').find({
        price: { $gte: minPrice, $lte: maxPrice }
    })
        .sort({ price: 1 })
        .populate('category');
}

/**
 * Get featured products
 * @param {number} limit - Number of products to return
 * @returns {Promise<Array>} Featured products
 */
async function getFeaturedProducts(limit = 10) {
    return mongoose.model('Product').find({ featured: true })
        .limit(limit)
        .populate('category');
}

/**
 * Get products by stock status
 * @param {string} status - Stock status ('In Stock', 'Low Stock', 'Out of Stock', 'On Backorder')
 * @returns {Promise<Array>} Products with specified stock status
 */
async function getProductsByStockStatus(status) {
    return mongoose.model('Product').find({ stockStatus: status })
        .populate('category')
        .sort({ name: 1 });
}

/**
 * Get single product by SKU
 * @param {string} sku - Product SKU
 * @returns {Promise<Object>} Product details
 */
async function getProductBySKU(sku) {
    return mongoose.model('Product').findOne({ sku }).populate('category');
}

/**
 * Get all products in a subcategory
 * @param {string} subcategoryName - Subcategory name
 * @returns {Promise<Array>} Products in subcategory
 */
async function getProductsBySubcategory(subcategoryName) {
    const subcategory = await mongoose.model('Category').findOne({ name: subcategoryName });
    if (!subcategory) return [];
    return mongoose.model('Product').find({ category: subcategory._id })
        .populate('category')
        .sort({ name: 1 });
}

/**
 * Get category hierarchy with subcategories
 * @param {string} parentCategoryName - Parent category name
 * @returns {Promise<Object>} Category with subcategories
 */
async function getCategoryHierarchy(parentCategoryName) {
    return mongoose.model('Category')
        .findOne({ name: parentCategoryName })
        .populate('subcategories');
}

/**
 * Get all Toyota models available
 * @returns {Promise<Array>} Unique car models
 */
async function getAllToyotaModels() {
    return mongoose.model('Product').distinct('compatibility.model', {
        'compatibility.make': 'Toyota'
    });
}

/**
 * Get price statistics
 * @returns {Promise<Object>} Price statistics (min, max, avg)
 */
async function getPriceStatistics() {
    const stats = await mongoose.model('Product').aggregate([
        {
            $group: {
                _id: null,
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
                avgPrice: { $avg: '$price' },
                count: { $sum: 1 }
            }
        }
    ]);
    return stats[0] || {};
}

/**
 * Get products by category with filtering
 * @param {string} categoryName - Category name
 * @param {number} skip - Number to skip for pagination
 * @param {number} limit - Number to limit for pagination
 * @returns {Promise<Object>} Products with pagination
 */
async function getProductsByCategoryPaginated(categoryName, skip = 0, limit = 10) {
    const category = await mongoose.model('Category').findOne({ name: categoryName });
    if (!category) return { products: [], total: 0 };

    const [products, total] = await Promise.all([
        mongoose.model('Product')
            .find({ category: category._id })
            .populate('category')
            .skip(skip)
            .limit(limit)
            .sort({ name: 1 }),
        mongoose.model('Product').countDocuments({ category: category._id })
    ]);

    return { products, total, pages: Math.ceil(total / limit) };
}

/**
 * Get products by make and model with year range
 * @param {string} make - Vehicle make
 * @param {string} model - Vehicle model
 * @param {number} yearStart - Start year
 * @param {number} yearEnd - End year
 * @returns {Promise<Array>} Compatible products
 */
async function getProductsByVehicleYearRange(make, model, yearStart, yearEnd) {
    return mongoose.model('Product').find({
        $and: [
            { 'compatibility.make': make },
            { 'compatibility.model': model },
            { 'compatibility.yearStart': { $lte: yearEnd } },
            { 'compatibility.yearEnd': { $gte: yearStart } }
        ]
    })
        .populate('category')
        .sort({ price: 1 });
}

/**
 * Get low stock products (alert for restocking)
 * @returns {Promise<Array>} Low stock products
 */
async function getLowStockProducts() {
    return mongoose.model('Product').find({ stockStatus: 'Low Stock' })
        .populate('category')
        .sort({ name: 1 });
}

/**
 * Get top N products by price
 * @param {number} limit - Number of products
 * @returns {Promise<Array>} Most expensive products
 */
async function getMostExpensiveProducts(limit = 10) {
    return mongoose.model('Product')
        .find()
        .populate('category')
        .sort({ price: -1 })
        .limit(limit);
}

/**
 * Get bottom N products by price
 * @param {number} limit - Number of products
 * @returns {Promise<Array>} Cheapest products
 */
async function getCheapestProducts(limit = 10) {
    return mongoose.model('Product')
        .find()
        .populate('category')
        .sort({ price: 1 })
        .limit(limit);
}

/**
 * Get products with specifications containing a keyword
 * @param {string} keyword - Specification keyword to search
 * @returns {Promise<Array>} Products with matching specs
 */
async function getProductsBySpecification(keyword) {
    return mongoose.model('Product').find({
        'specification.value': { $regex: keyword, $options: 'i' }
    })
        .populate('category');
}

/**
 * Get all categories (main and subcategories)
 * @returns {Promise<Array>} All categories
 */
async function getAllCategories() {
    return mongoose.model('Category').find().populate('parent').sort({ name: 1 });
}

/**
 * Get main categories only (no parents)
 * @returns {Promise<Array>} Main categories
 */
async function getMainCategories() {
    return mongoose.model('Category')
        .find({ parent: null })
        .populate('subcategories')
        .sort({ name: 1 });
}

/**
 * Count products by category
 * @returns {Promise<Object>} Category counts
 */
async function getProductCountByCategory() {
    return mongoose.model('Product').aggregate([
        {
            $group: {
                _id: '$category',
                count: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: '_id',
                foreignField: '_id',
                as: 'categoryInfo'
            }
        },
        { $sort: { count: -1 } }
    ]);
}

/**
 * Get products compatible with multiple Toyota models
 * @param {Array<string>} models - Array of model names
 * @returns {Promise<Array>} Products compatible with any of the models
 */
async function getMultiModelCompatibleProducts(models) {
    return mongoose.model('Product').find({
        'compatibility.model': { $in: models }
    })
        .populate('category')
        .sort({ name: 1 });
}

/**
 * Get category with product count
 * @param {string} categoryName - Category name
 * @returns {Promise<Object>} Category with product count
 */
async function getCategoryWithProductCount(categoryName) {
    const category = await mongoose.model('Category').findOne({ name: categoryName });
    if (!category) return null;

    const count = await mongoose.model('Product').countDocuments({ category: category._id });
    return { ...category.toObject(), productCount: count };
}

// ============== EXPORT FUNCTIONS ==============

module.exports = {
    getProductsByCategory,
    getCompatibleProducts,
    searchProducts,
    getProductsByPriceRange,
    getFeaturedProducts,
    getProductsByStockStatus,
    getProductBySKU,
    getProductsBySubcategory,
    getCategoryHierarchy,
    getAllToyotaModels,
    getPriceStatistics,
    getProductsByCategoryPaginated,
    getProductsByVehicleYearRange,
    getLowStockProducts,
    getMostExpensiveProducts,
    getCheapestProducts,
    getProductsBySpecification,
    getAllCategories,
    getMainCategories,
    getProductCountByCategory,
    getMultiModelCompatibleProducts,
    getCategoryWithProductCount
};
