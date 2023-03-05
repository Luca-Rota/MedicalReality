import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { HospitalShow } from "./pages/hospitalShow";
import { LessonShow1, LessonShow2 } from "./pages/lessonShow";

function App() {
  return (
    <Router>
      <App2 />
    </Router>
  );
}

function App2() {

  const navigate = useNavigate();

  const goToLesson1 = ()=>{
    navigate("/lesson-1");
  }

  const goToLesson2 = ()=>{
    navigate("/lesson-2");
  }

  const goToHome = ()=>{
    navigate("/");
  }
  return (
    <>
    <Routes>
          <Route path='/' element={<HospitalShow goToLesson1={goToLesson1} goToLesson2={goToLesson2}/>} />
          <Route path="/lesson-1" element={<LessonShow1 goToHome={goToHome}/> }/>
          <Route path="/lesson-2" element={<LessonShow2 goToHome={goToHome}/>} />
    </Routes>
    </>
  );
}

export default App;