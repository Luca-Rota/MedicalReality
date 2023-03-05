import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";




export function Syringe(props) {

    
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);


    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/syringe/scene.gltf"
    );

    useEffect(() => {
        gltf.scene.scale.set( 0.1, 0.1, 0.1);
        gltf.scene.rotation.set(0, Math.PI/2, 0);
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
        if (props.selection === 'Syringe') {//go to user
            if (gltf.scene.position.x < 12)
                gltf.scene.position.x += delta * (0.8 * 4);
            if (gltf.scene.position.y < 7)
                gltf.scene.position.y += delta * (0.5 * 4);
            if (gltf.scene.position.z > -4)
                gltf.scene.position.z -= delta * (1.5 * 4);

        }

        if (props.selection !== 'Syringe') {//come to home
            if (gltf.scene.position.x > 8)
                gltf.scene.position.x -= delta * (0.8 * 4);
            if (gltf.scene.position.y > 4)
                gltf.scene.position.y -= delta * (0.5 * 4);
            if (gltf.scene.position.z < 6)
                gltf.scene.position.z += delta * (1.5 * 4);
        }
    }, []);


    return <primitive object={gltf.scene} 
    onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}

    onClick={() => {
        if (props.state !== 'Pause' && props.lessonstarted!==false && (props.currentTask===15 || props.currentTask===17 || props.currentTask===19) && (props.selection === "None" || props.selection === "Syringe")) { 
                props.setPopup("Syringe")
          
        }
    }}/>;
}