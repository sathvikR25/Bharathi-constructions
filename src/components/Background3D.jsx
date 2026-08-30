import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, useTexture, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useLocation } from "react-router-dom";

function Monolith({ position, rotation, speed, floatIntensity, geometry, materialProps, logoTex }) {
  const meshRef = useRef();

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={floatIntensity}>
      <mesh ref={meshRef} position={position} rotation={rotation} geometry={geometry}>
        <meshPhysicalMaterial 
          {...materialProps}
          map={logoTex}
          blending={THREE.MultiplyBlending}
        />
      </mesh>
    </Float>
  );
}

function Scene({ isLight }) {
  const bgRef = useRef(new THREE.Color(isLight ? "#fdfbf7" : "#050505"));
  const objRef = useRef(new THREE.Color(isLight ? "#eae5da" : "#111111"));
  
  const targetBg = useMemo(() => new THREE.Color(isLight ? "#fdfbf7" : "#050505"), [isLight]);
  const targetObj = useMemo(() => new THREE.Color(isLight ? "#eae5da" : "#111111"), [isLight]);

  // Load the logo to map onto the shapes
  const logoTex = useTexture("/logo.png");
  useMemo(() => {
    logoTex.wrapS = logoTex.wrapT = THREE.RepeatWrapping;
    logoTex.repeat.set(3, 3);
  }, [logoTex]);

  const matRefs = useRef([]);
  const addToRefs = (el) => {
    if (el && !matRefs.current.includes(el)) {
      matRefs.current.push(el);
    }
  };

  useFrame((state, delta) => {
    bgRef.current.lerp(targetBg, delta * 2);
    state.scene.background = bgRef.current;

    objRef.current.lerp(targetObj, delta * 2);
    // Note: The monoliths use MultiplyBlending with the logo, so the base color acts as a tint
  });

  const sharedMaterial = {
    roughness: 0.2,
    metalness: 0.8,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: 0.9,
  };

  return (
    <>
      <ambientLight intensity={isLight ? 0.8 : 0.2} />
      <directionalLight position={[10, 10, 5]} intensity={isLight ? 1 : 0.5} color={isLight ? "#ffffff" : "#c9a96e"} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      
      {/* High Quality Environment Reflections */}
      <Environment preset={isLight ? "city" : "night"} />

      {/* Floating Shape 1: Torus Knot (Architectural/Complex) */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={2}>
        <mesh position={[5, 2, -6]} rotation={[0.5, 0.5, 0]}>
          <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
          <meshPhysicalMaterial 
            color={isLight ? "#eae5da" : "#222222"}
            roughness={0.1}
            metalness={0.9}
            clearcoat={1}
            map={logoTex}
            blending={isLight ? THREE.MultiplyBlending : THREE.AdditiveBlending}
          />
        </mesh>
      </Float>

      {/* Floating Shape 2: Dodecahedron */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[-6, -1, -8]} rotation={[-0.5, 0.2, 0.1]}>
          <dodecahedronGeometry args={[2.5, 0]} />
          <meshPhysicalMaterial 
            color={isLight ? "#eae5da" : "#111111"}
            roughness={0.3}
            metalness={0.7}
            map={logoTex}
            blending={isLight ? THREE.MultiplyBlending : THREE.AdditiveBlending}
          />
        </mesh>
      </Float>

      {/* Floating Shape 3: Massive Architectural Cylinder (Pillar) */}
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={1}>
        <mesh position={[2, -4, -10]} rotation={[Math.PI / 2, 0.2, 0]}>
          <torusGeometry args={[3.5, 0.4, 64, 100]} />
          <meshPhysicalMaterial 
            color={isLight ? "#f4f1ea" : "#1a1a1a"}
            roughness={0.2}
            metalness={0.8}
            map={logoTex}
            blending={isLight ? THREE.MultiplyBlending : THREE.AdditiveBlending}
          />
        </mesh>
      </Float>

      {/* Floating Shape 4: Floating Icosahedron */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2.5}>
        <mesh position={[-3, 4, -12]} rotation={[0.2, 0.8, 0]}>
          <icosahedronGeometry args={[2, 0]} />
          <meshPhysicalMaterial 
            color={isLight ? "#eae5da" : "#050505"}
            roughness={0.1}
            metalness={1}
            clearcoat={1}
            map={logoTex}
            blending={isLight ? THREE.MultiplyBlending : THREE.AdditiveBlending}
          />
        </mesh>
      </Float>

      <ContactShadows position={[0, -5, 0]} opacity={isLight ? 0.4 : 0.2} scale={20} blur={2} far={10} />
    </>
  );
}

export default function Background3D() {
  const location = useLocation();
  const isLight = location.pathname === "/" || location.pathname === "/lake-woods" || location.pathname === "/legacy";

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <React.Suspense fallback={null}>
          <Scene isLight={isLight} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
