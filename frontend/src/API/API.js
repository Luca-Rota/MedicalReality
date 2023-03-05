const APIURL = 'http://localhost:3500/lessons'

async function getProfessorLessons() {
    let response = await fetch((APIURL + '/professor'), {
        method: 'GET'
    });
    if (response.ok) {
        const professorLessons = await response.json();
        return professorLessons
    } else {
        const errDetail = await response.json();
        throw errDetail.message;
    }
}

async function getTips() {
    let response = await fetch((APIURL + '/tips'), {
        method: 'GET'
    });
    if (response.ok) {
        const tips = await response.json();
        return tips
    } else {
        const errDetail = await response.json();
        throw errDetail.message;
    }
}

async function getLessonDetails(lessonId) {
    let response = await fetch((APIURL + '/' + lessonId), {
        method: 'GET'
    });
    if (response.ok) {
        const lessonDetails = await response.json();
        return lessonDetails
    } else {
        const errDetail = await response.json();
        throw errDetail.message;
    }
}

async function evaluateTask(body, taskId) {
    let response = await fetch((APIURL + '/evaluate_task/' + taskId), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    if (response.ok) {
        const task = await response.json();
        return task
    } else {
        const errDetail = await response.json();
        throw errDetail.message;
    }
}

async function evaluateLesson(lessonId) {
    let response = await fetch((APIURL + '/evaluate_lesson/' + lessonId), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (response.ok) {
        const lesson = await response.json();
        return lesson
    } else {
        const errDetail = await response.json();
        throw errDetail.message;
    }
}

async function resetGrade(lessonId) {
    let response = await fetch((APIURL + '/reset/' + lessonId), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (response.ok) {
        const lesson = await response.json();
        return lesson
    } else {
        const errDetail = await response.json();
        throw errDetail.message;
    }
}

async function shareResults(lessonId) {
    let response = await fetch((APIURL + '/share/' + lessonId), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (response.ok) {
        const lesson = await response.json();
        return lesson
    } else {
        const errDetail = await response.json();
        throw errDetail.message;
    }
}

const API = { getProfessorLessons, getTips, getLessonDetails, evaluateTask, evaluateLesson, resetGrade, shareResults}

export default API