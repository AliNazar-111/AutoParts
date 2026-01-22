import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, LayoutGrid, Grid3X3, Settings, Disc, Wrench, Zap, Box } from "lucide-react";
import { mockProducts, categories } from "../data/mockData";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/features/ProductCard";
import { ProductFilterPanel } from "../components/features/ProductFilterPanel";

export default function ProductListingPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [selectedMake, setSelectedMake] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");

  const categoryIcons: Record<string, any> = {
    "Engine": Settings,
    "Brakes": Disc,
    "Suspension": Wrench,
    "Electrical": Zap,
  };

  const makes = ["all", ...new Set(mockProducts.flatMap(p => p.compatibility.map(c => c.split(" ")[0])))];

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
          <p className="text-zinc-500">Showing {filteredProducts.length} premium components</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <ProductFilterPanel
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

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
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

