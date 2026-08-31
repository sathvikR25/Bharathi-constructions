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
        // EXCLUSIVE HOME SHAPES (Innovative Construction: Cranes, Helmets, Buildings)
        <>
          {/* STYLIZED TOWER CRANE */}
          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.5}>
            <group position={[4, 1, -8]} rotation={[0.2, 0.8, 0.1]} scale={1.2}>
              {/* Mast */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.2, 4, 0.2]} />
                <meshPhysicalMaterial color={isLight ? "#111" : "#eae5da"} roughness={0.3} metalness={0.7} />
              </mesh>
              {/* Jib (Arm) */}
              <mesh position={[1.2, 1.9, 0]}>
                <boxGeometry args={[3.5, 0.2, 0.2]} />
                <meshPhysicalMaterial color="#c9a96e" roughness={0.1} metalness={0.9} />
              </mesh>
              {/* Counter Jib */}
              <mesh position={[-0.8, 1.9, 0]}>
                <boxGeometry args={[1.5, 0.2, 0.2]} />
                <meshPhysicalMaterial color="#c9a96e" roughness={0.1} metalness={0.9} />
              </mesh>
              {/* Counterweight */}
              <mesh position={[-1.3, 1.6, 0]}>
                <boxGeometry args={[0.5, 0.6, 0.4]} />
                <meshPhysicalMaterial color={isLight ? "#eae5da" : "#222"} roughness={0.4} metalness={0.5} />
              </mesh>
              {/* Cable & Hook */}
              <mesh position={[2.5, 0.5, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 2.8]} />
                <meshPhysicalMaterial color={isLight ? "#555" : "#ccc"} />
              </mesh>
              <mesh position={[2.5, -0.9, 0]}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshPhysicalMaterial color="#c9a96e" />
              </mesh>
            </group>
          </Float>

          {/* FLOATING CITYSCAPE / SKYSCRAPERS */}
          <Float speed={1} rotationIntensity={0.5} floatIntensity={2}>
            <group position={[-5, -1, -8]} rotation={[0.2, Math.PI / 4, 0]} scale={1.5}>
              {/* Tower 1 (Glass) */}
              <mesh position={[0, 1.5, 0]}>
                <boxGeometry args={[1.2, 3, 1.2]} />
                <meshPhysicalMaterial color={isLight ? "#fff" : "#000"} roughness={0.1} metalness={0.9} clearcoat={1} transparent opacity={0.8} />
              </mesh>
              {/* Tower 2 (Gold) */}
              <mesh position={[1.2, 1, 0.2]}>
                <boxGeometry args={[0.8, 2, 0.8]} />
                <meshPhysicalMaterial color="#c9a96e" roughness={0.2} metalness={0.8} />
              </mesh>
              {/* Tower 3 (Dark/Solid) */}
              <mesh position={[-1, 0.5, 0.5]}>
                <boxGeometry args={[0.8, 1, 0.8]} />
                <meshPhysicalMaterial color={isLight ? "#eae5da" : "#111"} roughness={0.5} metalness={0.5} map={logoTex} />
              </mesh>
            </group>
          </Float>

          {/* ABSTRACT BUILDER HELMET */}
          <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.5}>
            <group position={[-2, 3.5, -12]} rotation={[0.4, -0.2, 0.2]} scale={1.2}>
              {/* Dome */}
              <mesh rotation={[0, 0, 0]}>
                <sphereGeometry args={[1.2, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshPhysicalMaterial color="#c9a96e" roughness={0.2} metalness={0.8} clearcoat={1} />
              </mesh>
              {/* Brim */}
              <mesh position={[0, -0.05, 0.2]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[1.35, 1.35, 0.1, 32]} />
                <meshPhysicalMaterial color="#c9a96e" roughness={0.2} metalness={0.8} clearcoat={1} />
              </mesh>
              {/* Top Ridge */}
              <mesh position={[0, 0.6, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.2, 1.3, 1.8]} />
                <meshPhysicalMaterial color="#c9a96e" roughness={0.2} metalness={0.8} />
              </mesh>
            </group>
          </Float>
          
          {/* MODERN HOUSE FRAME / BLUEPRINT */}
          <Float speed={2} rotationIntensity={0.8} floatIntensity={2.5}>
            <group position={[3, -3.5, -10]} rotation={[0.2, -0.5, 0]} scale={1.5}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 2, 2]} />
                <meshPhysicalMaterial color={isLight ? "#111" : "#fff"} wireframe={true} transparent opacity={0.5} />
              </mesh>
              <mesh position={[0, 1.5, 0]} rotation={[0, Math.PI/4, 0]}>
                <coneGeometry args={[1.8, 1.5, 4]} />
                <meshPhysicalMaterial color="#c9a96e" wireframe={true} transparent opacity={0.8} />
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
