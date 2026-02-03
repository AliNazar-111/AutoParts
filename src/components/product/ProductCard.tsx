import { memo } from "react";
import { motion } from "motion/react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Box, ChevronRight } from "lucide-react";
import { Link } from "react-router";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
        compatibility: string[];
        stockStatus: string;
        has3D: boolean;
    };
}

export const ProductCard = memo(({ product }: ProductCardProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group relative"
        >
            <div className="glass-card rounded-2xl overflow-hidden h-full hover-lift">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* 3D Badge */}
                    {product.has3D && (
                        <motion.div
                            className="absolute bottom-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Box className="w-3 h-3" />
                            VIEW IN 3D
                        </motion.div>
                    )}

                    {/* Stock Badge */}
                    <div className="absolute top-3 left-3">
                        <Badge variant={
                            product.stockStatus === "In Stock" ? "auto-success" :
                                product.stockStatus === "Low Stock" ? "auto-warning" : "auto-danger"
                        } className="backdrop-blur-md">
                            {product.stockStatus}
                        </Badge>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                    <div className="text-zinc-400 text-xs mb-1 uppercase tracking-wider font-semibold">
                        {product.compatibility[0]} Compatible
                    </div>
                    <h3 className="text-white font-bold mb-3 group-hover:text-red-400 transition-colors line-clamp-1">
                        {product.name}
                    </h3>

                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-xl font-bold text-white">
                            ${product.price.toLocaleString()}
                        </span>
                        <Link to={`/products/${product.id}`}>
                            <Button size="sm" variant="auto-secondary" className="group/btn">
                                Details
                                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
