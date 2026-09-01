import React, { useRef, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, useTexture, ContactShadows, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useLocation } from "react-router-dom";

function AntigravityParticles({ isLight }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const count = 2000;
  const radius = 22; 

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      dummy.position.set(x * radius, y * radius, z * radius);

      const yNext = 1 - ((i + 1) / (count - 1)) * 2;
      const rNext = Math.sqrt(1 - yNext * yNext);
      const thetaNext = phi * (i + 1);
      const xNext = Math.cos(thetaNext) * rNext;
      const zNext = Math.sin(thetaNext) * rNext;
      
      dummy.lookAt(xNext * radius, yNext * radius, zNext * radius);
      dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const normalizedX = (x + 1) / 2; 
      
      if (normalizedX < 0.33) {
         color.lerpColors(new THREE.Color("#4285F4"), new THREE.Color("#8A2BE2"), normalizedX / 0.33);
      } else if (normalizedX < 0.66) {
         color.lerpColors(new THREE.Color("#8A2BE2"), new THREE.Color("#EA4335"), (normalizedX - 0.33) / 0.33);
      } else {
         color.lerpColors(new THREE.Color("#EA4335"), new THREE.Color("#F9AB00"), (normalizedX - 0.66) / 0.34);
      }
      
      if (!isLight) {
        color.multiplyScalar(0.7);
      }

      meshRef.current.setColorAt(i, color);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
       meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [isLight]);

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current) return;
    const targetX = (state.pointer.x * Math.PI) / 6;
    const targetY = (state.pointer.y * Math.PI) / 6;
    
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;

    meshRef.current.rotation.y += delta * 0.03;
    meshRef.current.rotation.z += delta * 0.01;
  });

  return (
    <group ref={groupRef} position={[0, 0, -8]}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <boxGeometry args={[0.08, 0.08, 0.6]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

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
      <fog attach="fog" args={[isLight ? "#fdfbf7" : "#050505", 15, 45]} />
      
      <mesh position={[0, 0, -15]} scale={25}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color={isLight ? "#e8e3d5" : "#111111"} roughness={0.8} metalness={0.2} distort={0.5} speed={0.8} side={THREE.BackSide} />
      </mesh>

      <AntigravityParticles isLight={isLight} />

      <ambientLight intensity={isLight ? 0.8 : 0.2} />
      <directionalLight position={[10, 10, 5]} intensity={isLight ? 1 : 0.5} color={isLight ? "#ffffff" : "#c9a96e"} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      
      <Environment preset={isLight ? "city" : "night"} />

      {isHorizon ? (
        <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2}>
          <mesh position={[2, 0, -8]} rotation={[0.5, 0.5, 0]}>
            <icosahedronGeometry args={[3.5, 0]} />
            <meshPhysicalMaterial color="#eae5da" roughness={0.1} metalness={0.9} clearcoat={1} map={logoTex} blending={THREE.MultiplyBlending} />
          </mesh>
        </Float>
      ) : (
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
