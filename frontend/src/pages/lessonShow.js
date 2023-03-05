import "./../styles.css"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import React, { Suspense, useState } from "react";
import { useEffect } from "react";
import API from './../API/API';
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Ground } from "../components/ground";
import { Wall } from "../components/wall";
import { Door } from "../components/door";
import { Dripstand } from "../components/dripstand";
import { Medikit } from "../components/medikit";
import { Text } from "../components/text";
import { Body } from "../components/body";
import { LessonBed } from "../components/lessonbed";
import { Tabletool } from "../components/tabletool";
import { Whiteboard } from "../components/whiteboard";
import { Thermometer } from "../components/thermometer";
import { Sphygmomanometer } from "../components/sphygmomanometer";
import { Stethoscope } from "../components/stethoscope";
import { Speech } from "../components/speech";
import { Cart } from "../components/cart";
import { Cart2 } from "../components/cart2";
import { Furniture } from "../components/furniture";
import { BlackScreen } from "../components/blackscreen";
import { BodyPart } from "../components/bodypart";
import { BedSpeech } from "../components/bedSpeech";
import { Cotton } from "../components/cotton";
import { Syringe } from "../components/syringe";
import { Badaid } from "../components/badaid";
import { BodyPart2 } from "../components/bodypart2";

function LessonShow1(props) {

    const [popup, setPopup] = useState("None"); //state for the popup of the objects
    const [bedPopup, setBedPopup] = useState("None"); //state for the popup of the body part
    const [selection, setSelection] = useState("None"); //state for object selection
    const [bedSelection, setBedSelection] = useState("None"); //state for body part selection
    const [state, setState] = useState("Play"); //state for plaing/stopping entire lesson
    const [time, setTime] = useState(0); //timer state
    const [lastTime, setLastTime] = useState(0);
    const [setIntervalID, setSetIntervalID] = useState(''); //intervalID for the timer
    const [currentTask, setCurrentTask] = useState(0); //current task (start from 0)
    const [bodypart, setBodyPart] = useState("None"); //state for the body part name
    const [lessonstarted, setLessonStarted] = useState(false); //start of the lesson
    const [lessonFinished, setLessonFinished] = useState(false); //end of the lesson
    const [lessonStop, setLessonStop] = useState(false) //state for lesson stop button
    const [lesson, setLesson] = useState(undefined);
    const [errors, setErrors] = useState(0); //errors counter
    const [lastErrors, setLastErrors] = useState(0);
    const [wrongTool, setWrongTool] = useState(false); //if the tool is wrong for the task ->true
    const [wrongBodyPart, setWrongBodyPart] = useState(false); //if the body part is wrong for the task ->true

    useEffect(() => {
        if (lessonstarted === true)
            setSetIntervalID(setInterval(() => setTime(time => time + 1), 1000));//Attiva il timer per il polling appena si accede all'applicazione
    }, [lessonstarted]);

    useEffect(() => {
        API.getLessonDetails(1).then((lesson) => {
            setLesson(lesson);
        });
    }, [currentTask]);

    const evaluateT = () => {
        API.evaluateTask({ totalTime: time - lastTime, totalErrors: errors - lastErrors }, currentTask + 1).then((task) => {
            setLastTime(time);
            setLastErrors(errors);
            if (currentTask === 5) {
                evaluateL();
            }
        });
    }

    const evaluateL = () => {
        API.evaluateLesson(1).then(async (lesson) => {
            API.getLessonDetails(1).then((lesson) => {
                setLesson(lesson);
            });
        });
    }

    const resetGrade = () => {
        API.resetGrade(1)
    };

    return (
        <>
            {lesson !== undefined ?
                <Suspense fallback={null}>
                    <Canvas shadows>
                        <Stars />

                        {/*LIGHTS AND CAMERA CONTROLS */}
                        <spotLight
                            color={'#FFFEE4'}
                            intensity={2}
                            angle={2}
                            penumbra={0.5}
                            position={[-1, 24, 0]}
                            castShadow
                            shadow-bias={-0.0001}
                        />
                        <spotLight
                            color={'#FFFEE4'}
                            intensity={0.5}
                            angle={2}
                            penumbra={0.5}
                            position={[20, 5, 0]}
                            castShadow
                            shadow-bias={-0.0001}
                        />
                        {state !== 'Pause' ? <OrbitControls target={[8, 5.5, 0]} maxPolarAngle={1.60} /> : false}
                        <PerspectiveCamera makeDefault fov={45} position={[17, 10, -9]} />
                        <color args={[0, 0, 0]} attach="background" />

                        {/*ROOM FURNITURE PART */}
                        <LessonBed x={0} y={2.1} z={0} />
                        <Door x={-14} y={0} z={-10} />
                        <Dripstand x={-4} y={0} z={7} />
                        <Medikit x={-14} y={6} z={-13} />
                        <Body x={0} y={4} z={-4} bodypart={"RandomBodyPart"} setBodyPart={setBodyPart} bedPopup={bedPopup} setBedPopup={setBedPopup} bedSelection={bedSelection} setBedSelection={setBedSelection} state={state} setState={setState} />
                        <Tabletool x={8} y={0} z={6} />
                        <Whiteboard x={7} y={0} z={-10} lesson={lesson} currentTask={currentTask + 1} offset={0} />
                        <Cart x={8} y={0} z={13} />
                        <Cart2 x={52} y={0} z={-12} />
                        <Furniture x={50} y={0} z={11} />

                        {/*TOOLS PART */}
                        <Thermometer x={5} y={4} z={6} popup={popup} setPopup={setPopup} selection={selection} setSelection={setSelection} state={state} setState={setState} lessonstarted={lessonstarted} setLessonStarted={setLessonStarted} currentTask={currentTask} lastErrors={lastErrors} />
                        <Sphygmomanometer x={7} y={3.7} z={6} popup={popup} setPopup={setPopup} selection={selection} setSelection={setSelection} state={state} setState={setState} lessonstarted={lessonstarted} setLessonStarted={setLessonStarted} currentTask={currentTask} />
                        <Stethoscope x={9} y={4} z={6} popup={popup} setPopup={setPopup} selection={selection} setSelection={setSelection} state={state} setState={setState} lessonstarted={lessonstarted} setLessonStarted={setLessonStarted} currentTask={currentTask} />


                        {/*Box for body parts */}
                        {/*SHOULDER*/}
                        <BodyPart x={1} y={3.7} z={3} scalex={0.7} scaley={0.7} scalez={0.7} bodypart={"Shoulder"} setBodyPart={setBodyPart} bedPopup={bedPopup} setBedPopup={setBedPopup} bedSelection={bedSelection} setBedSelection={setBedSelection} state={state} setState={setState} lessonstarted={lessonstarted} setLessonStarted={setLessonStarted} currentTask={currentTask} />
                        {/*ARM*/}
                        <BodyPart x={1} y={3.7} z={2.25} scalex={0.7} scaley={0.7} scalez={0.7} bodypart={"Arm"} setBodyPart={setBodyPart} bedPopup={bedPopup} setBedPopup={setBedPopup} bedSelection={bedSelection} setBedSelection={setBedSelection} state={state} setState={setState} lessonstarted={lessonstarted} setLessonStarted={setLessonStarted} currentTask={currentTask} />
                        {/*CHEST*/}
                        <BodyPart x={0.1} y={4.5} z={2.8} scalex={1.5} scaley={0.6} scalez={0.7} bodypart={"Chest"} setBodyPart={setBodyPart} bedPopup={bedPopup} setBedPopup={setBedPopup} bedSelection={bedSelection} setBedSelection={setBedSelection} state={state} setState={setState} lessonstarted={lessonstarted} setLessonStarted={setLessonStarted} currentTask={currentTask} />



                        {/*TEXTUAL PART */}
                        <BlackScreen x={-4} y={7} z={0} state={state} setState={setState} time={time} setTime={setTime} setIntervalID={setIntervalID} setSetIntervalID={setSetIntervalID}
                            task={lesson.tasks.find(task => task.id === currentTask + 1)} errors={errors}
                            wrongTool={wrongTool} setWrongTool={setWrongTool} wrongBodyPart={wrongBodyPart} setWrongBodyPart={setWrongBodyPart} lessonstarted={lessonstarted}
                            setLessonStarted={setLessonStarted} lessonNumber={1} lessonFinished={lessonFinished} setLessonFinished={setLessonFinished}
                            lesson={lesson} goToHome={props.goToHome}
                            lessonStop={lessonStop} setLessonStop={setLessonStop} resetGrade={resetGrade}/>

                        <Speech x={8} y={8} z={7} opacity={popup !== "None" ? 1.0 : 0.0} popup={popup} setPopup={setPopup} selection={selection}
                            setSelection={setSelection} errors={errors} setErrors={setErrors} currentTask={currentTask}
                            setCurrentTask={setCurrentTask} wrongTool={wrongTool} setWrongTool={setWrongTool}
                            lastErrors={lastErrors} setLastErrors={setLastErrors} time={time} lastTime={lastTime} setLastTime={setLastTime}
                            evaluateT={evaluateT} speechnumber={1} />
                        <BedSpeech x={0} y={8} z={7} opacity={bedPopup !== "None" ? 1.0 : 0.0} bedPopup={bedPopup} setBedPopup={setBedPopup} bedSelection={bedSelection} setBedSelection={setBedSelection}
                            currentTask={currentTask} setCurrentTask={setCurrentTask} errors={errors} setErrors={setErrors} setSelection={setSelection} wrongBodyPart={wrongBodyPart} setWrongBodyPart={setWrongBodyPart}
                            lessonFinished={lessonFinished} setLessonFinished={setLessonFinished}
                            lastErrors={lastErrors} setLastErrors={setLastErrors} time={time} lastTime={lastTime} setLastTime={setLastTime}
                            evaluateT={evaluateT} evaluateL={evaluateL} speechnumber={1} />
                        <Text x={-14} y={10} z={0} />


                        {/*ROOM ASSETS PART */}
                        <Ground />
                        <Wall position={[0, 10, -15]} scale={[30, 20, 1]} rotation={[0, 0, 0]} /> {/*internal right wall*/}
                        <Wall position={[0, 10, -15]} scale={[30, 20, 1]} rotation={[Math.PI, 0, 0]} /> {/*external right wall*/}
                        <Wall position={[0, 10, 15]} scale={[30, 20, 1]} rotation={[Math.PI, 0, 0]} /> {/*internal left wall*/}
                        <Wall position={[0, 10, 15]} scale={[30, 20, 1]} rotation={[0, 0, 0]} /> {/*external left wall*/}
                        <Wall position={[-15, 10, 0]} scale={[30, 20, 1]} rotation={[0, Math.PI / 2, 0]} /> {/*internal behind wall*/}
                        <Wall position={[-15, 10, 0]} scale={[30, 20, 1]} rotation={[0, -Math.PI / 2, 0]} /> {/*external behind wall*/}
                        <Wall position={[-0, 20, 0]} scale={[30, 30, 1]} rotation={[Math.PI / 2, 0, Math.PI / 2]} /> {/*internal top wall*/}
                        <Wall position={[-0, 20, 0]} scale={[30, 30, 1]} rotation={[Math.PI / 2, Math.PI, Math.PI / 2]} /> {/*external top wall*/}

                    </Canvas>
                </Suspense>
                :
                false
            }
        </>);
}

