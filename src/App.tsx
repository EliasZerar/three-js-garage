import './App.css';
import { Canvas } from '@react-three/fiber';
import { Scene } from './component/scene.tsx';
import { KeyboardControls } from "@react-three/drei";
import { controlsMap } from "./component/controls_keyboard.tsx";
import { StartOverlay } from "./component/startOverlay.tsx";
import { useState } from "react";

function App() {
    const [started, setStarted] = useState(false);

    return (
        <div className='canvas-container'>
            {!started && <StartOverlay onStart={() => setStarted(true)} />}
            {/*KeyboardControls doit wrapper le Canvas pour que useKeyboardControls soit accessible depuis les composants enfants (Player)*/}
            <KeyboardControls map={controlsMap}>
                {/* frameloop="demand" : le rendu ne se déclenche que quand la scène change, ça économise des ressources GPU quand le joueur ne bouge pas */}
                <Canvas
                    camera={{ fov: 75, near: 0.1, far: 50, position: [0, 1, 5] }}
                    gl={{ antialias: false, powerPreference: "high-performance" }}
                    frameloop="demand"
                    performance={{ min: 0.5 }}
                >
                    <Scene />
                </Canvas>
            </KeyboardControls>
        </div>
    );
}

export default App;
