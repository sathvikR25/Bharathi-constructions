import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Sparkles, MeshDistortMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useLocation } from "react-router-dom";

function Scene({ isLight, isHorizon }) {
  const bgRef = useRef(new THREE.Color(isLight ? "#fdfbf7" : "#050505"));
  const targetBg = useMemo(() => new THREE.Color(isLight ? "#fdfbf7" : "#050505"), [isLight]);

  useFrame((state, delta) => {
    bgRef.current.lerp(targetBg, delta * 2);
    state.scene.background = bgRef.current;
  });

  return (
    <>
      <ambientLight intensity={isLight ? 0.8 : 0.3} />
      <directionalLight position={[10, 10, 5]} intensity={isLight ? 1 : 0.5} color={isLight ? "#ffffff" : "#c9a96e"} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      
      <Environment preset={isLight ? "city" : "night"} />
      
      {/* Fog smoothly fades the terrain into the background */}
      <fog attach="fog" args={[isLight ? "#fdfbf7" : "#050505", 5, 25]} />

      {/* LUXURY ATMOSPHERE: Floating golden/silver motes of light instead of a shape */}
      <Sparkles 
        count={300} 
        scale={25} 
        size={isLight ? 3 : 5} 
        speed={0.2} 
        opacity={isLight ? 0.2 : 0.4} 
        color={isLight ? "#c9a96e" : "#ffffff"} 
      />

      {/* IMMERSIVE TERRAIN: A massive floor plane that gently ripples like liquid metal or silk */}
      <mesh position={[0, -6, -10]} rotation={[-Math.PI / 2, 0, 0]} scale={30}>
        <planeGeometry args={[1, 1, 128, 128]} />
        <MeshDistortMaterial 
          color={isLight ? "#eae5da" : (isHorizon ? "#0a0a0a" : "#111111")} 
          roughness={0.2} 
          metalness={0.8} 
          distort={0.4} 
          speed={isHorizon ? 1.5 : 0.8}
          clearcoat={1}
        />
      </mesh>
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
