import React, { useState, useEffect, useRef } from 'react';
import { KeyboardControls, Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Suspense, useMemo } from 'react';
import { Experience } from './components/Experience';
import InfoSection from './components/InfoSection';

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
};

function App() {
  const [info, setInfo] = useState({
    left: { size: 1, force: 5, heightPos: 1 },
    right: { size: 1, force: 5, heightPos: 1 },
  });
  const [startAction, setStartAction] = useState(false);
  const leftBall = useRef();
  const rightBall = useRef();

  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.jump, keys: ['Space'] },
    ],
    []
  );

  const handleStart = (e) => {
    setStartAction(true);
    setTimeout(() => {
      setStartAction(false);
    }, 100);
  };

  return (
    <>
      <KeyboardControls map={map}>
        <Canvas
          style={{ width: '100%', height: '75%' }}
          shadows
          camera={{ position: [0, 13, 20], fov: 100 }}
        >
          <color attach="background" args={['#ececec']} />
          <Suspense>
            <Physics>
              <Experience
                info={info}
                leftBall={leftBall}
                rightBall={rightBall}
                startAction={startAction}
              />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
      <div style={{ backgroundColor: '#ececec' }}>
        <InfoSection info={info} setInfo={setInfo} />
        <button className="startBtn" type="button" onClick={handleStart}>
          Start
        </button>
      </div>
    </>
  );
}

export default App;
