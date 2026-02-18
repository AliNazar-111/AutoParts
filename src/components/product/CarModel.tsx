import { useGLTF, useAnimations, Center } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CarModelProps {
    url: string;
    onPartHover?: (partName: string | null) => void;
    onPartSelect?: (partName: string | null) => void;
    selectedPart?: string | null;
}

export function CarModel({
    url,
    onPartHover,
    onPartSelect,
    selectedPart
}: CarModelProps) {
    const { scene, animations } = useGLTF(url);
    const { actions } = useAnimations(animations, scene);
    const group = useRef<THREE.Group>(null);
    const hoveredPart = useRef<string | null>(null);

    useEffect(() => {
        // Basic material optimization for industrial look
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                if (mesh.material instanceof THREE.MeshStandardMaterial) {
                    mesh.material.roughness = 0.3;
                    mesh.material.metalness = 0.8;
                    mesh.material.envMapIntensity = 1;
                }
            }
        });

        if (animations.length > 0 && actions[Object.keys(actions)[0]]) {
            actions[Object.keys(actions)[0]]?.play();
        }
    }, [scene, animations, actions]);

    // Update highlights when selectedPart changes
    useEffect(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (mesh.material instanceof THREE.MeshStandardMaterial) {
                    const isSelected = mesh.name === selectedPart;
                    if (isSelected) {
                        mesh.material.emissive.setHex(0xe31e24);
                        mesh.material.emissiveIntensity = 0.5;
                    } else if (mesh.name !== hoveredPart.current) {
                        mesh.material.emissive.setHex(0x000000);
                        mesh.material.emissiveIntensity = 0;
                    }
                }
            }
        });
    }, [scene, selectedPart]);

    return (
        <Center top>
            <primitive
                ref={group}
                object={scene}
                scale={1.5}
                rotation={[0, Math.PI / 4, 0]}
                onPointerOver={(e: any) => {
                    e.stopPropagation();
                    const name = e.object.name;
                    hoveredPart.current = name;
                    onPartHover?.(name);

                    // Highlight on hover
                    if (e.object.material instanceof THREE.MeshStandardMaterial && name !== selectedPart) {
                        e.object.material.emissive.setHex(0x444444);
                        e.object.material.emissiveIntensity = 0.3;
                    }
                }}
                onPointerOut={(e: any) => {
                    e.stopPropagation();
                    const name = e.object.name;
                    hoveredPart.current = null;
                    onPartHover?.(null);

                    // Restore on out
                    if (e.object.material instanceof THREE.MeshStandardMaterial && name !== selectedPart) {
                        e.object.material.emissive.setHex(0x000000);
                        e.object.material.emissiveIntensity = 0;
                    }
                }}
                onClick={(e: any) => {
                    e.stopPropagation();
                    const name = e.object.name;
                    onPartSelect?.(name);
                }}
            />
        </Center>
    );
}

// Preload the model
// useGLTF.preload(url); 
