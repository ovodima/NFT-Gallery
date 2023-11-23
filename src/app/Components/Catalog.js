"use client";


import {
  
  MeshReflectorMaterial,
  
  
  Environment,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Suspense } from "react";
import Frames from "./Frames";


const goldenRatio = 1.61803398875;

const Catalog = (props) => {
    const {pictures} = props
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 0, 100] }}>
      <Suspense fallback={null}>
        <color attach="background" args={["#191920"]} />
        <fog attach="fog" args={["#191920", 0, 10]} />
        <Environment preset="city" />
        <group position={[0, -0.5, 0]}>

            <Frames pictures={pictures} gr={goldenRatio}/>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048} // Lower value if too slow on mobile
              mixBlur={1}
              mixStrength={60}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#151515"
              metalness={0.5}
            />
          </mesh>
        </group>
      </Suspense>
    </Canvas>
  );
};

export default Catalog;
