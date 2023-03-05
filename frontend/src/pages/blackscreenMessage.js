import { Container, Row, Col, Button } from 'react-bootstrap';

function BlackScreenMessage(props) {
  let offs=0;
  return (
    <Container fluid>

      {props.lessonstarted === true ?
        props.lessonFinished === false ?
          props.lessonStop === false ?
            <>
              <Row className='box-center'>
                <Col md={{ span: 8, offset: 1 }} className='box-center'>
                  {
                    props.wrongTool === true ?
                      <Row>
                        <Col md={8}>
                          <h1 className="errors">You have select the wrong tool Leave it and select another one</h1>
                        </Col>
                        <Col md={2} className="box-center">
                          <Button variant="danger" onClick={() => { props.setWrongTool(false) }}>
                          <h3> Close Error </h3>
                          </Button>
                        </Col>
                      </Row>
                      :
                      props.wrongBodyPart === true ?
                        <Row>
                          <Col md={9}>
                            <h1 className="errors">You have select the wrong body part. Select another one</h1>
                          </Col>
                          <Col md={2} className="box-center">
                            <Button variant="danger" onClick={() => { props.setWrongBodyPart(false) }}>
                              <h3> Close Error </h3>
                            </Button>
                          </Col>
                        </Row>
                        :
                        <Row>
                          <h1 className="title">Current Task: {props.task.description}</h1>
                        </Row>
                  }
                </Col>
              </Row>
              <ul></ul>
              <Container>
                <Row>
                  <Col md={6}>
                    <Row>
                      <Col  md={{ offset: 4 }}>
                        <h1 className='sub-title-black-screen'>Time: {props.time >= 3600 ? Math.floor(props.time / 3600) + "h" : false} {props.time >= 60 ? Math.floor(props.time / 60) % 60 + "m" : false} {props.time % 60} s</h1>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ offset: 4 }}>
                        <h1 className='sub-title-black-screen'>Error counter: {props.errors}</h1>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="box-center" >
                    {props.state === 'Play' ?
                      <Button variant="light" className="multimedia-btn" onClick={() => {
                        props.setState("Pause");
                        clearInterval(props.setIntervalID);
                      }}>
                        <h1><i className="bi bi-pause-fill"></i></h1>
                      </Button>
                      :
                      <Button variant="light" className="multimedia-btn" onClick={() => {
                        props.setState("Play");
                        props.setSetIntervalID(setInterval(() => props.setTime(time => time + 1), 1000));
                      }}>
                        <h1><i className="bi bi-play-fill"></i></h1>
                      </Button>
                    }
                  </Col>
                  <Col>
                    <Button variant="light" className="multimedia-btn" onClick={() => {
                      props.setLessonStop(true);
                      props.setState("Pause");
                      clearInterval(props.setIntervalID);
                    }}>
                      <h1><i className="bi bi-stop-fill"></i></h1>
                    </Button>
                  </Col>
                </Row>
                <ul></ul>
              </Container>
            </>
            :
            <>
              <Row className='box-center'>
                <h1 className='sub-title-black-screen'>Are you sure that you want to leave the lesson?</h1>
                <h1 className='sub-title-black-screen'>All your progress will not be saved</h1>
              </Row>
              <ul></ul>
              <Row>
                <Row>
                  <Col md={5} className="box-center">
                    <Button variant="success"  onClick={() => {
                      props.setLessonStop(false);
                      props.setState("Play");
                      props.setSetIntervalID(setInterval(() => props.setTime(time => time + 1), 1000));
                    }}>
                      <h3><i className="bi bi-chevron-left"></i>{' '}Return to lesson</h3>
                    </Button>
                  </Col>
                  <Col md={{ offset: 2, span: 5 }} className="box-center">
                    <Button  variant="danger" onClick={() => {
                      props.goToHome();
                      props.resetGrade();
                    }}>
                      <h3> Leave the lesson {' '} <i className="bi bi-chevron-right"></i></h3>
                    </Button>
                  </Col>
                </Row>
              </Row>
            </>
          :
          <>
            <Row className='box-center'>
              <Col>
                <Row>
                  <h1 className="title title-finish">The Lesson Number {props.lessonNumber} is finished</h1>
                </Row>
                <Row >
                    <Col md={12} className="scroll-box">

                    

                  <Row>
                    <Col md={12}>
                    <h1 className='sub-title-black-screen'>Lesson Grade:</h1> 
                    <h1 className='grade-color mx-2'> {grade(props.lesson.grade)} </h1>
                    </Col>
                    
                  </Row>
                  <Row>
                    <h1 className='sub-title-black-screen'>Tasks Grade:</h1>
                  </Row>
                  <Row>
                    <Col md={12}  >
                      {
                        props.lesson.tasks.map((task) => {
                          return (
                            <TaskList task={task} key={task.id} />
                          );
                        })}
                    </Col>
                  </Row>
                  
                  </Col>
                  </Row>
                  <Row>
                    <Col md={8} className=" mt-3">
                      <h4 className='sub-title-black-screen mt-2'> *Remember to follow Suggested Lessons </h4>
                    </Col>
                    <Col md={4} className="box-center mt-3">
                    
                    <Button variant="success" onClick={() => {
                    props.goToHome();
                  }}>
                    <h3> Home {' '}<i className="bi bi-chevron-right"></i></h3>
                  </Button>
                    </Col>
                  
                  </Row>
              </Col>
             
            </Row>
          
                    </>
                :
  <>
    <Row className='box-center'>
      <Col md={11} className='box-center'>
        <Row>
          <h1 className="title">Welcome to Lesson Number {props.lessonNumber}</h1>
        </Row>

      </Col>
    </Row>
    <ul></ul>
    <Container>
      <Row>
        <Col md={6}>
          <Row>
            <Col md={{ span: 12, offset: 4 }}>
              <h1 className='sub-title-black-screen'>Follow this screen to check your progress in the lesson and eventual mistake! {<br />}Click the lightning to start!
              </h1>
            </Col>
          </Row>
        </Col>
        <Col className="box-center" md={6}>

          <Button variant="light" className="multimedia-btn" onClick={() => {
            props.setLessonStarted(true);
          }}>
            <i className="bi bi-lightning-fill"></i>
          </Button>
        </Col>
      </Row>

    </Container>
  </>
}
        </Container >
    );
}

function grade(grade){

    switch(grade){
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
      <h3 className='sub-title-black-screen'> {props.task.id}. {props.task.description} : </h3> 
      <h2 className="grade-color mx-2"> {grade(props.task.grade)} </h2>
      </Col>
      
    </Row>
  );
}

export { BlackScreenMessage }