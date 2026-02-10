import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, LayoutGrid, Grid3X3, Box, Loader2, AlertCircle, Database, FilterX } from "lucide-react";
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Inventory Distribution</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-black text-white uppercase tracking-tighter font-heading"
            >
              Component <span className="text-primary">Catalog</span>
            </motion.h1>
            <p className="text-zinc-500 font-medium mt-2 flex items-center gap-2">
              <Database className="w-3.5 h-3.5" />
              Accessing {total} registered high-performance units
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-1.5 rounded-2xl border border-white/5">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${viewMode === "grid" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <LayoutGrid className="w-4 h-4" />
              Grid Stage
            </button>
            <button
              onClick={() => setViewMode("compact")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${viewMode === "compact" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <Grid3X3 className="w-4 h-4" />
              Matrix View
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
          {/* Sidebar / Filters */}
          <aside className="lg:col-span-3 space-y-8">
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
            <div className="relative mb-12 group">
              <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Query part nomenclature, serial IDs or manufacturer specifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-16 h-16 bg-white/2 border-white/5 rounded-2xl text-lg font-medium focus-visible:bg-white/5 placeholder:text-zinc-700"
                />
              </div>
            </div>

            {/* Catalog Grid Stage */}
            <div className="min-h-[600px] relative">
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
                  <div className="relative mb-8">
                    <Loader2 className="w-16 h-16 animate-spin text-primary opacity-20" />
                    <Box className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.4em]">Calibrating Data Streams</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest mt-4 text-zinc-700 italic">Syncing with primary OEM inventory servers...</p>
                </div>
              ) : error ? (
                <div className="glass-stage rounded-[3rem] p-24 text-center industrial-border border-primary/20">
                  <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <AlertCircle className="w-10 h-10 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter font-heading">Protocol Interruption</h3>
                  <p className="text-zinc-500 mb-10 max-w-sm mx-auto font-medium">{error}</p>
                  <Button variant="industrial" onClick={handleFetch} className="h-14 px-10">Re-initialize Connection</Button>
                </div>
              ) : products.length > 0 ? (
                <motion.div
                  layout
                  className={`grid gap-10 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}
                >
                  <AnimatePresence mode="popLayout">
                    {products.map((product: Product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="glass-stage rounded-[3rem] p-24 text-center industrial-border">
                  <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <FilterX className="w-10 h-10 text-zinc-700" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter font-heading">Zero Matches Found</h3>
                  <p className="text-zinc-500 mb-10 max-w-sm mx-auto font-medium">No components currently match the specified filter matrix. Adjust your parameters to continue.</p>
                  <Button variant="outline" onClick={clearFilters} className="h-14 px-10">Reset Filter Matrix</Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

