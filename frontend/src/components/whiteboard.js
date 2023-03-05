
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html } from '@react-three/drei';
import { WhiteboardLesson } from "../pages/WhiteboardLesson";

export function Whiteboard(props) {

    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/whiteboard/scene.gltf"
    );

    useEffect(() => {
        gltf.scene.scale.set(5, 5, 7);
        gltf.scene.position.set(props.x, props.y, props.z);
        gltf.scene.rotation.set(0, Math.PI/2, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = false;
                object.receiveShadow = false;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf, props.x, props.y, props.z]);

    return (
        <>
            <primitive object={gltf.scene}>
                <Html className="content" rotation-y={-Math.PI / 2} rotation-x={Math.PI / 2} rotation-z={Math.PI / 2} position={[-0.1, 1.6, 0.1]} scale={[0.09, 0.07, 0.01]} transform occlude>
                    <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
                        <WhiteboardLesson lesson={props.lesson} currentTask={props.currentTask} offset={props.offset}></WhiteboardLesson>
                    </div>
                </Html>
            </primitive>
        </>
    );
}