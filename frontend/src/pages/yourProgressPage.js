import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { LessonsList } from '../components/lessonsList';
import API from '../API/API';

import { default as Star } from '../icons/star.svg';
import { default as StarFill } from '../icons/star-fill.svg';

function YourProgressPage(props) {
    const [shared, setShared] = useState(true);
    const [sharedClick, setSharedClick] = useState(false);
    const [doneLessons, setDoneLessons] = useState([]);
    const [suggestedLessons, setSuggestedLessons] = useState([]);
    const [lesson, setLesson] = useState(undefined);

    const updateShare = async (id) => {
        API.shareResults(id);
    }
    useEffect(() => {
        API.getProfessorLessons().then((lessons) => {
            setDoneLessons(lessons.filter(l => l.grade !== null));
            /*check for share*/
            lessons.filter(l => l.grade !== null).map((l) => { if (l.shared === false) setShared(false) });
        });
    }, []);

    useEffect(() => {
        API.getTips().then((lessons) => {
            setSuggestedLessons(lessons);
        });
    }, []);

    return (
        <>
            {
                lesson === undefined ?
                    <Container fluid>
                        <Row>
                            <Col md={12} className='box-center'>
                                <h1 className="title">Your Progress</h1>
                            </Col>
                        </Row>
                        <ul></ul>
                        {
                            suggestedLessons.length !== 0 ?
                                <Row>
                                    <LessonsList lessonsList={doneLessons} suggestedLessons={suggestedLessons} lesson={lesson} setLesson={setLesson} />
                                </Row>
                                :
                                <Row className='no-cards-box'>
                                    <Col className="box-center">
                                        <h1>You still have no completed lessons</h1>
                                    </Col>
                                </Row>
                        }
                        <ul></ul>
                        <Row>
                            <Col md={3} className="box-center">
                                <Button variant="danger" className='btn-bottom' onClick={() => {
                                    if (props.mod === 'yourProgress') props.setMod('teacherLessons');
                                }}>
                                    <i className="bi bi-chevron-left"></i>{' '}Teacher Lessons
                                </Button>
                            </Col>
                            <Col md={6} className="box-center">
                                {
                                    shared === false ?
                                        sharedClick === false ?
                                            <Button onClick={() => { setSharedClick(true) }}><i className="bi bi-cloud-arrow-up"></i>{' '}Share results with the professor</Button>
                                            :
                                            <Container className="pop-up">
                                                <Row>
                                                    <h1>Are you sure that you want to share your progress with the professor?</h1>
                                                </Row>
                                                <Row>
                                                    <Col md={3}>
                                                        <Button variant="danger" className='btn-bottom' onClick={() => {
                                                            setSharedClick(false);
                                                        }}>
                                                            <i className="bi bi-chevron-left"></i>{' '}Back
                                                        </Button>
                                                    </Col>
                                                    <Col md={{ offset: 6, span: 3 }} className="box-center">
                                                        <Button className='btn-bottom' variant="success" onClick={() => {
                                                            setShared(true);
                                                            setSharedClick(false);
                                                            doneLessons.map(l => updateShare(l.id));
                                                        }}>
                                                            <i className="bi bi-check-lg"></i>{' '}yes, Share
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        :
                                        <Button variant="success" disabled><i className="bi bi-cloud-check"></i>{' '}Results are shared with the professor</Button>
                                }
                            </Col>
                            <Col md={3} className="box-center">
                                <Button variant="success" className='btn-bottom' onClick={() => {
                                    if (props.mod === 'yourProgress') props.setMod('landingPage');
                                }}>
                                    Home{' '}<i className="bi bi-chevron-right"></i>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <Container >
                        <Row>
                            <Col md={{ offset: 2, span: 8 }}>
                                <Row>
                                    <h1 className='title'>{lesson.name}</h1>
                                </Row>
                                <ul></ul>
                                <Row>
                                    <Col md={12} className="scroll-box2 mb-3">
                                        <Row>
                                            <Col md={12}>
                                                <h2 className='inline'>Description: </h2> <h3 className='inline'> {lesson.description} </h3>
                                            </Col>
                                        </Row>
                                        <ul></ul>
                                        <Row>
                                            <Col md={12}>
                                                <h2 className='inline'>Difficulty: </h2>
                                                <h2 className='inline ms-2 '>{getStarList(lesson.lessonDifficulty).map((s, i) => s ? <img key={i} src={StarFill} alt="filled_star_icon" className="mx-2 " /> : <img key={i} src={Star} alt="empty_star_icon" className="mx-2 " />)}
                                                </h2>
                                            </Col>
                                        </Row>
                                        <ul></ul>
                                        <Row>
                                            <Col md={12}>
                                                <h2 className='inline'>Lesson Grade:</h2>
                                                <h1 className='grade-color mx-2'> {grade(lesson.grade)} </h1>
                                            </Col>
                                        </Row>
                                        <ul></ul>
                                        <Row>
                                            <Col md={12}>
                                                <h2 className='inline'>Tasks Grade: </h2>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}  >
                                                {
                                                    lesson.tasks.map((task) => {
                                                        return (
                                                            <TaskList task={task} key={task.id} />
                                                        );
                                                    })}
                                            </Col>
                                        </Row>
                                        <ul></ul>
                                        <Row>
                                            <Col md={12}>
                                                <h3>*Remember: The grade you will get depends on the number of mistakes made during the course of the lesson and the time it took to finish it. </h3>
                                            </Col>
                                        </Row>
                                        <ul></ul>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4} className="box-center">
                                        <Button variant="danger" className='btn-bottom' onClick={() => {
                                            setLesson(undefined);
                                        }}>
                                            <i className="bi bi-chevron-left"></i>{' '}Lessons list
                                        </Button>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </Container >
            }
        </>
    );
}

function getStarList(score) {
    let starList = [];
    for (let i = 0; i < 5; i++)
        (i < score) ? starList[i] = true : starList[i] = false;
    return starList;
}

function grade(grade) {
    switch (grade) {
        case 1: return " F";
        case 2: return " D";
        case 3: return " C";
        case 4: return " B";
        case 5: return " A";
    }
}

function TaskList(props) {
    return (
        <Row>
            <Col md={12}>
                <h3 className='inline'>{props.task.id}. {props.task.description} : </h3>
                <h2 className="grade-color mx-2"> {grade(props.task.grade)} </h2>
            </Col>

        </Row>
    );
}

export { YourProgressPage }