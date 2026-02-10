import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Settings, Box, Disc, Wrench, Zap, BadgeCheck, Headset, RotateCcw, ShieldCheck, Cpu } from "lucide-react";
import { mockProducts, categories } from "../utils/constants";
import { Button } from "../components/ui/Button";
import { ProductCard } from "../components/product/ProductCard";
import { CategoryCard } from "../components/product/CategoryCard";
import { WhyChooseUsCard } from "../components/product/WhyChooseUsCard";

// Industrial Grid Background
function IndustrialGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-graphite-950 via-transparent to-graphite-950" />
    </div>
  );
}

// Scanning Beam Animation
function ScanningBeam() {
  return (
    <motion.div
      className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-20 opacity-30"
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    />
  );
}

export default function Home() {
  const featuredProducts = mockProducts.slice(0, 3);

  const features = [
    { icon: BadgeCheck, title: "OEM Certified", description: "100% authentic industrial-grade components from primary manufacturers.", color: "red" },
    { icon: Box, title: "Precision 3D", description: "High-fidelity digital twins for absolute compatibility verification.", color: "blue" },
    { icon: Headset, title: "Technical Liaison", description: "Engineering-led support for complex automotive systems integration.", color: "green" },
  ];

  const categoryIcons: Record<string, any> = {
    "Engine": Settings,
    "Brakes": Disc,
    "Suspension": Wrench,
    "Electrical": Zap,
  };

  return (
    <div className="min-h-screen bg-graphite-950 text-foreground">
      {/* Precision Hero Stage */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden border-b border-white/5">
        <IndustrialGrid />
        <ScanningBeam />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,var(--primary-glow)_0%,transparent_70%)] opacity-20 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Systems Integration v4.0 Active</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] font-heading uppercase tracking-tighter">
                <span className="text-white block">Engineered</span>
                <span className="text-primary block">Excellence</span>
                <span className="text-white/40 block text-4xl md:text-5xl mt-4">In Every Component.</span>
              </h1>

              <p className="text-lg text-zinc-500 mb-10 max-w-lg font-medium leading-relaxed">
                The enterprise standard for high-performance automotive inventory. Precision visualization and verified logistics for professionals.
              </p>

              <div className="flex flex-wrap gap-6">
                <Link to="/products">
                  <Button variant="default" size="lg" className="h-16 px-10">
                    Explore Inventory
                    <ArrowRight className="w-5 h-5 ml-3" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="h-16 px-10">
                    Technical Inquiry
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-white/5">
                {[
                  { label: "Inventory Items", value: "25k+" },
                  { label: "Accuracy Rate", value: "99.9%" },
                  { label: "Global Delivery", value: "24h" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-white font-heading">{stat.value}</div>
                    <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="hidden lg:block relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <div className="relative z-10 p-4 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-premium group">
                <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-1000" />
                <div className="relative aspect-square rounded-[2rem] overflow-hidden industrial-border overflow-hidden">
                  <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" src="https://i.ytimg.com/vi/zkkNLx9I6Vo/maxresdefault.jpg" alt="Precision Component Visualization" />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-graphite-950/90 to-transparent">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/20 backdrop-blur-xl border border-primary/30 flex items-center justify-center text-primary">
                        <Box className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-white font-black uppercase tracking-widest text-xs">Dynamic Twin</p>
                        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Real-time Geometry Analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Taxonomy Segment */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter font-heading">
                Operational <span className="text-primary">Segments</span>
              </h2>
              <p className="text-zinc-500 font-medium text-lg leading-relaxed">
                Navigate our precision-categorized inventory optimized for enterprise procurement workflows.
              </p>
            </div>
            <Link to="/products" className="hidden md:block">
              <Button variant="link" className="group">
                View Full Taxonomy <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, idx) => (
              <CategoryCard
                key={category.id}
                category={{
                  ...category,
                  icon: categoryIcons[category.name] || Box,
                  count: Math.floor(Math.random() * 500) + 1200
                }}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Core Systems Trust Section */}
      <section className="py-32 bg-graphite-900/30 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter font-heading">Why Professionals <span className="text-primary">Choose Us</span></h2>
            <p className="text-zinc-500 text-lg font-medium max-w-2xl mx-auto">Providing the technical foundation for the global automotive maintenance industry.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, idx) => (
              <WhyChooseUsCard key={idx} feature={feature} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* High-Velocity Inventory */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter font-heading">Prime <span className="text-primary">Inventory</span></h2>
              <p className="text-zinc-500 font-medium">Most requested industrial components this quarter.</p>
            </div>
            <Link to="/products">
              <Button variant="industrial" className="hidden md:flex">Full Catalog Access</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Global Deployment CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 grayscale opacity-20 bg-[url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 mb-6 uppercase tracking-tighter font-heading leading-none">Ready for Scaled Procurement?</h2>
          <p className="text-xl text-primary-foreground/80 mb-12 font-medium">Our technical advisors are ready to assist with bulk deployments and architectural consultation.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-zinc-100 h-16 px-12 text-sm font-black shadow-2xl">
                Liaison Engagement
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="secondary" className="bg-graphite-950/20 backdrop-blur-xl border-white/20 text-white hover:bg-white/10 h-16 px-12 text-sm font-black">
                System Review
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
