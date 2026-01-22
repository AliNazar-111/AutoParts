import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Settings, Package, Headset, Box, Disc, Wrench, Zap, BadgeCheck, Sparkles, ShieldCheck, RotateCcw } from "lucide-react";
import { mockProducts, categories } from "../data/mockData";

// Floating 3D shapes component
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-red-500/20 rounded-2xl"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%)" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 border border-blue-500/20 rounded-full"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)" }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-16 h-16 border border-white/10 rotate-45"
        animate={{
          y: [0, -20, 0],
          rotate: [45, 55, 45],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "rgba(255, 255, 255, 0.02)" }}
      />
      <motion.div
        className="absolute bottom-20 right-1/3 w-20 h-20 border border-red-500/10 rounded-xl"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Gradient orbs */}
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
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

// 3D Rotating cube component
function RotatingCube() {
  return (
    <div className="perspective-1000 w-40 h-40">
      <motion.div
        className="relative w-full h-full transform-style-3d"
        animate={{ rotateY: 360, rotateX: 15 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Cube faces */}
        <div className="absolute inset-0 border border-red-500/30 bg-gradient-to-br from-red-500/10 to-transparent backdrop-blur-sm"
          style={{ transform: "translateZ(80px)" }} />
        <div className="absolute inset-0 border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent backdrop-blur-sm"
          style={{ transform: "translateZ(-80px) rotateY(180deg)" }} />
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  const featuredProducts = mockProducts.slice(0, 3);

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
              {/* <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm mb-6"
              >
                <Sparkles className="w-4 h-4" />
                Interactive 3D Part Visualization
              </motion.div> */}

              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-white">Find the Right</span>
                <br />
                <span className="text-gradient-red">Auto Parts</span>
                <br />
                <span className="text-white">with 3D Precision</span>
              </motion.h1>

              <motion.p
                className="text-xl text-zinc-400 mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Premium quality parts with advanced 3D visualization.
                Compatible parts guaranteed, expert support included.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  to="/products"
                  className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4 rounded-xl"
                >
                  Browse Parts
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4 rounded-xl"
                >
                  Request Quote
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                className="flex items-center gap-8 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2 text-zinc-400">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Genuine Parts</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Box className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">3D Preview</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <RotateCcw className="w-5 h-5 text-red-500" />
                  <span className="text-sm">Easy Returns</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero 3D Element */}
            <motion.div
              className="hidden lg:flex justify-center items-center relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full scale-150" />

                {/* Main 3D preview container */}
                <div className="relative glass-card rounded-3xl p-8 border-glow-red">
                  <div className="w-80 h-80 flex items-center justify-center">
                    <motion.div
                      className="relative"
                      animate={{ rotateY: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-red-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center">
                        <Box className="w-24 h-24 text-white/60" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Stats overlay */}
                  <div className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-xl">
                    <div className="text-xs text-zinc-400">Parts Available</div>
                    <div className="text-xl font-bold text-white">10,000+</div>
                  </div>

                  <div className="absolute -top-4 -right-4 glass px-4 py-2 rounded-xl">
                    <div className="text-xs text-zinc-400">3D Models</div>
                    <div className="text-xl font-bold text-blue-400">500+</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="text-gradient-red">AutoParts Pro</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Industry-leading quality and innovation in automotive parts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BadgeCheck,
                title: "Genuine Parts",
                description: "100% authentic OEM and aftermarket parts from trusted manufacturers with warranty coverage",
                color: "red",
                delay: 0.1,
              },
              {
                icon: Box,
                title: "3D Part Preview",
                description: "Interactive 3D models help you verify compatibility and understand part details before purchase",
                color: "blue",
                delay: 0.2,
              },
              {
                icon: Headset,
                title: "Expert Support",
                description: "Professional technicians ready to help you find the perfect parts for your vehicle",
                color: "green",
                delay: 0.3,
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
              >
                <div className="glass-card rounded-2xl p-8 h-full hover-lift cursor-pointer">
                  {/* Glow on hover */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.color === 'red' ? 'bg-red-500/5' :
                    feature.color === 'blue' ? 'bg-blue-500/5' : 'bg-green-500/5'
                    }`} />

                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative ${feature.color === 'red' ? 'bg-red-500/10' :
                    feature.color === 'blue' ? 'bg-blue-500/10' : 'bg-green-500/10'
                    }`}>
                    <feature.icon className={`w-8 h-8 ${feature.color === 'red' ? 'text-red-500' :
                      feature.color === 'blue' ? 'text-blue-500' : 'text-green-500'
                      }`} />

                    {/* Icon glow */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl ${feature.color === 'red' ? 'bg-red-500/20' :
                        feature.color === 'blue' ? 'bg-blue-500/20' : 'bg-green-500/20'
                        }`}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-zinc-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 relative">
        <div className="absolute inset-0 gradient-mesh opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-zinc-400 text-lg">
              Browse our extensive collection of auto parts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, idx) => {
              const IconComponent = category.icon === "Engine" ? Settings :
                category.icon === "Disc" ? Disc :
                  category.icon === "Wrench" ? Wrench : Zap;

              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={`/products?category=${category.name.toLowerCase()}`}
                    className="group relative block overflow-hidden rounded-2xl h-72"
                  >
                    {/* Background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${category.image})`,
                      }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                    {/* Colored overlay on hover */}
                    <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/20 transition-colors duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <motion.div
                        className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/20"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                      <p className="text-sm text-zinc-300 text-center">{category.description}</p>

                      {/* Arrow indicator */}
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <div className="flex items-center gap-2 text-red-400 text-sm font-semibold">
                          <span>Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Border glow */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/30 rounded-2xl transition-colors duration-500" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Featured Products</h2>
              <p className="text-zinc-400">Our most popular auto parts</p>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors group"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="group block glass-card rounded-2xl overflow-hidden hover-lift"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badges */}
                    {product.has3D && (
                      <motion.div
                        className="absolute top-4 right-4 bg-blue-500/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Box className="w-3 h-3" />
                        View in 3D
                      </motion.div>
                    )}
                    <div
                      className={`absolute top-4 left-4 text-white text-xs px-3 py-1.5 rounded-full font-semibold backdrop-blur-sm ${product.stockStatus === "In Stock"
                        ? "bg-green-500/90"
                        : product.stockStatus === "Low Stock"
                          ? "bg-yellow-500/90"
                          : "bg-red-500/90"
                        }`}
                    >
                      {product.stockStatus}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">{product.category}</div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-red-400">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile view all */}
          <motion.div
            className="mt-8 text-center md:hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/products"
              className="btn-primary inline-flex items-center gap-2"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/20 rounded-full blur-3xl" />
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute top-20 right-20 w-20 h-20 border border-white/20 rounded-full"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-40 w-16 h-16 border border-white/20 rounded-xl rotate-45"
            animate={{ y: [0, 20, 0], rotate: [45, 55, 45] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Need Help Finding the Right Part?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Our expert team is ready to assist you with compatibility checks and technical advice
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-red-500 hover:bg-red-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-xl hover:shadow-black/20"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg font-semibold transition-all"
              >
                Browse Parts
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
