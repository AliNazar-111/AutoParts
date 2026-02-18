export interface PartMetadata {
    id: string;
    name: string;
    category: string;
    status: 'operational' | 'optimized' | 'maintenance' | 'critical';
    specs: Record<string, string>;
    compatibility: string[];
}

// Technical map of 3D mesh names to part metadata
// This registry can be expanded per vehicle model
export const MESH_TO_PART_MAP: Record<string, PartMetadata> = {
    // Example mappings for a standard car GLB
    "Chassis": {
        id: "CH-001",
        name: "Main Chassis Frame",
        category: "Structural",
        status: "optimized",
        specs: { "Material": "High-Tensile Steel", "Weight": "450kg", "Integrity": "99.2%" },
        compatibility: ["Universal Sedan Platform"]
    },
    "Brake_Disc_FL": {
        id: "BK-202",
        name: "Ventilated Disc Brake (Front Left)",
        category: "Braking System",
        status: "operational",
        specs: { "Material": "Carbon-Ceramic", "Diameter": "380mm", "Temp": "85°C" },
        compatibility: ["High-Performance Series", "Industrial Transit"]
    },
    "Wheel_FL": {
        id: "WH-505",
        name: "Alloy Wheel (Front Left)",
        category: "Drivetrain",
        status: "optimized",
        specs: { "Material": "Forged Aluminum", "Size": "20 inch", "Pressure": "32 PSI" },
        compatibility: ["Sport-Line", "Luxury-Spec"]
    },
    "Engine_Block": {
        id: "EN-999",
        name: "V6 Performance Engine Block",
        category: "Powertrain",
        status: "operational",
        specs: { "Displacement": "3.5L", "Horsepower": "450 HP", "Coolant": "Standard" },
        compatibility: ["V-Series Models"]
    }
};

/**
 * Resolves a 3D mesh name to technical part metadata.
 * Implements graceful fallback for unmapped components.
 */
export function resolvePartData(meshName: string): PartMetadata {
    // Direct lookup
    if (MESH_TO_PART_MAP[meshName]) {
        return MESH_TO_PART_MAP[meshName];
    }

    // Fuzzy matching for similar part names (e.g., Brake_Disc_FR matching Brake_Disc_FL pattern)
    const baseName = meshName.replace(/_[FLR].*$/, "");
    const matchingKey = Object.keys(MESH_TO_PART_MAP).find(key => key.startsWith(baseName));

    if (matchingKey) {
        const template = MESH_TO_PART_MAP[matchingKey];
        return {
            ...template,
            id: `GEN-${meshName.toUpperCase()}`,
            name: `${template.name.replace(/\(.*\)/, "").trim()} (${meshName.split('_').pop()})`,
        };
    }

    // Default Fallback for unmapped components
    return {
        id: `SYS-${meshName.toUpperCase()}`,
        name: meshName.replace(/_/g, " ").replace(/([A-Z])/g, ' $1').trim(),
        category: "Internal System",
        status: "operational",
        specs: { "Detection": "Automatic", "System": "Diagnostic Hub" },
        compatibility: ["System Default"]
    };
}
