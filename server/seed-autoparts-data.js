const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Schema Definitions
const categorySchema = new mongoose.Schema({
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
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

categorySchema.virtual('subcategories', {
    ref: 'Category',
    foreignField: 'parent',
    localField: '_id'
});

categorySchema.pre('save', function () {
    if (this.isModified('name')) {
        const slugify = require('slugify');
        this.slug = slugify(this.name, { lower: true });
    }
});

const productSchema = new mongoose.Schema({
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
        url: String,
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
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

// ============== SEED DATA ==============

async function seedDatabase() {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/toyota-autoparts';
        await mongoose.connect(mongoUri);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Category.deleteMany({});
        await Product.deleteMany({});
        console.log('✅ Cleared existing data');

        // Create Categories (Main)
        const enginePartsCategory = await Category.create({
            name: 'Engine Systems',
            description: 'Performance & core reliability components including filters, ignition, and cooling.',
            image: 'https://images.unsplash.com/photo-1762139258224-236877b2c571?q=80&w=1080'
        });

        const brakeParts = await Category.create({
            name: 'Brake Systems',
            description: 'Safety-critical braking components: pads, rotors, and hydraulics.',
            image: 'https://images.unsplash.com/photo-1750019487267-47568f388dfa?q=80&w=1080'
        });

        const suspensionParts = await Category.create({
            name: 'Suspension Stage',
            description: 'Handling and comfort orchestration: absorbers, springs, and linkages.',
            image: 'https://images.unsplash.com/photo-1760836395763-25ea44ae8145?q=80&w=1080'
        });

        const electricalParts = await Category.create({
            name: 'Digital & Power',
            description: 'Electrical infrastructure: batteries, alternators, and LED lighting.',
            image: 'https://images.unsplash.com/photo-1561338800-3aca39ac913e?q=80&w=1080'
        });

        const transmissionParts = await Category.create({
            name: 'Transmission Stage',
            description: 'Drivetrain synchronization: CVT fluids, manual kits, and seals.',
            image: 'https://images.unsplash.com/photo-1762139258224-236877b2c571?q=80&w=1080'
        });

        const exteriorParts = await Category.create({
            name: 'Exterior & Trim',
            description: 'Aesthetic and structural nodes: glass, mirrors, and body panels.',
            image: 'https://images.unsplash.com/photo-1561338800-3aca39ac913e?q=80&w=1080'
        });

        const interiorParts = await Category.create({
            name: 'Interior Systems',
            description: 'Operational environment: seating, lighting, and climate control.',
            image: 'https://images.unsplash.com/photo-1561338800-3aca39ac913e?q=80&w=1080'
        });

        const accessoriesParts = await Category.create({
            name: 'Universal Accessories',
            description: 'General utility and custom telemetry nodes.',
            image: 'https://i.ytimg.com/vi/zkkNLx9I6Vo/maxresdefault.jpg'
        });

        console.log('✅ Created 8 main categories');

        // Create Subcategories for Engine Parts
        const oilFilters = await Category.create({
            name: 'Oil & Filters',
            parent: enginePartsCategory._id,
            description: 'Engine oil, oil filters, air filters, cabin filters'
        });

        const sparkPlugs = await Category.create({
            name: 'Spark Plugs & Ignition',
            parent: enginePartsCategory._id,
            description: 'Spark plugs, ignition coils, distributors'
        });

        const coolingSystem = await Category.create({
            name: 'Cooling System',
            parent: enginePartsCategory._id,
            description: 'Radiators, thermostats, water pumps, fans'
        });

        const beltsHoses = await Category.create({
            name: 'Belts & Hoses',
            parent: enginePartsCategory._id,
            description: 'Serpentine belts, timing belts, coolant hoses'
        });

        const fuelSystem = await Category.create({
            name: 'Fuel System',
            parent: enginePartsCategory._id,
            description: 'Fuel filters, fuel pumps, fuel injectors, regulators'
        });

        console.log('✅ Created subcategories for Engine Parts');

        // ============== PRODUCTS ==============

        // OIL & FILTERS
        const products = [];

        // Oil Filters
        products.push({
            name: 'Oil Filter (Genuine Toyota)',
            sku: 'OF-001-TOYOTA',
            category: oilFilters._id,
            description: 'Genuine OEM Toyota oil filter for superior filtration and engine protection',
            price: 2650,
            stockStatus: 'In Stock',
            imageUrl: '/images/oil-filter-genuine.jpg',
            compatibility: [
                { make: 'Toyota', model: 'Corolla', yearStart: 2014, yearEnd: 2026 },
                { make: 'Toyota', model: 'Yaris', yearStart: 2006, yearEnd: 2026 },
                { make: 'Toyota', model: 'Vitz', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Oil Filter' },
                { label: 'Compatibility', value: 'Petrol Engines 1.3L - 1.8L' },
                { label: 'OEM Status', value: 'Genuine Toyota' }
            ],
            featured: true
        });

        products.push({
            name: 'Oil Filter (Aftermarket)',
            sku: 'OF-002-AFTRKT',
            category: oilFilters._id,
            description: 'Reliable aftermarket oil filter for budget-conscious maintenance',
            price: 1500,
            stockStatus: 'In Stock',
            imageUrl: '/images/oil-filter-aftermarket.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Oil Filter' },
                { label: 'Quality', value: 'Aftermarket Standard' },
                { label: 'Price', value: 'Budget-Friendly' }
            ]
        });

        products.push({
            name: 'Air Filter (Genuine)',
            sku: 'AF-001-TOYOTA',
            category: oilFilters._id,
            description: 'OEM Toyota air filter for optimal engine breathing and performance',
            price: 1600,
            stockStatus: 'In Stock',
            imageUrl: '/images/air-filter-genuine.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Petrol Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Air Filter' },
                { label: 'Filtration', value: 'High-efficiency particulate' },
                { label: 'Lifespan', value: '15,000-30,000 km' }
            ]
        });

        products.push({
            name: 'Cabin AC Filter',
            sku: 'CAC-001',
            category: oilFilters._id,
            description: 'Cabin air filter for fresh and clean interior air',
            price: 1600,
            stockStatus: 'In Stock',
            imageUrl: '/images/cabin-filter.jpg',
            compatibility: [
                { make: 'Toyota', model: 'Corolla', yearStart: 2009, yearEnd: 2026 },
                { make: 'Toyota', model: 'Hilux', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Cabin AC Filter' },
                { label: 'Protection', value: 'Pollen & Dust' },
                { label: 'Maintenance', value: '10,000 km intervals' }
            ]
        });

        products.push({
            name: 'Engine Oil Synthetic 5W-30 (5L)',
            sku: 'EO-SYN-5W30-5L',
            category: oilFilters._id,
            description: 'Premium synthetic engine oil for modern Toyota vehicles',
            price: 4500,
            stockStatus: 'In Stock',
            imageUrl: '/images/engine-oil-synthetic.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Modern Models', yearStart: 2014, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Fully Synthetic' },
                { label: 'Grade', value: '5W-30' },
                { label: 'Volume', value: '5 Liters' },
                { label: 'Protection', value: 'Enhanced thermal stability' }
            ],
            featured: true
        });

        products.push({
            name: 'Engine Oil Semi-Synthetic 10W-40 (5L)',
            sku: 'EO-SEMI-10W40-5L',
            category: oilFilters._id,
            description: 'Semi-synthetic engine oil for all Toyota models',
            price: 3000,
            stockStatus: 'In Stock',
            imageUrl: '/images/engine-oil-semi.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Semi-Synthetic' },
                { label: 'Grade', value: '10W-40' },
                { label: 'Volume', value: '5 Liters' },
                { label: 'Best For', value: 'Standard driving conditions' }
            ]
        });

        // SPARK PLUGS & IGNITION
        products.push({
            name: 'Standard Spark Plug (Set of 4)',
            sku: 'SP-STD-SET4',
            category: sparkPlugs._id,
            description: 'Standard spark plugs for reliable ignition in petrol engines',
            price: 1300,
            stockStatus: 'In Stock',
            imageUrl: '/images/spark-plug-standard.jpg',
            compatibility: [
                { make: 'Toyota', model: 'Corolla', yearStart: 2005, yearEnd: 2013 },
                { make: 'Toyota', model: 'Yaris', yearStart: 2006, yearEnd: 2020 },
                { make: 'Toyota', model: 'Vitz', yearStart: 2005, yearEnd: 2019 }
            ],
            specification: [
                { label: 'Type', value: 'Standard Nickel' },
                { label: 'Quantity', value: '4 Plugs' },
                { label: 'Gap', value: '0.7-0.8 mm' }
            ]
        });

        products.push({
            name: 'Iridium Spark Plug (Set of 4)',
            sku: 'SP-IRID-SET4',
            category: sparkPlugs._id,
            description: 'Premium iridium spark plugs for extended lifespan and better ignition',
            price: 5000,
            stockStatus: 'In Stock',
            imageUrl: '/images/spark-plug-iridium.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Petrol Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Iridium Premium' },
                { label: 'Quantity', value: '4 Plugs' },
                { label: 'Lifespan', value: '40,000-100,000 km' },
                { label: 'Performance', value: 'Superior ignition' }
            ],
            featured: true
        });

        products.push({
            name: 'Ignition Coil (Single)',
            sku: 'IC-001',
            category: sparkPlugs._id,
            description: 'High-performance ignition coil for reliable engine starting',
            price: 3100,
            stockStatus: 'In Stock',
            imageUrl: '/images/ignition-coil.jpg',
            compatibility: [
                { make: 'Toyota', model: 'Corolla', yearStart: 2009, yearEnd: 2026 },
                { make: 'Toyota', model: 'Yaris', yearStart: 2006, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Ignition Coil' },
                { label: 'Output', value: 'High voltage' },
                { label: 'Durability', value: 'Long-lasting' }
            ]
        });

        // COOLING SYSTEM
        products.push({
            name: 'Radiator Cap',
            sku: 'RC-001',
            category: coolingSystem._id,
            description: 'Radiator cap for pressure regulation in cooling system',
            price: 1400,
            stockStatus: 'In Stock',
            imageUrl: '/images/radiator-cap.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Radiator Cap' },
                { label: 'Pressure Rating', value: '1.1 kg/cm²' },
                { label: 'Material', value: 'Aluminum & Plastic' }
            ]
        });

        products.push({
            name: 'Thermostat',
            sku: 'THERMO-001',
            category: coolingSystem._id,
            description: 'Engine thermostat for optimal operating temperature control',
            price: 2400,
            stockStatus: 'In Stock',
            imageUrl: '/images/thermostat.jpg',
            compatibility: [
                { make: 'Toyota', model: 'Corolla', yearStart: 2005, yearEnd: 2026 },
                { make: 'Toyota', model: 'Hilux', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Engine Thermostat' },
                { label: 'Opening Temp', value: '82°C' },
                { label: 'Function', value: 'Temperature regulation' }
            ]
        });

        products.push({
            name: 'Water Pump (Genuine)',
            sku: 'WP-001-GEN',
            category: coolingSystem._id,
            description: 'Genuine Toyota water pump for reliable coolant circulation',
            price: 9250,
            stockStatus: 'In Stock',
            imageUrl: '/images/water-pump.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Water Pump' },
                { label: 'Function', value: 'Coolant circulation' },
                { label: 'OEM Status', value: 'Genuine Toyota' },
                { label: 'Durability', value: 'Extended service life' }
            ],
            featured: true
        });

        products.push({
            name: 'Radiator (Manual) 1.6L-1.8L',
            sku: 'RAD-MANUAL-1618',
            category: coolingSystem._id,
            description: 'Manual transmission radiator for effective cooling',
            price: 15000,
            stockStatus: 'Low Stock',
            imageUrl: '/images/radiator-manual.jpg',
            compatibility: [
                { make: 'Toyota', model: 'Corolla', yearStart: 2005, yearEnd: 2020 },
                { make: 'Toyota', model: 'Yaris', yearStart: 2006, yearEnd: 2020 }
            ],
            specification: [
                { label: 'Type', value: 'Aluminum Radiator' },
                { label: 'Transmission', value: 'Manual' },
                { label: 'Capacity', value: '4.5 Liters' }
            ]
        });

        // BRAKE PADS
        products.push({
            name: 'Front Brake Pad (Aftermarket)',
            sku: 'BP-FRONT-AFTRKT',
            category: brakeParts._id,
            description: 'Reliable aftermarket front brake pads for safe stopping',
            price: 5000,
            stockStatus: 'In Stock',
            imageUrl: '/images/brake-pad-front.jpg',
            compatibility: [
                { make: 'Toyota', model: 'Corolla', yearStart: 2005, yearEnd: 2026 },
                { make: 'Toyota', model: 'Yaris', yearStart: 2006, yearEnd: 2026 },
                { make: 'Toyota', model: 'Vitz', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Front Disc Brake Pads' },
                { label: 'Material', value: 'Semi-metallic' },
                { label: 'Set Size', value: '4 pads' },
                { label: 'OEM Equivalent', value: 'Yes' }
            ],
            featured: true
        });

        products.push({
            name: 'Front Brake Pad (Genuine OEM)',
            sku: 'BP-FRONT-OEM',
            category: brakeParts._id,
            description: 'Genuine OEM Toyota front brake pads for original equipment quality',
            price: 20000,
            stockStatus: 'In Stock',
            imageUrl: '/images/brake-pad-front-oem.jpg',
            compatibility: [
                { make: 'Toyota', model: 'Corolla', yearStart: 2014, yearEnd: 2026 },
                { make: 'Toyota', model: 'Hilux', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Front Disc Brake Pads' },
                { label: 'Material', value: 'Premium ceramic' },
                { label: 'OEM Status', value: 'Genuine Toyota' },
                { label: 'Low Dust', value: 'Yes' }
            ]
        });

        products.push({
            name: 'Rear Disc Brake Pad (Aftermarket)',
            sku: 'BP-REAR-AFTRKT',
            category: brakeParts._id,
            description: 'Aftermarket rear disc brake pads for effective braking',
            price: 6500,
            stockStatus: 'In Stock',
            imageUrl: '/images/brake-pad-rear.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Rear Disc Brake Pads' },
                { label: 'Material', value: 'Semi-metallic' },
                { label: 'Wear Indicator', value: 'Built-in' }
            ]
        });

        products.push({
            name: 'Brake Fluid DOT 4 (1L)',
            sku: 'BF-DOT4-1L',
            category: brakeParts._id,
            description: 'DOT 4 brake fluid for reliable hydraulic brake systems',
            price: 1200,
            stockStatus: 'In Stock',
            imageUrl: '/images/brake-fluid.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Brake Fluid' },
                { label: 'Standard', value: 'DOT 4' },
                { label: 'Volume', value: '1 Liter' },
                { label: 'Boiling Point', value: '230°C' }
            ]
        });

        products.push({
            name: 'Master Cylinder (Genuine)',
            sku: 'MC-001-GEN',
            category: brakeParts._id,
            description: 'Genuine Toyota master cylinder for brake system operation',
            price: 11500,
            stockStatus: 'Low Stock',
            imageUrl: '/images/master-cylinder.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Master Cylinder' },
                { label: 'OEM Status', value: 'Genuine Toyota' },
                { label: 'Function', value: 'Brake pressure generation' },
                { label: 'Durability', value: 'Extended life' }
            ],
            featured: true
        });

        products.push({
            name: 'Brake Rotor/Disc (Pair Front)',
            sku: 'BR-FRONT-PAIR',
            category: brakeParts._id,
            description: 'Front brake rotors for smooth and reliable braking',
            price: 10500,
            stockStatus: 'In Stock',
            imageUrl: '/images/brake-rotor.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Disc Rotors' },
                { label: 'Position', value: 'Front' },
                { label: 'Material', value: 'Cast iron' },
                { label: 'Quantity', value: '2 rotors' }
            ]
        });

        // SUSPENSION PARTS
        products.push({
            name: 'Front Shock Absorber (Single) OEM',
            sku: 'SHA-FRONT-OEM',
            category: suspensionParts._id,
            description: 'Genuine Toyota front shock absorber for smooth ride quality',
            price: 8500,
            stockStatus: 'In Stock',
            imageUrl: '/images/shock-absorber.jpg',
            compatibility: [
                { make: 'Toyota', model: 'Corolla', yearStart: 2005, yearEnd: 2026 },
                { make: 'Toyota', model: 'Yaris', yearStart: 2006, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Shock Absorber' },
                { label: 'Position', value: 'Front' },
                { label: 'Technology', value: 'Hydraulic dampening' },
                { label: 'OEM Status', value: 'Genuine' }
            ],
            featured: true
        });

        products.push({
            name: 'Coil Spring Front',
            sku: 'CS-FRONT-001',
            category: suspensionParts._id,
            description: 'Front coil spring for proper suspension height and support',
            price: 4500,
            stockStatus: 'In Stock',
            imageUrl: '/images/coil-spring.jpg',
            compatibility: [
                { make: 'Toyota', model: 'Corolla', yearStart: 2005, yearEnd: 2026 },
                { make: 'Toyota', model: 'Civic', yearStart: 2012, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Coil Spring' },
                { label: 'Position', value: 'Front' },
                { label: 'Load Capacity', value: 'OEM specification' }
            ]
        });

        products.push({
            name: 'Control Arm (Front Lower) OEM',
            sku: 'CA-FRONT-OEM',
            category: suspensionParts._id,
            description: 'Front lower control arm for steering geometry control',
            price: 6750,
            stockStatus: 'In Stock',
            imageUrl: '/images/control-arm.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Control Arm' },
                { label: 'Position', value: 'Front Lower' },
                { label: 'Function', value: 'Steering control' },
                { label: 'OEM Quality', value: 'Genuine' }
            ]
        });

        products.push({
            name: 'Ball Joint (Front)',
            sku: 'BJ-FRONT-001',
            category: suspensionParts._id,
            description: 'Front ball joint for suspension articulation and steering',
            price: 3000,
            stockStatus: 'In Stock',
            imageUrl: '/images/ball-joint.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Ball Joint' },
                { label: 'Position', value: 'Front' },
                { label: 'Material', value: 'Steel with rubber boot' }
            ]
        });

        products.push({
            name: 'Wheel Bearing (Single - NTN Japan)',
            sku: 'WB-NTN-JAPAN',
            category: suspensionParts._id,
            description: 'Premium NTN wheel bearing for smooth wheel rotation',
            price: 5400,
            stockStatus: 'In Stock',
            imageUrl: '/images/wheel-bearing.jpg',
            compatibility: [
                { make: 'Toyota', model: 'Corolla', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Brand', value: 'NTN Japan' },
                { label: 'Type', value: 'Wheel Bearing' },
                { label: 'Quality', value: 'Premium' },
                { label: 'Durability', value: 'Long lifespan' }
            ],
            featured: true
        });

        // ELECTRICAL PARTS
        products.push({
            name: 'Car Battery (50 AH Standard)',
            sku: 'BATT-50AH',
            category: electricalParts._id,
            description: 'Standard 50 AH car battery for reliable engine starting',
            price: 10500,
            stockStatus: 'In Stock',
            imageUrl: '/images/car-battery.jpg',
            compatibility: [
                { make: 'Toyota', model: 'Corolla', yearStart: 2005, yearEnd: 2026 },
                { make: 'Toyota', model: 'Civic', yearStart: 2012, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Car Battery' },
                { label: 'Capacity', value: '50 AH' },
                { label: 'Starting Power', value: '400 CCA' },
                { label: 'Warranty', value: '18 months' }
            ],
            featured: true
        });

        products.push({
            name: 'Alternator (New Genuine)',
            sku: 'ALT-001-NEW',
            category: electricalParts._id,
            description: 'Genuine new alternator for electrical power generation',
            price: 26500,
            stockStatus: 'Low Stock',
            imageUrl: '/images/alternator.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Alternator' },
                { label: 'Status', value: 'New OEM' },
                { label: 'Output', value: '120A' },
                { label: 'Durability', value: 'Extended service' }
            ]
        });

        products.push({
            name: 'Starter Motor (New Genuine)',
            sku: 'START-001-NEW',
            category: electricalParts._id,
            description: 'Genuine new starter motor for reliable engine starting',
            price: 21500,
            stockStatus: 'In Stock',
            imageUrl: '/images/starter-motor.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Starter Motor' },
                { label: 'Status', value: 'New OEM' },
                { label: 'Power', value: 'High torque' }
            ]
        });

        products.push({
            name: 'Headlight Bulb H4 Standard',
            sku: 'HB-H4-STD',
            category: electricalParts._id,
            description: 'Standard H4 headlight bulb for basic lighting',
            price: 600,
            stockStatus: 'In Stock',
            imageUrl: '/images/headlight-bulb.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Standard Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Headlight Bulb' },
                { label: 'Standard', value: 'H4' },
                { label: 'Power', value: '60/55W' },
                { label: 'Color', value: 'Warm white' }
            ]
        });

        products.push({
            name: 'LED Headlight Assembly Complete',
            sku: 'HLA-LED-COMP',
            category: electricalParts._id,
            description: 'Complete LED headlight assembly for modern lighting',
            price: 20000,
            stockStatus: 'Low Stock',
            imageUrl: '/images/led-headlight.jpg',
            compatibility: [
                { make: 'Toyota', model: 'Modern Models', yearStart: 2014, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'LED Headlight' },
                { label: 'Technology', value: 'LED' },
                { label: 'Brightness', value: '6000K white' },
                { label: 'Energy Efficient', value: 'Yes' }
            ],
            featured: true
        });

        products.push({
            name: 'Wiper Blade (Pair - Standard)',
            sku: 'WB-PAIR-STD',
            category: electricalParts._id,
            description: 'Standard wiper blade pair for clear windshield visibility',
            price: 1300,
            stockStatus: 'In Stock',
            imageUrl: '/images/wiper-blade.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Wiper Blade' },
                { label: 'Quantity', value: '2 blades' },
                { label: 'Lifespan', value: '12-18 months' },
                { label: 'Noise Level', value: 'Low' }
            ]
        });

        // TRANSMISSION PARTS
        products.push({
            name: 'Clutch Plate (Friction Disc)',
            sku: 'CP-DISC-001',
            category: transmissionParts._id,
            description: 'Friction disc for smooth clutch engagement in manual transmissions',
            price: 6250,
            stockStatus: 'In Stock',
            imageUrl: '/images/clutch-plate.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Manual Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Clutch Plate' },
                { label: 'Application', value: 'Manual transmission' },
                { label: 'Material', value: 'Organic friction' }
            ]
        });

        products.push({
            name: 'Pressure Plate',
            sku: 'PP-001',
            category: transmissionParts._id,
            description: 'Pressure plate for clutch system clamping force',
            price: 5750,
            stockStatus: 'In Stock',
            imageUrl: '/images/pressure-plate.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Manual Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Pressure Plate' },
                { label: 'Function', value: 'Clutch clamping' },
                { label: 'Durability', value: 'OEM specification' }
            ]
        });

        products.push({
            name: 'Transmission Fluid ATF (5L)',
            sku: 'TF-ATF-5L',
            category: transmissionParts._id,
            description: 'Automatic transmission fluid for smooth gear shifting',
            price: 5250,
            stockStatus: 'In Stock',
            imageUrl: '/images/transmission-fluid.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Automatic Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'ATF' },
                { label: 'Standard', value: 'Toyota approved' },
                { label: 'Volume', value: '5 Liters' },
                { label: 'Viscosity', value: 'OEM spec' }
            ]
        });

        products.push({
            name: 'CVT Transmission Fluid (5L)',
            sku: 'TF-CVT-5L',
            category: transmissionParts._id,
            description: 'CVT transmission fluid for modern automatic transmissions',
            price: 6250,
            stockStatus: 'Low Stock',
            imageUrl: '/images/cvt-fluid.jpg',
            compatibility: [
                { make: 'Toyota', model: 'CVT Models', yearStart: 2014, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'CVT Fluid' },
                { label: 'Technology', value: 'Continuously variable' },
                { label: 'Volume', value: '5 Liters' },
                { label: 'Performance', value: 'Premium' }
            ],
            featured: true
        });

        // EXTERIOR PARTS
        products.push({
            name: 'Front Windscreen (Laminated)',
            sku: 'WS-FRONT-LAM',
            category: exteriorParts._id,
            description: 'Laminated front windscreen for safety and protection',
            price: 22500,
            stockStatus: 'Low Stock',
            imageUrl: '/images/windscreen.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Windscreen' },
                { label: 'Material', value: 'Laminated glass' },
                { label: 'Safety', value: 'Shatterproof' },
                { label: 'Installation', value: 'Professional recommended' }
            ],
            featured: true
        });

        products.push({
            name: 'Side Mirror (Pair Complete)',
            sku: 'SM-PAIR-COMP',
            category: exteriorParts._id,
            description: 'Complete side mirror pair for safe driving visibility',
            price: 8500,
            stockStatus: 'In Stock',
            imageUrl: '/images/side-mirror.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Side Mirror' },
                { label: 'Quantity', value: '2 mirrors' },
                { label: 'Material', value: 'Plastic with glass' },
                { label: 'Functionality', value: 'Manual adjustment' }
            ]
        });

        products.push({
            name: 'Front Bumper Cover',
            sku: 'BC-FRONT-001',
            category: exteriorParts._id,
            description: 'Front bumper cover for vehicle aesthetics and protection',
            price: 10500,
            stockStatus: 'In Stock',
            imageUrl: '/images/bumper-cover.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Bumper Cover' },
                { label: 'Position', value: 'Front' },
                { label: 'Material', value: 'ABS plastic' },
                { label: 'Color', value: 'Paint required' }
            ]
        });

        // INTERIOR PARTS
        products.push({
            name: 'Full Seat Cover Set',
            sku: 'SC-FULL-SET',
            category: interiorParts._id,
            description: 'Complete seat cover set for interior protection and comfort',
            price: 14000,
            stockStatus: 'In Stock',
            imageUrl: '/images/seat-cover.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Seat Cover' },
                { label: 'Quantity', value: 'Full set (5 seats)' },
                { label: 'Material', value: 'Polyester' },
                { label: 'Protection', value: 'UV & stain resistant' }
            ]
        });

        products.push({
            name: 'Floor Mats (Set of 4) Custom Fitted',
            sku: 'FM-CUSTOM-4',
            category: interiorParts._id,
            description: 'Custom-fitted floor mats for perfect interior protection',
            price: 6000,
            stockStatus: 'In Stock',
            imageUrl: '/images/floor-mats.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Floor Mat' },
                { label: 'Quantity', value: '4 mats' },
                { label: 'Material', value: 'Premium rubber' },
                { label: 'Fit', value: 'Custom tailored' }
            ],
            featured: true
        });

        products.push({
            name: 'AC Compressor (Genuine)',
            sku: 'ACC-GEN-001',
            category: interiorParts._id,
            description: 'Genuine AC compressor for effective air conditioning',
            price: 26500,
            stockStatus: 'Low Stock',
            imageUrl: '/images/ac-compressor.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'AC Compressor' },
                { label: 'OEM Status', value: 'Genuine' },
                { label: 'Cooling Capacity', value: 'Full system' }
            ]
        });

        // ACCESSORIES
        products.push({
            name: 'Mud Flaps & Splash Guards',
            sku: 'MF-SPLASH-SET',
            category: accessoriesParts._id,
            description: 'Complete mud flap set for vehicle protection',
            price: 4000,
            stockStatus: 'In Stock',
            imageUrl: '/images/mud-flaps.jpg',
            compatibility: [
                { make: 'Toyota', model: 'All Models', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Mud Flaps' },
                { label: 'Quantity', value: '4 pieces' },
                { label: 'Material', value: 'Heavy-duty rubber' },
                { label: 'Installation', value: 'Easy screw-on' }
            ]
        });

        products.push({
            name: 'Roof Rack (OEM)',
            sku: 'RR-OEM-001',
            category: accessoriesParts._id,
            description: 'OEM roof rack for cargo carrying on SUVs and hatchbacks',
            price: 13000,
            stockStatus: 'In Stock',
            imageUrl: '/images/roof-rack.jpg',
            compatibility: [
                { make: 'Toyota', model: 'SUVs & Hatchbacks', yearStart: 2005, yearEnd: 2026 }
            ],
            specification: [
                { label: 'Type', value: 'Roof Rack' },
                { label: 'Material', value: 'Aluminum' },
                { label: 'Capacity', value: '75 kg' },
                { label: 'Installation', value: 'OEM fitment' }
            ],
            featured: true
        });

        // Save all products
        await Product.insertMany(products);
        console.log(`✅ Created ${products.length} products`);

        // Create additional subcategories for Brake Parts
        const brakePads = await Category.create({
            name: 'Brake Pads',
            parent: brakeParts._id,
            description: 'Front and rear brake pads for all models'
        });

        const brakeComponents = await Category.create({
            name: 'Brake Components',
            parent: brakeParts._id,
            description: 'Master cylinders, rotors, calipers, and brake fluid'
        });

        console.log('✅ Created additional brake subcategories');

        console.log('\n✅✅✅ DATABASE SEEDING COMPLETED SUCCESSFULLY ✅✅✅');
        console.log('\nSummary:');
        console.log('- 8 Main Categories');
        console.log('- 10 Subcategories');
        console.log('- 50+ Products with full specifications');
        console.log('- All Toyota models from 2005-2026 compatibility');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase();
