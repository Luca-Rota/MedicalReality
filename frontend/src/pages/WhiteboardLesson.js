import { Container, Row, Col, Alert } from 'react-bootstrap';

function WhiteboardLesson(props) {
    
    
    // const [lesson, setLesson] = useState([]);

    // useEffect(() => {
    //     const load = async () => {
    //     const professorLesson = await API.getLessonDetails(1) //load from db
    //     setLesson(professorLesson)
    //     }
    //     load();   
    //   }, []);

    let i = 0;
    let teacherLessonsList = [];
    for (i = 0; i < 10; i += 1) {
        teacherLessonsList.push({
            id: i,
            title: 'Title',
            description: 'This is the description of the lesson'
        });
    }
    return (
        <Container fluid>
            <Row>
                <Col md={12} className='box-center'>
                    <h1 className="title">Lesson Number {props.lesson.id}</h1>
                </Col>
            </Row>
            <ul></ul>
            <Container>
                {props.lesson.tasks.map((task) => <ShowTask task={task} key={task.id} currentTask={props.currentTask} offset={props.offset}/>)}
            </Container>
        </Container>
    );
}

function ShowTask(props) {
    
    return (
        <Container fluid md={10}>
            <Row>
                <Col md={11.5}>
            
                    {props.currentTask>props.task.id?
                    <h1 ><s>{props.task.id -props.offset}. {props.task.description} </s></h1>
                    :
                    <h1 >{props.task.id - props.offset}. {props.task.description} </h1>

                    }
                </Col>
            </Row>
            <ul></ul>
        </Container>
    );
}

export { WhiteboardLesson }