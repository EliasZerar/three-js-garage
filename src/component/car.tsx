import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import type { CarConfig } from "./car_list";

export function Car({ url, position, scale, rotation }: CarConfig) {
    const { scene } = useGLTF(url);
    // useGLTF charge le modèle 3D depuis un fichier .glb
// Sans le clone, toutes les voitures partageraient le même objet Three.js
// SkeletonUtils.clone permet d'avoir une vraie copie indépendante pour chaque instance
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    return <primitive object={clone} position={position} scale={scale} rotation={rotation} />;
}
