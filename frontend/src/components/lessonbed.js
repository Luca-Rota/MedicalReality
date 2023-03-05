import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function LessonBed(props) {

    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/hospital_bed/scene.gltf"
    );

    useEffect(() => {
        gltf.scene.scale.set(0.045, 0.045, 0.045);
       gltf.scene.position.set(props.x,props.y,props.z);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf,props.x,props.y,props.z]);

    return <primitive object={gltf.scene} />;
}