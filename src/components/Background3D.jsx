import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, useTexture, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useLocation } from "react-router-dom";

function Scene({ isLight, isHorizon }) {
  const bgRef = useRef(new THREE.Color(isLight ? "#fdfbf7" : "#050505"));
  
  const targetBg = useMemo(() => new THREE.Color(isLight ? "#fdfbf7" : "#050505"), [isLight]);

  const logoTex = useTexture("/logo.png");
  useMemo(() => {
    logoTex.wrapS = logoTex.wrapT = THREE.RepeatWrapping;
    logoTex.repeat.set(3, 3);
  }, [logoTex]);

  useFrame((state, delta) => {
    bgRef.current.lerp(targetBg, delta * 2);
    state.scene.background = bgRef.current;
  });

  return (
    <>
      <ambientLight intensity={isLight ? 0.8 : 0.2} />
      <directionalLight position={[10, 10, 5]} intensity={isLight ? 1 : 0.5} color={isLight ? "#ffffff" : "#c9a96e"} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      
      <Environment preset={isLight ? "city" : "night"} />

      {isHorizon ? (
        // EXCLUSIVE HORIZON SHAPE (Massive Dodecahedron - faceted, solid, monumental architecture)
        <Float speed={1} rotationIntensity={0.4} floatIntensity={1.5}>
          <mesh position={[2, 0, -10]} rotation={[0.4, 0.6, 0]}>
            <dodecahedronGeometry args={[5.5, 0]} />
            <meshPhysicalMaterial color="#eae5da" roughness={0.15} metalness={0.85} clearcoat={1} map={logoTex} blending={THREE.MultiplyBlending} />
          </mesh>
        </Float>
      ) : (
        // STANDARD SHAPE (Massive Torus Knot - continuous, flowing, modern sculpture)
        <Float speed={0.8} rotationIntensity={0.3} floatIntensity={2}>
          <mesh position={[2, 0, -12]} rotation={[0.2, 0.5, 0]}>
            <torusKnotGeometry args={[4.5, 1.2, 128, 32]} />
            <meshPhysicalMaterial color={isLight ? "#eae5da" : "#111111"} roughness={0.1} metalness={0.9} clearcoat={1} map={logoTex} blending={isLight ? THREE.MultiplyBlending : THREE.AdditiveBlending} />
          </mesh>
        </Float>
      )}

      <ContactShadows position={[0, -5, 0]} opacity={isLight ? 0.4 : 0.2} scale={20} blur={2} far={10} />
    </>
  );
}

export default function Background3D() {
  const location = useLocation();
  const path = location.pathname;
  
  const isLight = path === "/" || path === "/lake-woods" || path === "/legacy" || path === "/horizon";
  const isHorizon = path === "/horizon";

  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none opacity-40 md:opacity-100 transition-opacity duration-500">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <React.Suspense fallback={null}>
          <Scene isLight={isLight} isHorizon={isHorizon} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
