import { Canvas } from '@react-three/fiber';
import {
    OrbitControls,
    Stage,
    Float,
    Environment,
    ContactShadows,
    PerspectiveCamera,
    Loader
} from '@react-three/drei';
import { Suspense } from 'react';
import { CarModel } from './CarModel';
import { Loader2 } from 'lucide-react';

interface Product3DViewerProps {
    modelUrl?: string;
    className?: string;
}

// Technical skeleton model placeholder
const DEFAULT_MODEL = "https://raw.githubusercontent.com/pmndrs/drei-assets/master/car.glb";

export function Product3DViewer({
    modelUrl = DEFAULT_MODEL,
    className = "w-full h-[400px]"
}: Product3DViewerProps) {
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
                        autoRotate={true}
                        autoRotateSpeed={0.5}
                    />

                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

                    <Stage environment="city" intensity={0.6} shadows="contact" adjustCamera={true}>
                        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                            <CarModel url={modelUrl} />
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

            {/* Control Overlay Hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
                <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/5 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest whitespace-nowrap">
                        Interactive Node: Use Mouse to Orbit
                    </span>
                </div>
            </div>
        </div>
    );
}
