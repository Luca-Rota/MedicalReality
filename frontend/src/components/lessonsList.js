import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import img1 from '../lessonImgs/1.png';
import img2 from '../lessonImgs/2.png';
import blocked from '../lessonImgs/blocked.png';
import API from '../API/API';

function LessonsList(props) {
  return (
    <Container className='cards-box'>
      {
        <div id="card-list">
          <Row md={2}>
            {props.lessonsList.map((lesson) => <TeacherLessonCard lesson={lesson} key={lesson.id} setShow={props.setShow} setLesson={props.setLesson} goToLesson1={props.goToLesson1} goToLesson2={props.goToLesson2} suggestedLessons={props.suggestedLessons}/>)}
          </Row>
          <ul></ul>
        </div>
      }
    </Container>
  );
}

function TeacherLessonCard(props) {

  const [lessonDetails, setLessonDetails]= useState({})
  useEffect(() => {
    API.getLessonDetails(props.lesson.id).then(lesson=>{ setLessonDetails(lesson)});
  }, []);
  return (
    <Col>
      <Card className='card'>
        <Card.Header className='card-box-title'>
          <Row className='box-center'>
            <h2 className='card-title'>{props.lesson.name}</h2>
          </Row>
        </Card.Header>
        <Row>
          <Col md={12} className="box-center">
            <Card.Img src={props.lesson.id === 1 ? img1 : props.lesson.id === 2 ? img2 : blocked} alt="not_found" className='card-img' />
          </Col>
        </Row>
        <Card.Body>
          <Row className="label-row">
            <Col md={6} className="box-center">
              {
                props.suggestedLessons.map(l => l.id).includes(props.lesson.id) ?
                  <h6 className='suggested-item'> SUGGESTED</h6>
                  :
                  <></>
              }
            </Col>
            <Col md={6} className="box-center">
              {props.lesson.grade !== null ?
                <h6 className='done-item'> DONE</h6>
                :
                false
              }
            </Col>
          </Row>
          <Row >

            {
              props.lesson.description === null ?
                <Button variant="success" disabled >
                  Lesson to be implemented!
                </Button>
                :
                <Button variant="success"  onClick={() => { props.setLesson(lessonDetails) }} >
                  Open Lesson
                </Button>
            }


          </Row>


        </Card.Body>
      </Card>
    </Col>
  );
}

export { LessonsList };