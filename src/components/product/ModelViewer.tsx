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

    // Initial LCP optimization: Lazy loading with Intersection Observer
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
        ? "fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
        : "relative w-full aspect-video bg-[#0d0d12] rounded-3xl overflow-hidden border border-white/10 shadow-2xl";

    const content = (
        <div ref={viewerRef} className={`relative w-full h-full ${isModal ? "max-w-6xl aspect-video bg-[#0d0d12] rounded-3xl overflow-hidden border border-white/10 shadow-2xl" : ""}`}>
            {/* Header / Loading Overlay */}
            <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
                        {isLoaded ? <Maximize2 className="text-white w-5 h-5" /> : <Loader2 className="text-white w-5 h-5 animate-spin" />}
                    </div>
                    <div>
                        <h3 className="text-white font-bold">{isLoaded ? "3D Interactive Preview" : "Tuning 3D Environment..."}</h3>
                        <p className="text-zinc-500 text-xs">{isError ? "Connection interrupted" : "Examine every detail from all angles"}</p>
                    </div>
                </div>
                {onClose && (
                    <Button
                        variant="auto-secondary"
                        size="icon"
                        onClick={onClose}
                        className="rounded-full bg-white/5 hover:bg-white/10 border-white/5"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                )}
            </div>

            {/* Poster / Fallback Layer */}
            <AnimatePresence>
                {(!isInView || !isLoaded) && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[5] bg-[#0a0a0f] flex items-center justify-center overflow-hidden"
                    >
                        {poster ? (
                            <img src={poster} alt="3D Model Poster" className="w-full h-full object-cover opacity-40 blur-sm scale-110" />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent" />
                        )}

                        {!isInView ? (
                            <div className="text-center p-6">
                                <PlayCircle className="w-16 h-16 text-red-600 mx-auto mb-4 opacity-50" />
                                <p className="text-zinc-500 font-medium">Scroll to initialize 3D view</p>
                            </div>
                        ) : !isLoaded && (
                            <div className="text-center p-6">
                                <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
                                <p className="text-white font-black tracking-widest uppercase text-xs">Loading High-Poly Mesh</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Interactive Layer */}
            <div className="w-full h-full pt-20">
                {isInView && (
                    <iframe
                        src={getEmbedUrl(url)}
                        title="3D Model"
                        className={`w-full h-full border-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        allow="autoplay; fullscreen; xr-spatial-tracking"
                        onLoad={() => setIsLoaded(true)}
                        onError={() => setIsError(true)}
                    />
                )}
                {isError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0d12] text-zinc-500">
                        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                        <p className="text-white font-bold">Failed to connect to 3D renderer</p>
                        <p className="text-sm">Please check your internet connection and try again.</p>
                    </div>
                )}
            </div>

            {/* Mobile/AR Hint */}
            {isLoaded && (
                <div className="absolute bottom-6 left-6 flex items-center gap-4">
                    <div className="glass-card px-4 py-2 rounded-full border border-white/5 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">Live Render Engine Active</span>
                    </div>
                    <div className="hidden md:block glass-card px-4 py-2 rounded-full border border-white/5">
                        <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">DRAG TO ROTATE • PINCH TO ZOOM</span>
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
