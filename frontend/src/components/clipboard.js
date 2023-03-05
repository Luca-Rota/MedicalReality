import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh } from "three";
import { Html } from '@react-three/drei';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame } from '@react-three/fiber';
import { TeacherLessonsPage } from "../pages/teacherLessosnsPage";
import { YourProgressPage } from "../pages/yourProgressPage";


export function Clipboard(props) {
    const [hovered, setHovered] = useState(false)
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/clipboard/scene.gltf"
    );
    useEffect(() => {
        gltf.scene.scale.set(0.05, 0.04, 0.04);
        gltf.scene.position.set(props.x, props.y, props.z);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = false;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf, props.x, props.y, props.z]);

    /*let direction = 1; //1=up; 0=down*/


    useFrame((state, delta) => {
        if (props.mod === 'teacherLessons') {
            if (gltf.scene.position.x < 18.2)
                gltf.scene.position.x += delta * (0.31 * 4);
            if (gltf.scene.position.z > -0.6)
                gltf.scene.position.z -= delta * (0.14 * 4);
            if (gltf.scene.position.y < 4.4)
                gltf.scene.position.y += delta * (0.1 * 4);
            if (gltf.scene.rotation.z > -(Math.PI - 1) / 2)
                gltf.scene.rotation.z -= delta * (0.1 * 4);
            /*if(gltf.scene.position.x >= 18.2)
                setShow(true)*/
        }

        if (props.mod === 'landingPage') {
            if (gltf.scene.position.x > 13.5)
                gltf.scene.position.x -= delta * (0.31 * 4);
            if (gltf.scene.position.z < 1.5)
                gltf.scene.position.z += delta * (0.14 * 4);
            if (gltf.scene.position.y > 3)
                gltf.scene.position.y -= delta * (0.1 * 4);
            if (gltf.scene.rotation.z < 0) {
                gltf.scene.rotation.z += delta * (0.1 * 4);
            }
        }
    }, []);

    useEffect(() => {
        if(props.mod==='landingPage') document.body.style.cursor = hovered ? 'pointer' : 'auto'
        else document.body.style.cursor='auto'
    }, [hovered]);

    return (
        <>
            <primitive object={gltf.scene} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
                onClick={() => {
                    if (props.mod === 'landingPage') {
                        props.setMod('teacherLessons');
                    };
                }}>
                <Html className="content" rotation-x={-Math.PI / 2} rotation-z={Math.PI / 2} position={[-0, 6, 17]} scale={[1.4, 1.4, 1.4]} transform occlude
                    onClick={() => {
                        if (props.mod === 'landingPage') props.setMod('teacherLessons');
                    }}>
                    <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
                        {props.mod === "teacherLessons" ?
                            <TeacherLessonsPage mod={props.mod} setMod={props.setMod} goToLesson1={props.goToLesson1} goToLesson2={props.goToLesson2} />
                            :
                            props.mod === "yourProgress" ?
                                <YourProgressPage mod={props.mod} setMod={props.setMod} goToLesson1={props.goToLesson1} goToLesson2={props.goToLesson2} />
                                :
                                false
                        }
                    </div>
                </Html>
            </primitive>
        </>
    );
}