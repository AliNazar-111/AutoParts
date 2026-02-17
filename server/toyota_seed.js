const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./src/models/categoryModel');
const Product = require('./src/models/productModel');

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Currency Converter (1 USD = 280 PKR)
const PKR_TO_USD = 1 / 280;

const categoriesData = [
    { name: 'Engine Systems', description: 'Performance & core reliability components including filters, ignition, and cooling.' },
    { name: 'Brake Systems', description: 'Safety-critical braking components: pads, rotors, and hydraulics.' },
    { name: 'Suspension Stage', description: 'Handling and comfort orchestration: absorbers, springs, and linkages.' },
    { name: 'Digital & Power', description: 'Electrical infrastructure: batteries, alternators, and LED lighting.' },
    { name: 'Transmission Stage', description: 'Drivetrain synchronization: CVT fluids, manual kits, and seals.' },
    { name: 'Exterior & Trim', description: 'Aesthetic and structural nodes: glass, mirrors, and body panels.' },
    { name: 'Interior Systems', description: 'Operational environment: seating, lighting, and climate control.' },
    { name: 'Universal Accessories', description: 'General utility and custom telemetry nodes.' }
];

const vehicles = [
    { make: 'Toyota', model: 'Corolla', years: [2005, 2026] },
    { make: 'Toyota', model: 'Yaris', years: [2006, 2026] },
    { make: 'Toyota', model: 'Vitz', years: [2005, 2026] },
    { make: 'Toyota', model: 'Belta', years: [2008, 2026] },
    { make: 'Toyota', model: 'Hilux', years: [2005, 2026] },
    { make: 'Toyota', model: 'Fortuner', years: [2009, 2026] },
    { make: 'Toyota', model: 'Prado', years: [2009, 2026] },
    { make: 'Toyota', model: 'Premio', years: [2007, 2026] },
    { make: 'Toyota', model: 'Corolla Cross', years: [2020, 2026] },
    { make: 'Toyota', model: 'Camry', years: [2012, 2026] },
    { make: 'Toyota', model: 'Civic', years: [2012, 2026] }, // Included as per catalog
    { make: 'Toyota', model: 'Tacoma', years: [2020, 2026] }
];

const productsData = [
    // --- ENGINE SYSTEMS ---
    {
        name: 'Oil Filter (Genuine Toyota)',
        category: 'Engine Systems',
        pkrPrice: [2305, 3200],
        fitment: ['Corolla', 'Yaris', 'Vitz', 'Belta'],
        image: 'https://images.unsplash.com/photo-1762139258224-236877b2c571?q=80&w=1080',
        specs: [{ label: 'Quality', value: 'OEM Direct Fit' }]
    },
    {
        name: 'Air Filter (Genuine)',
        category: 'Engine Systems',
        pkrPrice: [1200, 2000],
        fitment: ['all'],
        image: 'https://images.unsplash.com/photo-1763836393379-68f9721966ee?q=80&w=1080',
        specs: [{ label: 'Protection', value: 'High Efficiency' }]
    },
    {
        name: 'Synthetic Engine Oil 5W-30 (5L)',
        category: 'Engine Systems',
        pkrPrice: [3500, 5500],
        fitment: ['all'],
        image: 'https://images.unsplash.com/photo-1762139258224-236877b2c571?q=80&w=1080',
        specs: [{ label: 'Type', value: 'Full Synthetic' }]
    },
    {
        name: 'Iridium Spark Plug (Set of 4)',
        category: 'Engine Systems',
        pkrPrice: [3500, 6500],
        fitment: ['all'],
        image: 'https://images.unsplash.com/photo-1762139258224-236877b2c571?q=80&w=1080',
        specs: [{ label: 'Material', value: 'Iridium' }]
    },
    // --- BRAKE SYSTEMS ---
    {
        name: 'Front Brake Pad (Genuine OEM)',
        category: 'Brake Systems',
        pkrPrice: [15000, 25050],
        fitment: ['Corolla', 'Hilux'],
        image: 'https://images.unsplash.com/photo-1750019487267-47568f388dfa?q=80&w=1080',
        specs: [{ label: 'Material', value: 'Semi-Metallic' }]
    },
    {
        name: 'Brake Rotor Pair (Front)',
        category: 'Brake Systems',
        pkrPrice: [6000, 15000],
        fitment: ['all'],
        image: 'https://images.unsplash.com/photo-1750019487267-47568f388dfa?q=80&w=1080',
        specs: [{ label: 'Type', value: 'Vented Disc' }]
    },
    {
        name: 'ABS Sensor (Single)',
        category: 'Brake Systems',
        pkrPrice: [3500, 8000],
        fitment: ['all'],
        image: 'https://images.unsplash.com/photo-1750019487267-47568f388dfa?q=80&w=1080',
        specs: [{ label: 'System', value: 'Electronic Safety' }]
    },
    // --- SUSPENSION STAGE ---
    {
        name: 'Front Shock Absorber (OEM)',
        category: 'Suspension Stage',
        pkrPrice: [6000, 11000],
        fitment: ['Corolla', 'Yaris', 'Vitz'],
        image: 'https://images.unsplash.com/photo-1760836395763-25ea44ae8145?q=80&w=1080',
        specs: [{ label: 'Type', value: 'Gas Charged' }]
    },
    {
        name: 'Coil Spring Front',
        category: 'Suspension Stage',
        pkrPrice: [2500, 6500],
        fitment: ['Corolla', 'Yaris', 'Civic', 'Camry'],
        image: 'https://images.unsplash.com/photo-1760836395763-25ea44ae8145?q=80&w=1080',
        specs: [{ label: 'Load', value: 'High Capacity' }]
    },
    {
        name: 'Control Arm (Front Lower OEM)',
        category: 'Suspension Stage',
        pkrPrice: [4500, 9000],
        fitment: ['all'],
        image: 'https://images.unsplash.com/photo-1760836395763-25ea44ae8145?q=80&w=1080',
        specs: [{ label: 'Material', value: 'Forged Steel' }]
    },
    // --- DIGITAL & POWER ---
    {
        name: 'Car Battery (55 AH Standard)',
        category: 'Digital & Power',
        pkrPrice: [10000, 13000],
        fitment: ['Corolla', 'Camry'],
        image: 'https://images.unsplash.com/photo-1561338800-3aca39ac913e?q=80&w=1080',
        specs: [{ label: 'Capacity', value: '55 AH' }]
    },
    {
        name: 'Alternator (New Genuine)',
        category: 'Digital & Power',
        pkrPrice: [18000, 35000],
        fitment: ['all'],
        image: 'https://images.unsplash.com/photo-1561338800-3aca39ac913e?q=80&w=1080',
        specs: [{ label: 'Output', value: 'High Amperage' }]
    },
    {
        name: 'LED Headlight Assembly Complete',
        category: 'Digital & Power',
        pkrPrice: [12000, 28000],
        fitment: ['all'],
        image: 'https://images.unsplash.com/photo-1561338800-3aca39ac913e?q=80&w=1080',
        specs: [{ label: 'Technology', value: 'Full LED' }]
    },
    // --- TRANSMISSION STAGE ---
    {
        name: 'CVT Transmission Fluid (5L)',
        category: 'Transmission Stage',
        pkrPrice: [4000, 8500],
        fitment: ['Corolla', 'Yaris'],
        image: 'https://images.unsplash.com/photo-1762139258224-236877b2c571?q=80&w=1080',
        specs: [{ label: 'Type', value: 'CVT Specific' }]
    },
    {
        name: 'Clutch Kit (Complete Set of 3)',
        category: 'Transmission Stage',
        pkrPrice: [10000, 22000],
        fitment: ['all'], // Manual models
        image: 'https://images.unsplash.com/photo-1762139258224-236877b2c571?q=80&w=1080',
        specs: [{ label: 'Components', value: 'Plate, Disc, Bearing' }]
    },
    // --- EXTERIOR & TRIM ---
    {
        name: 'Front Windscreen (Laminated)',
        category: 'Exterior & Trim',
        pkrPrice: [15000, 30000],
        fitment: ['all'],
        image: 'https://images.unsplash.com/photo-1561338800-3aca39ac913e?q=80&w=1080',
        specs: [{ label: 'Safety', value: 'Laminated Glass' }]
    },
    {
        name: 'Side Mirror Pair Complete',
        category: 'Exterior & Trim',
        pkrPrice: [5000, 12000],
        fitment: ['all'],
        image: 'https://images.unsplash.com/photo-1561338800-3aca39ac913e?q=80&w=1080',
        specs: [{ label: 'Adjustment', value: 'Electric' }]
    },
    {
        name: 'Front Bumper Cover',
        category: 'Exterior & Trim',
        pkrPrice: [6000, 15000],
        fitment: ['all'],
        image: 'https://images.unsplash.com/photo-1561338800-3aca39ac913e?q=80&w=1080',
        specs: [{ label: 'Material', value: 'High-Impact ABS' }]
    }
];

