import { Container, Row, Col, Button } from 'react-bootstrap';
import API from '../API/API';
function BedSpeechMessage(props) {
   
    return (
        <Container fluid>
            {
                props.bedPopup !== 'None' ?
                    <Container>
                        <Row>
                            <h4>
                                <p>You have select the {props.bedPopup}, </p>
                                <p>do you want put here the tool?</p>
                            </h4>
                        </Row>
                        <ul></ul>
                        <Row>
                            <Col md={3}>
                                <Button variant="danger" className='btn-bottom' onClick={() => {
                                    if (props.bedPopup !== 'None') props.setBedPopup('None');
                                }}>
                                    <i className="bi bi-chevron-left"></i>{' '}Back
                                </Button>
                            </Col>
                            <Col md={{ offset: 6, span: 3 }} className="box-center">
                                <Button className='btn-bottom' variant="success" onClick={() => {
                                    if (props.bedPopup !== 'None') {
                                        props.setBedSelection(props.bedPopup);
                                        if (props.currentTask === 1 && props.bedPopup !== 'Shoulder') {
                                            props.setErrors(errors => errors + 1);
                                            props.setWrongBodyPart(true);
                                        }
                                        else if (props.currentTask === 1 && props.bedPopup === 'Shoulder') {
                                            props.evaluateT();
                                            props.setCurrentTask(task => task + 1);
                                            props.setSelection('None');
                                        }
                                        else if (props.currentTask === 3 && props.bedPopup !== 'Arm') {
                                            props.setErrors(errors => errors + 1);
                                            props.setWrongBodyPart(true);
                                        }
                                        else if (props.currentTask === 3 && props.bedPopup === 'Arm') {
                                            props.evaluateT();
                                            props.setCurrentTask(task => task + 1);
                                            props.setSelection('None');
                                        }
                                        else if (props.currentTask === 5 && props.bedPopup !== 'Chest') {
                                            props.setErrors(errors => errors + 1);
                                            props.setWrongBodyPart(true);
                                        }
                                        else if (props.currentTask === 5 && props.bedPopup === 'Chest') {
                                            props.evaluateT();
                                            props.setSelection('None');
                                            props.setLessonFinished(true);
                                            props.setCurrentTask(task => task + 1);
                                        }
                                        props.setBedPopup('None');
                                    }
                                }}>
                                    <i className="bi bi-check-lg"></i>{' '}Put here
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    :
                    false
            }
        </Container>
    );
}

export { BedSpeechMessage }