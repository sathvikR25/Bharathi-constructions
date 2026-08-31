import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, useTexture, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useLocation } from "react-router-dom";

function Scene({ isLight, isHorizon, isHome }) {
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

      {isHome ? (
        // EXCLUSIVE HOME SHAPES (Improved Construction Geometries)
        <>
          {/* TOWER CRANE - Taller, more imposing, better proportions */}
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.5}>
            <group position={[6, 0, -12]} rotation={[0.1, -0.4, 0.05]} scale={1.8}>
              {/* Mast */}
              <mesh position={[0, -1, 0]}>
                <boxGeometry args={[0.15, 6, 0.15]} />
                <meshPhysicalMaterial color={isLight ? "#222" : "#eae5da"} roughness={0.3} metalness={0.8} />
              </mesh>
              {/* Jib (Long Arm) */}
              <mesh position={[1.8, 1.9, 0]}>
                <boxGeometry args={[4.5, 0.15, 0.15]} />
                <meshPhysicalMaterial color="#c9a96e" roughness={0.1} metalness={1} clearcoat={1} />
              </mesh>
              {/* Counter Jib (Short Arm) */}
              <mesh position={[-0.8, 1.9, 0]}>
                <boxGeometry args={[1.5, 0.15, 0.15]} />
                <meshPhysicalMaterial color="#c9a96e" roughness={0.1} metalness={1} clearcoat={1} />
              </mesh>
              {/* Counterweight */}
              <mesh position={[-1.3, 1.65, 0]}>
                <boxGeometry args={[0.6, 0.5, 0.5]} />
                <meshPhysicalMaterial color={isLight ? "#eae5da" : "#111"} roughness={0.5} metalness={0.4} />
              </mesh>
              {/* Drop Cable & Hook */}
              <mesh position={[3.5, 0.2, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 3.4]} />
                <meshPhysicalMaterial color={isLight ? "#555" : "#ccc"} />
              </mesh>
              <mesh position={[3.5, -1.5, 0]}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshPhysicalMaterial color="#c9a96e" roughness={0.2} metalness={0.8} />
              </mesh>
            </group>
          </Float>

          {/* FLOATING CITYSCAPE - Denser, more towers, sharper glass */}
          <Float speed={1} rotationIntensity={0.5} floatIntensity={2}>
            <group position={[-5, -1, -8]} rotation={[0.1, Math.PI / 4, 0]} scale={1.6}>
              {/* Tower 1 (Tall Glass) */}
              <mesh position={[0, 2, 0]}>
                <boxGeometry args={[1.2, 4, 1.2]} />
                <meshPhysicalMaterial color={isLight ? "#ffffff" : "#050505"} roughness={0.05} metalness={0.95} clearcoat={1} transparent opacity={0.85} />
              </mesh>
              {/* Tower 2 (Gold Medium) */}
              <mesh position={[1.2, 1.2, 0.2]}>
                <boxGeometry args={[0.8, 2.4, 0.8]} />
                <meshPhysicalMaterial color="#c9a96e" roughness={0.2} metalness={0.8} />
              </mesh>
              {/* Tower 3 (Dark/Concrete Low) */}
              <mesh position={[-1, 0.8, 0.8]}>
                <boxGeometry args={[0.8, 1.6, 0.8]} />
                <meshPhysicalMaterial color={isLight ? "#eae5da" : "#111"} roughness={0.6} metalness={0.3} map={logoTex} />
              </mesh>
              {/* Tower 4 (Sleek Silver/Metal) */}
              <mesh position={[0.5, 1.5, -1.2]}>
                <boxGeometry args={[0.7, 3, 0.7]} />
                <meshPhysicalMaterial color={isLight ? "#ccc" : "#222"} roughness={0.2} metalness={0.8} />
              </mesh>
            </group>
          </Float>

          {/* BUILDER HELMET - Realistic Yellow/Safety Color & Proportions */}
          <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
            <group position={[-3, 4, -12]} rotation={[0.5, -0.3, 0.2]} scale={1.4}>
              {/* Dome */}
              <mesh rotation={[0, 0, 0]}>
                <sphereGeometry args={[1.2, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshPhysicalMaterial color="#FFC107" roughness={0.15} metalness={0.1} clearcoat={1} clearcoatRoughness={0.1} />
              </mesh>
              {/* Brim */}
              <mesh position={[0, -0.05, 0.15]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[1.35, 1.45, 0.1, 64]} />
                <meshPhysicalMaterial color="#FFC107" roughness={0.15} metalness={0.1} clearcoat={1} />
              </mesh>
              {/* Top Ridge (Safety Helmet Detail) */}
              <mesh position={[0, 0.65, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.25, 1.2, 1.7]} />
                <meshPhysicalMaterial color="#FFC107" roughness={0.15} metalness={0.1} clearcoat={1} />
              </mesh>
            </group>
          </Float>
          
          {/* HOUSE FRAME / BLUEPRINT - Thicker lines, stronger architectural look */}
          <Float speed={2} rotationIntensity={1} floatIntensity={2.5}>
            <group position={[2, -4, -9]} rotation={[0.3, -0.6, 0.1]} scale={1.7}>
              {/* Base Frame */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.2, 2.2, 2.2]} />
                <meshPhysicalMaterial color={isLight ? "#000" : "#fff"} wireframe={true} transparent opacity={0.3} />
              </mesh>
              {/* Solid Core for depth */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.1, 2.1, 2.1]} />
                <meshPhysicalMaterial color={isLight ? "#f4f1ea" : "#0a0a0a"} roughness={0.5} metalness={0.5} transparent opacity={0.6} />
              </mesh>
              {/* Roof Frame */}
              <mesh position={[0, 1.7, 0]} rotation={[0, Math.PI/4, 0]}>
                <coneGeometry args={[2, 1.5, 4]} />
                <meshPhysicalMaterial color="#c9a96e" wireframe={true} transparent opacity={0.9} />
              </mesh>
            </group>
          </Float>
        </>
      ) : isHorizon ? (
        // EXCLUSIVE HORIZON SHAPES (Abstract, sharp, modern)
        <>
          <Float speed={1.5} rotationIntensity={0.8} floatIntensity={2}>
            <mesh position={[4, 1, -8]} rotation={[0.5, 0.5, 0]}>
              <octahedronGeometry args={[2.5, 0]} />
              <meshPhysicalMaterial color="#eae5da" roughness={0.1} metalness={0.9} clearcoat={1} map={logoTex} blending={THREE.MultiplyBlending} />
            </mesh>
          </Float>

          <Float speed={1.2} rotationIntensity={1.2} floatIntensity={1.5}>
            <mesh position={[-5, -2, -6]} rotation={[Math.PI / 4, 0.2, 0.1]}>
              <capsuleGeometry args={[1, 3, 32, 64]} />
              <meshPhysicalMaterial color="#f4f1ea" roughness={0.3} metalness={0.7} map={logoTex} blending={THREE.MultiplyBlending} />
            </mesh>
          </Float>

          <Float speed={0.8} rotationIntensity={0.4} floatIntensity={1}>
            <mesh position={[-2, 3, -12]} rotation={[0, 0.5, 0]}>
              <sphereGeometry args={[2.5, 64, 64]} />
              <meshPhysicalMaterial color="#eae5da" roughness={0.2} metalness={0.8} map={logoTex} blending={THREE.MultiplyBlending} />
            </mesh>
          </Float>
        </>
      ) : (
        // STANDARD SHAPES (Other pages)
        <>
          <Float speed={1} rotationIntensity={0.5} floatIntensity={2}>
            <mesh position={[5, 2, -6]} rotation={[0.5, 0.5, 0]}>
              <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
              <meshPhysicalMaterial color={isLight ? "#eae5da" : "#222222"} roughness={0.1} metalness={0.9} clearcoat={1} map={logoTex} blending={isLight ? THREE.MultiplyBlending : THREE.AdditiveBlending} />
            </mesh>
          </Float>

          <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
            <mesh position={[-6, -1, -8]} rotation={[-0.5, 0.2, 0.1]}>
              <dodecahedronGeometry args={[2.5, 0]} />
              <meshPhysicalMaterial color={isLight ? "#eae5da" : "#111111"} roughness={0.3} metalness={0.7} map={logoTex} blending={isLight ? THREE.MultiplyBlending : THREE.AdditiveBlending} />
            </mesh>
          </Float>

          <Float speed={0.8} rotationIntensity={0.2} floatIntensity={1}>
            <mesh position={[2, -4, -10]} rotation={[Math.PI / 2, 0.2, 0]}>
              <torusGeometry args={[3.5, 0.4, 64, 100]} />
              <meshPhysicalMaterial color={isLight ? "#f4f1ea" : "#1a1a1a"} roughness={0.2} metalness={0.8} map={logoTex} blending={isLight ? THREE.MultiplyBlending : THREE.AdditiveBlending} />
            </mesh>
          </Float>

          <Float speed={2} rotationIntensity={1.5} floatIntensity={2.5}>
            <mesh position={[-3, 4, -12]} rotation={[0.2, 0.8, 0]}>
              <icosahedronGeometry args={[2, 0]} />
              <meshPhysicalMaterial color={isLight ? "#eae5da" : "#050505"} roughness={0.1} metalness={1} clearcoat={1} map={logoTex} blending={isLight ? THREE.MultiplyBlending : THREE.AdditiveBlending} />
            </mesh>
          </Float>
        </>
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
  const isHome = path === "/";

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <React.Suspense fallback={null}>
          <Scene isLight={isLight} isHorizon={isHorizon} isHome={isHome} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
