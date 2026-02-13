import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, LayoutGrid, Grid3X3, Box, Loader2, AlertCircle, Database, FilterX, Filter, X } from "lucide-react";
import { categories, Product, makes } from "@/utils/constants";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters } from "@/components/product/ProductFilters";
import { useProducts } from "@/hooks/useProducts";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [selectedMake, setSelectedMake] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { products, total, loading, error, fetchProducts } = useProducts();

  const handleFetch = useCallback(() => {
    fetchProducts({
      category: selectedCategory === "all" ? undefined : selectedCategory,
      make: selectedMake === "all" ? undefined : selectedMake,
      search: searchQuery || undefined,
      limit: 12
    });
  }, [selectedCategory, selectedMake, searchQuery, fetchProducts]);

  useEffect(() => {
    const timer = setTimeout(handleFetch, 300);
    return () => clearTimeout(timer);
  }, [handleFetch]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedMake("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-graphite-950 pt-32 pb-24">
      {/* Background Staging Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[radial-gradient(circle_at_top_right,var(--primary-glow)_0%,transparent_70%)] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Staging */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Inventory Distribution</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-5xl lg:text-5xl font-black text-white uppercase tracking-tighter font-heading"
            >
              Component <span className="text-primary">Catalog</span>
            </motion.h1>
            <p className="text-zinc-500 font-medium mt-3 flex items-center gap-2 text-sm md:text-base">
              <Database className="w-4 h-4 text-primary/50" />
              Accessing {total} registered high-performance units
            </p>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 bg-white/5 p-1.5 rounded-2xl border border-white/5 w-full md:w-auto overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest bg-white/5 text-zinc-300 hover:bg-white/10 transition-all shrink-0 border border-white/5"
              >
                <Filter className="w-4 h-4 text-primary" />
                Parameters
              </button>
              <div className="h-6 w-px bg-white/5 lg:hidden" />
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shrink-0 ${viewMode === "grid" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Grid Stage</span>
                <span className="sm:hidden">Grid</span>
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shrink-0 ${viewMode === "compact" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                <Grid3X3 className="w-4 h-4" />
                <span className="hidden sm:inline">Matrix View</span>
                <span className="sm:hidden">Matrix</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-12">
          {/* Sidebar / Filters - Responsive Desktop Only */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 h-fit sticky top-32">
            <div className="glass-stage rounded-3xl p-2 border border-white/5">
              <ProductFilters
                categories={categories.map(c => ({ ...c, icon: Box }))}
                makes={makes}
                selectedCategory={selectedCategory}
                selectedMake={selectedMake}
                onCategoryChange={setSelectedCategory}
                onMakeChange={setSelectedMake}
                onClear={clearFilters}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9">
            {/* Extended Search Interface */}
            <div className="relative mb-8 md:mb-12 group">
              <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Part nomenclature or serial IDs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-16 h-14 md:h-16 bg-white/2 border-white/5 rounded-2xl text-base md:text-lg font-medium focus-visible:bg-white/5 placeholder:text-zinc-700"
                />
              </div>
            </div>

            {/* Mobile Filter Indicator & Dynamic Toggles */}
            <div className="lg:hidden mb-8 flex flex-col gap-4">
              {(selectedCategory !== 'all' || selectedMake !== 'all') && (
                <div className="glass-stage rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase text-zinc-600">Active Stage</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory !== 'all' && (
                        <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg text-primary text-[9px] font-black uppercase">
                          {selectedCategory}
                        </div>
                      )}
                      {selectedMake !== 'all' && (
                        <div className="px-3 py-1 bg-zinc-800 border border-white/10 rounded-lg text-zinc-300 text-[9px] font-black uppercase">
                          {selectedMake}
                        </div>
                      )}
                    </div>
                  </div>
                  <button onClick={clearFilters} className="text-zinc-600 hover:text-primary transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Catalog Grid Stage */}
            <div className="min-h-[400px] md:min-h-[600px] relative">
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 py-20">
                  <div className="relative mb-8">
                    <Loader2 className="w-12 h-12 md:w-16 md:h-16 animate-spin text-primary opacity-20" />
                    <Box className="absolute inset-0 m-auto w-5 h-5 md:w-6 md:h-6 text-primary animate-pulse" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.4em]">Calibrating Data Streams</p>
                </div>
              ) : error ? (
                <div className="glass-stage rounded-[2rem] md:rounded-[3rem] p-12 md:p-24 text-center industrial-border border-primary/20">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-primary/10 rounded-2xl md:rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <AlertCircle className="w-8 h-8 md:w-10 md:h-10 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tighter font-heading">Protocol Interruption</h3>
                  <p className="text-zinc-500 mb-8 md:mb-10 max-w-sm mx-auto font-medium text-sm">{error}</p>
                  <Button variant="industrial" onClick={handleFetch} className="h-14 px-10 w-full sm:w-auto">Re-initialize Connection</Button>
                </div>
              ) : products.length > 0 ? (
                <motion.div
                  layout
                  className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"}`}
                >
                  <AnimatePresence mode="popLayout">
                    {products.map((product: Product) => (
                      <ProductCard key={product._id || product.id} product={product as any} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="glass-stage rounded-[2rem] md:rounded-[3rem] p-12 md:p-24 text-center industrial-border">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-2xl md:rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <FilterX className="w-8 h-8 md:w-10 md:h-10 text-zinc-700" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tighter font-heading">Zero Matches Found</h3>
                  <p className="text-zinc-500 mb-8 md:mb-10 max-w-sm mx-auto font-medium text-sm">No components currently match the specified filter matrix.</p>
                  <Button variant="outline" onClick={clearFilters} className="h-14 px-10 w-full sm:w-auto">Reset Filter Matrix</Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer Orchestration */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-graphite-950/80 backdrop-blur-md z-[100] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-graphite-950 z-[110] lg:hidden border-l border-white/10 p-6 pt-24 overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Filter className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter">Parameters</h2>
                </div>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <ProductFilters
                categories={categories.map(c => ({ ...c, icon: Box }))}
                makes={makes}
                selectedCategory={selectedCategory}
                selectedMake={selectedMake}
                onCategoryChange={(id) => {
                  setSelectedCategory(id);
                  // Optional: Keep open for multi-selection or close on click
                }}
                onMakeChange={(make) => {
                  setSelectedMake(make);
                }}
                onClear={clearFilters}
              />

              <div className="mt-8 pt-8 border-t border-white/5">
                <Button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-xs"
                >
                  Sync Grid Matrix
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

