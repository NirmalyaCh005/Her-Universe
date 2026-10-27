import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface BirthdayCake3DProps {
  position?: [number, number, number];
  scale?: number;
  isBlownOut?: boolean;
}

export const BirthdayCake3D: React.FC<BirthdayCake3DProps> = ({
  position = [0, -0.65, 0],
  scale = 1.0,
  isBlownOut = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const flameOuterRef = useRef<THREE.Mesh>(null);
  const flameInnerRef = useRef<THREE.Mesh>(null);
  const candleLightRef = useRef<THREE.PointLight>(null);
  const smokeGroupRef = useRef<THREE.Group>(null);
  const holoRing1Ref = useRef<THREE.Mesh>(null);
  const holoRing2Ref = useRef<THREE.Mesh>(null);
  const sparklesGroupRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);

  // ==========================================
  // Premium Holographic & Radiant 3D Materials
  // ==========================================
  const materials = useMemo(() => {
    // 1. Velvet Bottom Tier: Radiant strawberry rose-gold cream
    const bottomTier = new THREE.MeshStandardMaterial({
      color: '#FF6B99',
      roughness: 0.28,
      metalness: 0.2,
      emissive: new THREE.Color('#FF407A'),
      emissiveIntensity: 0.3,
    });

    // 2. Top Tier: Pearlescent holographic cream with lilac radiance
    const topTier = new THREE.MeshStandardMaterial({
      color: '#FFF2F8',
      roughness: 0.2,
      metalness: 0.25,
      emissive: new THREE.Color('#F7D5F8'),
      emissiveIntensity: 0.25,
    });

    // 3. Mirror Drip Glaze: Super glossy reflective hot-pink drip
    const mirrorGlaze = new THREE.MeshStandardMaterial({
      color: '#FF2E74',
      roughness: 0.1,
      metalness: 0.35,
      emissive: new THREE.Color('#FF0055'),
      emissiveIntensity: 0.35,
    });

    // 4. Piped Buttercream Frosting
    const buttercream = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.22,
      metalness: 0.05,
      emissive: new THREE.Color('#FFF5FA'),
      emissiveIntensity: 0.2,
    });

    // 5. Golden Edible Pearls & Gold Foil Accents
    const goldPearls = new THREE.MeshStandardMaterial({
      color: '#FFD700',
      roughness: 0.15,
      metalness: 0.9,
      emissive: new THREE.Color('#FFA500'),
      emissiveIntensity: 0.45,
    });

    // 6. Realistic Strawberry: Juicy red with high gloss
    const strawberry = new THREE.MeshStandardMaterial({
      color: '#FF1A53',
      roughness: 0.16,
      metalness: 0.15,
      emissive: new THREE.Color('#B30026'),
      emissiveIntensity: 0.25,
    });

    // 7. Strawberry Green Leaf (Calyx)
    const strawberryLeaf = new THREE.MeshStandardMaterial({
      color: '#2ECC71',
      roughness: 0.45,
      metalness: 0.05,
      emissive: new THREE.Color('#1B8A49'),
      emissiveIntensity: 0.15,
    });

    // 8. French Macaron Shells (Pastel Lavender & Pink)
    const macaronPink = new THREE.MeshStandardMaterial({
      color: '#FFA8CA',
      roughness: 0.35,
      metalness: 0.1,
      emissive: new THREE.Color('#FF6699'),
      emissiveIntensity: 0.2,
    });
    const macaronLavender = new THREE.MeshStandardMaterial({
      color: '#DCB8FF',
      roughness: 0.35,
      metalness: 0.1,
      emissive: new THREE.Color('#9B59B6'),
      emissiveIntensity: 0.2,
    });
    const macaronFilling = new THREE.MeshStandardMaterial({
      color: '#FFF9FD',
      roughness: 0.25,
      metalness: 0.05,
      emissive: new THREE.Color('#FFFFFF'),
      emissiveIntensity: 0.2,
    });

    // 9. Luxurious Ceramic / Frosted Glass Pedestal
    const pedestal = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.12,
      metalness: 0.3,
      emissive: new THREE.Color('#FFEBF5'),
      emissiveIntensity: 0.2,
    });

    // 10. Golden Spiral Candle
    const candleStick = new THREE.MeshStandardMaterial({
      color: '#FFF0B3',
      roughness: 0.2,
      metalness: 0.7,
      emissive: new THREE.Color('#FFD700'),
      emissiveIntensity: 0.35,
    });

    // 11. Realistic Dual-Layer Flame
    const flameOuter = new THREE.MeshStandardMaterial({
      color: '#FFA500',
      roughness: 0.05,
      metalness: 0.1,
      emissive: new THREE.Color('#FF4500'),
      emissiveIntensity: 2.8,
      transparent: true,
      opacity: 0.92,
    });

    const flameInner = new THREE.MeshBasicMaterial({
      color: '#E0FFFF', // Light cyan/white hot core
    });

    // 12. Hologram Ethereal Orbiting Rings
    const holoRing1 = new THREE.MeshBasicMaterial({
      color: '#FF6FAE',
      transparent: true,
      opacity: 0.75,
      wireframe: true,
    });

    const holoRing2 = new THREE.MeshBasicMaterial({
      color: '#00F0FF',
      transparent: true,
      opacity: 0.65,
      wireframe: true,
    });

    // 13. Hologram Scanline Laser Disc
    const scanLine = new THREE.MeshBasicMaterial({
      color: '#00F5FF',
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });

    // 14. Holographic Column / Pedestal Aura
    const holoBeam = new THREE.MeshBasicMaterial({
      color: '#FF9EC6',
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });

    return {
      bottomTier,
      topTier,
      mirrorGlaze,
      buttercream,
      goldPearls,
      strawberry,
      strawberryLeaf,
      macaronPink,
      macaronLavender,
      macaronFilling,
      pedestal,
      candleStick,
      flameOuter,
      flameInner,
      holoRing1,
      holoRing2,
      scanLine,
      holoBeam,
    };
  }, []);

  // Frame animation loop: Hologram orbital spins, candle flickers, gentle floating
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle floating bob
      groupRef.current.position.y = position[1] + Math.sin(t * 1.6) * 0.05;
      groupRef.current.rotation.y = t * 0.3;
    }

    // Hologram rings spinning in opposite directions
    if (holoRing1Ref.current) {
      holoRing1Ref.current.rotation.x = Math.sin(t * 0.8) * 0.3 + 0.4;
      holoRing1Ref.current.rotation.z = t * 0.6;
    }
    if (holoRing2Ref.current) {
      holoRing2Ref.current.rotation.x = -Math.cos(t * 0.7) * 0.35 - 0.4;
      holoRing2Ref.current.rotation.z = -t * 0.5;
    }

    // Hologram vertical scan line
    if (scanLineRef.current) {
      scanLineRef.current.position.y = 0.65 + Math.sin(t * 2.2) * 0.6;
    }

    // Sparkles floating
    if (sparklesGroupRef.current) {
      sparklesGroupRef.current.rotation.y = -t * 0.2;
    }

    // Realistic Candle Flame Flicker
    if (flameOuterRef.current && candleLightRef.current && flameInnerRef.current) {
      if (!isBlownOut) {
        const flicker = 1 + Math.sin(t * 22) * 0.12 + Math.cos(t * 31) * 0.08;
        flameOuterRef.current.scale.set(flicker, flicker * 1.15, flicker);
        flameInnerRef.current.scale.set(flicker * 0.85, flicker * 0.95, flicker * 0.85);
        flameOuterRef.current.visible = true;
        flameInnerRef.current.visible = true;
        candleLightRef.current.intensity = 2.8 * flicker;
      } else {
        flameOuterRef.current.visible = false;
        flameInnerRef.current.visible = false;
        candleLightRef.current.intensity = 0;
      }
    }

    // Wisps of Pearlescent Smoke when blown out
    if (smokeGroupRef.current && isBlownOut) {
      smokeGroupRef.current.position.y += 0.012;
      smokeGroupRef.current.scale.multiplyScalar(1.008);
      smokeGroupRef.current.rotation.y += 0.025;
    }
  });

  // Calculate decorative positions
  // Bottom tier buttercream rosettes
  const bottomRosettes = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      const r = 1.08;
      return [Math.cos(angle) * r, 0.44, Math.sin(angle) * r] as [number, number, number];
    });
  }, []);

  // Top tier frosting shells & golden pearls
  const topShells = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const r = 0.74;
      return [Math.cos(angle) * r, 1.05, Math.sin(angle) * r] as [number, number, number];
    });
  }, []);

  // Drips running down the bottom tier
  const bottomDrips = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const angle = (i / 12) * Math.PI * 2 + 0.15;
      const r = 1.03;
      const dripHeight = (i % 2 === 0 ? 0.22 : 0.14) + Math.sin(i * 3) * 0.04;
      return {
        pos: [Math.cos(angle) * r, 0.38 - dripHeight / 2, Math.sin(angle) * r] as [number, number, number],
        height: dripHeight,
      };
    });
  }, []);

  // Strawberries arrangement
  const strawberries = useMemo(() => {
    return [
      { pos: [-0.38, 1.15, 0.28], rot: [0.1, 0.3, -0.15] },
      { pos: [0.38, 1.15, 0.26], rot: [-0.1, -0.4, 0.2] },
      { pos: [0.0, 1.15, -0.42], rot: [-0.2, 0, 0] },
      { pos: [-0.35, 1.15, -0.25], rot: [0.15, 0.8, -0.1] },
      { pos: [0.36, 1.15, -0.22], rot: [0.1, -0.7, 0.15] },
    ];
  }, []);

  // Cute French Macarons nestled on top
  const macarons = useMemo(() => {
    return [
      { pos: [-0.22, 1.12, 0.44], rot: [0.4, 0.2, -0.2], type: 'pink' },
      { pos: [0.22, 1.12, 0.44], rot: [0.4, -0.2, 0.2], type: 'lavender' },
    ];
  }, []);

  return (
    <>
      {/* ======================================================== */}
      {/* 1. FIXED STUDIO LIGHTS (Always illuminating the cake)    */}
      {/* ======================================================== */}
      <ambientLight intensity={2.2} color="#FFF8FC" />
      <directionalLight position={[4.0, 6.0, 5.0]} intensity={2.5} color="#FFFFFF" />
      <directionalLight position={[-4.0, 4.5, -3.5]} intensity={2.0} color="#FF9EC6" />
      <pointLight position={[0, 0.2, 2.5]} intensity={1.8} color="#FFE6F0" />
      <pointLight position={[0, -1.2, 0]} intensity={2.8} color="#FF7EA8" distance={5} />

      {/* Interactive 360 Degree Drag Rotation */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minPolarAngle={Math.PI / 4}
      />

      {/* ======================================================== */}
      {/* 2. ROTATING HOLOGRAPHIC CAKE GROUP                       */}
      {/* ======================================================== */}
      <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
        {/* Primary Tilted Holographic Ring (Neon Pink) */}
        <mesh ref={holoRing1Ref} position={[0, 0.65, 0]} material={materials.holoRing1}>
          <torusGeometry args={[1.68, 0.018, 16, 64]} />
        </mesh>

        {/* Secondary Counter-Tilted Holographic Ring (Cyan/Lilac) */}
        <mesh ref={holoRing2Ref} position={[0, 0.65, 0]} material={materials.holoRing2}>
          <torusGeometry args={[1.54, 0.016, 16, 64]} />
        </mesh>

        {/* Hologram Vertical Scan Line Disc */}
        <mesh ref={scanLineRef} position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.scanLine}>
          <ringGeometry args={[0.2, 1.45, 32]} />
        </mesh>

        {/* Holographic Column Underglow Aura */}
        <mesh position={[0, 0.35, 0]} material={materials.holoBeam}>
          <cylinderGeometry args={[1.75, 1.85, 2.2, 32, 1, true]} />
        </mesh>

        {/* Orbiting Stardust Sparkles */}
        <group ref={sparklesGroupRef}>
          {[
            [-1.85, 0.8, 0.4],
            [1.75, 0.5, -0.6],
            [-1.4, 1.3, -0.8],
            [1.5, 1.2, 0.7],
            [0.8, -0.2, 1.6],
            [-0.9, -0.3, -1.5],
          ].map((pos, idx) => (
            <mesh key={`sp-${idx}`} position={pos as [number, number, number]} scale={0.12}>
              <octahedronGeometry args={[0.5, 0]} />
              <meshBasicMaterial color={idx % 2 === 0 ? '#FFD700' : '#00F0FF'} />
            </mesh>
          ))}
        </group>

        {/* ======================================================== */}
        {/* 3. LUXURY CAKE PEDESTAL / STAND                          */}
        {/* ======================================================== */}
        {/* Mirror Glass Cake Plate */}
        <mesh position={[0, -0.06, 0]} material={materials.pedestal}>
          <cylinderGeometry args={[1.38, 1.44, 0.12, 48]} />
        </mesh>

        {/* Pedestal Gold Rim Trim */}
        <mesh position={[0, -0.04, 0]} material={materials.goldPearls}>
          <torusGeometry args={[1.42, 0.025, 16, 48]} />
        </mesh>

        {/* Pedestal Stem & Base */}
        <mesh position={[0, -0.28, 0]} material={materials.pedestal}>
          <cylinderGeometry args={[0.42, 0.65, 0.34, 32]} />
        </mesh>
        <mesh position={[0, -0.48, 0]} material={materials.pedestal}>
          <cylinderGeometry args={[0.95, 1.05, 0.12, 40]} />
        </mesh>

        {/* ======================================================== */}
        {/* 4. BOTTOM CAKE TIER (Strawberry Velvet Cream)            */}
        {/* ======================================================== */}
        <mesh position={[0, 0.22, 0]} material={materials.bottomTier}>
          <cylinderGeometry args={[1.04, 1.04, 0.46, 48]} />
        </mesh>

        {/* Bottom Mirror Drip Glaze Cap */}
        <mesh position={[0, 0.44, 0]} material={materials.mirrorGlaze}>
          <cylinderGeometry args={[1.06, 1.06, 0.06, 48]} />
        </mesh>

        {/* Dripping Chocolate Glaze Runs down Bottom Tier */}
        {bottomDrips.map((drip, idx) => (
          <mesh key={`drip-${idx}`} position={drip.pos} material={materials.mirrorGlaze}>
            <cylinderGeometry args={[0.04, 0.015, drip.height, 12]} />
          </mesh>
        ))}

        {/* 18 Piped Buttercream Rosettes Around Base */}
        {bottomRosettes.map((pos, idx) => (
          <group key={`br-${idx}`} position={pos}>
            <mesh material={materials.buttercream}>
              <sphereGeometry args={[0.085, 16, 16]} />
            </mesh>
            {/* Edible Gold Pearl in center of every rosette */}
            <mesh position={[0, 0.04, 0]} material={materials.goldPearls}>
              <sphereGeometry args={[0.038, 12, 12]} />
            </mesh>
          </group>
        ))}

        {/* ======================================================== */}
        {/* 5. TOP CAKE TIER (Pearlescent Holographic Glaze)         */}
        {/* ======================================================== */}
        <mesh position={[0, 0.76, 0]} material={materials.topTier}>
          <cylinderGeometry args={[0.72, 0.72, 0.62, 48]} />
        </mesh>

        {/* Top Mirror Glaze Cap */}
        <mesh position={[0, 1.06, 0]} material={materials.mirrorGlaze}>
          <cylinderGeometry args={[0.74, 0.74, 0.06, 48]} />
        </mesh>

        {/* 14 Piped Shells with Pearls on Top Rim */}
        {topShells.map((pos, idx) => (
          <group key={`ts-${idx}`} position={pos}>
            <mesh material={materials.buttercream}>
              <sphereGeometry args={[0.075, 14, 14]} />
            </mesh>
            <mesh position={[0, 0.04, 0]} material={materials.goldPearls}>
              <sphereGeometry args={[0.032, 10, 10]} />
            </mesh>
          </group>
        ))}

        {/* Golden Wafer Plaque reading "JIYA 💖" */}
        <group position={[0, 0.76, 0.74]}>
          <mesh material={materials.goldPearls}>
            <boxGeometry args={[0.55, 0.22, 0.03]} />
          </mesh>
        </group>

        {/* ======================================================== */}
        {/* 6. FRESH TOPPINGS: Strawberries & French Macarons        */}
        {/* ======================================================== */}
        {/* Juicy Glazed Strawberries with Green Leaf Calyx */}
        {strawberries.map((sb, idx) => (
          <group
            key={`sb-${idx}`}
            position={sb.pos as [number, number, number]}
            rotation={sb.rot as [number, number, number]}
          >
            {/* Strawberry Body */}
            <mesh material={materials.strawberry} scale={[0.85, 1.25, 0.85]}>
              <coneGeometry args={[0.13, 0.26, 16]} />
            </mesh>
            {/* Green Calyx Star Leaves */}
            {[-0.05, 0.05, 0.0].map((lx, lIdx) => (
              <mesh key={`sb-leaf-${lIdx}`} position={[lx, 0.13, 0]} material={materials.strawberryLeaf}>
                <cylinderGeometry args={[0.07, 0.07, 0.02, 5]} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Delicate French Macarons */}
        {macarons.map((mac, idx) => (
          <group
            key={`mac-${idx}`}
            position={mac.pos as [number, number, number]}
            rotation={mac.rot as [number, number, number]}
            scale={0.9}
          >
            <mesh
              position={[0, 0.04, 0]}
              material={mac.type === 'pink' ? materials.macaronPink : materials.macaronLavender}
            >
              <cylinderGeometry args={[0.11, 0.11, 0.045, 16]} />
            </mesh>
            <mesh position={[0, 0, 0]} material={materials.macaronFilling}>
              <cylinderGeometry args={[0.095, 0.095, 0.035, 16]} />
            </mesh>
            <mesh
              position={[0, -0.04, 0]}
              material={mac.type === 'pink' ? materials.macaronPink : materials.macaronLavender}
            >
              <cylinderGeometry args={[0.11, 0.11, 0.045, 16]} />
            </mesh>
          </group>
        ))}

        {/* ======================================================== */}
        {/* 7. REALISTIC CANDLE & DUAL-LAYER ANIMATED FLAME          */}
        {/* ======================================================== */}
        {/* Candle Stick */}
        <mesh position={[0, 1.34, 0]} material={materials.candleStick}>
          <cylinderGeometry args={[0.052, 0.052, 0.52, 24]} />
        </mesh>

        {/* Spiral Gold Ridge Stripe */}
        <mesh position={[0, 1.34, 0]} material={materials.goldPearls}>
          <torusGeometry args={[0.056, 0.012, 12, 24]} />
        </mesh>

        {/* Dark Wick */}
        <mesh position={[0, 1.62, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.08, 8]} />
          <meshBasicMaterial color="#222222" />
        </mesh>

        {/* Outer Flame (Warm Golden-Orange Radiant Cone) */}
        <mesh ref={flameOuterRef} position={[0, 1.72, 0]} material={materials.flameOuter}>
          <coneGeometry args={[0.075, 0.22, 16]} />
        </mesh>

        {/* Inner Flame (White-Hot Luminous Core) */}
        <mesh ref={flameInnerRef} position={[0, 1.68, 0]} material={materials.flameInner}>
          <coneGeometry args={[0.038, 0.12, 12]} />
        </mesh>

        {/* Candle Light Illuminating the Cake and Room */}
        <pointLight
          ref={candleLightRef}
          position={[0, 1.75, 0]}
          color="#FFA500"
          intensity={2.8}
          distance={5.0}
        />

        {/* Pearlescent Smoke when candles blown out */}
        {isBlownOut && (
          <group ref={smokeGroupRef} position={[0, 1.68, 0]}>
            <mesh position={[0, 0.06, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color="#FFFFFF" transparent opacity={0.65} roughness={0.8} />
            </mesh>
            <mesh position={[0.05, 0.15, 0.03]}>
              <sphereGeometry args={[0.11, 12, 12]} />
              <meshStandardMaterial color="#FFF0F5" transparent opacity={0.45} roughness={0.8} />
            </mesh>
            <mesh position={[-0.04, 0.25, -0.02]}>
              <sphereGeometry args={[0.14, 12, 12]} />
              <meshStandardMaterial color="#E0FFFF" transparent opacity={0.3} roughness={0.8} />
            </mesh>
          </group>
        )}
      </group>
    </>
  );
};

export default BirthdayCake3D;
