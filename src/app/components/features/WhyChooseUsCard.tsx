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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
        >
            <div className="glass-card rounded-2xl p-8 h-full hover-lift cursor-pointer relative overflow-hidden">
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

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {feature.description}
                </p>
            </div>
        </motion.div>
    );
}
