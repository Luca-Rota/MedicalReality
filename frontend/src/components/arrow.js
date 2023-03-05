import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { useFrame } from '@react-three/fiber';
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



export function Arrow(props) {
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/arrow/scene.gltf"
    );

    useEffect(() => {
        gltf.scene.scale.set(0.05, 0.1, 0.18);
        gltf.scene.rotation.set(0, Math.PI/2, 0);
        gltf.scene.position.set(props.x, props.y, props.z);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = false;
                object.receiveShadow = false;
                object.material.envMapIntensity = 20;
                object.material.color.set("#FF0000");
            }
        });
    }, [gltf, props.x, props.y, props.z]);

    let direction = 1; //1=up; 0=down
    useFrame((state, delta) => {
        gltf.scene.rotation.y += delta * 0.5;
        if (direction === 1)
            gltf.scene.position.y += delta * 1;
        else
            gltf.scene.position.y -= delta * 1;

        if (gltf.scene.position.y > props.y + 1)
            direction = 0;
        if (gltf.scene.position.y < props.y)
            direction = 1;
    }, []);


    return <primitive object={gltf.scene} />;
}