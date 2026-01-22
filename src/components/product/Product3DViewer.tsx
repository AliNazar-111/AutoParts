import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Rotate3d,
    Maximize2,
    Play,
    Pause,
    RotateCcw,
    MousePointer2
} from "lucide-react";

interface Interactive3DViewerProps {
    productName: string;
}

export function Product3DViewer({ productName }: Interactive3DViewerProps) {
    const [isPlaying, setIsPlaying] = useState(true);

    return (
        <div className="glass-card rounded-3xl p-4 h-[500px] relative overflow-hidden group">
            {/* Viewer Header */}
            <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-white text-xs font-bold uppercase tracking-widest">3D Real-time Preview</span>
                </div>
            </div>

            {/* 3D Interaction Hints */}
            <div className="absolute bottom-6 left-6 z-10 hidden md:flex flex-col gap-2">
                <div className="flex items-center gap-2 text-zinc-400 text-xs bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <MousePointer2 className="w-3.5 h-3.5" />
                    Drag to Rotate
                </div>
            </div>

            {/* Perspective Grid Background */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* 3D Object Placeholder */}
            <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                    animate={isPlaying ? { rotateY: 360 } : {}}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="relative w-64 h-64"
                >
                    {/* Mock 3D Shape (Cube Implementation) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 bg-gradient-to-br from-red-600 to-red-900 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.3)] relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Rotate3d className="w-24 h-24 text-white/20" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 right-6 flex items-center gap-2 z-10">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl backdrop-blur-md border border-white/10 transition-all active:scale-95"
                    title={isPlaying ? "Pause Rotation" : "Play Rotation"}
                >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                    className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl backdrop-blur-md border border-white/10 transition-all active:scale-95"
                    title="Reset View"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
                <button
                    className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-95"
                    title="Go Fullscreen"
                >
                    <Maximize2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
