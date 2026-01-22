import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Settings, Box, Disc, Wrench, Zap, BadgeCheck, Headset, RotateCcw, ShieldCheck } from "lucide-react";
import { mockProducts, categories } from "../utils/constants";
import { Button } from "../components/ui/Button";
import { ProductCard } from "../components/product/ProductCard";
import { CategoryCard } from "../components/product/CategoryCard";
import { WhyChooseUsCard } from "../components/product/WhyChooseUsCard";

// Floating 3D shapes component
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-red-500/20 rounded-2xl"
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%)" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 border border-blue-500/20 rounded-full"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)" }}
      />
      <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full bg-red-500/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
    </div>
  );
}

// Animated particles
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const featuredProducts = mockProducts.slice(0, 3);

  const features = [
    { icon: BadgeCheck, title: "Genuine Parts", description: "100% authentic OEM and aftermarket parts from trusted manufacturers.", color: "red" },
    { icon: Box, title: "3D Part Preview", description: "Interactive 3D models help you verify compatibility before purchase.", color: "blue" },
    { icon: Headset, title: "Expert Support", description: "Professional technicians ready to help you find the perfect parts.", color: "green" },
  ];

  const categoryIcons: Record<string, any> = {
    "Engine": Settings,
    "Brakes": Disc,
    "Suspension": Wrench,
    "Electrical": Zap,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden gradient-mesh">
        <FloatingShapes />
        <Particles />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Find the Right</span><br />
                <span className="text-gradient-red">Auto Parts</span><br />
                <span className="text-white">with 3D Precision</span>
              </motion.h1>

              <p className="text-xl text-zinc-400 mb-8 max-w-lg">
                Premium quality parts with advanced 3D visualization. Compatible parts guaranteed, expert support included.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button variant="auto-primary" size="lg" className="px-8 h-14">
                    Browse Parts
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="auto-secondary" size="lg" className="px-8 h-14">Request Quote</Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 mt-12">
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <ShieldCheck className="w-5 h-5 text-green-500" /> Genuine Parts
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Box className="w-5 h-5 text-blue-500" /> 3D Preview
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <RotateCcw className="w-5 h-5 text-red-500" /> Easy Returns
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hidden lg:flex justify-center items-center relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
                <div className="relative glass-card rounded-3xl p-8 border border-white/10">
                  <motion.div animate={{ rotateY: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                    <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-red-500/10 to-blue-500/10 border border-white/10 flex items-center justify-center">
                      <Box className="w-32 h-32 text-white/40" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose <span className="text-gradient-red">AutoParts Pro</span></h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Industry-leading quality and innovation in automotive parts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <WhyChooseUsCard key={idx} feature={feature} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop by Category</h2>
            <p className="text-zinc-400 text-lg">Browse our extensive collection of auto parts</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, idx) => (
              <CategoryCard
                key={category.id}
                category={{
                  ...category,
                  icon: categoryIcons[category.name] || Box,
                  count: Math.floor(Math.random() * 200) + 50 // Mock count
                }}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Featured Products</h2>
              <p className="text-zinc-400">Our most popular auto parts</p>
            </div>
            <Link to="/products">
              <Button variant="auto-outline" className="hidden md:flex">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/20 rounded-full blur-3xl" />
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Need Help Finding the Right Part?</h2>
          <p className="text-xl text-red-100 mb-8">Expert team assistance for technical advice</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-red-600 hover:bg-neutral-100 rounded-xl h-14 px-8 font-bold">Request a Quote</Button>
            </Link>
            <Link to="/products">
              <Button variant="auto-secondary" size="lg" className="bg-transparent border-white/30 text-white hover:bg-white/10 rounded-xl h-14 px-8 font-bold border-2">Browse Parts</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
