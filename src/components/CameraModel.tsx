import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import {  Cylinder, Sphere, Text, RoundedBox } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import {TextureLoader} from 'three'
import * as THREE from "three";


export default function CameraModel() {
    const texture = useLoader(TextureLoader, '/sofiafoto.jpg')
    texture.repeat.set(1.2, 1.2) // Hace la imagen más pequeña (valores menores = imagen más pequeña)
    texture.center.set(0.5, 0.5) // Centra el punto de transformación
    texture.offset.set(0.15, 0.15) 

  const groupRef = useRef<THREE.Group | null>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group  ref={groupRef} scale={2} position={[-1,0,0]}>
      {/* Camera body */}
      <RoundedBox args={[1.2, 0.8, 0.6]} radius={0.05} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2a2a2a" roughness={0.7} metalness={0.3} />
      </RoundedBox>

      {/* Grip */}
      <RoundedBox args={[0.2, 0.6, 0.4]} radius={0.02} position={[0.65, -0.1, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
      </RoundedBox>

      {/* Lens */}
      <Cylinder args={[0.3, 0.25, 0.7, 32]} position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.4} />
      </Cylinder>

      {/* Lens rings */}
      <Cylinder args={[0.31, 0.31, 0.05, 32]} position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#4a4a4a" roughness={0.5} metalness={0.6} />
      </Cylinder>
      <Cylinder args={[0.28, 0.28, 0.05, 32]} position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#4a4a4a" roughness={0.5} metalness={0.6} />
      </Cylinder>

      {/* Lens glass */}
      <Cylinder args={[0.22, 0.22, 0.05, 32]} position={[0, 0, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
      </Cylinder>

      {/* Flash */}
      <RoundedBox args={[0.3, 0.3, 0.1]} radius={0.02} position={[0.4, 0.3, 0]}>
        <meshStandardMaterial color="#e0e0e0" roughness={0.2} metalness={0.8} />
      </RoundedBox>

      {/* Viewfinder */}
      <RoundedBox args={[0.4, 0.3, 0.2]} radius={0.02} position={[0, 0.4, -0.2]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.3} />
      </RoundedBox>

      {/* Buttons */}
      <Sphere args={[0.05, 16, 16]} position={[0.5, 0.3, -0.2]}>
        <meshStandardMaterial color="red" roughness={0.3} metalness={0.7} />
      </Sphere>
      <Cylinder args={[0.05, 0.05, 0.05, 16]} position={[0.5, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#4a4a4a" roughness={0.5} metalness={0.5} />
      </Cylinder>

      {/* Mode dial */}
      <Cylinder args={[0.1, 0.1, 0.05, 32]} position={[-0.4, 0.4, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#4a4a4a" roughness={0.5} metalness={0.5} />
      </Cylinder>

      {/* Strap holders */}
      <Cylinder args={[0.05, 0.05, 0.2, 16]} position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#4a4a4a" roughness={0.5} metalness={0.5} />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.2, 16]} position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#4a4a4a" roughness={0.5} metalness={0.5} />
      </Cylinder>

      {/* LCD Screen */}
      <RoundedBox args={[0.8, 0.6, 0.02]} radius={0.01} position={[0, 0, -0.31]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial 
          map={texture}
          roughness={0.5} 
          metalness={0.3} 
        />
      </RoundedBox>
      {/* Camera brand text */}
      <Text
        position={[-0.4, 0, 0.31]}
        rotation={[0, 0, 0]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        FV
      </Text>

      {/* Hot shoe */}
      <RoundedBox args={[0.2, 0.05, 0.2]} radius={0.01} position={[0, 0.425, -0.1]}>
        <meshStandardMaterial color="#4a4a4a" roughness={0.5} metalness={0.5} />
      </RoundedBox>
    </group>
  )
}

