import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useLocation } from "react-router-dom";

function Scene({ isLight }) {
  const bgRef = useRef(new THREE.Color("#050505"));
  const objRef = useRef(new THREE.Color("#111111"));
  
  const targetBg = useMemo(() => new THREE.Color(isLight ? "#fdfbf7" : "#050505"), [isLight]);
  const targetObj = useMemo(() => new THREE.Color(isLight ? "#eae5da" : "#111111"), [isLight]);

  const matRef1 = useRef();
  const matRef2 = useRef();

  useFrame((state, delta) => {
    // Smoothly interpolate background color
    bgRef.current.lerp(targetBg, delta * 2);
    state.scene.background = bgRef.current;

    // Smoothly interpolate object color
    objRef.current.lerp(targetObj, delta * 2);
    if (matRef1.current) matRef1.current.color.copy(objRef.current);
    if (matRef2.current) matRef2.current.color.copy(objRef.current);
  });

  return (
    <>
      <ambientLight intensity={isLight ? 0.8 : 0.2} />
      <directionalLight position={[10, 10, 5]} intensity={isLight ? 1 : 0.5} color={isLight ? "#ffffff" : "#c9a96e"} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      
      {/* Floating Monolith 1 */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
        <mesh position={[4, 1, -5]} rotation={[0.5, 0.5, 0]}>
          <icosahedronGeometry args={[2, 0]} />
          <meshPhysicalMaterial 
            ref={matRef1}
            roughness={0.2}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>

      {/* Floating Monolith 2 */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[-5, -2, -8]} rotation={[-0.5, 0.2, 0.1]}>
          <octahedronGeometry args={[3, 0]} />
          <meshPhysicalMaterial 
            ref={matRef2}
            roughness={0.1}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.2}
          />
        </mesh>
      </Float>
    </>
  );
}

export default function Background3D() {
  const location = useLocation();
  const isLight = location.pathname === "/" || location.pathname === "/lake-woods" || location.pathname === "/legacy";

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Scene isLight={isLight} />
      </Canvas>
    </div>
  );
}
