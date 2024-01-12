import React, {useState} from 'react'
import { KeyboardControls, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useMemo } from "react";
import { Experience } from "./components/Experience";
import InfoSection from "./components/InfoSection";

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

function App() {
  const [leftInfo, setLeftInfo] = useState({size: [1, 20, 20], force: 5})
  const [rightInfo, setRightInfo] = useState({size: [1, 20, 20], force: -5})

  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  return (
  <>
    <div style={{backgroundColor: "#ececec"}}>
      <InfoSection leftInfo={leftInfo} rightInfo={rightInfo} setLeftInfo={setLeftInfo} setRightInfo={setRightInfo}/>
    </div>

    <KeyboardControls map={map}>
      <Canvas shadows camera={{ position: [0, 15, 20], fov: 60 }}>
        <color attach="background" args={["#ececec"]} />
        <Suspense>
          <Physics debug>
            <Experience leftInfo={leftInfo} rightInfo={rightInfo}/>
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  </>
  );
}

export default App;