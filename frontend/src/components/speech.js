import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html } from '@react-three/drei';
import { SpeechMessage } from "../pages/speechMessage";
import { SpeechMessage2 } from "../pages/speechMessage2";


export function Speech(props) {
    
    return (
        <mesh position={[props.x, props.y, props.z]} scale={[6, 3, 0.2]}>
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="#CACACA" alphaTest={0.5} opacity={props.opacity} />
            {props.popup !== 'None' ?
                <Html className="content" rotation-x={-Math.PI} rotation-z={Math.PI} position={[0.03, 0, -1]} scale={[0.08, 0.15, 0.15]} transform occlude>
                    <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
                        
                        { props.speechnumber===1?
                        <SpeechMessage popup={props.popup} setPopup={props.setPopup} selection={props.selection} setSelection={props.setSelection} 
                        errors={props.errors} setErrors={props.setErrors} currentTask={props.currentTask} setCurrentTask={props.setCurrentTask} 
                        wrongTool={props.wrongTool} setWrongTool={props.setWrongTool}
                        lastErrors={props.lastErrors} setLastErrors={props.setLastErrors} time={props.time} lastTime={props.lastTime} setLastTime={props.setLastTime}
                        evaluateT={props.evaluateT}/>
                        :
                            props.speechnumber===2?
                                <SpeechMessage2 popup={props.popup} setPopup={props.setPopup} selection={props.selection} setSelection={props.setSelection} 
                                errors={props.errors} setErrors={props.setErrors} currentTask={props.currentTask} setCurrentTask={props.setCurrentTask} 
                                wrongTool={props.wrongTool} setWrongTool={props.setWrongTool}
                                lastErrors={props.lastErrors} setLastErrors={props.setLastErrors} time={props.time} lastTime={props.lastTime} setLastTime={props.setLastTime}
                                evaluateT={props.evaluateT}/>
                                :
                                <></>
                        }
                    </div>
                </Html>
                :
                false
            }
        </mesh>
    );
}