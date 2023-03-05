import { OrbitControls, Stars, PerspectiveCamera} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "three";
import {Ground} from "../components/ground"
import { Wall } from "../components/wall";
import { Text } from "../components/text";

function menuShow() {

    return (
        <>
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

        </>);
}

export {menuShow};
