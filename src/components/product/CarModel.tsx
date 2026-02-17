import { useGLTF, useAnimations, Center } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CarModelProps {
    url: string;
    autoRotate?: boolean;
}

export function CarModel({ url, autoRotate = false }: CarModelProps) {
    const { scene, animations } = useGLTF(url);
    const { actions } = useAnimations(animations, scene);
    const group = useRef<THREE.Group>(null);

    useEffect(() => {
        // Basic material optimization for industrial look
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                // If material is standard, enhance it for technical look
                if (mesh.material instanceof THREE.MeshStandardMaterial) {
                    mesh.material.roughness = 0.3;
                    mesh.material.metalness = 0.8;
                    mesh.material.envMapIntensity = 1;
                }
            }
        });

        // Play first animation if available
        if (animations.length > 0 && actions[Object.keys(actions)[0]]) {
            actions[Object.keys(actions)[0]]?.play();
        }
    }, [scene, animations, actions]);

    return (
        <Center top>
            <primitive
                ref={group}
                object={scene}
                scale={1.5}
                rotation={[0, Math.PI / 4, 0]}
            />
        </Center>
    );
}

// Preload the model
// useGLTF.preload(url); 
