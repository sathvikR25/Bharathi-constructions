import React, { useRef, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, useTexture, ContactShadows, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useLocation } from "react-router-dom";

function AntigravityParticles({ isLight }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const count = 2500;

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    const goldenAngle = 2.399963229728653; 
    const c = 0.55; 

    for (let i = 0; i < count; i++) {
      const theta = i * goldenAngle;
      const r = c * Math.sqrt(i);
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      const z = -r * 0.15; 
      dummy.position.set(x, y, z);
      const thetaNext = (i + 1) * goldenAngle;
      const rNext = c * Math.sqrt(i + 1);
      const xNext = rNext * Math.cos(thetaNext);
      const yNext = rNext * Math.sin(thetaNext);
      const zNext = -rNext * 0.15;
      dummy.lookAt(xNext, yNext, zNext);
      const sizeScale = Math.min(1.5, 0.5 + (i / count)); 
      dummy.scale.set(1, 1, sizeScale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      const angle = Math.atan2(y, x);
      if (angle > -Math.PI && angle <= -Math.PI/2) {
         color.set("#4285F4");
      } else if (angle > -Math.PI/2 && angle <= 0) {
         const t = (angle + Math.PI/2) / (Math.PI/2);
         color.lerpColors(new THREE.Color("#4285F4"), new THREE.Color("#F9AB00"), t);
      } else if (angle > 0 && angle <= Math.PI/2) {
         const t = angle / (Math.PI/2);
         color.lerpColors(new THREE.Color("#F9AB00"), new THREE.Color("#EA4335"), t);
      } else {
         const t = (angle - Math.PI/2) / (Math.PI/2);
         color.lerpColors(new THREE.Color("#EA4335"), new THREE.Color("#4285F4"), t);
      }
      if (!isLight) color.multiplyScalar(1.2);
      meshRef.current.setColorAt(i, color);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [isLight]);

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current) return;
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.z -= delta * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <boxGeometry args={[0.025, 0.025, 0.25]} />
        <meshBasicMaterial transparent={true} opacity={isLight ? 0.9 : 1} depthWrite={false} blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

// 1. Home Scene (The Antigravity Spiral + Dodecahedron)
function HomeScene({ isLight, logoTex }) {
  return (
    <>
      <mesh position={[0, 0, -15]} scale={25}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color={isLight ? "#e8e3d5" : "#06202b"} roughness={0.8} metalness={0.2} distort={0.5} speed={0.8} side={THREE.BackSide} />
      </mesh>
      <AntigravityParticles isLight={isLight} />
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2}>
        <mesh position={[2, 0, -8]} rotation={[-0.5, 0.2, 0.1]}>
          <dodecahedronGeometry args={[3.5, 0]} />
          <meshPhysicalMaterial color={isLight ? "#eae5da" : "#06202b"} roughness={0.2} metalness={0.8} clearcoat={1} map={logoTex} blending={isLight ? THREE.MultiplyBlending : THREE.AdditiveBlending} />
        </mesh>
      </Float>
      <ContactShadows position={[0, -5, 0]} opacity={isLight ? 0.4 : 0.2} scale={20} blur={2} far={10} />
    </>
  );
}

// 2. Horizon Scene (Architectural Topography Wave)
function HorizonScene({ isLight, logoTex }) {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * 0.6;
    const positions = meshRef.current.geometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      // Topographic sine wave interference pattern
      const z = Math.sin(x * 0.2 + time) * Math.cos(y * 0.2 + time * 0.8) * 1.5 + Math.sin(x * 0.1 - time * 0.5) * 1.0;
      positions.setZ(i, z);
    }
    positions.needsUpdate = true;
    
    // Parallax
    if (groupRef.current) {
      const targetX = state.pointer.x * 0.2;
      const targetY = state.pointer.y * 0.2;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -4, -12]}>
      <mesh ref={meshRef} rotation={[-Math.PI / 2.2, 0, 0]}>
        <planeGeometry args={[50, 50, 80, 80]} />
        <meshBasicMaterial wireframe={true} color={isLight ? "#123645" : "#c9a96e"} transparent={true} opacity={isLight ? 0.2 : 0.4} />
      </mesh>
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2}>
        <mesh position={[2, 4, 4]} rotation={[0.5, 0.5, 0]}>
          <icosahedronGeometry args={[3.5, 0]} />
          <meshPhysicalMaterial color={isLight ? "#eae5da" : "#123645"} roughness={0.1} metalness={0.9} clearcoat={1} map={logoTex} blending={THREE.MultiplyBlending} />
        </mesh>
      </Float>
    </group>
  );
}

// 3. Lake Woods Scene (Fluid Material Aura)
function LakeWoodsScene({ isLight }) {
  const groupRef = useRef();
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      <Float speed={2} floatIntensity={3}>
        <mesh position={[-4, 2, -2]} scale={5}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial color="#0a2a22" distort={0.6} speed={1.5} roughness={0.2} transparent opacity={0.9} />
        </mesh>
      </Float>
      <Float speed={2.5} floatIntensity={4}>
        <mesh position={[4, -2, 2]} scale={6}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial color="#c9a96e" distort={0.5} speed={2} roughness={0.1} transparent opacity={0.8} />
        </mesh>
      </Float>
      <Float speed={1.5} floatIntensity={2}>
        <mesh position={[0, 1, -5]} scale={7}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial color="#123645" distort={0.7} speed={1} roughness={0.2} transparent opacity={0.9} />
        </mesh>
      </Float>
    </group>
  );
}

