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
  AlertCircle,
  ShieldCheck,
  Cpu,
  Fingerprint
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
        setError(err.message || "Failed to load industrial data");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-graphite-950 flex flex-col items-center justify-center">
        <div className="relative mb-6">
          <Loader2 className="w-16 h-16 animate-spin text-primary opacity-20" />
          <Cpu className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Syncing Technical Schema</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-graphite-950 flex items-center justify-center p-6">
        <motion.div
          className="text-center glass-stage rounded-[3rem] p-16 border border-primary/20 max-w-lg w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <AlertCircle className="w-10 h-10 text-primary animate-pulse" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter font-heading">
            {error ? "Protocol Failure" : "Data Not Found"}
          </h2>
          <p className="text-zinc-500 mb-10 font-medium leading-relaxed">
            {error || "The requested component resource could not be located in the primary OEM database."}
          </p>
          <Link to="/products">
            <Button variant="industrial" className="h-14 px-10">Return to Inventory</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const displayImage = product.imageUrl || product.image;
  const images = [displayImage, displayImage, displayImage];

  return (
    <div className="min-h-screen bg-graphite-950 pt-32 pb-24 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,var(--primary-glow)_0%,transparent_50%)] opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 text-zinc-600 hover:text-white transition-all group font-bold uppercase tracking-widest text-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-all">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            Catalog Protocol
          </Link>

          <div className="flex items-center gap-4 px-4 py-2 rounded-full border border-white/5 bg-white/2 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Verified Component v2.4.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start">
          {/* Visual Staging Area */}
          <div className="space-y-6 md:space-y-8 lg:sticky lg:top-32">
            <div className="relative group">
              <div className="glass-stage rounded-3xl md:rounded-[2.5rem] p-3 md:p-4 industrial-border overflow-hidden shadow-premium">
                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl md:rounded-[2rem] overflow-hidden bg-graphite-900/50 group/stage">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImage}
                      src={images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-contain p-6 md:p-12 transition-transform duration-700"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                  </AnimatePresence>

                  {/* Digital Overlays */}
                  <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl md:rounded-[2rem]" />
                  <div className="absolute top-4 md:top-6 left-4 md:left-6 flex flex-col gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--ember-glow)] animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  </div>

                  {images.length > 1 && (
                    <div className="absolute inset-x-4 md:inset-x-6 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover/stage:opacity-100 transition-opacity">
                      <Button
                        variant="industrial"
                        size="icon"
                        onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-2xl"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="industrial"
                        size="icon"
                        onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-2xl"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  )}

                  {!!product.model3D && (
                    <motion.button
                      onClick={() => setShow3D(true)}
                      className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-10 bg-primary text-white font-black text-[9px] md:text-[10px] tracking-[0.2em] py-3 md:py-3.5 px-4 md:px-6 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all uppercase"
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Box className="w-4 h-4" />
                      Engage 3D Stage
                    </motion.button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 md:pb-0 no-scrollbar justify-start md:justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all p-2 md:p-3 bg-white/2 shrink-0 ${selectedImage === idx ? "border-primary shadow-lg shadow-primary/10 scale-105" : "border-white/5 opacity-50 hover:opacity-100"}`}
                >
                  <img src={img} className="w-full h-full object-contain" alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>

            <AnimatePresence>
              {show3D && (
                <ModelViewer
                  url={(product as any).model3D?.url || "https://sketchfab.com/models/..."}
                  modelType={(product as any).model3D?.modelType || "sketchfab"}
                  poster={product.image}
                  onClose={() => setShow3D(false)}
                  isModal={true}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Metadata & Technical Staging */}
          <div className="space-y-12">
            <ProductInfo product={product} />

            {/* Technical Parameters Matrix */}
            <div className="glass-stage rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-white/5">
              <div className="flex border-b border-white/5 bg-white/2 overflow-x-auto no-scrollbar">
                {[
                  { id: 'specs', label: 'Tech Specs' },
                  { id: 'compatibility', label: 'Unit Compatibility' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 min-w-[150px] py-5 md:py-6 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab.id ? "text-white bg-white/5" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    <div className="flex items-center justify-center gap-3">
                      {tab.id === 'specs' ? <Fingerprint className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      {tab.label}
                    </div>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 h-[2px] bg-primary rounded-full shadow-[0_0_10px_var(--ember-glow)]"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-10">
                <AnimatePresence mode="wait">
                  {activeTab === "specs" ? (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6"
                    >
                      {(product.specification || product.specifications || []).map((spec: any, idx: number) => (
                        <div key={idx} className="flex flex-col gap-1 pb-4 border-b border-white/5 group">
                          <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">{spec.label}</span>
                          <span className="text-white font-black text-sm uppercase group-hover:text-primary transition-colors">{spec.value}</span>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="compatibility"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {(product.compatibility || []).map((vehicle: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 p-5 bg-white/2 rounded-[1.25rem] border border-white/5 hover:border-green-500/20 transition-all group">
                          <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/10">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                            {typeof vehicle === 'string' ? vehicle : `${vehicle.make} ${vehicle.model} (${vehicle.yearStart}-${vehicle.yearEnd})`}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hardware Verification Footer */}
                <div className="mt-12 flex items-center gap-3 p-4 bg-white/2 rounded-2xl border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Cross-Referenced Compatibility Matrix v12.4.2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

