import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html } from '@react-three/drei';
import { BedSpeechMessage } from "../pages/bedSpeechMessage";
import { BedSpeechMessage2 } from "../pages/bedSpeechMessage2";


export function BedSpeech(props) {
    return (
        <mesh position={[props.x, props.y, props.z]} scale={[6, 3, 0.2]} rotation={[0, -Math.PI/4, 0]}>
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="#CACACA" alphaTest={0.5} opacity={props.opacity} />
            {props.popup !== 'None' ?
                <Html className="content" rotation-x={-Math.PI} rotation-z={Math.PI} position={[0.03, 0, -1]} scale={[0.08, 0.15, 0.15]} transform occlude>
                    <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
                       {
                        props.speechnumber===1?
                        <BedSpeechMessage bedPopup={props.bedPopup} setBedPopup={props.setBedPopup} bedSelection={props.bedSelection} setBedSelection={props.setBedSelection} setSelection={props.setSelection} 
                        errors={props.errors} setErrors={props.setErrors} currentTask={props.currentTask} setCurrentTask={props.setCurrentTask} 
                        wrongBodyPart={props.wrongBodyPart} setWrongBodyPart={props.setWrongBodyPart} lessonFinished={props.lessonFinished} setLessonFinished={props.setLessonFinished}
                        lastErrors={props.lastErrors} setLastErrors={props.setLastErrors} time={props.time} lastTime={props.lastTime} setLastTime={props.setLastTime}
                        evaluateT={props.evaluateT} evaluateL={props.evaluateL}/>
                        :
                            props.speechnumber===2?
                            <BedSpeechMessage2 bedPopup={props.bedPopup} setBedPopup={props.setBedPopup} bedSelection={props.bedSelection} setBedSelection={props.setBedSelection} setSelection={props.setSelection} 
                            errors={props.errors} setErrors={props.setErrors} currentTask={props.currentTask} setCurrentTask={props.setCurrentTask} 
                            wrongBodyPart={props.wrongBodyPart} setWrongBodyPart={props.setWrongBodyPart} lessonFinished={props.lessonFinished} setLessonFinished={props.setLessonFinished}
                            lastErrors={props.lastErrors} setLastErrors={props.setLastErrors} time={props.time} lastTime={props.lastTime} setLastTime={props.setLastTime}
                            evaluateT={props.evaluateT} evaluateL={props.evaluateL}/>
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