import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Thermometer(props) {
    const [hovered, setHovered] = useState(false);

    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/thermometer/scene.gltf"
    );

    useEffect(() => {
        gltf.scene.scale.set(0.09, 0.09, 0.09);
        gltf.scene.position.set(props.x, props.y, props.z);
        gltf.scene.rotation.set(Math.PI/2, 0, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = false;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf, props.x, props.y, props.z]);

    useFrame((state, delta) => {
        if (props.selection === 'Thermometer') {//go to user
            if (gltf.scene.position.x < 12)
                gltf.scene.position.x += delta * (1.3 * 4);
            if (gltf.scene.position.y < 8)
                gltf.scene.position.y += delta * (0.6 * 4);
            if (gltf.scene.position.z > -5)
                gltf.scene.position.z -= delta * (1.7 * 4);

        }

        if (props.selection !== 'Thermometer') {//come to home
            if (gltf.scene.position.x > 5)
                gltf.scene.position.x -= delta * (1.3 * 4);
            if (gltf.scene.position.y > 4)
                gltf.scene.position.y -= delta * (0.6 * 4);
            if (gltf.scene.position.z < 6)
                gltf.scene.position.z += delta * (1.7 * 4);
        }
    }, []);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);

    return <primitive object={gltf.scene} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
    onClick={() => {
        if (props.state !== 'Pause' && props.lessonstarted!==false && (props.currentTask===0 || props.currentTask===2 || props.currentTask===4) && (props.selection === "None" || props.selection === "Thermometer")) {
            if (props.selection !== "Stethoscope")
                props.setPopup("Thermometer")
            else if (props.selection === "Stethoscope")
                props.setPopup("Thermometer");
        }
    }} />;
}
