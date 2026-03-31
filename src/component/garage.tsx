import { useMemo } from "react"
import * as THREE from "three"
import { myCar } from "./car_list.tsx"

const neonPositions = [-16, -8, 0, 8, 16]
const centerX = 6

// Je déclare les géométries en dehors du composant React
// Comme ça elles sont créées une seule fois au chargement, pas à chaque re-render
const geoFloor = new THREE.PlaneGeometry(24, 44)
const geoCeil    = new THREE.PlaneGeometry(24, 44)
const geoWallFB  = new THREE.BoxGeometry(24, 8, 0.3)
const geoWallLR  = new THREE.BoxGeometry(0.3, 8, 44)
const geoSep     = new THREE.PlaneGeometry(0.08, 44)
const geoNeon    = new THREE.BoxGeometry(12, 0.1, 0.3)
const geoPark    = new THREE.PlaneGeometry(4, 0.05)

export function Garage() {
    // useMemo sur les matériaux pour la même raison — éviter les instanciations à la volée
    const matFloor = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2b2b2b", roughness: 0.8, metalness: 0.1 }), [])
    const matCeil  = useMemo(() => new THREE.MeshStandardMaterial({ color: "#111111", roughness: 1 }), [])
    const matWallF = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1c1c1c", roughness: 0.9 }), [])
    const matWallS = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.9 }), [])
    const matNeon  = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#ffffff", emissiveIntensity: 2 }), [])
    const matLine  = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f0c040" }), [])

    return (
        <group>
            {/* Sol */}
            <mesh geometry={geoFloor} material={matFloor} rotation={[-Math.PI / 2, 0, 0]} position={[centerX, -0.51, 0]} />

            {/* Plafond */}
            <mesh geometry={geoCeil} material={matCeil} rotation={[Math.PI / 2, 0, 0]} position={[centerX, 6, 0]} />

            {/* Murs */}
            <mesh geometry={geoWallFB} material={matWallF} position={[centerX, 2, -21]} />
            <mesh geometry={geoWallFB} material={matWallF} position={[centerX, 2,  21]} />
            <mesh geometry={geoWallLR} material={matWallS} position={[-4, 2, 0]} />
            <mesh geometry={geoWallLR} material={matWallS} position={[16, 2, 0]} />

            {/* Séparateurs rangées */}
            {[3, 9].map((x, i) => (
                <mesh key={`sep-${i}`} geometry={geoSep} material={matLine} rotation={[-Math.PI / 2, 0, 0]} position={[x, -0.50, 0]} />
            ))}

            {/* Lignes de parking */}
            {myCar.map((car) => (
                <group key={`park-${car.name}`}>
                    <mesh geometry={geoPark} material={matLine} rotation={[-Math.PI / 2, 0, 0]} position={[car.position[0], -0.499, car.position[2] - 1.5]} />
                    <mesh geometry={geoPark} material={matLine} rotation={[-Math.PI / 2, 0, 0]} position={[car.position[0], -0.499, car.position[2] + 1.5]} />
                </group>
            ))}

            {/* Néons */}
            {/*Je mappe sur les positions de néons pour ne pas répéter le code. Chaque néon a une rectAreaLight pour la lumière douce + un pointLight pour la diffusion*/}

            {neonPositions.map((z, i) => (
                <group key={`neon-${i}`} position={[centerX, 5.8, z]}>
                    <mesh geometry={geoNeon} material={matNeon} />
                    <rectAreaLight width={12} height={0.5} intensity={20} color="#c8e0ff" position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                    <pointLight intensity={8} color="#c8e0ff" distance={14} decay={2} />
                </group>
            ))}

            <ambientLight intensity={0.5} color="#334455" />
        </group>
    )
}
