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
            className="h-full"
        >
            <Link to={`/products?category=${category.id}`} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl industrial-border hover-ember h-full">
                {/* Visual Foundation */}
                <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Industrial Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/40 to-transparent" />

                {/* Content Layer */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="mb-4 md:mb-6 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary/50 transition-all duration-500 shadow-2xl">
                        <category.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-2xl md:text-3xl font-black text-white leading-tight font-heading uppercase tracking-tighter group-hover:text-primary transition-colors">
                            {category.name}
                        </h3>
                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <span className="text-zinc-500 text-xs uppercase font-black tracking-[0.2em]">{category.count} Inventory Items</span>
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0 shadow-lg">
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
