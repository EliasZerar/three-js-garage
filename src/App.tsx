import './App.css';
import { Canvas } from '@react-three/fiber';
import { Scene } from './component/scene.tsx';

function App() {

    return (
        <div className='canvas-container'>
            <Canvas
                camera={{
                    fov: 75,
                    near: 0.1,
                    far: 100,
                    position: [0, 7, 5]
                }}
            >
                <Scene />

            </Canvas>
        </div>
    )
}

export default App
