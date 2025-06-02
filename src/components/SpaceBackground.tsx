import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { random } from 'maath';
import { useTheme } from '@mui/material/styles';

export default function SpaceBackground() {
  const ref = useRef<THREE.Points>(null);
  const theme = useTheme();
  
  // Generate random points for stars with initial velocities
  const count = 5000;
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    // Initialize positions and velocities
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Random position in a sphere, but keep minimum distance from center
      const point = random.inSphere(new Float32Array(3), { radius: 15 });
      // Ensure minimum distance from center (camera)
      const distance = Math.sqrt(point[0] * point[0] + point[1] * point[1] + point[2] * point[2]);
      if (distance < 5) { // Minimum distance from camera
        const scale = 5 / distance;
        point[0] *= scale;
        point[1] *= scale;
        point[2] *= scale;
      }
      positions[i3] = point[0];
      positions[i3 + 1] = point[1];
      positions[i3 + 2] = point[2];
      
      // Random velocity for each particle (very small values for slow movement)
      velocities[i3] = (Math.random() - 0.5) * 0.001;     // x velocity
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.001; // y velocity
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001; // z velocity
    }
    
    return { positions, velocities };
  }, []);

  // Animate individual particles
  useFrame(() => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      // Update each particle's position
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Update position based on velocity
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];
        
        // Boundary check - if particle goes too far or too close, reset its position
        const distance = Math.sqrt(
          positions[i3] * positions[i3] +
          positions[i3 + 1] * positions[i3 + 1] +
          positions[i3 + 2] * positions[i3 + 2]
        );
        
        if (distance > 15 || distance < 5) {
          // Reset particle to random position within sphere
          const point = random.inSphere(new Float32Array(3), { radius: 15 });
          // Ensure minimum distance from center (camera)
          const newDistance = Math.sqrt(point[0] * point[0] + point[1] * point[1] + point[2] * point[2]);
          if (newDistance < 5) {
            const scale = 5 / newDistance;
            point[0] *= scale;
            point[1] *= scale;
            point[2] *= scale;
          }
          positions[i3] = point[0];
          positions[i3 + 1] = point[1];
          positions[i3 + 2] = point[2];
        }
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={theme.palette.particleColor}
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
} 