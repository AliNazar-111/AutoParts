import { memo } from "react";
import { motion } from "motion/react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Box, ChevronRight } from "lucide-react";
import { Link } from "react-router";

interface ProductCardProps {
    product: {
        _id?: string;
        id?: string;
        name: string;
        price: number;
        imageUrl?: string;
        image?: string;
        compatibility: any[];
        stockStatus: string;
        model3D?: any;
    };
}

export const ProductCard = memo(({ product }: ProductCardProps) => {
    const displayImage = product.imageUrl || product.image;
    const has3D = !!product.model3D;
    const primaryCompat = product.compatibility?.[0];
    const compatLabel = typeof primaryCompat === 'string'
        ? primaryCompat
        : primaryCompat?.make || 'Industrial';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="group relative h-full"
        >
            <div className="glass-stage rounded-2xl overflow-hidden h-full flex flex-col industrial-border hover-ember">
                {/* Product Staging Area */}
                <div className="relative aspect-square overflow-hidden bg-graphite-900/50 flex items-center justify-center p-4">
                    <img
                        src={displayImage}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Visual Overlays */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-graphite-950/60 to-transparent" />

                    {/* 3D Indicator Toggle */}
                    {has3D && (
                        <div className="absolute bottom-4 right-4">
                            <motion.div
                                className="bg-primary/20 backdrop-blur-xl border border-primary/30 text-primary text-xs font-black tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xl shadow-primary/20"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <Box className="w-3.5 h-3.5" />
                                3D ENABLED
                            </motion.div>
                        </div>
                    )}

                    {/* Stock Intensity */}
                    <div className="absolute top-4 left-4">
                        <Badge variant={
                            product.stockStatus === "In Stock" ? "success" :
                                product.stockStatus === "Low Stock" ? "warning" : "destructive"
                        } className="font-black tracking-widest text-xs uppercase px-3 py-1 scale-90 origin-left">
                            {product.stockStatus}
                        </Badge>
                    </div>
                </div>

                {/* Product Metadata */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="text-zinc-500 text-xs mb-2 uppercase tracking-[0.2em] font-black">
                        {compatLabel} Systems
                    </div>
                    <h3 className="text-white font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem] text-lg leading-tight uppercase tracking-tight font-heading">
                        {product.name}
                    </h3>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Base Value</span>
                            <span className="text-2xl font-black text-white font-heading">
                                ${product.price.toLocaleString()}
                            </span>
                        </div>
                        <Link to={`/products/${product._id || product.id}`}>
                            <Button size="icon" variant="industrial" className="group/btn rounded-2xl">
                                <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
