import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html } from '@react-three/drei';


export function BodyPart(props) {
    const [hovered, setHovered] = useState(false);
    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);

    return (
        <mesh position={[props.x, props.y, props.z]} scale={[props.scalex, props.scaley, props.scalez]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
        onClick={()=>{
            if (props.state !== 'Pause' && props.lessonstarted!==false && (props.currentTask===1 || props.currentTask===3 || props.currentTask===5)) {
                if (props.bedSelection !== props.bodypart)
                    props.setBedPopup(props.bodypart);
                else if (props.bedSelection === props.bodypart)
                    props.setBedPopup(props.bodypart);
            }
            props.setBodyPart(props.bodypart);

        }} >
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color="#CACACA" alphaTest={0.5} opacity={0} />
    </mesh>
    );
}