const seedToyotaData = async () => {
    try {
        await mongoose.connect(DB);
        console.log('DB connection successful for Toyota Ingestion!');

        // 1. Flush existing specific catalog (but keep core baseline if needed)
        // For this large scale update, we clear all to ensure taxonomy integrity
        await Category.deleteMany();
        await Product.deleteMany();
        console.log('Production stages flushed.');

        // 2. Ingest Categories
        const createdCategories = await Category.create(categoriesData);
        console.log('Technical segments synchronized.');

        // 3. Process and Ingest Products
        const finalProducts = productsData.map(item => {
            const category = createdCategories.find(c => c.name === item.category);

            // Map Fitment to structured compatibility
            const compatibility = [];
            if (item.fitment.includes('all')) {
                vehicles.forEach(v => {
                    compatibility.push({
                        make: v.make,
                        model: v.model,
                        yearStart: v.years[0],
                        yearEnd: v.years[1]
                    });
                });
            } else {
                item.fitment.forEach(f => {
                    const v = vehicles.find(veh => veh.model === f);
                    if (v) {
                        compatibility.push({
                            make: v.make,
                            model: v.model,
                            yearStart: v.years[0],
                            yearEnd: v.years[1]
                        });
                    }
                });
            }

            // Price Reconciliation (Average PKR to USD)
            const avgPkr = (item.pkrPrice[0] + item.pkrPrice[1]) / 2;
            const usdPrice = parseFloat((avgPkr * PKR_TO_USD).toFixed(2));

            // SKU Generation (OEM prefix + random block)
            const sku = `TOY-${item.name.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 10000)}`;

            return {
                name: item.name,
                sku,
                category: category._id,
                description: `High-fidelity ${item.name} optimized for Toyota Pakistan models (2005-2026). Part ensures maximum systems synchronization and OEM precision.`,
                price: usdPrice,
                imageUrl: item.image,
                stockStatus: 'In Stock',
                featured: item.pkrPrice[0] > 10000,
                compatibility,
                specification: item.specs
            };
        });

        await Product.create(finalProducts);
        console.log(`Ingested ${finalProducts.length} technical nodes into Atlas environment.`);

        process.exit();
    } catch (err) {
        console.error('INGESTION FAILURE:', err);
        process.exit(1);
    }
};

seedToyotaData();
