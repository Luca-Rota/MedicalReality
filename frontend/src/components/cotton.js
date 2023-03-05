import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";




export function Cotton(props) {

    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);

    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/cotton/scene.gltf"
    );

    useEffect(() => {
        gltf.scene.scale.set( 0.03, 0.03, 0.03);
       gltf.scene.position.set(props.x,props.y,props.z);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf,props.x,props.y,props.z]);

    useFrame((state, delta) => {
        if (props.selection === 'Cotton') {//go to user
            if (gltf.scene.position.x < 12)
                gltf.scene.position.x += delta * (1.3 * 4);
            if (gltf.scene.position.y < 6)
                gltf.scene.position.y += delta * (0.6 * 4);
            if (gltf.scene.position.z > -3)
                gltf.scene.position.z -= delta * (1.7 * 4);

        }

        if (props.selection !== 'Cotton') {//come to home
            if (gltf.scene.position.x > 5)
                gltf.scene.position.x -= delta * (1.3 * 4);
            if (gltf.scene.position.y > 3.8)
                gltf.scene.position.y -= delta * (0.6 * 4);
            if (gltf.scene.position.z < 8)
                gltf.scene.position.z += delta * (1.7 * 4);
        }
    }, []);

    return <primitive object={gltf.scene} 
    onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
    onClick={() => {
        if (props.state !== 'Pause' && props.lessonstarted!==false && (props.currentTask===15 || props.currentTask===17 || props.currentTask===19) && (props.selection === "None" || props.selection === "Cotton")) { 
                props.setPopup("Cotton")
          
        }
    }}/>;
}