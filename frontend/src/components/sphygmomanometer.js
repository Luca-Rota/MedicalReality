import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";




export function Sphygmomanometer(props) {
    const [hovered, setHovered] = useState(false);

    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/sphygmomanometer/scene.gltf"
    );

    useEffect(() => {
        gltf.scene.scale.set(1, 1, 1);
        gltf.scene.position.set(props.x, props.y, props.z);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = false;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf, props.x, props.y, props.z]);

    useFrame((state, delta) => {
        if (props.selection === 'Sphygmomanometer') {//go to user
            if (gltf.scene.position.x < 12)
                gltf.scene.position.x += delta * (0.8 * 4);
            if (gltf.scene.position.y < 7)
                gltf.scene.position.y += delta * (0.5 * 4);
            if (gltf.scene.position.z > -4)
                gltf.scene.position.z -= delta * (1.5 * 4);

        }

        if (props.selection !== 'Sphygmomanometer') {//come to home
            if (gltf.scene.position.x > 7)
                gltf.scene.position.x -= delta * (0.8 * 4);
            if (gltf.scene.position.y > 3.7)
                gltf.scene.position.y -= delta * (0.5 * 4);
            if (gltf.scene.position.z < 6)
                gltf.scene.position.z += delta * (1.5 * 4);
        }
    }, []);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);

    return <primitive object={gltf.scene} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
        onClick={() => {
            if (props.state !== 'Pause' && props.lessonstarted!==false && (props.currentTask===0 || props.currentTask===2 || props.currentTask===4)  && (props.selection === "None" || props.selection === "Sphygmomanometer")) {
                if (props.selection !== "Sphygmomanometer")
                    props.setPopup("Sphygmomanometer")
                else if (props.selection === "Sphygmomanometer")
                    props.setPopup("Sphygmomanometer");
            }
        }} />;
}