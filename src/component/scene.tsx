
import { OrbitControls, useHelper} from "@react-three/drei";
import {useRef} from "react";
import * as THREE from "three";
import {useControls} from "leva";
import {Perf} from "r3f-perf";
import {Car} from "./car.tsx"
import {myCar} from "./car_list.tsx";

export function Scene() {
    const directionalLightRef = useRef<THREE.DirectionalLightHelper>(null!);

    const {showPerf} = useControls(('Debug'), {
        showPerf:{
            label: 'Show perf',
            value: false
        }
    })

    useHelper(directionalLightRef, THREE.DirectionalLightHelper)

    return (
        <>
            {myCar.map((car) => <Car key={car.name} {...car} />)}

            {showPerf && <Perf ></Perf>}
            <directionalLight ref={directionalLightRef} color="#ffffff" intensity={20} position={[0,4,0]} />
            <OrbitControls />

            <mesh position={[0, -0.6, 0]} rotation-x={-Math.PI * 0.5}>
                <planeGeometry args={[70, 70]} />
                <meshStandardMaterial color="red" />
            </mesh>

        </>
    )
}
