import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface CadburyFuse3DProps {
  position?: [number, number, number];
  scale?: number;
  unwrapped?: boolean;
}

/**
 * Procedurally generates the authentic Cadbury Fuse wrapper packaging texture
 * with royal Cadbury purple, metallic foil sheen, hypnotic hot-pink/orange swirl rings,
 * golden Cadbury cursive script, 3D bubbly white "FUSE" typography, and exploding
 * chocolate cross-section graphic with roasted peanuts.
 */
function createCadburyFuseTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Cadbury Royal Purple Metallic Foil Gradient Base
  const bgGrad = ctx.createLinearGradient(0, 0, 2048, 0);
  bgGrad.addColorStop(0, '#260644');
  bgGrad.addColorStop(0.12, '#3E0D6B');
  bgGrad.addColorStop(0.3, '#581894');
  bgGrad.addColorStop(0.5, '#420F73');
  bgGrad.addColorStop(0.75, '#561791');
  bgGrad.addColorStop(0.9, '#3C0C68');
  bgGrad.addColorStop(1, '#240540');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 2048, 1024);

  // 2. Metallic Foil Sheen Highlights
  for (let x = 0; x < 2048; x += 110) {
    const sheenGrad = ctx.createLinearGradient(x, 0, x + 70, 0);
    sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.09)');
    sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(x, 0, 70, 1024);
  }

  // 3. Left & Right Crimped Foil Ends (Serrated Corrugated Ridges)
  const drawCrimp = (startX: number, width: number) => {
    for (let x = startX; x < startX + width; x += 8) {
      ctx.fillStyle = Math.floor(x / 8) % 2 === 0 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(x, 0, 4, 1024);
    }
    // Zigzag serrated edge lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let y = 0; y < 1024; y += 16) {
      ctx.lineTo(startX + (y % 32 === 0 ? 0 : 12), y);
    }
    ctx.stroke();
  };
  drawCrimp(0, 140);
  drawCrimp(1908, 140);

  // 4. Iconic Hypnotic Radiant Swirl Rings (Hot Pink, Magenta, Neon Orange, Golden Yellow)
  const swirlCenterX = 1050;
  const swirlCenterY = 512;
  const swirlRings = [
    { rX: 620, rY: 420, color: '#E1006E', width: 55 },
    { rX: 520, rY: 350, color: '#FF1493', width: 45 },
    { rX: 430, rY: 290, color: '#FF5500', width: 48 },
    { rX: 340, rY: 230, color: '#FFA000', width: 44 },
    { rX: 250, rY: 170, color: '#FF007F', width: 40 },
    { rX: 170, rY: 115, color: '#FF6D00', width: 35 },
    { rX: 100, rY: 70, color: '#FFD000', width: 28 },
  ];

  ctx.save();
  ctx.translate(swirlCenterX, swirlCenterY);
  ctx.rotate(-0.12);
  swirlRings.forEach(ring => {
    ctx.beginPath();
    ctx.ellipse(0, 0, ring.rX, ring.rY, 0, 0, Math.PI * 2);
    ctx.strokeStyle = ring.color;
    ctx.lineWidth = ring.width;
    ctx.stroke();
  });
  ctx.restore();

  // 5. Classic Golden Cadbury Script Logo (Top-Left)
  ctx.save();
  ctx.translate(270, 240);
  ctx.rotate(-0.06);
  const goldGrad = ctx.createLinearGradient(0, -40, 0, 40);
  goldGrad.addColorStop(0, '#FFF2B2');
  goldGrad.addColorStop(0.4, '#FFD54F');
  goldGrad.addColorStop(0.8, '#FFA000');
  goldGrad.addColorStop(1, '#FF8F00');

  ctx.font = 'italic 700 84px "Playfair Display", "Dancing Script", cursive, Georgia, serif';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.fillText('Cadbury', 4, 4); // Shadow
  ctx.fillStyle = goldGrad;
  ctx.fillText('Cadbury', 0, 0);
  ctx.restore();

  // 6. Calorie Oval Badge (Bottom-Left)
  ctx.save();
  ctx.translate(240, 780);
  ctx.fillStyle = '#1E3A8A';
  ctx.beginPath();
  ctx.roundRect(-70, -45, 140, 90, 22);
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 20px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Per Bar', 0, -12);
  ctx.fillStyle = '#FDE047';
  ctx.font = 'bold 28px Outfit, sans-serif';
  ctx.fillText('276 kcal', 0, 22);
  ctx.restore();

  // 7. Exploding Fuse Bar Cross-Section Graphic (Right Side)
  ctx.save();
  ctx.translate(1560, 512);
  // Outer chocolate ring
  ctx.beginPath();
  ctx.arc(0, 0, 210, 0, Math.PI * 2);
  ctx.fillStyle = '#4A2311';
  ctx.fill();
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#6D3419';
  ctx.stroke();

  // Golden Gooey Caramel Ring
  ctx.beginPath();
  ctx.arc(0, 0, 175, 0, Math.PI * 2);
  ctx.fillStyle = '#FF9800';
  ctx.fill();
  ctx.lineWidth = 18;
  ctx.strokeStyle = '#FFB300';
  ctx.stroke();

  // Rich Textured Chocolate Fudge Brownie Core
  ctx.beginPath();
  ctx.arc(0, 0, 135, 0, Math.PI * 2);
  ctx.fillStyle = '#2B1208';
  ctx.fill();

  // Helper to draw peanut slice in cross-section
  const drawPeanutSlice = (px: number, py: number, r: number, angle: number) => {
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, 0, r, r * 0.65, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#F5D0A9';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#C98A4B';
    ctx.stroke();
    // Inner peanut seam
    ctx.beginPath();
    ctx.moveTo(-r * 0.6, 0);
    ctx.lineTo(r * 0.6, 0);
    ctx.strokeStyle = '#A36024';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  };

  drawPeanutSlice(-45, -35, 34, 0.4);
  drawPeanutSlice(40, -40, 36, -0.3);
  drawPeanutSlice(0, 30, 38, 0.1);
  drawPeanutSlice(-60, 45, 28, 0.8);
  drawPeanutSlice(55, 45, 30, -0.7);

  // Flying peanut crisp nuggets
  [[-170, -180], [180, -160], [190, 140], [-190, 130], [210, 0]].forEach(([fx, fy]) => {
    drawPeanutSlice(fx, fy, 16, Math.random() * Math.PI);
  });
  ctx.restore();

  // 8. THE GIANT 3D BUBBLY "FUSE" TYPOGRAPHY
  ctx.save();
  ctx.translate(swirlCenterX - 50, swirlCenterY + 40);
  ctx.rotate(-0.07);

  const letters = [
    { char: 'F', x: -360, y: 0 },
    { char: 'U', x: -130, y: 15 },
    { char: 'S', x: 100, y: 0 },
    { char: 'E', x: 310, y: -10 },
  ];

  ctx.font = '900 240px "Outfit", "Arial Black", "Montserrat Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // 8a. Deep 3D Black Extrusion (Layers drawn offset down-right)
  for (let d = 36; d >= 1; d -= 2) {
    ctx.fillStyle = d > 20 ? '#0B0212' : '#1A062A';
    letters.forEach(l => {
      ctx.fillText(l.char, l.x + d * 0.8, l.y + d * 0.9);
    });
  }

  // 8b. Heavy Outer Black Stroke Outline
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 32;
  ctx.lineJoin = 'round';
  letters.forEach(l => {
    ctx.strokeText(l.char, l.x, l.y);
  });

  // 8c. Glossy Crisp White Front Face
  const whiteFaceGrad = ctx.createLinearGradient(0, -120, 0, 120);
  whiteFaceGrad.addColorStop(0, '#FFFFFF');
  whiteFaceGrad.addColorStop(0.65, '#F8FAFC');
  whiteFaceGrad.addColorStop(1, '#DCE4F0');

  ctx.fillStyle = whiteFaceGrad;
  letters.forEach(l => {
    ctx.fillText(l.char, l.x, l.y);
  });

  // 8d. Gloss Highlights inside letters
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = '900 210px "Outfit", "Arial Black", sans-serif';
  letters.forEach(l => {
    ctx.fillText(l.char, l.x - 3, l.y - 6);
  });
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedurally generates the chocolate surface texture with organic waves & roasted peanut speckles
 */
function createChocolateTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Base chocolate
  ctx.fillStyle = '#4D2413';
  ctx.fillRect(0, 0, 512, 512);

  // Wavy chocolate ripples
  for (let y = 0; y < 512; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(150, y + 14, 350, y - 14, 512, y + 8);
    ctx.strokeStyle = 'rgba(95, 45, 22, 0.4)';
    ctx.lineWidth = 12;
    ctx.stroke();
  }

  // Peanut speckles
  for (let i = 0; i < 120; i++) {
    const rx = Math.random() * 512;
    const ry = Math.random() * 512;
    const rad = 3 + Math.random() * 10;
    ctx.beginPath();
    ctx.arc(rx, ry, rad, 0, Math.PI * 2);
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(215, 155, 90, 0.3)' : 'rgba(25, 8, 4, 0.35)';
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.needsUpdate = true;
  return texture;
}

export const CadburyFuse3D: React.FC<CadburyFuse3DProps> = ({
  position = [0, 0, 0],
  scale = 1.0,
  unwrapped = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const holoRing1Ref = useRef<THREE.Mesh>(null);
  const holoRing2Ref = useRef<THREE.Mesh>(null);
  const holoRing3Ref = useRef<THREE.Mesh>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);
  const sparklesGroupRef = useRef<THREE.Group>(null);

  // Textures generated dynamically
  const fuseWrapperTexture = useMemo(() => createCadburyFuseTexture(), []);
  const chocoTexture = useMemo(() => createChocolateTexture(), []);

  // Premium Realistic Materials
  const materials = useMemo(() => {
    // 1. Cadbury Fuse Wrapper Material (Front/Back)
    const wrapperMaterial = new THREE.MeshStandardMaterial({
      map: fuseWrapperTexture,
      roughness: 0.28,
      metalness: 0.35,
      emissive: new THREE.Color('#380B5C'),
      emissiveIntensity: 0.25,
    });

    // 2. Rich Milk Chocolate Body
    const chocoMaterial = new THREE.MeshStandardMaterial({
      color: '#4A2311',
      map: chocoTexture,
      roughness: 0.28,
      metalness: 0.1,
      emissive: new THREE.Color('#240E06'),
      emissiveIntensity: 0.18,
    });

    // 3. Luscious Golden Flowing Caramel Drip
    const caramelMaterial = new THREE.MeshStandardMaterial({
      color: '#FFA000',
      roughness: 0.12,
      metalness: 0.25,
      emissive: new THREE.Color('#FF8F00'),
      emissiveIntensity: 0.45,
    });

    // 4. Whole Roasted Crunchy Peanuts
    const peanutMaterial = new THREE.MeshStandardMaterial({
      color: '#E2A562',
      roughness: 0.65,
      metalness: 0.05,
      emissive: new THREE.Color('#9C6128'),
      emissiveIntensity: 0.2,
    });

    // 5. Crunchy Biscuit Crisp Bits
    const crispMaterial = new THREE.MeshStandardMaterial({
      color: '#FFE082',
      roughness: 0.5,
      metalness: 0.1,
      emissive: new THREE.Color('#FFA726'),
      emissiveIntensity: 0.3,
    });

    // 6. Crinkled Metallic Silver Foil Peeling
    const silverFoilMaterial = new THREE.MeshStandardMaterial({
      color: '#F1F5F9',
      roughness: 0.18,
      metalness: 0.95,
      emissive: new THREE.Color('#94A3B8'),
      emissiveIntensity: 0.25,
    });

    // 7. Holographic Neon Magenta Ring
    const holoMagentaMaterial = new THREE.MeshStandardMaterial({
      color: '#FF007F',
      emissive: new THREE.Color('#FF007F'),
      emissiveIntensity: 2.2,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });

    // 8. Holographic Cyber Cyan Ring
    const holoCyanMaterial = new THREE.MeshStandardMaterial({
      color: '#00F5FF',
      emissive: new THREE.Color('#00F5FF'),
      emissiveIntensity: 2.2,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });

    // 9. Holographic Golden Energy Ring
    const holoGoldMaterial = new THREE.MeshStandardMaterial({
      color: '#FFD700',
      emissive: new THREE.Color('#FFAA00'),
      emissiveIntensity: 1.8,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.5,
    });

    return {
      wrapperMaterial,
      chocoMaterial,
      caramelMaterial,
      peanutMaterial,
      crispMaterial,
      silverFoilMaterial,
      holoMagentaMaterial,
      holoCyanMaterial,
      holoGoldMaterial,
    };
  }, [fuseWrapperTexture, chocoTexture]);

  // Floating levitation & gyroscopic hologram rotation loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle floating levitation
      groupRef.current.position.y = position[1] + Math.sin(t * 1.6) * 0.08;
      // Idle slow sway
      groupRef.current.rotation.y = Math.sin(t * 0.7) * 0.25;
      groupRef.current.rotation.x = 0.15 + Math.cos(t * 1.1) * 0.06;
    }

    // Orbiting Hologram Rings
    if (holoRing1Ref.current) {
      holoRing1Ref.current.rotation.z = t * 0.75;
      holoRing1Ref.current.rotation.x = t * 0.45;
    }
    if (holoRing2Ref.current) {
      holoRing2Ref.current.rotation.y = -t * 0.65;
      holoRing2Ref.current.rotation.z = t * 0.35;
    }
    if (holoRing3Ref.current) {
      holoRing3Ref.current.rotation.z = -t * 0.5;
    }

    // Laser Scanline Emitter
    if (scanLineRef.current) {
      scanLineRef.current.position.y = Math.sin(t * 2.2) * 0.7;
    }

    // Orbiting Particle Crystals
    if (sparklesGroupRef.current) {
      sparklesGroupRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <>
      {/* Interactive 360-degree OrbitControls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />

      {/* Radiant Multi-Angle Studio Lighting */}
      <ambientLight intensity={1.8} color="#FFF0F8" />
      <directionalLight position={[5, 6, 4]} intensity={2.2} color="#FFF7E6" />
      <directionalLight position={[-5, 3, -3]} intensity={1.5} color="#E0E7FF" />
      <pointLight position={[0, -2, 1.5]} intensity={2.5} color="#FF007F" distance={6} />
      <pointLight position={[0, 2, -1]} intensity={1.8} color="#00F5FF" distance={5} />

      <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
        {/* ========================================================= */}
        {/* 1. HOLOGRAPHIC SCANLINE & GYROSCOPIC RINGS               */}
        {/* ========================================================= */}
        {/* Hologram Base Projector Disc */}
        <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.8, 36]} />
          <meshBasicMaterial
            color="#FF007F"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.5, 1.0, 36]} />
          <meshBasicMaterial
            color="#00F5FF"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Gyroscopic Neon Hologram Rings */}
        <mesh
          ref={holoRing1Ref}
          position={[0, 0, 0]}
          material={materials.holoMagentaMaterial}
        >
          <torusGeometry args={[2.2, 0.02, 12, 48]} />
        </mesh>
        <mesh
          ref={holoRing2Ref}
          position={[0, 0, 0]}
          rotation={[Math.PI / 3, 0, 0]}
          material={materials.holoCyanMaterial}
        >
          <torusGeometry args={[2.0, 0.02, 12, 48]} />
        </mesh>
        <mesh
          ref={holoRing3Ref}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 4, 0, 0]}
          material={materials.holoGoldMaterial}
        >
          <torusGeometry args={[2.4, 0.015, 8, 48]} />
        </mesh>

        {/* Hologram Laser Scanline Disc */}
        <mesh
          ref={scanLineRef}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[3.2, 1.4]} />
          <meshBasicMaterial
            color="#00F5FF"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* ========================================================= */}
        {/* 2. THE 3D CHOCOLATE FUSE BAR & WRAPPER                   */}
        {/* ========================================================= */}
        {/* Inner Milk Chocolate Bar Body */}
        <mesh position={[0, 0, 0]} material={materials.chocoMaterial}>
          <boxGeometry args={[2.8, 0.9, 0.65]} />
        </mesh>

        {/* Chocolate Block Segments & Natural Bumps */}
        {[-0.9, -0.3, 0.3, 0.9].map((x, idx) => (
          <mesh
            key={`choco-bump-${idx}`}
            position={[x, 0.46, 0]}
            material={materials.chocoMaterial}
          >
            <boxGeometry args={[0.5, 0.06, 0.58]} />
          </mesh>
        ))}

        {/* Whole Roasted Golden Peanuts Embedded on Top & Sides */}
        {[
          { pos: [-0.95, 0.48, 0.12], rot: [0.2, 0.4, 0.1] },
          { pos: [-0.6, 0.48, -0.15], rot: [-0.3, 0.8, 0.2] },
          { pos: [-0.2, 0.49, 0.14], rot: [0.1, -0.5, 0.3] },
          { pos: [0.15, 0.48, -0.1], rot: [0.4, 0.2, -0.2] },
          { pos: [0.55, 0.49, 0.16], rot: [-0.2, 0.6, 0.1] },
          { pos: [0.95, 0.48, -0.12], rot: [0.3, -0.3, 0.4] },
          { pos: [1.15, 0.49, 0.1], rot: [0.1, 0.9, -0.1] },
          // Side embedded peanuts
          { pos: [0.4, -0.1, 0.34], rot: [0.1, 0.2, 0.5] },
          { pos: [0.8, 0.1, 0.34], rot: [-0.2, 0.4, 0.2] },
          { pos: [-0.4, 0.15, 0.34], rot: [0.3, -0.3, 0.4] },
        ].map((peanut, idx) => (
          <mesh
            key={`peanut-${idx}`}
            position={peanut.pos as [number, number, number]}
            rotation={peanut.rot as [number, number, number]}
            scale={[1.35, 0.85, 0.85]}
            material={materials.peanutMaterial}
          >
            <sphereGeometry args={[0.09, 10, 10]} />
          </mesh>
        ))}

        {/* Golden Crunchy Biscuit Crisp Bits */}
        {[
          [-0.8, 0.49, -0.18],
          [-0.35, 0.49, 0.22],
          [0.35, 0.49, 0.22],
          [0.75, 0.49, -0.2],
          [1.05, 0.49, 0.2],
        ].map(([cx, cy, cz], idx) => (
          <mesh
            key={`crisp-${idx}`}
            position={[cx, cy, cz]}
            material={materials.crispMaterial}
          >
            <sphereGeometry args={[0.045, 8, 8]} />
          </mesh>
        ))}

        {/* Luscious Golden Caramel Layer Flowing on Top */}
        <mesh position={[0.2, 0.46, 0]} material={materials.caramelMaterial}>
          <boxGeometry args={[1.8, 0.04, 0.55]} />
        </mesh>

        {/* ========================================================= */}
        {/* 3. CADBURY FUSE OFFICIAL WRAPPER (With Unwrapping State)  */}
        {/* ========================================================= */}
        {!unwrapped ? (
          /* FULLY WRAPPED STATE: Entire Bar Enclosed with Crimped Ends */
          <group position={[0, 0, 0]}>
            {/* Main Wrapper Sleeve */}
            <mesh position={[0, 0, 0]} material={materials.wrapperMaterial}>
              <boxGeometry args={[2.92, 0.94, 0.69]} />
            </mesh>

            {/* Left Crimped Foil End */}
            <mesh
              position={[-1.52, 0, 0]}
              material={materials.wrapperMaterial}
            >
              <boxGeometry args={[0.22, 0.88, 0.12]} />
            </mesh>

            {/* Right Crimped Foil End */}
            <mesh
              position={[1.52, 0, 0]}
              material={materials.wrapperMaterial}
            >
              <boxGeometry args={[0.22, 0.88, 0.12]} />
            </mesh>
          </group>
        ) : (
          /* UNWRAPPED / PEELED STATE: Wrapper slid to left, revealing delicious Fuse bar */
          <group position={[-0.75, 0, 0]}>
            {/* Left Partial Wrapper Sleeve */}
            <mesh position={[0, 0, 0]} material={materials.wrapperMaterial}>
              <boxGeometry args={[1.5, 0.96, 0.71]} />
            </mesh>

            {/* Left Crimped Foil End */}
            <mesh
              position={[-0.82, 0, 0]}
              material={materials.wrapperMaterial}
            >
              <boxGeometry args={[0.22, 0.88, 0.12]} />
            </mesh>

            {/* Shiny Crinkled Metallic Silver Foil Peeling Back */}
            <mesh
              position={[0.78, 0, 0]}
              rotation={[0, 0, -0.15]}
              material={materials.silverFoilMaterial}
            >
              <boxGeometry args={[0.16, 1.02, 0.75]} />
            </mesh>
            <mesh
              position={[0.82, 0.48, 0]}
              rotation={[0.3, 0, -0.4]}
              material={materials.silverFoilMaterial}
            >
              <boxGeometry args={[0.18, 0.12, 0.6]} />
            </mesh>
          </group>
        )}

        {/* ========================================================= */}
        {/* 4. FLOATING PARTICLES & GOLDEN PEANUT NUGGETS             */}
        {/* ========================================================= */}
        <group ref={sparklesGroupRef}>
          {/* Floating Gold & Cyber Stardust Crystals */}
          {[
            { pos: [-1.8, 0.8, 0.6], color: '#FFD700', size: 0.07 },
            { pos: [1.8, 0.7, -0.5], color: '#FF007F', size: 0.08 },
            { pos: [-1.4, -0.7, -0.6], color: '#00F5FF', size: 0.07 },
            { pos: [1.5, -0.8, 0.7], color: '#FFAA00', size: 0.06 },
            { pos: [0, 1.2, 0.5], color: '#FF007F', size: 0.09 },
            { pos: [0.6, -1.1, -0.4], color: '#00F5FF', size: 0.07 },
          ].map((sp, idx) => (
            <mesh
              key={`star-${idx}`}
              position={sp.pos as [number, number, number]}
            >
              <octahedronGeometry args={[sp.size, 0]} />
              <meshStandardMaterial
                color={sp.color}
                emissive={new THREE.Color(sp.color)}
                emissiveIntensity={2.0}
              />
            </mesh>
          ))}

          {/* Floating Zero-Gravity Roasted Peanut Nuggets */}
          {[
            [-1.9, 0.3, -0.3],
            [1.9, -0.3, 0.4],
            [1.2, 1.0, -0.5],
            [-1.1, -0.9, 0.5],
          ].map(([nx, ny, nz], idx) => (
            <mesh
              key={`float-peanut-${idx}`}
              position={[nx, ny, nz]}
              scale={[1.3, 0.85, 0.85]}
              material={materials.peanutMaterial}
            >
              <sphereGeometry args={[0.07, 8, 8]} />
            </mesh>
          ))}
        </group>
      </group>
    </>
  );
};

export default CadburyFuse3D;
