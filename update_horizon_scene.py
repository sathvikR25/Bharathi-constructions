import re

with open('src/components/Background3D.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the wireframe mesh
old_horizon = r'''    <group position=\{\[0, -2, -10\]\}>
      <mesh ref=\{meshRef\} position=\{\[0, -5, -20\]\} rotation=\{\[-Math\.PI / 2\.2, 0, 0\]\}>
        <planeGeometry args=\{\[50, 50, 80, 80\]\} />
        <meshBasicMaterial wireframe=\{true\} color=\{isLight \? "\#d4af37" : "\#c9a96e"\} transparent=\{true\} opacity=\{isLight \? 0\.35 : 0\.4\} />
      </mesh>
      <WavyHorizonLogo isLight=\{isLight\} position=\{\[2, 4, 4\]\} />
    </group>'''

new_horizon = r'''    <group position={[0, -2, -10]}>
      <WavyHorizonLogo isLight={isLight} position={[0, 4, 0]} />
    </group>'''

content = re.sub(old_horizon, new_horizon, content)

# Change the WavyHorizonLogo sphere color
old_logo = r'''<meshStandardMaterial 
          color="\#c9a96e" 
          metalness=\{0\.5\}
          roughness=\{0\.15\}
          alphaMap=\{alphaMap\}
          alphaTest=\{0\.1\}
          side=\{THREE\.DoubleSide\}
        />'''

new_logo = r'''<meshStandardMaterial 
          color="#e87c48" 
          metalness={0.4}
          roughness={0.2}
          alphaMap={alphaMap}
          alphaTest={0.1}
          side={THREE.DoubleSide}
        />'''

content = re.sub(old_logo, new_logo, content)

with open('src/components/Background3D.jsx', 'w', encoding='utf-8') as f:
    f.write(content)