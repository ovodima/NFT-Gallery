import { RoundedBox, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import getUuid from "uuid-by-string";
import { useRoute, useLocation } from "wouter";
import { TextureLoader } from 'three'




function Frame({ url, gr, ...props}) {
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const image = useRef();
  const ref = useRef();
  useCursor(hovered);

  const texture = useRef();
  useEffect(() => {
    texture.current = new TextureLoader().load(url);
  }, [1]);
  useFrame(
    (state) =>
      (texture.current.material =
        2 + Math.sin(rnd * 1000 + state.clock.elapsedTime / 3) / 2)
 


  );
  return (
    <group ref={ref} {...props}>
      <RoundedBox
        name={getUuid(`${url}`)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        radius={0.01}
        smoothness={4}
        scale={[1, gr, 0.05]}
        position={[0, gr / 2, 0]}
      >
        <meshStandardMaterial
          color="#151515"
          metalness={0.8}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial color="white" toneMapped={false} />
        </mesh>
        {/* <Image
          raycast={() => null}
          ref={image}
          scale={[0.875, 0.91, 0.875]}
          position={[0, 0, 0.7]}
          url={url}
          alt={image+'3Err'}
        /> */}
        <meshBasicMaterial map={texture.current} position={[0, 0, 0.7]} scale={[0.875, 0.91, 0.875]} />
      </RoundedBox>
    </group>
  );
}

const Frames = (props) => {
  const {
    pictures,
    q = new THREE.Quaternion(),
    p = new THREE.Vector3(),
    gr,
  } = props;

  const ref = useRef();
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();
  const clicked = useRef();

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.localToWorld(p.set(0, gr / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });

  useFrame((state, delta) => {
    state.camera.position.lerp(p, delta * 3);
    state.camera.quaternion.slerp(q, delta * 3);
  });

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        setLocation(
          clicked.current === e.object ? "/" : `/item/${e.object.name}`
        );
      }}
      onPointerMissed={(e) => setLocation("/")}
    >
      <Frame url={pictures[0]} position={[0, 0, 1.25]} gr={gr}/>
      <Frame position={[-0.8, 0, -0.5]} url={pictures[1]} gr={gr} />
      <Frame position={[0.8, 0, -0.5]} url={pictures[2]}  gr={gr}/>
      <Frame
        position={[-1.75, 0, 1]}
        rotationY={Math.PI / 2.5}
        url={pictures[3]}
        gr={gr}
      />
      <Frame
        position={[-2.2, 0, 2.5]}
        rotation-y={Math.PI / 2.5}
        url={pictures[4]}
        gr={gr}
      />
      <Frame
        position={[1.75, 0, 1]}
        rotation-y={-Math.PI / 2.5}
        url={pictures[5]}
        gr={gr}
      />
      <Frame
        position={[2.2, 0, 2.5]}
        rotation-y={-Math.PI / 2.5}
        url={pictures[6]}
        gr={gr}
      />
    </group>
  );
};

export default Frames;
