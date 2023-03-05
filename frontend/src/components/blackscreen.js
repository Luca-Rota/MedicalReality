import { Html } from '@react-three/drei';
import { BlackScreenMessage } from "../pages/blackscreenMessage";


export function BlackScreen(props) {

    return (
        <mesh position={[props.x, props.y, props.z]}   rotation-y={Math.PI/2} scale={[12, 5.5, 0.2]}>
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="black" alphaTest={0.5} opacity={props.opacity} />

                <Html className="content"  position={[0, 0, 1]} scale={[0.04, 0.1, 0.07]} transform occlude>
                    <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
                        <BlackScreenMessage state={props.state} setState={props.setState} time={props.time} setTime={props.setTime} setIntervalID={props.setIntervalID} 
                            setSetIntervalID={props.setSetIntervalID} task={props.task} errors={props.errors}
                             wrongTool={props.wrongTool} setWrongTool={props.setWrongTool} wrongBodyPart={props.wrongBodyPart} setWrongBodyPart={props.setWrongBodyPart} lessonstarted={props.lessonstarted} setLessonStarted={props.setLessonStarted}
                             lessonNumber={props.lessonNumber} lessonFinished={props.lessonFinished} setLessonFinished={props.setLessonFinished}
                             lesson={props.lesson} goToHome={props.goToHome}
                             lessonStop={props.lessonStop} setLessonStop={props.setLessonStop} resetGrade={props.resetGrade}/>
                    </div>
                </Html>
              
        </mesh>
    );
}