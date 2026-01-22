import { motion } from "motion/react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Filter, X, ChevronDown, Check } from "lucide-react";
import * as Separator from "@radix-ui/react-separator";

interface FilterProps {
    categories: any[];
    makes: string[];
    selectedCategory: string;
    selectedMake: string;
    onCategoryChange: (id: string) => void;
    onMakeChange: (make: string) => void;
    onClear: () => void;
}

export function ProductFilterPanel({
    categories,
    makes,
    selectedCategory,
    selectedMake,
    onCategoryChange,
    onMakeChange,
    onClear
}: FilterProps) {
    return (
        <div className="glass-card rounded-2xl p-6 sticky top-24">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-red-500" />
                    <h2 className="text-lg font-bold text-white uppercase tracking-wider">Filters</h2>
                </div>
                {(selectedCategory !== "all" || selectedMake !== "all") && (
                    <button
                        onClick={onClear}
                        className="text-xs text-zinc-500 hover:text-red-500 transition-colors flex items-center gap-1"
                    >
                        <X className="w-3 h-3" />
                        Clear All
                    </button>
                )}
            </div>

            {/* Category Section */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
                    Vehicle Category
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                </h3>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => onCategoryChange(cat.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${selectedCategory === cat.id
                                    ? "bg-red-500/10 text-white border border-red-500/20"
                                    : "text-zinc-400 hover:bg-white/5"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <cat.icon className={`w-4 h-4 ${selectedCategory === cat.id ? "text-red-500" : "text-zinc-500"}`} />
                                <span className="text-sm font-medium">{cat.name}</span>
                            </div>
                            {selectedCategory === cat.id && <Check className="w-4 h-4 text-red-500" />}
                        </button>
                    ))}
                </div>
            </div>

            <Separator.Root className="h-px bg-white/5 mb-8" />

            {/* Vehicle Make Section */}
            <div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center justify-between">
                    Vehicle Brand
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                </h3>
                <div className="flex flex-wrap gap-2">
                    {makes.map((make) => (
                        <button
                            key={make}
                            onClick={() => onMakeChange(make)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${selectedMake === make
                                    ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                                    : "bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/5"
                                }`}
                        >
                            {make === "all" ? "All Brands" : make}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
