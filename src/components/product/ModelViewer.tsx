import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Maximize2, Loader2, PlayCircle, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";

interface ModelViewerProps {
    url: string;
    modelType?: 'sketchfab' | 'gltf';
    poster?: string;
    onClose?: () => void;
    isModal?: boolean;
}

export function ModelViewer({
    url,
    modelType = 'sketchfab',
    poster,
    onClose,
    isModal = true
}: ModelViewerProps) {
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const viewerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '200px' }
        );

        if (viewerRef.current) {
            observer.observe(viewerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const getEmbedUrl = (originalUrl: string) => {
        if (modelType === 'sketchfab' && !originalUrl.includes('embed')) {
            const parts = originalUrl.split('/');
            const id = parts[parts.length - 1] || parts[parts.length - 2];
            return `https://sketchfab.com/models/${id}/embed?autostart=1&internal=1&tracking=0&ui_ar=1&ui_infos=0&ui_snapshots=1&ui_stop=1&ui_theatre=1&ui_watermark=0`;
        }
        return originalUrl;
    };

    const containerClasses = isModal
        ? "fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-2xl p-4 md:p-12 lg:p-20"
        : "relative w-full aspect-video bg-graphite-950 rounded-3xl overflow-hidden industrial-border shadow-2xl";

    const content = (
        <div ref={viewerRef} className={`relative w-full h-full ${isModal ? "max-w-7xl aspect-video bg-graphite-950 rounded-3xl overflow-hidden industrial-border shadow-premium" : ""}`}>
            {/* Staging Header */}
            <div className="absolute top-0 left-0 right-0 p-8 flex items-center justify-between bg-gradient-to-b from-graphite-950/90 to-transparent z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/10">
                        {isLoaded ? <Maximize2 className="text-primary w-6 h-6" /> : <Loader2 className="text-primary w-6 h-6 animate-spin" />}
                    </div>
                    <div>
                        <h3 className="text-white font-black uppercase tracking-tighter text-xl font-heading leading-none">
                            {isLoaded ? "Precision 3D Inspection" : "Initializing Component Scan"}
                        </h3>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
                            {isError ? "Transmission Interrupted" : "High-Fidelity Interaction Enabled"}
                        </p>
                    </div>
                </div>
                {onClose && (
                    <Button
                        variant="industrial"
                        size="icon"
                        onClick={onClose}
                        className="rounded-2xl"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                )}
            </div>

            {/* Staging Environment / Fallback */}
            <AnimatePresence>
                {(!isInView || !isLoaded) && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[5] bg-graphite-950 flex items-center justify-center overflow-hidden"
                    >
                        {poster ? (
                            <img src={poster} alt="3D Staging Poster" className="w-full h-full object-cover opacity-20 blur-2xl scale-125" />
                        ) : (
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-glow)_0%,transparent_70%)] opacity-10" />
                        )}

                        {!isInView ? (
                            <div className="text-center p-10">
                                <PlayCircle className="w-20 h-20 text-primary mx-auto mb-6 opacity-30" />
                                <p className="text-zinc-500 font-black uppercase tracking-[0.3em] text-xs">Awaiting Interaction</p>
                            </div>
                        ) : !isLoaded && (
                            <div className="text-center p-10 animate-pulse">
                                <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
                                <p className="text-white font-black tracking-[0.4em] uppercase text-xs">Calibrating Precision Mesh</p>
                                <p className="text-zinc-600 text-[9px] font-bold uppercase mt-4 tracking-widest">Compiling geometric data clusters...</p>
                            </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Render Stage */}
            <div className="w-full h-full pt-20">
                {isInView && (
                    <iframe
                        src={getEmbedUrl(url)}
                        title="3D Inspection Stage"
                        className={`w-full h-full border-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        allow="autoplay; fullscreen; xr-spatial-tracking"
                        onLoad={() => setIsLoaded(true)}
                        onError={() => setIsError(true)}
                    />
                )}
                {isError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-graphite-950 text-zinc-500 p-10 text-center">
                        <AlertCircle className="w-16 h-16 text-primary mb-6 animate-pulse" />
                        <h4 className="text-white font-black uppercase tracking-widest mb-2 font-heading">Protocol Failure</h4>
                        <p className="max-w-xs text-xs font-bold uppercase tracking-widest leading-relaxed">
                            Secure connection to the 3D rendering pipeline could not be established.
                        </p>
                    </div>
                )}
            </div>

            {/* Interaction Matrix */}
            {isLoaded && (
                <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                    <div className="glass-stage px-5 py-3 rounded-2xl border border-white/5 flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_var(--ember-glow)] animate-pulse" />
                        <span className="text-[10px] text-zinc-300 font-black uppercase tracking-[0.2em]">Matrix: High-Fidelity Active</span>
                    </div>
                    <div className="hidden md:flex glass-stage px-5 py-3 rounded-2xl border border-white/5 gap-6">
                        <span className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em]">Orbital Rotation: Mouse Drag</span>
                        <div className="w-[1px] h-3 bg-white/10" />
                        <span className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em]">Spatial Zoom: Scroll Wheel</span>
                    </div>
                </div>
            )}
        </div>
    );

    return isModal ? (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={containerClasses}
        >
            {content}
        </motion.div>
    ) : content;
}
