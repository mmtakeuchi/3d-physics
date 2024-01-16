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
  const [info, setInfo] = useState({
    left: {size: 1, force: 5},
    right: {size: 1, force: -5}
  })

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
      <InfoSection info={info} setInfo={setInfo}/>
    </div>

    <KeyboardControls map={map}>
      <Canvas shadows camera={{ position: [0, 15, 20], fov: 60 }}>
        <color attach="background" args={["#ececec"]} />
        <Suspense>
          <Physics debug>
            <Experience info={info}/>
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  </>
  );
}

export default App;