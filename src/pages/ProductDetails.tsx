import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  CheckCircle,
  Box,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Product } from "@/utils/constants";
import { productService } from "@/services/productService";
import { ModelViewer } from "@/components/product/ModelViewer";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Button } from "@/components/ui/Button";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"specs" | "compatibility">("specs");
  const [selectedImage, setSelectedImage] = useState(0);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        setLoading(true);
        const response = await productService.getOne(id);
        setProduct(response.data.product);
      } catch (err: any) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-red-500" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <motion.div
          className="text-center glass-card rounded-2xl p-12 border-red-500/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {error ? "Oops!" : "Product not found"}
          </h2>
          <p className="text-zinc-400 mb-6">
            {error || "The product you're looking for doesn't exist."}
          </p>
          <Link to="/products">
            <Button variant="auto-outline">Back to Catalog</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const images = [product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Visuals */}
          <div className="space-y-6">
            <div className="relative group">
              {product.has3D && (
                <motion.button
                  onClick={() => setShow3D(true)}
                  className="absolute top-4 right-4 z-10 bg-red-600 text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 shadow-xl shadow-red-600/20 hover:bg-red-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Box className="w-4 h-4" />
                  VIEW IN 3D
                </motion.button>
              )}

              <AnimatePresence>
                {show3D && (
                  <ModelViewer
                    url={(product as any).model3D?.url || "https://sketchfab.com/models/..."}
                    modelType={(product as any).model3D?.modelType || "sketchfab"}
                    onClose={() => setShow3D(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="glass-card rounded-3xl p-4 space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <ZoomIn className="w-10 h-10 text-white/50" />
                </div>

                {images.length > 1 && (
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
                      className="p-2 bg-black/50 hover:bg-red-600 text-white rounded-full backdrop-blur-md transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
                      className="p-2 bg-black/50 hover:bg-red-600 text-white rounded-full backdrop-blur-md transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx ? "border-red-500 shadow-lg shadow-red-500/20" : "border-transparent opacity-50 hover:opacity-100"}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="space-y-8">
            <ProductInfo product={product} />

            {/* Technical Detail Tabs */}
            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="flex border-b border-white/5">
                {[
                  { id: 'specs', label: 'Specifications' },
                  { id: 'compatibility', label: 'Vehicle Compatibility' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === tab.id ? "text-white bg-white/5" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-4 right-4 h-1 bg-red-500 rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {activeTab === "specs" ? (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4"
                    >
                      {product.specifications.map((spec, idx) => (
                        <div key={idx} className="flex justify-between items-center py-3 border-b border-white/5">
                          <span className="text-zinc-500 text-sm">{spec.label}</span>
                          <span className="text-white font-mono text-sm">{spec.value}</span>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="compatibility"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {product.compatibility.map((vehicle, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                          <span className="text-sm text-white">{vehicle}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

