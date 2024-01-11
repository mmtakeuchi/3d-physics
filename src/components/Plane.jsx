import React, {useRef} from 'react'
import {Box} from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

const Plane = () => {
  return (
    <RigidBody type="fixed">
        <Box position={[0, 0, 0]} args={[40, 1, 40]}>
          <meshStandardMaterial color={"lightgreen"} />
        </Box>
    </RigidBody>
  );
};

export default Plane