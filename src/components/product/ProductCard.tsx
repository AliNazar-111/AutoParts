import { memo } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Box, ChevronRight } from "lucide-react";
import { convertUsdToPkr, displayPriceAsPkr } from "../../utils/currency";

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
                    {has3D}

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
                            <span className="text-xl font-black text-white font-heading">
                                {displayPriceAsPkr(product.price)}
                            </span>
                        </div>
                        <Link to={`/products/${product._id || product.id}`}>
                            <Button size="icon" variant="industrial" className="group/btn rounded-2xl">
                                <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {has3D && (
                        <div className="group/3d px-3 py-1.5 rounded-lg bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center gap-2 shadow-lg shadow-primary/10 transition-all hover:bg-primary hover:border-primary">
                            <Box className="w-3 h-3 text-primary group-hover/3d:text-white transition-colors" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">3D Stage</span>
                        </div>
                    )}
                    <Badge variant="outline" className="bg-zinc-950/80 backdrop-blur-md border border-white/5 pr-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse shadow-[0_0_8px_var(--primary-glow)]" />
                        {product.stockStatus || 'In Stock'}
                    </Badge>
                </div>
            </div>
        </motion.div>
    );
});
