import {useEffect, useMemo, useRef} from "react";
import * as THREE from "three";
import {useFrame, useThree} from "@react-three/fiber";
import { PointerLockControls, useKeyboardControls } from "@react-three/drei";
import { PointerLockControls as PointerLockControlsImpl } from "three-stdlib";
import type { CarConfig } from "./car_list";

const SPEED = 10;
const PLAYER_RADIUS = 0.4;
// Je mets le vecteur de déplacement en dehors du composant pour éviter de le recréer
// à chaque frame c'est une recommandation R3F pour les objets Three.js utilisés dans useFrame
const _vector = new THREE.Vector3();

// Les bounds représentent les limites physiques du garage, le joueur ne peut pas en sortir
// J'ai ajouté PLAYER_RADIUS pour que la caméra ne traverse pas les murs
const BOUNDS = { minX: -3.5, maxX: 15.5, minZ: -19.5, maxZ: 19.5 };

function getCarZones(cars: CarConfig[]) {
    const CAR_HALF = { x: 2, z: 1.2 };
    return cars.map(({ position }) => ({
        minX: position[0] - CAR_HALF.x,
        maxX: position[0] + CAR_HALF.x,
        minZ: position[2] - CAR_HALF.z,
        maxZ: position[2] + CAR_HALF.z,
    }));
}

interface PlayerProps {
    cars: CarConfig[];
}

export function Player({ cars }: PlayerProps) {
    const controlsRef = useRef<PointerLockControlsImpl>(null!);
    const [, getKeys] = useKeyboardControls();
    const { camera } = useThree();

// Je calcule les zones de collision une seule fois grâce à useMemo
// Ça évite de recalculer à chaque rendu comme ça les voitures ne bougent pas donc inutile de refaire le calcul
    const zones = useMemo(() => getCarZones(cars), [cars]);
    useEffect(() => {
        camera.position.set(3, 0.4, 0);
    }, []);

    useFrame((_state, delta) => {
        if (!controlsRef.current?.isLocked) return;

        const { forward, back, left, right } = getKeys();
        const pos = controlsRef.current.getObject().position;
        // Dans useFrame, je sauvegarde la position avant le déplacement
// Comme ça si le joueur entre dans une zone de collision, je peux annuler l'axe concerné
// plutôt que de bloquer les deux axes (sinon le joueur se retrouve "collé" dans les coins)
        const prevX = pos.x;
        const prevZ = pos.z;

        _vector.set(Number(right) - Number(left), 0, Number(forward) - Number(back));
        if (_vector.length() > 0) {
            _vector.normalize().multiplyScalar(SPEED * delta);
            controlsRef.current.moveRight(_vector.x);
            controlsRef.current.moveForward(_vector.z);
        }

        pos.x = Math.max(BOUNDS.minX + PLAYER_RADIUS, Math.min(BOUNDS.maxX - PLAYER_RADIUS, pos.x));
        pos.z = Math.max(BOUNDS.minZ + PLAYER_RADIUS, Math.min(BOUNDS.maxZ - PLAYER_RADIUS, pos.z));

        for (const zone of zones) {
            if (pos.x > zone.minX && pos.x < zone.maxX && pos.z > zone.minZ && pos.z < zone.maxZ) {
                const prevXInZone = prevX > zone.minX && prevX < zone.maxX;
                const prevZInZone = prevZ > zone.minZ && prevZ < zone.maxZ;

                if (!prevXInZone) pos.x = prevX;
                if (!prevZInZone) pos.z = prevZ;
                if (!prevXInZone && !prevZInZone) { pos.x = prevX; pos.z = prevZ; } // coin
            }
        }

        pos.y = 0.4;
    });

    return <PointerLockControls ref={controlsRef} />;
}
