import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";




export function Badaid(props) {

    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);


    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/badaid/scene.gltf"
    );

    useEffect(() => {
        gltf.scene.scale.set( 0.3, 0.3, 0.3);
        gltf.scene.rotation.set(Math.PI/2, 0, 0);
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
        if (props.selection === 'Badaid') {//go to user
            if (gltf.scene.position.x < 12)
                gltf.scene.position.x += delta * (0.8 * 4);
            if (gltf.scene.position.y < 6)
                gltf.scene.position.y += delta * (0.5 * 4);
            if (gltf.scene.position.z > -2)
                gltf.scene.position.z -= delta * (1.5 * 4);

        }

        if (props.selection !== 'Badaid') {//come to home
            if (gltf.scene.position.x > 10)
                gltf.scene.position.x -= delta * (0.8 * 4);
            if (gltf.scene.position.y > 4)
                gltf.scene.position.y -= delta * (0.5 * 4);
            if (gltf.scene.position.z < 5)
                gltf.scene.position.z += delta * (1.5 * 4);
        }
    }, []);


    return <primitive object={gltf.scene} 
    onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}

    onClick={() => {
        if (props.state !== 'Pause' && props.lessonstarted!==false && (props.currentTask===15 || props.currentTask===17 || props.currentTask===19) && (props.selection === "None" || props.selection === "Badaid")) { 
                props.setPopup("Badaid")
          
        }
    }}/>;
}