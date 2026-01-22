import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

interface CategoryCardProps {
    category: {
        id: string;
        name: string;
        icon: any;
        image: string;
        count: number;
        color: string;
    };
    index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <Link to={`/products?category=${category.id}`} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl">
                {/* Background Image */}
                <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Hover Border Glow */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/30 rounded-3xl transition-colors duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="mb-4 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-red-600 transition-colors duration-500">
                        <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-zinc-400 text-sm">{category.count} Products</span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                            <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
