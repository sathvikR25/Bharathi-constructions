import React, { useRef, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, useTexture, ContactShadows, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useLocation } from "react-router-dom";

function AntigravityParticles({ isLight }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const count = 2500; // Optimal count for the structured Vogel spiral

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    
    // Golden angle in radians
    const goldenAngle = 2.399963229728653; 
    const c = 0.55; // Spread factor to fill the background

    for (let i = 0; i < count; i++) {
      const theta = i * goldenAngle;
      const r = c * Math.sqrt(i);

      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      // Create a slight bowl/cone shape for beautiful 3D parallax depth
      const z = -r * 0.15; 

      dummy.position.set(x, y, z);

      // Orientation: Point exactly along the spiral tangent curve
      const thetaNext = (i + 1) * goldenAngle;
      const rNext = c * Math.sqrt(i + 1);
      const xNext = rNext * Math.cos(thetaNext);
      const yNext = rNext * Math.sin(thetaNext);
      const zNext = -rNext * 0.15;
      
      dummy.lookAt(xNext, yNext, zNext);
      
      // Keep dashes uniform and short, exactly like the reference image
      const sizeScale = Math.min(1.5, 0.5 + (i / count)); 
      dummy.scale.set(1, 1, sizeScale);
      dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // 100% Accurate Color Sweep based on angle (Blue -> Pink -> Yellow)
      const angle = Math.atan2(y, x);
      
      if (angle > -Math.PI && angle <= -Math.PI/2) {
         // Bottom Left: Solid Blue
         color.set("#4285F4");
      } else if (angle > -Math.PI/2 && angle <= 0) {
         // Bottom Right: Blue transitioning to Yellow
         const t = (angle + Math.PI/2) / (Math.PI/2);
         color.lerpColors(new THREE.Color("#4285F4"), new THREE.Color("#F9AB00"), t);
      } else if (angle > 0 && angle <= Math.PI/2) {
         // Top Right: Yellow transitioning to Red
         const t = angle / (Math.PI/2);
         color.lerpColors(new THREE.Color("#F9AB00"), new THREE.Color("#EA4335"), t);
      } else {
         // Top Left: Red transitioning back to Blue
         const t = (angle - Math.PI/2) / (Math.PI/2);
         color.lerpColors(new THREE.Color("#EA4335"), new THREE.Color("#4285F4"), t);
      }
      
      if (!isLight) {
        color.multiplyScalar(1.2);
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
    
    // Smooth, structured mouse parallax tracking
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;
    
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;

    // Continuous galaxy spin (very slow and graceful, like the reference)
    meshRef.current.rotation.z -= delta * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        {/* Short dashes pointing perfectly along the Z axis (which lookAt targets) */}
        <boxGeometry args={[0.025, 0.025, 0.25]} />
        <meshBasicMaterial 
          transparent={true}
          opacity={isLight ? 0.9 : 1}
          depthWrite={false}
          blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
          toneMapped={false} 
        />
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
