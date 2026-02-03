import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, LayoutGrid, Grid3X3, Settings, Disc, Wrench, Zap, Box, Loader2, AlertCircle } from "lucide-react";
import { categories, Product } from "@/utils/constants";
import { productService } from "@/services/productService";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters } from "@/components/product/ProductFilters";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [selectedMake, setSelectedMake] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const categoryIcons: Record<string, any> = {
    "Engine": Settings,
    "Brakes": Disc,
    "Suspension": Wrench,
    "Electrical": Zap,
  };

  // Extract all makes from categories for filtering? 
  // In a real app, this would come from an API. For now, hardcoding common makes or keep it flexible.
  const makes = ["all", "Honda", "Toyota", "Ford", "BMW", "Mercedes", "Volkswagen"];

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getAll({
        category: selectedCategory,
        make: selectedMake,
        search: searchQuery,
        limit: 12
      });
      setProducts(response.data.products);
      setTotal(response.total);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedMake, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedMake("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold text-white mb-2"
          >
            Auto Parts <span className="text-gradient-red">Catalog</span>
          </motion.h1>
          <p className="text-zinc-500">Showing {total} premium components</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <ProductFilters
              categories={categories.map(c => ({ ...c, icon: categoryIcons[c.name] || Box }))}
              makes={makes}
              selectedCategory={selectedCategory}
              selectedMake={selectedMake}
              onCategoryChange={setSelectedCategory}
              onMakeChange={setSelectedMake}
              onClear={clearFilters}
            />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            {/* Search and View Toggle */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <Input
                  placeholder="Search by part name, brand or serial..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14"
                />
              </div>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg transition-all ${viewMode === "grid" ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "text-zinc-500"}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={`p-3 rounded-lg transition-all ${viewMode === "compact" ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "text-zinc-500"}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-40 text-zinc-500">
                <Loader2 className="w-10 h-10 animate-spin mb-4 text-red-500" />
                <p className="text-lg">Tuning the engines...</p>
              </div>
            ) : error ? (
              <div className="glass-card rounded-3xl p-20 text-center border-red-500/20">
                <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Something went wrong</h3>
                <p className="text-zinc-500 mb-8">{error}</p>
                <Button variant="auto-outline" onClick={() => fetchProducts()}>Try Again</Button>
              </div>
            ) : products.length > 0 ? (
              <motion.div
                layout
                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}
              >
                <AnimatePresence>
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="glass-card rounded-3xl p-20 text-center">
                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-zinc-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No Parts Found</h3>
                <p className="text-zinc-500 mb-8">Try adjusting your filters or search terms.</p>
                <Button variant="auto-outline" onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

