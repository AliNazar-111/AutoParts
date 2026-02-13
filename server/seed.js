const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./src/models/categoryModel');
const Product = require('./src/models/productModel');

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const categories = [
    { name: 'Engine', description: 'Performance & reliability' },
    { name: 'Brakes', description: 'Safety & control' },
    { name: 'Suspension', description: 'Comfort & handling' },
    { name: 'Electrical', description: 'Power & connectivity' }
];

const mockProducts = [
    {
        name: 'Premium Brake Pad Set',
        categoryName: 'Brakes',
        description: 'High-performance ceramic brake pads with superior stopping power and reduced dust',
        price: 89.99,
        sku: 'BP-HC-2024-01',
        imageUrl: 'https://images.unsplash.com/photo-1750019487267-47568f388dfa?q=80&w=1080',
        stockStatus: 'In Stock',
        featured: true,
        compatibility: [
            { make: 'Honda', model: 'Civic', yearStart: 2018, yearEnd: 2024 },
            { make: 'Toyota', model: 'Camry', yearStart: 2019, yearEnd: 2024 }
        ],
        specification: [{ label: 'Material', value: 'Ceramic Composite' }]
    },
    {
        name: 'Engine Oil Filter',
        categoryName: 'Engine',
        description: 'Premium oil filter with 99% filtration efficiency for optimal engine protection',
        price: 24.99,
        sku: 'OF-FD-2024-03',
        imageUrl: 'https://images.unsplash.com/photo-1762139258224-236877b2c571?q=80&w=1080',
        stockStatus: 'In Stock',
        compatibility: [{ make: 'Ford', model: 'F-150', yearStart: 2015, yearEnd: 2024 }],
        specification: [{ label: 'Filter Type', value: 'Spin-on' }]
    },
    {
        name: 'Front Suspension Strut',
        categoryName: 'Suspension',
        description: 'Heavy-duty gas-charged strut for improved ride comfort and handling',
        price: 149.99,
        sku: 'SS-BM-2019-08',
        imageUrl: 'https://images.unsplash.com/photo-1760836395763-25ea44ae8145?q=80&w=1080',
        stockStatus: 'Low Stock',
        compatibility: [{ make: 'BMW', model: '3 Series', yearStart: 2012, yearEnd: 2019 }],
        specification: [{ label: 'Type', value: 'Gas Monotube' }]
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(DB);
        console.log('DB connection successful for seeding!');

        // 1. Clear existing data
        await Category.deleteMany();
        await Product.deleteMany();
        console.log('Data cleared!');

        // 2. Create Categories
        const createdCategories = await Category.create(categories);
        console.log('Categories created!');

        // 3. Create Products with linked categories
        const productsWithIds = mockProducts.map(prod => {
            const category = createdCategories.find(cat => cat.name === prod.categoryName);
            const { categoryName, ...rest } = prod;
            return { ...rest, category: category._id };
        });

        await Product.create(productsWithIds);
        console.log('Products created!');

        process.exit();
    } catch (err) {
        console.error('SEEDING ERROR: ', err);
        process.exit(1);
    }
};

seedData();
