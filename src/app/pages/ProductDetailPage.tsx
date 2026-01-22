import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  CheckCircle,
  Box,
  Truck,
  Shield,
  RotateCcw,
  ZoomIn,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from "lucide-react";
import { mockProducts } from "../data/mockData";

// 3D Viewer Component
function ThreeDViewer() {
  const [isRotating, setIsRotating] = useState(true);

  return (
    <div className="relative glass-card rounded-2xl overflow-hidden border-glow-blue">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-blue-500/10" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative p-8 flex flex-col items-center justify-center min-h-[400px]">
        {/* 3D Object Container */}
        <motion.div
          className="relative w-64 h-64 flex items-center justify-center"
          animate={isRotating ? { rotateY: 360 } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        >
          {/* Rotating cube placeholder */}
          <div className="relative w-48 h-48" style={{ transformStyle: "preserve-3d" }}>
            {/* Front face */}
            <div
              className="absolute inset-0 border-2 border-blue-400/50 bg-blue-500/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
              style={{ transform: "translateZ(100px)" }}
            >
              <Box className="w-16 h-16 text-blue-400/80" />
            </div>

            {/* Back face */}
            <div
              className="absolute inset-0 border-2 border-blue-400/30 bg-blue-500/5 backdrop-blur-sm rounded-xl"
              style={{ transform: "translateZ(-100px) rotateY(180deg)" }}
            />

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transform: "translateZ(50px)" }}
            />
          </div>
        </motion.div>

        {/* Control buttons */}
        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-all"
          >
            {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRotating ? "Pause" : "Play"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-all">
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-all">
            <Maximize2 className="w-4 h-4" />
            Fullscreen
          </button>
        </div>

        {/* 3D badge */}
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2">
          <Box className="w-4 h-4" />
          3D View
        </div>

        {/* Helper text */}
        <p className="absolute bottom-4 left-4 text-blue-300/70 text-sm">
          Click and drag to rotate • Scroll to zoom
        </p>
      </div>
    </div>
  );
}

// Image Gallery Component
function ImageGallery({ images, productName }: { images: string[], productName: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => setSelectedIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative glass-card rounded-2xl overflow-hidden cursor-zoom-in group"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={images[selectedIndex]}
            alt={`${productName} ${selectedIndex + 1}`}
            className="w-full h-80 object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Zoom icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative flex-1 rounded-xl overflow-hidden transition-all ${selectedIndex === idx
              ? "ring-2 ring-red-500 ring-offset-2 ring-offset-[#0a0a0f]"
              : "opacity-60 hover:opacity-100"
              }`}
          >
            <img src={img} alt={`${productName} thumbnail ${idx + 1}`} className="w-full h-20 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState<"specs" | "compatibility">("specs");

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <motion.div
          className="text-center glass-card rounded-2xl p-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Box className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Product not found</h2>
          <p className="text-zinc-400 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </motion.div>
      </div>
    );
  }

  // Mock additional images
  const images = [product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Breadcrumb */}
      <div className="gradient-mesh py-6">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Products
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images & 3D */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 3D Viewer */}
            {product.has3D && <ThreeDViewer />}

            {/* Image Gallery */}
            <ImageGallery images={images} productName={product.name} />
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Product Info Card */}
            <div className="glass-card rounded-2xl p-8">
              {/* Category & Name */}
              <div className="mb-6">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">{product.category}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{product.name}</h1>
              </div>

              {/* Price & Stock */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-red-400">${product.price.toFixed(2)}</span>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold ${product.stockStatus === "In Stock"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : product.stockStatus === "Low Stock"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                >
                  {product.stockStatus}
                </span>
              </div>

              {/* Description */}
              <p className="text-zinc-400 mb-6 leading-relaxed">{product.description}</p>

              {/* Part Number */}
              <div className="border-t border-b border-white/10 py-4 mb-6">
                <div className="text-sm text-zinc-500 mb-1">Part Number</div>
                <div className="font-mono text-lg text-white font-semibold">{product.partNumber}</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  to="/contact"
                  className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-3 text-lg"
                >
                  <Phone className="w-5 h-5" />
                  Contact Seller
                </Link>
                <Link
                  to="/contact"
                  className="w-full btn-secondary py-4 rounded-xl flex items-center justify-center gap-3 text-lg"
                >
                  <MessageSquare className="w-5 h-5" />
                  Request Quote
                </Link>
              </div>
            </div>

            {/* Features */}
            <div className="glass-card rounded-2xl p-6">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: CheckCircle, label: "Genuine OEM", color: "green" },
                  { icon: Truck, label: "Fast Shipping", color: "blue" },
                  { icon: Shield, label: "1 Year Warranty", color: "purple" },
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <feature.icon className={`w-6 h-6 mx-auto mb-2 ${feature.color === 'green' ? 'text-green-400' :
                      feature.color === 'blue' ? 'text-blue-400' : 'text-purple-400'
                      }`} />
                    <span className="text-xs text-zinc-400">{feature.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tabs: Specs & Compatibility */}
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Tab Headers */}
              <div className="flex border-b border-white/10">
                {["specs", "compatibility"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as "specs" | "compatibility")}
                    className={`flex-1 py-4 text-center font-semibold transition-colors relative ${activeTab === tab ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                  >
                    {tab === "specs" ? "Specifications" : "Compatibility"}
                    {activeTab === tab && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                        layoutId="activeTab"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "specs" ? (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      {product.specifications.map((spec, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between py-3 border-b border-white/5 last:border-0"
                        >
                          <span className="text-zinc-400">{spec.label}</span>
                          <span className="text-white font-semibold">{spec.value}</span>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="compatibility"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-2"
                    >
                      {product.compatibility.map((vehicle, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                        >
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-white">{vehicle}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
