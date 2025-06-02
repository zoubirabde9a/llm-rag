import { Canvas } from '@react-three/fiber';
import SpaceBackground from './SpaceBackground';

export default function SpaceBackgroundWrapper() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <SpaceBackground />
      </Canvas>
    </div>
  );
} 