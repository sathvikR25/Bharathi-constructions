import re

with open('src/components/Background3D.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Completely replace HorizonScene
old_horizon_scene = r'''// 2\. Horizon Scene \(Architectural Topography Wave\).*?return \([\s\S]*?<planeGeometry args=\{\[50, 50, 80, 80\]\} />[\s\S]*?</group>\s*\);\s*\}'''

new_horizon_scene = '''// 2. Horizon Scene (Architectural Topography Wave)
function HorizonScene({ isLight, logoTex }) {
  const groupRef = React.useRef();

  useFrame((state, delta) => {
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
      <WavyHorizonLogo isLight={isLight} position={[0, 8, 4]} />
    </group>
  );
}'''

content = re.sub(old_horizon_scene, new_horizon_scene, content)

# Update WavyHorizonLogo material
old_mat = r'''<meshStandardMaterial 
            color="#c9a96e" 
            metalness=\{0\.5\}
            roughness=\{0\.15\}
            alphaMap=\{alphaMap\}
            alphaTest=\{0\.5\}
            side=\{THREE\.DoubleSide\}
          />'''

new_mat = r'''<meshStandardMaterial 
            color="#e87c48" 
            metalness={0.4}
            roughness={0.25}
            alphaMap={alphaMap}
            alphaTest={0.5}
            side={THREE.DoubleSide}
          />'''

content = re.sub(old_mat, new_mat, content)

with open('src/components/Background3D.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
