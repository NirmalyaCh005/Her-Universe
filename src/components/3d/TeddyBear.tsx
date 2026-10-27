import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import sound from '../../services/audio';

interface TeddyBearProps {
  position?: [number, number, number];
  scale?: number;
  interactive?: boolean;
  onInteract?: () => void;
}

/**
 * Procedurally generates soft golden-honey plush fur texture
 */
function createPlushFurTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Warm honey-caramel plush base
  ctx.fillStyle = '#B88254';
  ctx.fillRect(0, 0, 512, 512);

  // Soft natural plush fibers
  const furColors = [
    'rgba(209, 155, 107, 0.4)',
    'rgba(163, 107, 62, 0.35)',
    'rgba(230, 180, 135, 0.3)',
    'rgba(138, 86, 46, 0.25)',
  ];

  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const len = 3 + Math.random() * 6;
    const angle = Math.random() * Math.PI * 2;
    ctx.strokeStyle = furColors[Math.floor(Math.random() * furColors.length)];
    ctx.lineWidth = 1 + Math.random();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedural suede velvet footpad texture with perimeter stitch dashes
 */
function createFootPadTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Soft velour pink background
  ctx.fillStyle = '#FFCADC';
  ctx.fillRect(0, 0, 256, 256);

  // Soft velvet grain
  for (let i = 0; i < 1000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.15)' : 'rgba(219, 138, 168, 0.18)';
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
  }

  // Perimeter stitch dashes
  ctx.strokeStyle = '#D97398';
  ctx.lineWidth = 4;
  ctx.setLineDash([8, 8]);
  ctx.strokeRect(16, 16, 224, 224);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const TeddyBear: React.FC<TeddyBearProps> = ({
  position = [0, 0, 0],
  scale = 1.15,
  interactive = true,
  onInteract,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const heartRef = useRef<THREE.Mesh>(null);
  const holoRing1Ref = useRef<THREE.Mesh>(null);
  const holoRing2Ref = useRef<THREE.Mesh>(null);
  const holoBeamRef = useRef<THREE.Mesh>(null);
  const ribbonTailLeftRef = useRef<THREE.Mesh>(null);
  const ribbonTailRightRef = useRef<THREE.Mesh>(null);
  const burstHeartsRef = useRef<THREE.Group>(null);

  const [bounce, setBounce] = useState<number>(0);
  const [glowPulse, setGlowPulse] = useState<number>(1.0);
  const [burstActive, setBurstActive] = useState<boolean>(false);

  // Check reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Textures
  const furTexture = useMemo(() => createPlushFurTexture(), []);
  const footPadTexture = useMemo(() => createFootPadTexture(), []);

  // Heart shape geometry
  const heartShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.22);
    s.bezierCurveTo(0, 0.48, -0.42, 0.48, -0.42, 0.22);
    s.bezierCurveTo(-0.42, 0, -0.2, -0.22, 0, -0.42);
    s.bezierCurveTo(0.2, -0.22, 0.42, 0, 0.42, 0.22);
    s.bezierCurveTo(0.42, 0.48, 0, 0.48, 0, 0.22);
    return s;
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      depth: 0.16,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    }),
    []
  );

  // Premium Realistic & Holographic Materials
  const materials = useMemo(() => {
    // 1. Soft Warm Honey Plush Fur Material
    const fur = new THREE.MeshStandardMaterial({
      color: '#B57E52',
      map: furTexture,
      roughness: 0.92,
      metalness: 0.02,
      emissive: new THREE.Color('#4A2912'),
      emissiveIntensity: 0.18,
    });

    // 2. Soft Velour Cream Snout & Belly Patch
    const velourMuzzle = new THREE.MeshStandardMaterial({
      color: '#FAF0E6',
      roughness: 0.9,
      metalness: 0.02,
      emissive: new THREE.Color('#FFF8F2'),
      emissiveIntensity: 0.15,
    });

    // 3. Embroidered Espresso Leather Nose & Mouth
    const leatherNose = new THREE.MeshStandardMaterial({
      color: '#1F0F07',
      roughness: 0.45,
      metalness: 0.1,
      emissive: new THREE.Color('#100602'),
      emissiveIntensity: 0.1,
    });

    // 4. Ultra-Glossy Obsidian Safety Eyes (Classic Teddy Bear Glass Button Eyes)
    const glassEye = new THREE.MeshStandardMaterial({
      color: '#120703',
      roughness: 0.04,
      metalness: 0.15,
      emissive: new THREE.Color('#160904'),
      emissiveIntensity: 0.15,
    });

    // 5. Pink Suede Inner Ears & Footpads
    const footpad = new THREE.MeshStandardMaterial({
      map: footPadTexture,
      roughness: 0.85,
      metalness: 0.02,
      emissive: new THREE.Color('#FFB8D2'),
      emissiveIntensity: 0.15,
    });

    // 6. Pink Satin Ribbon & Bow (Neck)
    const satinRibbon = new THREE.MeshStandardMaterial({
      color: '#FF6FAE',
      roughness: 0.16,
      metalness: 0.35,
      emissive: new THREE.Color('#E11D48'),
      emissiveIntensity: 0.25,
    });

    // 7. Glowing Romantic Heart Held in Paws
    const rubyHeart = new THREE.MeshStandardMaterial({
      color: '#FF2E74',
      roughness: 0.18,
      metalness: 0.25,
      emissive: new THREE.Color('#FF1464'),
      emissiveIntensity: 0.55,
    });

    // 8. Soft Blushing Cheeks (Gentle Translucent Glow)
    const rosyCheek = new THREE.MeshBasicMaterial({
      color: '#FF9EB5',
      transparent: true,
      opacity: 0.45,
    });

    // 9. Holographic Cyan Ring (Orbiting around waist/heart)
    const holoCyan = new THREE.MeshStandardMaterial({
      color: '#00F5FF',
      emissive: new THREE.Color('#00F5FF'),
      emissiveIntensity: 2.2 * glowPulse,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    // 10. Holographic Magenta Ring (Orbiting around waist/heart)
    const holoMagenta = new THREE.MeshStandardMaterial({
      color: '#FF007F',
      emissive: new THREE.Color('#FF007F'),
      emissiveIntensity: 2.2 * glowPulse,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    // 11. Hologram Vertical Light Beam Column
    const holoLightBeam = new THREE.MeshBasicMaterial({
      color: '#FF80BF',
      transparent: true,
      opacity: 0.07 * glowPulse,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return {
      fur,
      velourMuzzle,
      leatherNose,
      glassEye,
      footpad,
      satinRibbon,
      rubyHeart,
      rosyCheek,
      holoCyan,
      holoMagenta,
      holoLightBeam,
    };
  }, [furTexture, footPadTexture, glowPulse]);

  // Gentle Romantic Idle Animation & Hologram Dynamics Loop
  useFrame((state) => {
    if (prefersReducedMotion) return;

    const t = state.clock.getElapsedTime();

    // 1. Teddy floating levitation & gentle body sway
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.05 + bounce * 0.12;
      groupRef.current.rotation.y = Math.sin(t * 0.75) * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 1.1) * 0.025;
    }

    // 2. Cute Head Tilt
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 1.2) * 0.04;
      headRef.current.rotation.x = Math.sin(t * 1.4) * 0.025;
    }

    // 3. Heartbeat Pulse
    if (heartRef.current) {
      const pulse = 1 + Math.sin(t * 4.2) * 0.04;
      heartRef.current.scale.set(pulse, pulse, pulse);
    }

    // 4. Ribbon Tail Flutter
    if (ribbonTailLeftRef.current && ribbonTailRightRef.current) {
      ribbonTailLeftRef.current.rotation.z = -0.25 + Math.sin(t * 2.0) * 0.05;
      ribbonTailRightRef.current.rotation.z = 0.25 + Math.sin(t * 2.0 + 0.5) * 0.05;
    }

    // 5. Hologram Planetary Rings Rotation around Teddy
    if (holoRing1Ref.current) {
      holoRing1Ref.current.rotation.z = t * 0.55;
    }
    if (holoRing2Ref.current) {
      holoRing2Ref.current.rotation.z = -t * 0.45;
    }

    // 6. Click Burst Hearts Animation
    if (burstHeartsRef.current && burstActive) {
      burstHeartsRef.current.children.forEach((child) => {
        child.position.y += 0.015;
        child.scale.multiplyScalar(0.975);
      });
    }
  });

  // Tap / Click Interaction: Bounce + Glow Flash + Sound + Hearts
  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!interactive) return;

    sound.playPop();
    setBounce(1);
    setGlowPulse(2.4);
    setBurstActive(true);

    if (onInteract) {
      onInteract();
    }

    setTimeout(() => {
      setBounce(0);
      setGlowPulse(1.0);
    }, 550);

    setTimeout(() => {
      setBurstActive(false);
    }, 1500);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      scale={[scale, scale, scale]}
      onClick={handleClick}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      {/* ========================================================= */}
      {/* 1. CINEMATIC STUDIO & HOLOGRAPHIC RIM LIGHTING            */}
      {/* ========================================================= */}
      <ambientLight intensity={1.6} color="#FFF5F8" />
      {/* Key front-right warm light */}
      <directionalLight position={[2.5, 3.5, 3]} intensity={1.7} color="#FFF8F0" />
      {/* Soft fill light from left */}
      <directionalLight position={[-2.5, 2, 2]} intensity={1.0} color="#FCE7F3" />
      {/* Subtle Cyan Holographic Rim Light (Back-Left) */}
      <pointLight position={[-3, 1.2, -2]} intensity={2.0} color="#00F5FF" distance={7} />
      {/* Subtle Pink Holographic Rim Light (Back-Right) */}
      <pointLight position={[3, 1.5, -2]} intensity={2.2} color="#FF007F" distance={7} />
      {/* Upward Projector Emitter Light */}
      <pointLight position={[0, -0.7, 0.4]} intensity={1.6 * glowPulse} color="#FF6FAE" distance={4} />

      {/* ========================================================= */}
      {/* 2. 3D HOLOGRAPHIC PROJECTOR PEDESTAL & LIGHT BEAM        */}
      {/* ========================================================= */}
      {/* Floor Projector Platform beneath Teddy's feet */}
      <group position={[0, -0.76, 0]}>
        {/* Outer Cyan Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.95, 1.15, 48]} />
          <meshBasicMaterial
            color="#00F5FF"
            transparent
            opacity={0.4 * glowPulse}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Inner Magenta Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.75, 48]} />
          <meshBasicMaterial
            color="#FF007F"
            transparent
            opacity={0.45 * glowPulse}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Center Glowing Lens */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.35, 32]} />
          <meshBasicMaterial
            color="#FF6FAE"
            transparent
            opacity={0.3 * glowPulse}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Projector Emitter Markings */}
        {[0, 45, 90, 135].map((deg, idx) => (
          <mesh key={`spoke-${idx}`} rotation={[-Math.PI / 2, 0, (deg * Math.PI) / 180]}>
            <planeGeometry args={[0.025, 2.2]} />
            <meshBasicMaterial color="#00F5FF" transparent opacity={0.25} />
          </mesh>
        ))}
      </group>

      {/* Upward Hologram Projection Column Enclosing Teddy */}
      <mesh ref={holoBeamRef} position={[0, 0.05, 0]} material={materials.holoLightBeam}>
        <cylinderGeometry args={[1.05, 0.65, 1.7, 32, 1, true]} />
      </mesh>

      {/* Hologram Gyroscope Rings Orbiting gracefully around Waist/Heart */}
      <group position={[0, -0.06, 0]}>
        {/* Cyan Orbiting Ring (Tilted at 55 deg) */}
        <mesh
          ref={holoRing1Ref}
          rotation={[Math.PI / 3.2, 0.2, 0]}
          material={materials.holoCyan}
        >
          <torusGeometry args={[1.08, 0.012, 12, 48]} />
        </mesh>
        {/* Magenta Orbiting Ring (Tilted at -45 deg) */}
        <mesh
          ref={holoRing2Ref}
          rotation={[-Math.PI / 3.6, -0.25, 0]}
          material={materials.holoMagenta}
        >
          <torusGeometry args={[0.96, 0.012, 12, 48]} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 3. REALISTIC SCULPTED PLUSH TEDDY BEAR                   */}
      {/* ========================================================= */}
      {/* Body / Torso */}
      <group position={[0, -0.16, 0]}>
        {/* Main Body */}
        <mesh material={materials.fur} scale={[1.0, 1.12, 0.9]}>
          <sphereGeometry args={[0.5, 36, 36]} />
        </mesh>

        {/* Soft Velour Belly Patch */}
        <mesh
          position={[0, 0.02, 0.38]}
          scale={[0.8, 0.92, 0.26]}
          material={materials.velourMuzzle}
        >
          <sphereGeometry args={[0.36, 28, 28]} />
        </mesh>

        {/* Subtle Hand-Stitched Tummy Seam */}
        <mesh position={[0, 0.02, 0.47]}>
          <planeGeometry args={[0.01, 0.42]} />
          <meshBasicMaterial color="#7D4620" />
        </mesh>
      </group>

      {/* Seated Plush Legs & Footpads */}
      {/* Left Seated Leg */}
      <group position={[-0.38, -0.52, 0.18]} rotation={[0.35, 0.2, -0.22]}>
        <mesh material={materials.fur}>
          <capsuleGeometry args={[0.19, 0.3, 20, 20]} />
        </mesh>
        {/* Foot Sole Pad (Main Pad + 3 Toe Dots) */}
        <group position={[0, -0.13, 0.19]} rotation={[-0.2, 0, 0]}>
          <mesh material={materials.footpad}>
            <circleGeometry args={[0.11, 20]} />
          </mesh>
          <mesh position={[-0.06, 0.1, 0.005]} material={materials.footpad}>
            <circleGeometry args={[0.03, 12]} />
          </mesh>
          <mesh position={[0, 0.125, 0.005]} material={materials.footpad}>
            <circleGeometry args={[0.034, 12]} />
          </mesh>
          <mesh position={[0.06, 0.1, 0.005]} material={materials.footpad}>
            <circleGeometry args={[0.03, 12]} />
          </mesh>
        </group>
      </group>

      {/* Right Seated Leg */}
      <group position={[0.38, -0.52, 0.18]} rotation={[0.35, -0.2, 0.22]}>
        <mesh material={materials.fur}>
          <capsuleGeometry args={[0.19, 0.3, 20, 20]} />
        </mesh>
        {/* Foot Sole Pad (Main Pad + 3 Toe Dots) */}
        <group position={[0, -0.13, 0.19]} rotation={[-0.2, 0, 0]}>
          <mesh material={materials.footpad}>
            <circleGeometry args={[0.11, 20]} />
          </mesh>
          <mesh position={[-0.06, 0.1, 0.005]} material={materials.footpad}>
            <circleGeometry args={[0.03, 12]} />
          </mesh>
          <mesh position={[0, 0.125, 0.005]} material={materials.footpad}>
            <circleGeometry args={[0.034, 12]} />
          </mesh>
          <mesh position={[0.06, 0.1, 0.005]} material={materials.footpad}>
            <circleGeometry args={[0.03, 12]} />
          </mesh>
        </group>
      </group>

      {/* Plush Arms Cradling the Heart */}
      {/* Left Arm */}
      <group position={[-0.4, -0.08, 0.2]} rotation={[0.6, 0.5, -0.35]}>
        <mesh material={materials.fur}>
          <capsuleGeometry args={[0.14, 0.34, 20, 20]} />
        </mesh>
        <mesh position={[0.07, -0.14, 0.07]} rotation={[0, 0.5, 0]} material={materials.footpad}>
          <circleGeometry args={[0.06, 16]} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.4, -0.08, 0.2]} rotation={[0.6, -0.5, 0.35]}>
        <mesh material={materials.fur}>
          <capsuleGeometry args={[0.14, 0.34, 20, 20]} />
        </mesh>
        <mesh position={[-0.07, -0.14, 0.07]} rotation={[0, -0.5, 0]} material={materials.footpad}>
          <circleGeometry args={[0.06, 16]} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 4. PINK SATIN RIBBON & BOW (Neck)                         */}
      {/* ========================================================= */}
      <group position={[0, 0.22, 0]}>
        {/* Ribbon Collar */}
        <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.satinRibbon}>
          <torusGeometry args={[0.38, 0.038, 16, 36]} />
        </mesh>

        {/* Center Bow Knot */}
        <mesh position={[0, 0.01, 0.4]} material={materials.satinRibbon}>
          <sphereGeometry args={[0.055, 16, 16]} />
        </mesh>

        {/* Left Bow Loop */}
        <mesh
          position={[-0.12, 0.03, 0.4]}
          rotation={[0.1, 0.2, -0.3]}
          scale={[1.3, 0.8, 0.5]}
          material={materials.satinRibbon}
        >
          <torusGeometry args={[0.08, 0.03, 12, 24]} />
        </mesh>

        {/* Right Bow Loop */}
        <mesh
          position={[0.12, 0.03, 0.4]}
          rotation={[0.1, -0.2, 0.3]}
          scale={[1.3, 0.8, 0.5]}
          material={materials.satinRibbon}
        >
          <torusGeometry args={[0.08, 0.03, 12, 24]} />
        </mesh>

        {/* Left Ribbon Tail */}
        <mesh
          ref={ribbonTailLeftRef}
          position={[-0.07, -0.1, 0.4]}
          rotation={[0.1, 0, -0.25]}
          material={materials.satinRibbon}
        >
          <boxGeometry args={[0.05, 0.16, 0.012]} />
        </mesh>

        {/* Right Ribbon Tail */}
        <mesh
          ref={ribbonTailRightRef}
          position={[0.07, -0.1, 0.4]}
          rotation={[0.1, 0, 0.25]}
          material={materials.satinRibbon}
        >
          <boxGeometry args={[0.05, 0.16, 0.012]} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 5. CUTE PLUSH HEAD WITH CORRECT ADORABLE GLASS EYES       */}
      {/* ========================================================= */}
      <group ref={headRef} position={[0, 0.5, 0]}>
        {/* Main Head */}
        <mesh material={materials.fur} scale={[1.04, 0.98, 0.94]}>
          <sphereGeometry args={[0.44, 36, 36]} />
        </mesh>

        {/* Cupped Fluffy Ears */}
        {/* Left Ear */}
        <group position={[-0.38, 0.35, -0.02]} rotation={[0.1, 0.2, -0.3]}>
          <mesh material={materials.fur} scale={[1.0, 1.0, 0.7]}>
            <sphereGeometry args={[0.17, 24, 24]} />
          </mesh>
          <mesh position={[0, 0, 0.09]} material={materials.footpad}>
            <circleGeometry args={[0.1, 20]} />
          </mesh>
        </group>

        {/* Right Ear */}
        <group position={[0.38, 0.35, -0.02]} rotation={[0.1, -0.2, 0.3]}>
          <mesh material={materials.fur} scale={[1.0, 1.0, 0.7]}>
            <sphereGeometry args={[0.17, 24, 24]} />
          </mesh>
          <mesh position={[0, 0, 0.09]} material={materials.footpad}>
            <circleGeometry args={[0.1, 20]} />
          </mesh>
        </group>

        {/* Sculpted Velour Muzzle (Snout) */}
        <mesh
          position={[0, -0.08, 0.33]}
          scale={[1.1, 0.85, 0.9]}
          material={materials.velourMuzzle}
        >
          <sphereGeometry args={[0.22, 28, 28]} />
        </mesh>

        {/* Hand-Stitched Leather Nose */}
        <mesh
          position={[0, -0.03, 0.52]}
          scale={[1.2, 0.85, 0.75]}
          material={materials.leatherNose}
        >
          <sphereGeometry args={[0.065, 18, 18]} />
        </mesh>

        {/* Sweet Embroidered Smile Seam */}
        <mesh position={[0, -0.12, 0.52]}>
          <planeGeometry args={[0.01, 0.07]} />
          <meshBasicMaterial color="#1E0E06" />
        </mesh>
        <mesh position={[-0.035, -0.15, 0.51]} rotation={[0, 0, 0.35]}>
          <planeGeometry args={[0.009, 0.06]} />
          <meshBasicMaterial color="#1E0E06" />
        </mesh>
        <mesh position={[0.035, -0.15, 0.51]} rotation={[0, 0, -0.35]}>
          <planeGeometry args={[0.009, 0.06]} />
          <meshBasicMaterial color="#1E0E06" />
        </mesh>

        {/* ======================================================= */}
        {/* CORRECT, ADORABLE CLASSIC GLASS BUTTON EYES             */}
        {/* (Both eyes have matching shiny kawaii twinkle glints!)   */}
        {/* ======================================================= */}
        {/* Left Eye */}
        <group position={[-0.175, 0.08, 0.38]}>
          {/* Deep Glossy Onyx Glass Orb */}
          <mesh material={materials.glassEye}>
            <sphereGeometry args={[0.062, 28, 28]} />
          </mesh>
          {/* Primary Top-Right Specular Sparkle */}
          <mesh position={[0.02, 0.024, 0.052]}>
            <sphereGeometry args={[0.016, 12, 12]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          {/* Secondary Bottom-Left Soft Twinkle */}
          <mesh position={[-0.016, -0.018, 0.05]}>
            <sphereGeometry args={[0.008, 10, 10]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* Right Eye */}
        <group position={[0.175, 0.08, 0.38]}>
          {/* Deep Glossy Onyx Glass Orb */}
          <mesh material={materials.glassEye}>
            <sphereGeometry args={[0.062, 28, 28]} />
          </mesh>
          {/* Primary Top-Right Specular Sparkle (Identical direction!) */}
          <mesh position={[0.02, 0.024, 0.052]}>
            <sphereGeometry args={[0.016, 12, 12]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          {/* Secondary Bottom-Left Soft Twinkle (Identical direction!) */}
          <mesh position={[-0.016, -0.018, 0.05]}>
            <sphereGeometry args={[0.008, 10, 10]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* Soft Natural Blushing Cheeks */}
        <mesh position={[-0.28, -0.06, 0.36]} material={materials.rosyCheek}>
          <circleGeometry args={[0.075, 20]} />
        </mesh>
        <mesh position={[0.28, -0.06, 0.36]} material={materials.rosyCheek}>
          <circleGeometry args={[0.075, 20]} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 6. GLOWING ROSE-GOLD HEART CRADLED IN PAWS               */}
      {/* ========================================================= */}
      <mesh
        ref={heartRef}
        position={[0, -0.08, 0.42]}
        rotation={[Math.PI, 0, 0]}
        scale={[0.52, 0.52, 0.52]}
        material={materials.rubyHeart}
      >
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
      </mesh>

      {/* ========================================================= */}
      {/* 7. FLOATING HOLOGRAPHIC PARTICLES & CLICK BURST HEARTS   */}
      {/* ========================================================= */}
      {/* Ambient Stardust Crystals */}
      <group>
        {[
          { pos: [-1.1, 0.6, 0.4], color: '#00F5FF', s: 0.045 },
          { pos: [1.05, 0.7, -0.3], color: '#FF007F', s: 0.05 },
          { pos: [-0.95, -0.3, -0.4], color: '#FFD700', s: 0.04 },
          { pos: [1.1, -0.4, 0.5], color: '#00F5FF', s: 0.045 },
          { pos: [0, 1.0, -0.15], color: '#FF007F', s: 0.05 },
        ].map((pt, idx) => (
          <mesh key={`pt-${idx}`} position={pt.pos as [number, number, number]}>
            <octahedronGeometry args={[pt.s, 0]} />
            <meshStandardMaterial
              color={pt.color}
              emissive={new THREE.Color(pt.color)}
              emissiveIntensity={2.5 * glowPulse}
            />
          </mesh>
        ))}
      </group>

      {/* Interactive Heart Particle Burst upon Click */}
      {burstActive && (
        <group ref={burstHeartsRef} position={[0, 0, 0.45]}>
          {[
            [-0.18, 0.18, 0],
            [0.18, 0.22, 0],
            [0, 0.35, 0.1],
            [-0.25, 0.3, -0.1],
            [0.25, 0.3, -0.1],
          ].map(([hx, hy, hz], idx) => (
            <mesh
              key={`burst-${idx}`}
              position={[hx, hy, hz]}
              rotation={[Math.PI, 0, 0]}
              scale={0.2}
              material={materials.rubyHeart}
            >
              <extrudeGeometry args={[heartShape, extrudeSettings]} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};

export default TeddyBear;
