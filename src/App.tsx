import { useState } from 'react';
import { Canvas } from '@react-three/fiber'
import Bug from './Bug.tsx';
import './App.css'

function App() {
  const [size, setSize] = useState(1);
  const [showBug, setShowBug] = useState(false);

  return (
    <>
      <div id="canvas-container">
        <Canvas>
          <ambientLight intensity={0.1} />
          <directionalLight color="white" position={[0, 0, 5]} />
          <mesh>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial />
          </mesh>
          {showBug && <Bug size={size} />}
        </Canvas>
      </div>
      <div className='buttons'>
        <button onClick={() => setSize(n => n - 1)}>Size -1</button>
        <button onClick={() => setSize(n => n + 1)}>Size +1</button>
        <button onClick={() => setShowBug(current => !current)}>Toggle bug</button>
      </div>
    </>
  )
}

export default App
