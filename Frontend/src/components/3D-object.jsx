import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function ThreeDobject() {
  function Model() {
    const { scene } = useGLTF('/Object.glb');

    // Анимация
    useFrame(() => {
      scene.rotation.y += 0.01;
      scene.rotation.x += 0.01;
    });

    return <primitive object={scene} scale={1} className="w-20" />;
  }
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />

      <Model />

      <OrbitControls />
    </Canvas>
  );
}
