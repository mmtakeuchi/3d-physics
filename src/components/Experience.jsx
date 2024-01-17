import { Box, OrbitControls, useKeyboardControls, Sphere, useTexture, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, quat, BallCollider } from "@react-three/rapier";
import blueCar from '../assets/blue_car.jpg'
import redCar from '../assets/red_car.jpg'
import { useRef, useState, useEffect } from "react";
import { Controls } from "../App";

import * as THREE from "three";

export const Experience = ({info, leftBall, rightBall}) => {
  // console.log('info', info)
  const [hover, setHover] = useState(false);
  const cube = useRef();
  const [start, setStart] = useState(false);
  const kicker = useRef();
  // const leftBall = useRef();
  // const rightBall = useRef()
  const blue = useTexture(blueCar)
  const red = useTexture(redCar)

  const jump = () => {
    //   cube.current.applyImpulse({ x: 0, y: 10, z: 0 }, true);
    leftBall?.current.applyImpulse({ x: info.left.force, y: 0, z: 0 }, true);
    rightBall?.current.applyImpulse({ x: -info.right.force, y: 0, z: 0 }, true);
  };
  const pushLeft = () => {
    console.log('left')
  };
  const pushRight = () => {
    console.log('right')
  };

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
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
    //   rightBall.current.applyImpulse({ x: -0.1, y: 0, z: 0 });
      rightBall.current.applyTorqueImpulse({ x: -0.1, y: 0, z: 0 });
    }

    if (forwardPressed) {
      leftBall.current.applyImpulse({ x: 0, y: 0, z: -0.1 });
    }
    if (backPressed) {
      leftBall.current.applyImpulse({ x: 0, y: 0, z: 0.1 });
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

    speed.current += delta;
  });

  const isOnFloor = useRef(true);

  // useEffect(() => {
  //   console.log('left', leftBall?.current)

  //   leftBall.current?.colliderSet?.map?.size = info.left.size
  // })


  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 10]} intensity={1} shadow-camera-left={-20} shadow-camera-right={20} castShadow/>
      {/* <OrbitControls /> */}

      <Html center style={{top: '-300px'}}><button onClick={jump}>Start</button></Html>

       {/* Wall Mesh */}
      <RigidBody
        type="fixed"
        position={[-10, 2.5, 0]}
        ccd
      >
        <Box
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClick={() => setStart(true)}
          args={[1, 5, 5]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={hover ? "hotpink" : "royalblue"} />
        </Box>
      </RigidBody> 

      {/* Left Ball */}
      <RigidBody
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
        key={`leftBall-${info.left.size}`}
        // onContactForce={(payload) => {
          //     console.log(`The total force generated was: ${payload.totalForceMagnitude}`);
          // }}
          type="dynamic"
          restitution={1}
          ccd
          >
        <Sphere
          position={[-5,1, 0]}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClick={() => setStart(true)}
          args={[info.left.size]} //Size
          // scale={[info.left.size, 1, 1]}
          density={1}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial  color={hover ? "hotpink" : "royalblue"} />
        </Sphere>
      </RigidBody>
      
      {/* Right Ball */}
      <RigidBody
        position={[5,1, 0]}
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
        // onContactForce={(payload) => {
        //     console.log(`The total force generated was: ${payload.totalForceMagnitude}`);
        // }}
        key={`rightBall-${info.right.size}`}
        type="dynamic"
        restitution={1}
        ccd
      >
       <Sphere
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClick={() => setStart(true)}
          args={[info.right.size, 32, 32]}
          // scale={(1, 3, 2)} //Size
          density={1}
          castShadow
          receiveShadow
        >
          {/* <BallCollider args={[info.right.size]} color={hover ? "green" : "red"} /> */}
          <meshStandardMaterial  color={hover ? "green" : "red"} />
        </Sphere>
      </RigidBody>


        {/* Wall Mesh */}
      <RigidBody
        type="fixed"
        position={[10, 2, 0]}
        ccd
      >
        <Box
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClick={() => setStart(true)}
          args={[1, 5, 5]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color={hover ? "hotpink" : "royalblue"} />
        </Box>
      </RigidBody> 

        {/* Sweeper */}
      {/* <RigidBody type="kinematicPosition" position={[0, 0.75, 0]} ref={kicker}>
        <group position={[2.5, 0, 0]}>
          <Box args={[5, 0.5, 0.5]}>
            <meshStandardMaterial color="peachpuff" />
          </Box>
        </group>
      </RigidBody> */}


      <RigidBody type="fixed" name="floor">
        <Box position={[0, 0, 0]} args={[20, 1, 20]} receiveShadow>
          <meshStandardMaterial color="springgreen" />
        </Box>
      </RigidBody>
    </>
  );
};