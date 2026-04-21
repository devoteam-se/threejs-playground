import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

function Bug({ size }: { size: number }) {
  const gltf = useLoader(GLTFLoader, '/bug-model/scene.gltf')

  return (
    <primitive object={gltf.scene} scale={size} />
  )
}

export default Bug
