import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
    OrbitControls,
    Stage,
    Float,
    Environment,
    ContactShadows,
    PerspectiveCamera,
} from '@react-three/drei';
import { CarModel } from './CarModel';
import { Loader2, Zap, Target, Activity, Database, ChevronRight, Settings, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { resolvePartData, PartMetadata } from '@/utils/meshMapping';
import { Button } from '@/components/ui/Button';

interface Product3DViewerProps {
    modelUrl?: string;
    className?: string;
    onInquiry?: (partName: string) => void;
}

const DEFAULT_MODEL = "https://raw.githubusercontent.com/pmndrs/drei-assets/master/car.glb";

export function Product3DViewer({
    modelUrl = DEFAULT_MODEL,
    className = "w-full h-[600px]",
    onInquiry
}: Product3DViewerProps) {
    const [selectedPart, setSelectedPart] = useState<PartMetadata | null>(null);
    const [hoveredPart, setHoveredPart] = useState<PartMetadata | null>(null);

    return (
        <div className={`relative bg-zinc-950/50 rounded-3xl border border-white/5 overflow-hidden glass-stage ${className}`}>
            {/* 3D Visual Hub */}
            <Suspense fallback={
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest animate-pulse">
                        Configuring 3D Environment...
                    </p>
                </div>
            }>
                <Canvas shadows dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={45} />

                    <OrbitControls
                        makeDefault
                        enableDamping
                        dampingFactor={0.05}
                        minDistance={3}
                        maxDistance={10}
                        maxPolarAngle={Math.PI / 2}
                        autoRotate={!selectedPart}
                        autoRotateSpeed={0.5}
                    />

                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

                    <Stage environment="city" intensity={0.6} shadows="contact" adjustCamera={true}>
                        <Float speed={selectedPart ? 0 : 1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                            <CarModel
                                url={modelUrl}
                                onPartHover={(name) => setHoveredPart(name ? resolvePartData(name) : null)}
                                onPartSelect={(name) => setSelectedPart(prev => (prev?.name === name || !name) ? null : resolvePartData(name))}
                                selectedPart={selectedPart?.name}
                            />
                        </Float>
                    </Stage>

                    <Environment preset="city" />
                    <ContactShadows
                        position={[0, -1, 0]}
                        opacity={0.5}
                        scale={10}
                        blur={2}
                        far={4.5}
                    />
                </Canvas>
            </Suspense>

            {/* Diagnostic HUD Overlay (Hover) */}
            <AnimatePresence>
                {hoveredPart && !selectedPart && (
                    <div className="absolute top-6 left-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, x: -20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.95 }}
                            className="glass-stage p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl bg-black/40 min-w-[200px]"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary-glow)]" />
                                <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Diagnostic Node</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest leading-none mb-1">Scanning Component</span>
                                <span className="text-sm text-white font-black uppercase tracking-tight truncate">
                                    {hoveredPart.name}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* technical Details Sidebar Panel */}
            <AnimatePresence>
                {selectedPart && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute top-6 bottom-6 right-6 w-[320px] glass-stage rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                    >
                        {/* Header Section */}
                        <div className="p-6 bg-gradient-to-b from-white/5 to-transparent border-b border-white/5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="px-2 py-0.5 rounded bg-primary/20 border border-primary/30">
                                    <span className="text-[8px] text-primary font-black uppercase tracking-wider">High Precision</span>
                                </div>
                                <button
                                    onClick={() => setSelectedPart(null)}
                                    className="p-1.5 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <h3 className="text-xl text-white font-black uppercase tracking-tight leading-none mb-2">
                                {selectedPart.name}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{selectedPart.category}</span>
                                <div className="w-1 h-1 rounded-full bg-zinc-800" />
                                <span className="text-[10px] text-primary font-mono">{selectedPart.id}</span>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <Settings className="w-3.5 h-3.5 text-zinc-600" />
                                    <h4 className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.2em]">Technical Specs</h4>
                                </div>
                                <div className="grid gap-3">
                                    {Object.entries(selectedPart.specs).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5">
                                            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">{key}</span>
                                            <span className="text-[11px] text-white font-black tracking-tight">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <LinkIcon className="w-3.5 h-3.5 text-zinc-600" />
                                    <h4 className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.2em]">Compatibility</h4>
                                </div>
                                <div className="space-y-2">
                                    {selectedPart.compatibility.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-900/40 border border-white/2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
                                            <span className="text-[10px] text-zinc-300 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Footer Action */}
                        <div className="p-6 bg-gradient-to-t from-black/40 to-transparent border-t border-white/5">
                            <Button
                                variant="industrial"
                                className="w-full h-14 rounded-2xl group relative overflow-hidden"
                                onClick={() => onInquiry?.(selectedPart.name)}
                            >
                                <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <div className="relative flex items-center justify-center gap-3">
                                    <Zap className="w-4 h-4 fill-primary text-primary" />
                                    <span className="text-[11px] font-black uppercase tracking-widest text-white">Request Quote</span>
                                </div>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Interaction Instruction Overlay */}
            {!selectedPart && (
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                    <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/5 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest whitespace-nowrap">
                            Raycasting Active: Click to select component
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