// 4. Legacy Scene (Frosted Glassmorphism Panels)
function LegacyScene({ isLight }) {
  const groupRef = useRef();
  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = state.pointer.x * 0.2;
      const targetY = state.pointer.y * 0.2;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group position={[0, 0, -8]}>
      {/* Background color blobs to refract through the glass */}
      <Float speed={1.5}>
         <mesh position={[-6, 2, -15]}><sphereGeometry args={[5, 32, 32]}/><meshBasicMaterial color="#c9a96e" /></mesh>
         <mesh position={[6, -2, -15]}><sphereGeometry args={[6, 32, 32]}/><meshBasicMaterial color="#123645" /></mesh>
         <mesh position={[0, 4, -20]}><sphereGeometry args={[4, 32, 32]}/><meshBasicMaterial color="#9E5A47" /></mesh>
      </Float>
      
      {/* Foreground Glass Panels */}
      <group ref={groupRef}>
        <Float speed={2} floatIntensity={2}>
          <mesh position={[2, 0, 0]} rotation={[0.2, -0.2, 0]}>
            <boxGeometry args={[6, 8, 0.2]} />
            <meshPhysicalMaterial transmission={1} roughness={0.1} thickness={2} ior={1.5} color={isLight ? "#ffffff" : "#09141A"} transparent />
          </mesh>
        </Float>
        <Float speed={1.5} floatIntensity={3}>
          <mesh position={[-3, 1, 2]} rotation={[-0.1, 0.4, 0.1]}>
            <boxGeometry args={[4, 6, 0.2]} />
            <meshPhysicalMaterial transmission={1} roughness={0.1} thickness={2} ior={1.5} color={isLight ? "#ffffff" : "#09141A"} transparent />
          </mesh>
        </Float>
      </group>
    </group>
  );
}

// 5. Contact Scene (Plexus Network)
function ContactScene({ isLight }) {
  const count = 120;
  const pointsRef = useRef();
  const linesRef = useRef();
  
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = [];
    for (let i = 0; i < count; i++) {
      pos[i*3] = (Math.random() - 0.5) * 25;
      pos[i*3+1] = (Math.random() - 0.5) * 20;
      pos[i*3+2] = (Math.random() - 0.5) * 10 - 5;
      vel.push(new THREE.Vector3((Math.random()-0.5)*0.02, (Math.random()-0.5)*0.02, (Math.random()-0.5)*0.02));
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array;
    
    // Move nodes
    for (let i = 0; i < count; i++) {
      pos[i*3] += velocities[i].x;
      pos[i*3+1] += velocities[i].y;
      pos[i*3+2] += velocities[i].z;
      
      // Bounds bounce
      if (pos[i*3] > 15 || pos[i*3] < -15) velocities[i].x *= -1;
      if (pos[i*3+1] > 10 || pos[i*3+1] < -10) velocities[i].y *= -1;
      if (pos[i*3+2] > 0 || pos[i*3+2] < -15) velocities[i].z *= -1;

      // Mouse repel
      const mouseX = (state.pointer.x * 15);
      const mouseY = (state.pointer.y * 10);
      const dx = pos[i*3] - mouseX;
      const dy = pos[i*3+1] - mouseY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 3) {
        pos[i*3] += dx * 0.02;
        pos[i*3+1] += dy * 0.02;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Draw Plexus lines
    const linePositions = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i*3] - pos[j*3];
        const dy = pos[i*3+1] - pos[j*3+1];
        const dz = pos[i*3+2] - pos[j*3+2];
        const distSq = dx*dx + dy*dy + dz*dz;
        if (distSq < 15) { 
          linePositions.push(pos[i*3], pos[i*3+1], pos[i*3+2], pos[j*3], pos[j*3+1], pos[j*3+2]);
        }
      }
    }
    linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  });

  return (
    <group position={[0, 0, -5]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.15} color={isLight ? "#123645" : "#c9a96e"} transparent opacity={0.8} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color={isLight ? "#123645" : "#c9a96e"} transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}


function Scene({ isLight, path }) {
  const bgRef = useRef(new THREE.Color(isLight ? "#fdfbf7" : "#09141A"));
  const targetBg = useMemo(() => new THREE.Color(isLight ? "#fdfbf7" : "#09141A"), [isLight]);

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
      <fog attach="fog" args={[isLight ? "#fdfbf7" : "#09141A", 10, 45]} />
      
      <ambientLight intensity={isLight ? 0.8 : 0.2} />
      <directionalLight position={[10, 10, 5]} intensity={isLight ? 1 : 0.5} color={isLight ? "#ffffff" : "#c9a96e"} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      <Environment preset={isLight ? "city" : "night"} />

      {/* Render the correct scene based on the current URL path */}
      {path === '/' && <HomeScene isLight={isLight} logoTex={logoTex} />}
      {path === '/horizon' && <HorizonScene isLight={isLight} logoTex={logoTex} />}
      {path === '/lake-woods' && <LakeWoodsScene isLight={isLight} />}
      {(path === '/legacy' || path === '/builder-profile') && <LegacyScene isLight={isLight} />}
      {path === '/contact' && <ContactScene isLight={isLight} />}
      
      {/* Fallback for any other pages */}
      {(!['/', '/horizon', '/lake-woods', '/legacy', '/builder-profile', '/contact'].includes(path)) && <HomeScene isLight={isLight} logoTex={logoTex} />}
    </>
  );
}

export default function Background3D() {
  const location = useLocation();
  const path = location.pathname;
  
  // Define light theme paths
  const isLight = ['/', '/lake-woods', '/legacy', '/horizon'].includes(path);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none opacity-40 md:opacity-100 transition-opacity duration-500">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <React.Suspense fallback={null}>
          <Scene isLight={isLight} path={path} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
