import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";




export function Furniture(props) {

    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/furniture/scene.gltf"
    );

    useEffect(() => {
        gltf.scene.scale.set(8, 8, 8);
        gltf.scene.rotation.set(0, Math.PI, 0);
       gltf.scene.position.set(props.x,props.y,props.z);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = false;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf,props.x,props.y,props.z]);

    return <primitive object={gltf.scene} />;
}