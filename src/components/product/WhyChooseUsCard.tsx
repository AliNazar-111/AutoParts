import { motion } from "motion/react";

interface WhyChooseUsCardProps {
    feature: {
        icon: any;
        title: string;
        description: string;
        color: string;
    };
    index: number;
}

export function WhyChooseUsCard({ feature, index }: WhyChooseUsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
        >
            <div className="glass-stage rounded-3xl p-10 h-full industrial-border hover-ember cursor-default relative overflow-hidden flex flex-col group">
                {/* Semantic Foundation Highlight */}
                {feature.color === 'red' && <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />}

                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative shadow-2xl group-hover:bg-primary group-hover:border-primary/50 transition-all duration-500">
                    <feature.icon className="w-10 h-10 text-white transition-transform duration-500 group-hover:scale-110" />

                    {/* Pulse Interaction Aura */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl bg-primary/20"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter font-heading leading-tight group-hover:text-primary transition-colors">
                        {feature.title}
                    </h3>
                    <p className="text-zinc-500 font-medium leading-relaxed group-hover:text-zinc-300 transition-colors">
                        {feature.description}
                    </p>
                </div>

                {/* Industrial Metadata Hint */}
                <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em]">Verified Industrial Standard</span>
                </div>
            </div>
        </motion.div>
    );
}
