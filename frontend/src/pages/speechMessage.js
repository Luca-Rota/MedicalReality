import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import API from '../API/API';

function SpeechMessage(props) {
    //const [wrongTool, setWrongTool] = useState(false); 
    return (
        <Container fluid>
            {
                props.selection === 'None' && props.popup !== 'None' ?
                    <Container>
                        <Row>
                            <h4>
                                <p>You have select the {props.popup}, </p>
                                <p>do you want to use it?</p>
                            </h4>
                        </Row>
                        <ul></ul>
                        <Row>
                            <Col md={3}>
                                <Button variant="danger" className='btn-bottom' onClick={() => {
                                    if (props.popup !== 'None') props.setPopup('None');
                                }}>
                                    <i className="bi bi-chevron-left"></i>{' '}Back
                                </Button>
                            </Col>
                            <Col md={{ offset: 6, span: 3 }} className="box-center">
                                <Button className='btn-bottom' variant="success" onClick={() => {
                                    if (props.popup !== 'None') {
                                        props.setSelection(props.popup);
                                        if (props.currentTask === 0 && props.popup !== 'Thermometer') {
                                            props.setErrors(errors => errors + 1);
                                            props.setWrongTool(true);
                                        }
                                        else if(props.currentTask === 0 && props.popup === 'Thermometer') {
                                            props.evaluateT();
                                            props.setCurrentTask(task=>task+1);
                                        }
                                        else if (props.currentTask === 2 && props.popup !== 'Sphygmomanometer') {
                                            props.setErrors(errors => errors + 1);
                                            props.setWrongTool(true);
                                        }
                                        else if(props.currentTask === 2 && props.popup === 'Sphygmomanometer') {
                                            props.evaluateT();
                                            props.setCurrentTask(task=>task+1);
                                        }
                                        else if (props.currentTask === 4 && props.popup !== 'Stethoscope') {
                                            props.setErrors(errors => errors + 1);
                                            props.setWrongTool(true);
                                        }
                                        else if (props.currentTask === 4 && props.popup === 'Stethoscope') {
                                            props.evaluateT();
                                            props.setCurrentTask(task=>task+1);
                                        }
                                        props.setPopup('None');
                                    }}}>
                                    <i className="bi bi-check-lg"></i>{' '}Take it
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    :
                    props.selection !== 'None' && props.popup !== 'None' ?
                        <Container>
                            <Row>
                                <h4>
                                    <p>Do you want to leave the </p>
                                    <p>{props.popup}?</p>
                                </h4>
                            </Row>
                            <ul></ul>
                            <Row>
                                <Col md={3}>
                                    <Button variant="danger" className='btn-bottom' onClick={() => {
                                        if (props.popup !== 'None') props.setPopup('None');
                                    }}>
                                        <i className="bi bi-chevron-left"></i>{' '}Back
                                    </Button>
                                </Col>
                                <Col md={{ offset: 6, span: 3 }} className="box-center">
                                    <Button className='btn-bottom' variant="success" onClick={() => {
                                        if (props.popup !== 'None' && props.selection !== 'None') {
                                            props.setPopup('None');
                                            props.setSelection('None');
                                            props.setWrongTool(false);
                                        }
                                    }}>
                                        <i className="bi bi-check-lg"></i>{' '}Leave it
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

export { SpeechMessage }