export interface Product {
  _id: string; // Backend uses _id
  id?: string; // Fallback for some frontend logic
  name: string;
  category: any; // Can be ID or populated object
  description: string;
  price: number;
  imageUrl: string; // Backend uses imageUrl
  image?: string; // Fallback
  model3D?: {
    url: string;
    modelType: 'sketchfab' | 'gltf';
  };
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock" | "On Backorder";
  compatibility: {
    make: string;
    model: string;
    yearStart: number;
    yearEnd: number;
  }[];
  sku: string; // Backend uses sku
  partNumber?: string; // Fallback
  specifications: {
    label: string;
    value: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
  color: string;
}

export const mockProducts: Product[] = [
  {
    _id: "1",
    name: "Premium Brake Pad Set",
    category: "Brakes",
    description: "High-performance ceramic brake pads with superior stopping power and reduced dust",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1750019487267-47568f388dfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFrZSUyMHBhZHMlMjBhdXRvbW90aXZlfGVufDF8fHx8MTc2OTA3ODMxNXww&ixlib=rb-4.1.0&q=80&w=1080",
    model3D: { url: "1", modelType: 'sketchfab' },
    stockStatus: "In Stock",
    compatibility: [
      { make: "Honda", model: "Civic", yearStart: 2018, yearEnd: 2024 },
      { make: "Toyota", model: "Camry", yearStart: 2019, yearEnd: 2024 }
    ],
    sku: "BP-HC-2024-01",
    specifications: [
      { label: "Material", value: "Ceramic Composite" },
      { label: "Temperature Range", value: "-40°C to 650°C" },
      { label: "Thickness", value: "12mm" },
      { label: "Weight", value: "2.5 kg per set" },
    ],
  },
  {
    _id: "2",
    name: "Engine Oil Filter",
    category: "Engine",
    description: "Premium oil filter with 99% filtration efficiency for optimal engine protection",
    price: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1762139258224-236877b2c571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBwYXJ0c3xlbnwxfHx8fDE3NjkwMzQ1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    model3D: { url: "2", modelType: 'sketchfab' },
    stockStatus: "In Stock",
    compatibility: [
      { make: "Ford", model: "F-150", yearStart: 2015, yearEnd: 2024 },
      { make: "Chevrolet", model: "Silverado", yearStart: 2014, yearEnd: 2023 }
    ],
    sku: "OF-FD-2024-03",
    specifications: [
      { label: "Filter Type", value: "Spin-on" },
      { label: "Filtration Rating", value: "25 microns" },
      { label: "Thread Size", value: "3/4-16 UNF" },
      { label: "Height", value: "95mm" },
    ],
  },
  {
    _id: "3",
    name: "Front Suspension Strut",
    category: "Suspension",
    description: "Heavy-duty gas-charged strut for improved ride comfort and handling",
    price: 149.99,
    imageUrl: "https://images.unsplash.com/photo-1760836395763-25ea44ae8145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzdXNwZW5zaW9uJTIwcGFydHN8ZW58MXx8fHwxNzY5MDE0NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    model3D: { url: "3", modelType: 'sketchfab' },
    stockStatus: "Low Stock",
    compatibility: [
      { make: "BMW", model: "3 Series", yearStart: 2012, yearEnd: 2019 },
      { make: "Audi", model: "A4", yearStart: 2016, yearEnd: 2023 }
    ],
    sku: "SS-BM-2019-08",
    specifications: [
      { label: "Type", value: "Gas Monotube" },
      { label: "Mounting", value: "Top Mount" },
      { label: "Travel", value: "120mm" },
      { label: "Load Capacity", value: "850kg" },
    ],
  },
  {
    _id: "4",
    name: "LED Headlight Assembly",
    category: "Electrical",
    description: "High-output LED headlight with adaptive beam technology",
    price: 299.99,
    imageUrl: "https://images.unsplash.com/photo-1561338800-3aca39ac913e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbGVjdHJpY2FsJTIwcGFydHN8ZW58MXx8fHwxNzY5MDc4MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    model3D: { url: "4", modelType: 'sketchfab' },
    stockStatus: "In Stock",
    compatibility: [
      { make: "Mercedes", model: "C-Class", yearStart: 2019, yearEnd: 2024 },
      { make: "Audi", model: "A6", yearStart: 2020, yearEnd: 2024 }
    ],
    sku: "HL-MB-2024-12",
    specifications: [
      { label: "Light Source", value: "LED" },
      { label: "Lumens", value: "3500lm" },
      { label: "Color Temperature", value: "6000K" },
      { label: "Power", value: "45W" },
    ],
  },
  {
    _id: "5",
    name: "Air Filter Element",
    category: "Engine",
    description: "High-flow air filter for improved engine performance and fuel efficiency",
    price: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1763836393379-68f9721966ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwc3BhcmUlMjBwYXJ0c3xlbnwxfHx8fDE3NjkwNzgzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    stockStatus: "In Stock",
    compatibility: [
      { make: "Toyota", model: "RAV4", yearStart: 2019, yearEnd: 2024 },
      { make: "Mazda", model: "CX-5", yearStart: 2020, yearEnd: 2024 }
    ],
    sku: "AF-TY-2024-05",
    specifications: [
      { label: "Material", value: "Cotton Gauze" },
      { label: "Filtration", value: "99.2%" },
      { label: "Dimensions", value: "245 x 185 x 65mm" },
      { label: "Airflow", value: "850 CFM" },
    ],
  },
  {
    _id: "6",
    name: "Clutch Kit Complete",
    category: "Engine",
    description: "Complete clutch assembly with pressure plate, disc, and release bearing",
    price: 279.99,
    imageUrl: "https://images.unsplash.com/photo-1762139258224-236877b2c571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBwYXJ0c3xlbnwxfHx8fDE3NjkwMzQ1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    model3D: { url: "6", modelType: 'sketchfab' },
    stockStatus: "In Stock",
    compatibility: [
      { make: "Volkswagen", model: "Golf", yearStart: 2015, yearEnd: 2022 },
      { make: "Audi", model: "A3", yearStart: 2016, yearEnd: 2023 }
    ],
    sku: "CK-VW-2022-18",
    specifications: [
      { label: "Disc Diameter", value: "240mm" },
      { label: "Spline Count", value: "24" },
      { label: "Torque Capacity", value: "350 Nm" },
      { label: "Kit Includes", value: "Disc, Pressure Plate, Bearing" },
    ],
  },
];

export const categories: Category[] = [
  {
    id: "engine",
    name: "Engine",
    icon: "Engine",
    description: "Performance & reliability",
    image: "https://images.unsplash.com/photo-1762139258224-236877b2c571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBwYXJ0c3xlbnwxfHx8fDE3NjkwMzQ1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "red",
  },
  {
    id: "brakes",
    name: "Brakes",
    icon: "Disc",
    description: "Safety & control",
    image: "https://images.unsplash.com/photo-1750019487267-47568f388dfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFrZSUyMHBhZHMlMjBhdXRvbW90aXZlfGVufDF8fHx8MTc2OTA3ODMxNXww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "blue",
  },
  {
    id: "suspension",
    name: "Suspension",
    icon: "Wrench",
    description: "Comfort & handling",
    image: "https://images.unsplash.com/photo-1760836395763-25ea44ae8145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzdXNwZW5zaW9uJTIwcGFydHN8ZW58MXx8fHwxNzY5MDE0NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "green",
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: "Zap",
    description: "Power & connectivity",
    image: "https://images.unsplash.com/photo-1561338800-3aca39ac913e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbGVjdHJpY2FsJTIwcGFydHN8ZW58MXx8fHwxNzY5MDc4MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "purple",
  },
];

export const makes = ["all", "Honda", "Toyota", "Ford", "BMW", "Mercedes", "Volkswagen"];
