import { motion } from "motion/react";
import { X, Maximize2 } from "lucide-react";
import { Button } from "../ui/Button";

interface ModelViewerProps {
    url: string;
    modelType?: 'sketchfab' | 'gltf';
    onClose?: () => void;
}

export function ModelViewer({ url, modelType = 'sketchfab', onClose }: ModelViewerProps) {
    // Convert Sketchfab URL to embed URL if needed
    const getEmbedUrl = (originalUrl: string) => {
        if (modelType === 'sketchfab' && !originalUrl.includes('embed')) {
            // Very basic conversion logic, assuming URL is something like https://sketchfab.com/models/ID
            const parts = originalUrl.split('/');
            const id = parts[parts.length - 1] || parts[parts.length - 2];
            return `https://sketchfab.com/models/${id}/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0`;
        }
        return originalUrl;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
        >
            <div className="relative w-full h-full max-w-6xl aspect-video bg-[#0d0d12] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
                            <Maximize2 className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">3D Interactive Preview</h3>
                            <p className="text-zinc-500 text-xs">Examine every detail from all angles</p>
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

                {/* Content */}
                <div className="w-full h-full pt-20">
                    {modelType === 'sketchfab' ? (
                        <iframe
                            src={getEmbedUrl(url)}
                            title="3D Model"
                            className="w-full h-full border-0"
                            allow="autoplay; fullscreen; xr-spatial-tracking"
                            xr-spatial-tracking="true"
                            execution-while-out-of-viewport="true"
                            execution-while-not-rendered="true"
                            web-share="true"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-zinc-500">
                            {/* Fallback for GLTF if model-viewer is not yet installed */}
                            <p>GLTF viewer integration pending. Using Sketchfab as primary 3D source.</p>
                        </div>
                    )}
                </div>

                {/* Legend/Info Badge */}
                <div className="absolute bottom-6 left-6 flex items-center gap-4">
                    <div className="glass-card px-4 py-2 rounded-full border border-white/5 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest text-white">Live Render</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