function LessonShow2(props) {

    const [popup, setPopup] = useState("None"); //state for the popup of the objects
    const [bedPopup, setBedPopup] = useState("None"); //state for the popup of the body part
    const [selection, setSelection] = useState("None"); //state for object selection
    const [bedSelection, setBedSelection] = useState("None"); //state for body part selection
    const [state, setState] = useState("Play"); //state for plaing/stopping entire lesson
    const [time, setTime] = useState(0); //timer state
    const [lastTime, setLastTime] = useState(0);
    const [setIntervalID, setSetIntervalID] = useState(''); //intervalID for the timer
    const [currentTask, setCurrentTask] = useState(15); //current task (start from 0)
    const [bodypart, setBodyPart] = useState("None"); //state for the body part name
    const [lessonstarted, setLessonStarted] = useState(false); //start of the lesson
    const [lessonFinished, setLessonFinished] = useState(false); //end of the lesson
    const [lessonStop, setLessonStop] = useState(false) //state for lesson stop button
    const [lesson, setLesson] = useState(undefined);
    const [errors, setErrors] = useState(0); //errors counter
    const [lastErrors, setLastErrors] = useState(0);
    const [wrongTool, setWrongTool] = useState(false); //if the tool is wrong for the task ->true
    const [wrongBodyPart, setWrongBodyPart] = useState(false); //if the body part is wrong for the task ->true
    const [loadedData, setLoadedData] = useState(false);


    useEffect(() => {
        if (lessonstarted === true)
            setSetIntervalID(setInterval(() => setTime(time => time + 1), 1000));//Attiva il timer per il polling appena si accede all'applicazione
    }, [lessonstarted]);

    useEffect(() => {

        async function fetchData() {
            const response = await API.getLessonDetails(2).then((lesson) => {
                setLesson(lesson);
                setLoadedData(true);
            });
        }
        fetchData();

    }, [currentTask]);

    const evaluateT = () => {
        API.evaluateTask({ totalTime: time - lastTime, totalErrors: errors - lastErrors }, currentTask + 1).then((task) => {
            setLastTime(time);
            setLastErrors(errors);
            if (currentTask === 20) {
                evaluateL();
            }
        });
    }

    const evaluateL =  () => {
        API.evaluateLesson(2).then((lesson) => {
            API.getLessonDetails(2).then((lesson) => {
                setLesson(lesson);
            });
        });
    }


    const resetGrade =  () => {
        API.resetGrade(2)
    };

 

    return (


        <>
            {lesson !== undefined ?
                <Suspense fallback={null}>
                    <Canvas shadows>
                        <Stars />
                        {/*LIGHTS AND CAMERA CONTROLS */}
                        <spotLight
                            color={'#FFFEE4'}
                            intensity={2}
                            angle={2}
                            penumbra={0.5}
                            position={[-1, 24, 0]}
                            castShadow
                            shadow-bias={-0.0001}
                        />
                        <spotLight
                            color={'#FFFEE4'}
                            intensity={0.5}
                            angle={2}
                            penumbra={0.5}
                            position={[20, 5, 0]}
                            castShadow
                            shadow-bias={-0.0001}
                        />
                        {state !== 'Pause' ? <OrbitControls target={[8, 5.5, 0]} maxPolarAngle={1.60} /> : false}
                        <PerspectiveCamera makeDefault fov={45} position={[17, 10, -10]} />
                        <color args={[0, 0, 0]} attach="background" />
                        {/*ROOM FURNITURE PART */}
                        <LessonBed x={0} y={2.1} z={0} />
                        <Door x={-14} y={0} z={-10} />
                        <Dripstand x={-4} y={0} z={7} />
                        <Medikit x={-14} y={6} z={-13} />
                        <Body x={0} y={4} z={-4} bodypart={"RandomBodyPart"} setBodyPart={setBodyPart} bedPopup={bedPopup} setBedPopup={setBedPopup} bedSelection={bedSelection} setBedSelection={setBedSelection} state={state} setState={setState} />
                        <Tabletool x={8} y={0} z={6} />
                        <Whiteboard x={7} y={0} z={-10} lesson={lesson} currentTask={currentTask + 1} offset={15} />
                        <Cart x={8} y={0} z={13} />
                        <Cart2 x={52} y={0} z={-12} />
                        <Furniture x={50} y={0} z={11} />
                        {/*TOOLS PART */}
                        <Cotton x={5} y={3.8} z={8} popup={popup} setPopup={setPopup} selection={selection} setSelection={setSelection} state={state} setState={setState} lessonstarted={lessonstarted} setLessonStarted={setLessonStarted} currentTask={currentTask} />
                        <Syringe x={8} y={4} z={6} popup={popup} setPopup={setPopup} selection={selection} setSelection={setSelection} state={state} setState={setState} lessonstarted={lessonstarted} setLessonStarted={setLessonStarted} currentTask={currentTask} />
                        <Badaid x={10} y={4} z={5} popup={popup} setPopup={setPopup} selection={selection} setSelection={setSelection} state={state} setState={setState} lessonstarted={lessonstarted} setLessonStarted={setLessonStarted} currentTask={currentTask} />


                        {/*Box for body parts */}
                        {/*SHOULDER*/}
                        <BodyPart2 x={1} y={3.7} z={3} scalex={0.7} scaley={0.7} scalez={0.7} bodypart={"Shoulder"} setBodyPart={setBodyPart} bedPopup={bedPopup} setBedPopup={setBedPopup} bedSelection={bedSelection} setBedSelection={setBedSelection} state={state} setState={setState} lessonstarted={lessonstarted} setLessonStarted={setLessonStarted} currentTask={currentTask} />
                        {/*ARM*/}
                        <BodyPart2 x={1} y={3.7} z={2.25} scalex={0.7} scaley={0.7} scalez={0.7} bodypart={"Arm"} setBodyPart={setBodyPart} bedPopup={bedPopup} setBedPopup={setBedPopup} bedSelection={bedSelection} setBedSelection={setBedSelection} state={state} setState={setState} lessonstarted={lessonstarted} setLessonStarted={setLessonStarted} currentTask={currentTask} />
                        {/*CHEST*/}
                        <BodyPart2 x={0.1} y={4.5} z={2.8} scalex={1.5} scaley={0.6} scalez={0.7} bodypart={"Chest"} setBodyPart={setBodyPart} bedPopup={bedPopup} setBedPopup={setBedPopup} bedSelection={bedSelection} setBedSelection={setBedSelection} state={state} setState={setState} lessonstarted={lessonstarted} setLessonStarted={setLessonStarted} currentTask={currentTask} />



                        {/*TEXTUAL PART */}
                        <BlackScreen x={-4} y={7} z={0} state={state} setState={setState} time={time} setTime={setTime} setIntervalID={setIntervalID} setSetIntervalID={setSetIntervalID}
                            task={lesson.tasks.find(task => task.id === currentTask + 1)} errors={errors}
                            wrongTool={wrongTool} setWrongTool={setWrongTool} wrongBodyPart={wrongBodyPart} setWrongBodyPart={setWrongBodyPart} lessonstarted={lessonstarted}
                            setLessonStarted={setLessonStarted} lessonNumber={2} lessonFinished={lessonFinished} setLessonFinished={setLessonFinished}
                            lesson={lesson} goToHome={props.goToHome}
                            lessonStop={lessonStop} setLessonStop={setLessonStop} resetGrade={resetGrade} />

                        <Speech x={8} y={8} z={7} opacity={popup !== "None" ? 1.0 : 0.0} popup={popup} setPopup={setPopup} selection={selection}
                            setSelection={setSelection} errors={errors} setErrors={setErrors} currentTask={currentTask}
                            setCurrentTask={setCurrentTask} wrongTool={wrongTool} setWrongTool={setWrongTool}
                            lastErrors={lastErrors} setLastErrors={setLastErrors} time={time} lastTime={lastTime} setLastTime={setLastTime}
                            evaluateT={evaluateT} speechnumber={2} />
                        <BedSpeech x={0} y={8} z={7} opacity={bedPopup !== "None" ? 1.0 : 0.0} bedPopup={bedPopup} setBedPopup={setBedPopup} bedSelection={bedSelection} setBedSelection={setBedSelection}
                            currentTask={currentTask} setCurrentTask={setCurrentTask} errors={errors} setErrors={setErrors} setSelection={setSelection} wrongBodyPart={wrongBodyPart} setWrongBodyPart={setWrongBodyPart}
                            lessonFinished={lessonFinished} setLessonFinished={setLessonFinished}
                            lastErrors={lastErrors} setLastErrors={setLastErrors} time={time} lastTime={lastTime} setLastTime={setLastTime}
                            evaluateT={evaluateT} evaluateL={evaluateL} speechnumber={2} />
                        <Text x={-14} y={10} z={0} />



                        {/*ROOM ASSETS PART */}
                        <Ground />
                        <Wall position={[0, 10, -15]} scale={[30, 20, 1]} rotation={[0, 0, 0]} /> {/*internal right wall*/}
                        <Wall position={[0, 10, -15]} scale={[30, 20, 1]} rotation={[Math.PI, 0, 0]} /> {/*external right wall*/}
                        <Wall position={[0, 10, 15]} scale={[30, 20, 1]} rotation={[Math.PI, 0, 0]} /> {/*internal left wall*/}
                        <Wall position={[0, 10, 15]} scale={[30, 20, 1]} rotation={[0, 0, 0]} /> {/*external left wall*/}
                        <Wall position={[-15, 10, 0]} scale={[30, 20, 1]} rotation={[0, Math.PI / 2, 0]} /> {/*internal behind wall*/}
                        <Wall position={[-15, 10, 0]} scale={[30, 20, 1]} rotation={[0, -Math.PI / 2, 0]} /> {/*external behind wall*/}
                        <Wall position={[-0, 20, 0]} scale={[30, 30, 1]} rotation={[Math.PI / 2, 0, Math.PI / 2]} /> {/*internal top wall*/}
                        <Wall position={[-0, 20, 0]} scale={[30, 30, 1]} rotation={[Math.PI / 2, Math.PI, Math.PI / 2]} /> {/*external top wall*/}
                    </Canvas>
                </Suspense>
                :
                false
            }
        </>

    )

}

export { LessonShow1, LessonShow2 };