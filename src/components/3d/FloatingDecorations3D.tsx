import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingDecorationsProps {
  interactive?: boolean;
}

export const FloatingDecorations3D: React.FC<FloatingDecorationsProps> = () => {
  const starsGroupRef = useRef<THREE.Group>(null);
  const heartsGroupRef = useRef<THREE.Group>(null);

  // Heart shape
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0.15);
  heartShape.bezierCurveTo(0, 0.35, -0.3, 0.35, -0.3, 0.15);
  heartShape.bezierCurveTo(-0.3, 0, -0.15, -0.15, 0, -0.3);
  heartShape.bezierCurveTo(0.15, -0.15, 0.3, 0, 0.3, 0.15);
  heartShape.bezierCurveTo(0.3, 0.35, 0, 0.35, 0, 0.15);

  const extrudeSettings = {
    depth: 0.08,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (starsGroupRef.current) {
      starsGroupRef.current.rotation.y = t * 0.15;
    }
    if (heartsGroupRef.current) {
      heartsGroupRef.current.position.y = Math.sin(t * 1.2) * 0.1;
      heartsGroupRef.current.rotation.y = -t * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 2]} intensity={1.0} color="#FFF5FA" />

      {/* Orbiting Golden Stars */}
      <group ref={starsGroupRef}>
        {[
          [-1.8, 1.2, -0.5],
          [1.8, 1.0, -0.2],
          [-1.5, -1.2, 0.3],
          [1.6, -1.0, 0.5],
        ].map((pos, idx) => (
          <mesh key={`star-${idx}`} position={pos as [number, number, number]} scale={0.25}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive={new THREE.Color('#FFA500')}
              emissiveIntensity={0.6}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Floating Pastel Hearts */}
      <group ref={heartsGroupRef}>
        {[
          [-1.4, 0.6, 0.4, '#FF6FAE', -0.3],
          [1.3, -0.3, -0.3, '#FF3F8E', 0.4],
          [-0.9, -1.1, -0.5, '#FFC0D9', 0.2],
          [1.1, 1.3, -0.4, '#E75480', -0.2],
        ].map(([x, y, z, color, rot], idx) => (
          <mesh
            key={`heart-${idx}`}
            position={[Number(x), Number(y), Number(z)]}
            rotation={[Math.PI, 0, Number(rot)]}
            scale={0.5}
          >
            <extrudeGeometry args={[heartShape, extrudeSettings]} />
            <meshStandardMaterial
              color={String(color)}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
        ))}
      </group>

      {/* Soft Pastel Cloud */}
      <group position={[0, -1.6, -0.8]} scale={0.7}>
        <mesh position={[-0.4, 0, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.8} transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.65, 16, 16]} />
          <meshStandardMaterial color="#FFF5FA" roughness={0.8} transparent opacity={0.85} />
        </mesh>
        <mesh position={[0.4, 0, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.8} transparent opacity={0.85} />
        </mesh>
      </group>
    </>
  );
};

export default FloatingDecorations3D;
