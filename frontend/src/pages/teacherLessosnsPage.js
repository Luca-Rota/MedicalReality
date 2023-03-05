import { useState } from 'react';
import { useEffect } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import API from './../API/API';
import { LessonsList } from '../components/lessonsList';

import { default as Star } from '../icons/star.svg';
import { default as StarFill } from '../icons/star-fill.svg';

function TeacherLessonsPage(props) {
  const [teacherLessonsList, setTeacherLessonsList] = useState([]);
  const [suggestedLessons, setSuggestedLessons] = useState([]);
  const [show, setShow] = useState(false);
  const [lesson, setLesson] = useState(undefined);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    API.getProfessorLessons().then((lessons) => {
      setTeacherLessonsList(lessons);
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
                <h1 className="title">Teacher Lessons</h1>
              </Col>
            </Row>
            <ul></ul>
            <Row>
              {filter === false ?
                <LessonsList lessonsList={teacherLessonsList} goToLesson1={props.goToLesson1} goToLesson2={props.goToLesson2} show={show} setShow={setShow} lesson={lesson} setLesson={setLesson} suggestedLessons={suggestedLessons} setSuggestedLessons={setSuggestedLessons}/>
                :
                suggestedLessons.length !== 0 ?
                  <LessonsList lessonsList={suggestedLessons} goToLesson1={props.goToLesson1} goToLesson2={props.goToLesson2} show={show} setShow={setShow} lesson={lesson} setLesson={setLesson} suggestedLessons={suggestedLessons} setSuggestedLessons={setSuggestedLessons}/>
                  :
                  <Row className='no-cards-box'>
                    <Col className="box-center">
                      <h1>You still have no suggested lessons</h1>
                    </Col>
                  </Row>
              }
            </Row>
            <ul></ul>
            <Row>
              <Col md={4} className="box-center">
                <Button variant="danger" className='btn-bottom' onClick={() => {
                  if (props.mod === 'teacherLessons') props.setMod('landingPage');
                }}>
                  <i className="bi bi-chevron-left"></i>{' '}Home
                </Button>
              </Col>
              <Col md={4} className="box-center">
                {filter === false ?
                  < Button className="btn-bottom-2" variant="warning" onClick={() => {
                    setFilter(filter => !filter);
                  }} >
                    <i className="bi bi-funnel-fill"></i> {' '}Filter Suggested lessons
                  </Button>
                  :
                  <Button className="btn-bottom-2" variant="warning" onClick={() => {
                    setFilter(filter => !filter);
                  }}>
                    <i className="bi bi-x-lg"></i> {' '}Remove Filter
                  </Button>
                }

              </Col>
              <Col md={4} className="box-center">
                <Button className='btn-bottom' variant="success" onClick={() => {
                  if (props.mod === 'teacherLessons') props.setMod('yourProgress');
                }}>
                  Your Progress{' '}<i className="bi bi-chevron-right"></i>
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
                        <h3>*Remember: The grade you will get depends on the number of mistakes made during the course of the lesson and the time it took to finish it. </h3>
                      </Col>
                    </Row>
                    <ul></ul>
                    {lesson.grade ? 
                      <Row>
                        <Col md={12}>
                          <h3>*Remember: You have already taken this class, restarting it will lose your results  </h3>
                        </Col>
                      </Row> : false}
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
                  <Col md={{ offset: 4, span: 4 }} className="box-center">
                    <Button className='btn-bottom' variant="success" onClick={() => {
                      if (lesson.id === 1){ 
                        props.goToLesson1();
                        API.resetGrade(1);
                      }
                      else if (lesson.id === 2){
                        props.goToLesson2();
                        API.resetGrade(2);
                      } 
                      setLesson(undefined);
                    }}>
                      Start Lesson{' '}<i className="bi bi-chevron-right"></i>
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


export { TeacherLessonsPage }