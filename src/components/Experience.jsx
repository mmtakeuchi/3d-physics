import { Box, OrbitControls, useKeyboardControls, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, quat, BallCollider } from "@react-three/rapier";
import { useRef, useState } from "react";
import { Controls } from "../App";

import * as THREE from "three";

export const Experience = () => {
  const [hover, setHover] = useState(false);
  const cube = useRef();
  const [start, setStart] = useState(false);
  const kicker = useRef();
  const leftBall = useRef();
  const rightBall = useRef()

  const jump = () => {
    //   cube.current.applyImpulse({ x: 0, y: 10, z: 0 }, true);
      rightBall.current.applyImpulse({ x: -1, y: 0, z: 0 }, true);
      leftBall.current.applyImpulse({ x: 1, y: 0, z: 0 }, true);
  };
  const pushLeft = () => {
    console.log('left')
  };
  const pushRight = () => {
    console.log('right')
  };

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.pushLeft]);
  const rightPressed = useKeyboardControls((state) => state[Controls.pushRight]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );

  const handleMovement = () => {
    if (!isOnFloor.current) {
      return;
    }
    if (rightPressed) {
      leftBall.current.applyImpulse({ x: 0.1, y: 0, z: 0 });
    }
    if (leftPressed) {
      rightBall.current.applyImpulse({ x: -0.1, y: 0, z: 0 });
    }

    if (forwardPressed) {
      cube.current.applyImpulse({ x: 0, y: 0, z: -0.1 });
    }
    if (backPressed) {
      cube.current.applyImpulse({ x: 0, y: 0, z: 0.1 });
    }
  };

  const speed = useRef(5);

  useFrame((_state, delta) => {
    if (jumpPressed) {
      jump();
    }

    if (leftPressed) {
        pushLeft()
    }

    if (rightPressed) {
        pushRight()
    }

    handleMovement();

//     if (!start) {
//       return;
//     }
//     const curRotation = quat(kicker.current.rotation());
//     const incrementRotation = new THREE.Quaternion().setFromAxisAngle(
//       new THREE.Vector3(0, 1, 0),
//       delta * speed.current
//     );
//     curRotation.multiply(incrementRotation);
//     kicker.current.setNextKinematicRotation(curRotation);

    speed.current += delta;
  });

  const isOnFloor = useRef(true);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-10, 10, 0]} intensity={0.4} />
      <OrbitControls />

      {/* <RigidBody
        position={[-2.5, 1, 0]}
        ref={cube}
        colliders={"ball"}
        onCollisionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "floor") {
            isOnFloor.current = true;
          }
        }}
        onCollisionExit={({ other }) => {
          if (other.rigidBodyObject.name === "floor") {
            isOnFloor.current = false;
          }
        }}
      >
        <Sphere
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
        //   onClick={() => setStart(true)}
        >
          <meshStandardMaterial color={hover ? "hotpink" : "royalblue"} />
        </Sphere>
      </RigidBody> */}

      <RigidBody
        position={[-1.5,5, 0]}
        ref={leftBall}
        colliders={"ball"}
        onCollisionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "floor") {
            isOnFloor.current = true;
          }
        }}
        onCollisionExit={({ other }) => {
          if (other.rigidBodyObject.name === "floor") {
              isOnFloor.current = false;
            }
        }}
        onContactForce={(payload) => {
            console.log(`The total force generated was: ${payload.totalForce}`);
        }}
        restitution={1}
      >
        <Sphere
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClick={() => setStart(true)}
        //   args={[1, 32, 32]}
          scale={(0.5, 0.5, 0.5)} //Size
          density={1}
        >
          <meshStandardMaterial color={hover ? "hotpink" : "royalblue"} />
        </Sphere>
      </RigidBody>
      <RigidBody
        position={[2.5,5, 0]}
        ref={rightBall}
        colliders={"ball"}
        onCollisionEnter={({ other }) => {
          if (other.rigidBodyObject.name === "floor") {
            isOnFloor.current = true;
          }
        }}
        onCollisionExit={({ other }) => {
          if (other.rigidBodyObject.name === "floor") {
              isOnFloor.current = false;
            }
        }}
        onContactForce={(payload) => {
            console.log(`The total force generated was: ${payload}`);
        }}
        type="static"
        restitution={1}
      >
        <Sphere
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClick={() => setStart(true)}
          args={[1, 32, 32]}
          scale={(1, 1, 1)} //Size
          density={1}
        >
          <meshStandardMaterial color={hover ? "green" : "red"} />
        </Sphere>
      </RigidBody>


      {/* <RigidBody
        position={[2.5,1, 0]}
      >
        <Box
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClick={() => setStart(true)}
          
        >
          <meshStandardMaterial color={hover ? "hotpink" : "royalblue"} />
        </Box>
      </RigidBody> */}

      {/* <RigidBody type="kinematicPosition" position={[0, 0.75, 0]} ref={kicker}>
        <group position={[2.5, 0, 0]}>
          <Box args={[5, 0.5, 0.5]}>
            <meshStandardMaterial color="peachpuff" />
          </Box>
        </group>
      </RigidBody> */}


      <RigidBody type="fixed" name="floor">
        <Box position={[0, 0, 0]} args={[10, 1, 10]}>
          <meshStandardMaterial color="springgreen" />
        </Box>
      </RigidBody>
    </>
  );
};