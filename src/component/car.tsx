import type {ThreeElements} from "@react-three/fiber";
import {useGLTF} from "@react-three/drei";

type ModelProps = {
    position: ThreeElements['vector3'],
    scale?: ThreeElements['vector3'],
    rotation?: ThreeElements['vector3']
    url: string
};

export function Car({ url, ...props }: ModelProps) {
    const Car = useGLTF(url)
    return  <primitive  object={ Car.scene } {...props} />
}
