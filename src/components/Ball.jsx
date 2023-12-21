import { Box, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";

const Ball = () => {
  const [isDragging, setisDragging] = useState(false);
  const rigidBody = useRef(null);
  // const left = () => {
  // setCount((p: number) => p + 1);
  // if (rigidBody.current) {
  // rigidBody.current.setTranslation(vec3({ x: count, y: 0, z: 0 }), true);
  // }
  // };
  if (isDragging && rigidBody.current) {
    rigidBody.current.applyImpulse({ x: 5, y: 0, z: 0 }, true);
    console.log("pressed");
  }
  if (isDragging === false) {
    if (rigidBody.current) {
      rigidBody.current.applyImpulse({ x: -5, y: 0, z: 0 }, false);
      console.log("released");
    }
  }

  return (
    <>
      <RigidBody
        ref={rigidBody}
        restitution={2}
        colliders={"cuboid"}
        type="kinematicPosition"
      >
        <Box
          position={[-3, 1, 0]}
          onPointerDown={() => setisDragging(true)}
          onPointerUp={() => setisDragging(false)}
        >
          <meshStandardMaterial color="lightblue" />
          <Html>
            <div
              style={{
                fontSize: "0.7rem",
                color: "red",
                padding: "10px",
                cursor: "pointer"
              }}
              draggable
              onDragStart={(e) => {
                console.log(`drag started x:${e.clientX} y:${e.clientY}`);
              }}
              onDragEnd={() => {
                console.log("Drag end");
              }}
            >
              X
            </div>
          </Html>
        </Box>
      </RigidBody>
    </>
  );
};
export default Ball;
