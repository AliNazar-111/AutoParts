import { motion } from "motion/react";
import { Badge } from "../ui/Badge";
import { Filter, X, ChevronDown, Check, Aperture, Settings } from "lucide-react";
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

export function ProductFilters({
    categories,
    makes,
    selectedCategory,
    selectedMake,
    onCategoryChange,
    onMakeChange,
    onClear
}: FilterProps) {
    return (
        <div className="space-y-10 p-4">
            {/* Control Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                        <Filter className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="text-xs font-black text-white uppercase tracking-[0.3em] font-heading">Parameters</h2>
                </div>
                {(selectedCategory !== "all" || selectedMake !== "all") && (
                    <button
                        onClick={onClear}
                        className="text-[10px] text-zinc-600 hover:text-primary transition-colors flex items-center gap-2 font-bold uppercase tracking-widest"
                    >
                        <X className="w-3.5 h-3.5" />
                        Reset
                    </button>
                )}
            </div>

            {/* Taxonomy Section */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <Aperture className="w-3.5 h-3.5 text-zinc-500" />
                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Vehicle Taxonomy</h3>
                </div>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => onCategoryChange(cat.id)}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${selectedCategory === cat.id
                                ? "bg-primary/20 text-white border border-primary/30 shadow-[0_0_20px_rgba(227,30,36,0.1)]"
                                : "text-zinc-500 hover:bg-white/5 border border-transparent"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <cat.icon className={`w-4 h-4 transition-colors ${selectedCategory === cat.id ? "text-primary" : "text-zinc-600 group-hover:text-zinc-400"}`} />
                                <span className="text-xs font-bold uppercase tracking-widest">{cat.name}</span>
                            </div>
                            {selectedCategory === cat.id && (
                                <motion.div layoutId="active-cat-marker">
                                    <Check className="w-4 h-4 text-primary" />
                                </motion.div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <Separator.Root className="h-px bg-white/5" />

            {/* Brand Matrix Section */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <Settings className="w-3.5 h-3.5 text-zinc-500" />
                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Brand Matrix</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                    {makes.map((make) => (
                        <button
                            key={make}
                            onClick={() => onMakeChange(make)}
                            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 border ${selectedMake === make
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                : "bg-white/5 text-zinc-500 hover:text-zinc-300 hover:bg-white/10 border-white/5"
                                }`}
                        >
                            {make === "all" ? "Full-Spec" : make}
                        </button>
                    ))}
                </div>
            </div>

            {/* Technical Metadata */}
            <div className="pt-10 border-t border-white/5">
                <div className="glass-stage p-4 rounded-2xl border border-white/5 opacity-50">
                    <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">
                        Filters are applied in real-time. Serialized inventory matches are verified against OEM databases.
                    </p>
                </div>
            </div>
        </div>
    );
}
