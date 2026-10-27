import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

interface SceneCanvasProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
}

// Check if WebGL is supported in the current environment
const checkWebGLSupport = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  children,
  fallback,
  className = 'w-full h-full',
  camera = { position: [0, 0, 5], fov: 45 },
}) => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setHasWebGL(checkWebGLSupport());
  }, []);

  if (!hasWebGL || hasError) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        {fallback || (
          <div className="text-center p-6 bg-pink-50/80 rounded-2xl border border-pink-200 shadow-sm animate-pulse-soft">
            <div className="text-5xl mb-3">🧸💗</div>
            <p className="text-universe-text font-medium text-sm">
              A little pocket of magic for you
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={camera}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // Transparent background
        }}
        onError={() => setHasError(true)}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneCanvas;
