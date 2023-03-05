import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";




export function Body(props) {
    const [hovered, setHovered] = useState(false);
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/body/scene.gltf"
    );

    useEffect(() => {
        gltf.scene.scale.set(5, 5, 5);
       gltf.scene.position.set(props.x,props.y,props.z);
       gltf.scene.rotation.set(-Math.PI/2, 0, Math.PI);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = false;
                object.material.envMapIntensity = 20;
                object.material.color.set("#FFDAB9")
            }
        });
    }, [gltf,props.x,props.y,props.z]);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);

    return <primitive object={gltf.scene} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
    onClick={() =>{
        if (props.state !== 'Pause' && (props.currentTask===1 || props.currentTask===3 || props.currentTask===5)) {
            if (props.bedSelection !== props.bodypart)
                props.setBedPopup(props.bodypart);
            else if (props.bedSelection === props.bodypart)
                props.setBedPopup(props.bodypart);
        }
        props.setBodyPart(props.bodypart)
    }}/>;
}