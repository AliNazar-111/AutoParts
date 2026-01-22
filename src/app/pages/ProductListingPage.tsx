import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Filter, X, Search, Box, SlidersHorizontal, Grid3X3, LayoutGrid } from "lucide-react";
import { mockProducts } from "../data/mockData";

export default function ProductListingPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [selectedMake, setSelectedMake] = useState("all");
  const [selectedModel, setSelectedModel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");

  // Extract unique values for filters
  const categories = ["all", ...new Set(mockProducts.map((p) => p.category))];
  const makes = ["all", ...new Set(mockProducts.flatMap((p) => p.compatibility.map((c) => c.split(" ")[0])))];

  // Filter products
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesMake = selectedMake === "all" || product.compatibility.some((c) => c.toLowerCase().includes(selectedMake.toLowerCase()));
      const matchesSearch = searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesMake && matchesSearch;
    });
  }, [selectedCategory, selectedMake, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedMake("all");
    setSelectedModel("all");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedMake !== "all" || searchQuery !== "";

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header Section */}
      <div className="gradient-mesh py-16 relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-10 right-20 w-32 h-32 border border-red-500/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 left-20 w-24 h-24 border border-blue-500/10 rounded-xl rotate-45"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Auto Parts <span className="text-gradient-red">Catalog</span>
            </h1>
            <p className="text-zinc-400 text-lg">
              Showing {filteredProducts.length} of {mockProducts.length} products
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Controls */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search parts by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass-card rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Toggle & View Mode */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-4 rounded-xl transition-all ${showFilters || hasActiveFilters
                  ? "bg-red-500 text-white"
                  : "glass-card text-white hover:bg-white/10"
                  }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
                {hasActiveFilters && (
                  <span className="bg-white text-red-500 text-xs px-2 py-0.5 rounded-full font-semibold">
                    {[selectedCategory !== "all", selectedMake !== "all", searchQuery !== ""].filter(Boolean).length}
                  </span>
                )}
              </button>

              {/* View Mode Toggle */}
              <div className="hidden lg:flex glass-card rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg transition-all ${viewMode === "grid" ? "bg-red-500 text-white" : "text-zinc-400 hover:text-white"
                    }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={`p-3 rounded-lg transition-all ${viewMode === "compact" ? "bg-red-500 text-white" : "text-zinc-400 hover:text-white"
                    }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="glass-card rounded-2xl p-6 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">Category</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                        {categories.map((category) => (
                          <label
                            key={category}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${selectedCategory === category
                              ? "bg-red-500/20 border border-red-500/30"
                              : "bg-white/5 hover:bg-white/10 border border-transparent"
                              }`}
                          >
                            <input
                              type="radio"
                              name="category"
                              value={category}
                              checked={selectedCategory === category}
                              onChange={(e) => setSelectedCategory(e.target.value)}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedCategory === category
                              ? "border-red-500 bg-red-500"
                              : "border-zinc-500"
                              }`}>
                              {selectedCategory === category && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                            <span className="text-sm text-white capitalize">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Vehicle Make Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">Vehicle Make</label>
                      <select
                        value={selectedMake}
                        onChange={(e) => setSelectedMake(e.target.value)}
                        className="w-full px-4 py-3 glass-card rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 cursor-pointer"
                      >
                        {makes.map((make) => (
                          <option key={make} value={make} className="bg-zinc-900">
                            {make === "all" ? "All Makes" : make}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Clear Filters */}
                    <div className="flex items-end">
                      <button
                        onClick={clearFilters}
                        disabled={!hasActiveFilters}
                        className={`w-full py-3 rounded-xl font-semibold transition-all ${hasActiveFilters
                          ? "bg-zinc-800 text-white hover:bg-zinc-700"
                          : "bg-zinc-800/50 text-zinc-500 cursor-not-allowed"
                          }`}
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            className={`grid gap-6 ${viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }`}
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={`/products/${product.id}`}
                    className="group block glass-card rounded-2xl overflow-hidden hover-lift"
                  >
                    <div className={`relative overflow-hidden ${viewMode === "grid" ? "h-56" : "h-40"}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* 3D Badge */}
                      {product.has3D && (
                        <motion.div
                          className="absolute top-3 right-3 bg-blue-500/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Box className="w-3 h-3" />
                          {viewMode === "grid" && "3D"}
                        </motion.div>
                      )}

                      {/* Stock Badge */}
                      <div
                        className={`absolute top-3 left-3 text-white text-xs px-2.5 py-1 rounded-full font-semibold backdrop-blur-sm ${product.stockStatus === "In Stock"
                          ? "bg-green-500/90"
                          : product.stockStatus === "Low Stock"
                            ? "bg-yellow-500/90"
                            : "bg-red-500/90"
                          }`}
                      >
                        {product.stockStatus}
                      </div>
                    </div>

                    <div className={viewMode === "grid" ? "p-5" : "p-4"}>
                      <div className="text-xs text-zinc-500 mb-1.5 uppercase tracking-wider">{product.category}</div>
                      <h3 className={`font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1 ${viewMode === "grid" ? "text-lg mb-2" : "text-sm mb-1"
                        }`}>
                        {product.name}
                      </h3>
                      {viewMode === "grid" && (
                        <p className="text-sm text-zinc-400 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className={`font-bold text-red-400 ${viewMode === "grid" ? "text-xl" : "text-lg"}`}>
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="glass-card rounded-2xl p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-zinc-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
              <p className="text-zinc-400 mb-6">
                No products match your current filters. Try adjusting your search criteria.
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
