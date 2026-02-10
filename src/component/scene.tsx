
import {Html, OrbitControls, useHelper} from "@react-three/drei";
import {useRef} from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import {useControls} from "leva";
import {Perf} from "r3f-perf";

export function Scene() {
    const directionalLightRef = useRef<THREE.DirectionalLightHelper>(null!);
    const box = useRef<THREE.Mesh>(null!)

    const {showPerf} = useControls(('Debug'), {
        showPerf:{
            label: 'Show perf',
            value: false
        }
    })

  const { color, position, wireframe } = useControls('cube',{
        color: {
            label:'Cube color',
            value: 'red'
        },
        position: {
            label: 'position',
            value: {x: 0, y: 0, z: 0},
            step: 0.1
        },
        wireframe: {
            label: 'wireframe',
            value: true
        }
    })

    useHelper(directionalLightRef, THREE.DirectionalLightHelper)
    useFrame((state, delta) => {
        box.current.rotation.y += 30
    })



    return (
        <>
            {showPerf && <Perf position={position}></Perf>}
            <directionalLight ref={directionalLightRef} color="#ffffff" intensity={20} position={[0,4,0]} />
            <OrbitControls />
            <mesh rotation-y={Math.PI / 0.25} position={[position.x, position.y, position.z]} >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={color}/>
            </mesh>
            <mesh position={[-2, 0.5, 0]} >
                <sphereGeometry args={[1, 32, 16]} />
                <meshStandardMaterial color="#ff00cd" />
            </mesh>
            <mesh position={[3, 0.5, 0]} ref={box}>
                <torusGeometry args={[1, 0.1, 32, 4]} />
                <meshStandardMaterial color="#ff00cd" />
            </mesh>
            <mesh position={[0, -0.6, 0]} rotation-x={-Math.PI * 0.5}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="red" />
            </mesh>
            <Html position={[-2, 0.5, 0]} distanceFactor={5} >
                <span className="fake-button"> Button</span>
            </Html>
        </>
    )
}
