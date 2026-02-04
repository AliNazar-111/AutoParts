export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  has3D: boolean;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  compatibility: string[];
  partNumber: string;
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
    id: "1",
    name: "Premium Brake Pad Set",
    category: "Brakes",
    description: "High-performance ceramic brake pads with superior stopping power and reduced dust",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1750019487267-47568f388dfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFrZSUyMHBhZHMlMjBhdXRvbW90aXZlfGVufDF8fHx8MTc2OTA3ODMxNXww&ixlib=rb-4.1.0&q=80&w=1080",
    has3D: true,
    stockStatus: "In Stock",
    compatibility: ["Honda Civic 2018-2024", "Honda Accord 2018-2023", "Toyota Camry 2019-2024"],
    partNumber: "BP-HC-2024-01",
    specifications: [
      { label: "Material", value: "Ceramic Composite" },
      { label: "Temperature Range", value: "-40°C to 650°C" },
      { label: "Thickness", value: "12mm" },
      { label: "Weight", value: "2.5 kg per set" },
    ],
  },
  {
    id: "2",
    name: "Engine Oil Filter",
    category: "Engine",
    description: "Premium oil filter with 99% filtration efficiency for optimal engine protection",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1762139258224-236877b2c571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBwYXJ0c3xlbnwxfHx8fDE3NjkwMzQ1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    has3D: true,
    stockStatus: "In Stock",
    compatibility: ["Ford F-150 2015-2024", "Chevrolet Silverado 2014-2023", "Ram 1500 2016-2024"],
    partNumber: "OF-FD-2024-03",
    specifications: [
      { label: "Filter Type", value: "Spin-on" },
      { label: "Filtration Rating", value: "25 microns" },
      { label: "Thread Size", value: "3/4-16 UNF" },
      { label: "Height", value: "95mm" },
    ],
  },
  {
    id: "3",
    name: "Front Suspension Strut",
    category: "Suspension",
    description: "Heavy-duty gas-charged strut for improved ride comfort and handling",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1760836395763-25ea44ae8145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzdXNwZW5zaW9uJTIwcGFydHN8ZW58MXx8fHwxNzY5MDE0NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    has3D: true,
    stockStatus: "Low Stock",
    compatibility: ["BMW 3 Series 2012-2019", "BMW 4 Series 2014-2020"],
    partNumber: "SS-BM-2019-08",
    specifications: [
      { label: "Type", value: "Gas Monotube" },
      { label: "Mounting", value: "Top Mount" },
      { label: "Travel", value: "120mm" },
      { label: "Load Capacity", value: "850kg" },
    ],
  },
  {
    id: "4",
    name: "LED Headlight Assembly",
    category: "Electrical",
    description: "High-output LED headlight with adaptive beam technology",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1561338800-3aca39ac913e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbGVjdHJpY2FsJTIwcGFydHN8ZW58MXx8fHwxNzY5MDc4MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    has3D: true,
    stockStatus: "In Stock",
    compatibility: ["Mercedes C-Class 2019-2024", "Mercedes E-Class 2020-2024"],
    partNumber: "HL-MB-2024-12",
    specifications: [
      { label: "Light Source", value: "LED" },
      { label: "Lumens", value: "3500lm" },
      { label: "Color Temperature", value: "6000K" },
      { label: "Power", value: "45W" },
    ],
  },
  {
    id: "5",
    name: "Air Filter Element",
    category: "Engine",
    description: "High-flow air filter for improved engine performance and fuel efficiency",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1763836393379-68f9721966ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwc3BhcmUlMjBwYXJ0c3xlbnwxfHx8fDE3NjkwNzgzMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    has3D: false,
    stockStatus: "In Stock",
    compatibility: ["Toyota RAV4 2019-2024", "Toyota Highlander 2020-2024"],
    partNumber: "AF-TY-2024-05",
    specifications: [
      { label: "Material", value: "Cotton Gauze" },
      { label: "Filtration", value: "99.2%" },
      { label: "Dimensions", value: "245 x 185 x 65mm" },
      { label: "Airflow", value: "850 CFM" },
    ],
  },
  {
    id: "6",
    name: "Clutch Kit Complete",
    category: "Engine",
    description: "Complete clutch assembly with pressure plate, disc, and release bearing",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1762139258224-236877b2c571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBlbmdpbmUlMjBwYXJ0c3xlbnwxfHx8fDE3NjkwMzQ1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    has3D: true,
    stockStatus: "In Stock",
    compatibility: ["Volkswagen Golf 2015-2022", "Audi A3 2016-2023"],
    partNumber: "CK-VW-2022-18",
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
