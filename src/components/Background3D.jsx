import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, useTexture, ContactShadows, Sparkles, MeshDistortMaterial } from "@react-three/drei";
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
      {/* ANTIGRAVITY-STYLE BACKGROUND ANIMATIONS */}
      <fog attach="fog" args={[isLight ? "#fdfbf7" : "#050505", 10, 30]} />
      
      {/* Subtle Fluid Aurora Gradient (Enclosing Sphere) */}
      <mesh position={[0, 0, -15]} scale={25}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial 
          color={isLight ? "#f0ebd8" : "#0a0a0a"} 
          roughness={0.8} 
          metalness={0.2} 
          distort={0.3} 
          speed={0.5} 
          side={THREE.BackSide}
        />
      </mesh>

      {/* Atmospheric Particles */}
      <Sparkles 
        count={250} 
        scale={[25, 25, 25]} 
        size={isLight ? 4 : 6} 
        speed={0.3} 
        opacity={isLight ? 0.3 : 0.5} 
        color={isLight ? "#c9a96e" : "#ffffff"} 
      />

      <ambientLight intensity={isLight ? 0.8 : 0.2} />
      <directionalLight position={[10, 10, 5]} intensity={isLight ? 1 : 0.5} color={isLight ? "#ffffff" : "#c9a96e"} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      
      <Environment preset={isLight ? "city" : "night"} />

      {isHorizon ? (
        // EXCLUSIVE HORIZON SHAPE (Single Premium Icosahedron)
        <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2}>
          <mesh position={[2, 0, -8]} rotation={[0.5, 0.5, 0]}>
            <icosahedronGeometry args={[3.5, 0]} />
            <meshPhysicalMaterial color="#eae5da" roughness={0.1} metalness={0.9} clearcoat={1} map={logoTex} blending={THREE.MultiplyBlending} />
          </mesh>
        </Float>
      ) : (
        // STANDARD SHAPE (Single Premium Dodecahedron)
        <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2}>
          <mesh position={[2, 0, -8]} rotation={[-0.5, 0.2, 0.1]}>
            <dodecahedronGeometry args={[3.5, 0]} />
            <meshPhysicalMaterial color={isLight ? "#eae5da" : "#111111"} roughness={0.2} metalness={0.8} clearcoat={1} map={logoTex} blending={isLight ? THREE.MultiplyBlending : THREE.AdditiveBlending} />
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
