import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";




export function Tabletool(props) {

    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/tabletool/scene.gltf"
    );

    useEffect(() => {
        gltf.scene.scale.set(2, 1, 3.5);
        gltf.scene.position.set(props.x,props.y,props.z);
        gltf.scene.rotation.set(0, Math.PI/2, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = false;
                object.receiveShadow = false;
                object.material.envMapIntensity = 20;
                object.material.color.set("#FFDAB9")
            }
        });
    }, [gltf,props.x,props.y,props.z]);

    return <primitive object={gltf.scene} />;
}