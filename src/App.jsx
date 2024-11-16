import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './App.css'

function App() {
  const [size, setSize] = useState(1)
  const [color, setColor] = useState("#ff9966")
  const [metalness, setMetalness] = useState(0.5)
  const [opacity, setOpacity] = useState(1)
  const [shape, setShape] = useState('icosahedron')
  const meshRef = useRef()

  const renderGeometry = () => {
    switch(shape) {
      case 'cube':
        return <boxGeometry args={[size, size, size]} />
      case 'octahedron':
        return <octahedronGeometry args={[size, 0]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[size, 0]} />
      case 'icosahedron':
      default:
        return <icosahedronGeometry args={[size, 0]} />
    }
  }

  return (
    <div className="container">
      <div className="canvas-container">
        <Canvas>
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <mesh ref={meshRef}>
            {renderGeometry()}
            <meshStandardMaterial 
              color={color}
              metalness={metalness}
              opacity={opacity}
              transparent={true}
            />
          </mesh>
          <OrbitControls />
        </Canvas>
      </div>

      <div className="gui-container">
        <label className="select-label">
          Shape:
          <select 
            value={shape} 
            onChange={(e) => setShape(e.target.value)}
            className="shape-select"
          >
            <option value="cube">Cube</option>
            <option value="octahedron">Octahedron</option>
            <option value="dodecahedron">Dodecahedron</option>
            <option value="icosahedron">Icosahedron</option>
          </select>
        </label>

        <label className="slider-label">
          Size: {size}
          <input
            type="range" 
            min="0.1" 
            max="3" 
            step="0.1" 
            value={size}
            onChange={(e) => setSize(parseFloat(e.target.value))}
            className="slider"
          />
        </label>

        <label className="color-label">
          Color: {color}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="color-picker"
          />
        </label>

        <label className="slider-label">
          Metalness: {metalness}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={metalness}
            onChange={(e) => setMetalness(parseFloat(e.target.value))}
            className="slider"
          />
        </label>

        <label className="slider-label">
          Opacity: {opacity}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="slider"
          />
        </label>
      </div>
    </div>
  )
}

export default App