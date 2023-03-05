import "./../styles.css"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import React, { Suspense, useState } from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Ground } from "../components/ground";
import { Bed } from "../components/bed";
import { Wall } from "../components/wall";
import { Desk } from "../components/desk";
import { Door } from "../components/door";
import { Clipboard } from "../components/clipboard";
import { Dripstand } from "../components/dripstand";
import { Medikit } from "../components/medikit";
import { Mobil } from "../components/mobil";
import { Couch } from "./../components/couch";
import { Pills } from "../components/pills";
import { Arrow } from "../components/arrow";
import { Text } from "../components/text";

function HospitalShow(props) {
    const [mod, setMod] = useState('landingPage');
    return (
        <>
            <Suspense fallback={null}>
                <Canvas shadows>
                    <Stars />


                    <spotLight
                        color={'#FFFEE4'}
                        intensity={4}
                        angle={2}
                        penumbra={0.5}
                        position={[0, 24, 0]}
                        castShadow
                        shadow-bias={-0.0001}
                    />

                    <spotLight
                        color={'#FFFEE4'}
                        intensity={0.5}
                        angle={2}
                        penumbra={0.5}
                        position={[20, 5, 0]}
                        castShadow
                        shadow-bias={-0.0001}
                    />
                    <OrbitControls target={[13, 3, 0]} maxPolarAngle={1.45} />
                    <PerspectiveCamera makeDefault fov={50} position={[20, 5, 0]} />

                    <color args={[0, 0, 0]} attach="background" />
                    <Bed x={-8} y={2.1} z={10} />
                    <Desk x={12} y={0} z={0} />
                    <Door x={-14} y={0} z={-10} />
                    <Clipboard x={13.5} y={3} z={1.5} mod={mod} setMod={setMod} goToLesson1={props.goToLesson1} goToLesson2={props.goToLesson2}/>
                    <Dripstand x={-13} y={0} z={14} />
                    <Medikit x={-15} y={6} z={-13} />
                    <Mobil x={-2} y={0} z={14} />
                    <Couch x={0} y={0} z={-12} />
                    <Pills x={-2.5} y={3.2} z={14} />
                    {
                        mod === 'landingPage' ?
                            <Arrow x={13.5} y={3.8} z={2.2} />
                            :
                            false
                    }
                    <Text x={-14} y={8} z={0} />


                    <Ground />
                    <Wall position={[0, 10, -15]} scale={[30, 20, 1]} rotation={[0, 0, 0]} /> {/*internal right wall*/}
                    <Wall position={[0, 10, -15]} scale={[30, 20, 1]} rotation={[Math.PI, 0, 0]} /> {/*external right wall*/}

                    <Wall position={[0, 10, 15]} scale={[30, 20, 1]} rotation={[Math.PI, 0, 0]} /> {/*internal left wall*/}
                    <Wall position={[0, 10, 15]} scale={[30, 20, 1]} rotation={[0, 0, 0]} /> {/*external left wall*/}

                    <Wall position={[-15, 10, 0]} scale={[30, 20, 1]} rotation={[0, Math.PI / 2, 0]} /> {/*internal behind wall*/}
                    <Wall position={[-15, 10, 0]} scale={[30, 20, 1]} rotation={[0, -Math.PI / 2, 0]} /> {/*external behind wall*/}

                    <Wall position={[-0, 20, 0]} scale={[30, 30, 1]} rotation={[Math.PI / 2, 0, Math.PI / 2]} /> {/*internal top wall*/}
                    <Wall position={[-0, 20, 0]} scale={[30, 30, 1]} rotation={[Math.PI / 2, Math.PI, Math.PI / 2]} /> {/*external top wall*/}

                </Canvas>
            </Suspense>
        </>);
}

export { HospitalShow };