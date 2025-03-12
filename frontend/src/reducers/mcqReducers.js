import axios from 'axios';


import {

    MCQ_REQUEST,
    MCQ_LOAD,
    MCQ_FAIL,
    MCQ_ADD,
    MCQ_EDIT,
    MCQ_SUBMIT_STUDENT,
    MCQ_ALL_CARD,
    MCQ_ALL_FAIL,
    MCQ_CLEAR,
    MCQ_DELETE_FAIL,
    MCQ_DELETE,


    MCQ_LOAD_QUESTIONS,
    MCQ_LOAD_QUESTIONS_FAIL,
    MCQ_LOAD_QUESTIONS_CLEAR,

    MCQ_ADD_QUESTION,
    MCQ_EDIT_QUESTION,
    MCQ_DELETE_QUESTION,
    MCQ_QUESTION_FAIL,


    MCQ_SUBMIT_SOLUTION,
    MCQ_GET_SOLUTION,

    MCQ_TAKE_EXAM_REQUEST,
    MCQ_START_EXAM,
    MCQ_UPDATE_EXAM,
    MCQ_SUBMIT_EXAM,
    MCQ_TAKE_CLEAR,
    MCQ_TAKE_ERROR,
    MCQ_UPDATE_EXAM_STUDENT,

    MCQ_BYID_GET,
    MCQ_BYID_ERROR,
    MCQ_BYID_CLEAR,

    MCQ_TEACHER_GET_SUBMISSIONS,
    MCQ_TEACHER_GET_SUBMISSIONS_CLEAR,
    MCQ_TEACHER_GET_SUBMISSIONS_ERROR,

    MCQ_TEACHER_GET_SUBMISSIONSBYID,
    MCQ_TEACHER_GET_SUBMISSIONSBYID_ERROR,



    MCQ_MANUAL_GRADE_QUESTION,
    MCQ_MANUAL_GRADE_QUESTION_FAIL,

    MCQ_AUTOGRADE_EXAM,
    MCQ_AUTOGRADE_EXAM_FAIL,

    MCQ_AUTOGRADE_ALL_EXAMS,
    MCQ_AUTOGRADE_ALL_EXAMS_FAIL,

    MCQ_GET_ANALYTICS,
    MCQ_GET_ANALYTICS_FAIL,
    MCQ_GET_ANALYTICS_CLEAR,

    MCQ_ADD_EQUATION,
    MCQ_EDIT_EQUATION,
    MCQ_DELETE_EQUATION,
    MCQ_EQUATION_FAIL


} from '../constants/mcqConstants'




export const mcqListReducer = (state = {mcqs:[]}, action) => {

    switch(action.type){

        case MCQ_REQUEST:
            return { loading: true, mcqs: [] }

        case MCQ_FAIL:
            return { loading: false, error: action.payload, mcqs:state.mcqs }

        case MCQ_DELETE_FAIL:
            return { loading: false, error: action.payload, mcqs:state.mcqs }

        case MCQ_LOAD:
            return { loading: false, mcqs: action.payload }

        case MCQ_ADD:
            return { 
                loading: false, 
                mcqs: [action.payload, ...state.mcqs], 
                solutionSaved: null,
                examid: null
            }

        case MCQ_SUBMIT_SOLUTION:
            return{
                loading:false,
                mcqs: state.mcqs,
                solutionSaved: action.payload.solution,
                examid: action.payload.examid
            }


        case MCQ_GET_SOLUTION:
            return{
                loading:false,
                solutionSaved: action.payload.solution,
                examid: action.payload.examid,
                mcqs: state.mcqs
            }


        case MCQ_DELETE:
            return { 
                loading: false, 
                mcqs: state.mcqs.filter(mcq => mcq._id !== action.payload),
            }

        case MCQ_EDIT:
            return { 
                loading: false, 
                mcqs: state.mcqs.map(mcq => mcq._id === action.payload._id ? { ...mcq, numQuestions:action.payload.numQuestions, examName:action.payload.examName, startTime: action.payload.startTime, endTime:action.payload.endTime}:mcq),
            }

 

        case MCQ_CLEAR:
            return { }

        
        default:
            return state
    }


}






export const MCQByIdReducer = (state = {mcq:null}, action) => {

    switch(action.type){

        case MCQ_BYID_GET:
            return { loading: false, mcq: action.payload }

        case MCQ_BYID_ERROR:
            return { loading: false, error: action.payload, mcq:state.mcq }

        case MCQ_BYID_CLEAR:
            return { }

        default:
            return state
    }


}



export const MCQQuestionsReducer = (state = {questions:[]}, action) => {

    switch(action.type){

        case MCQ_LOAD_QUESTIONS:
            return { loading: false, questions: action.payload }

        case MCQ_ADD_QUESTION:
            return { 
                questions:[...state.questions, action.payload]
            }
        
        case MCQ_EDIT_QUESTION:
            return { 
                questions: state.questions.map(question => question._id === action.payload._id ? { ...question, ...action.payload} : question)
            }

        case MCQ_DELETE_QUESTION:
            return { 
                questions: state.questions.filter(question => question._id !== action.payload)
            }


        case MCQ_LOAD_QUESTIONS_FAIL:
            return { loading: false, error: action.payload, questions:state.questions }

        case MCQ_LOAD_QUESTIONS_CLEAR:
            return {questions:[] }

        default:
            return state
    }


}








export const takeMCQReducer = (state = {submission:null, qpaper:null}, action) => {

    switch(action.type){

        case MCQ_TAKE_EXAM_REQUEST:
            return { loading: true }

        case MCQ_START_EXAM:
            return { loading: false, submission: action.payload }

        case MCQ_UPDATE_EXAM_STUDENT:
            return { loading: false, submission: state.submission }

        case MCQ_SUBMIT_STUDENT:
            return { 
                loading: false, 
                submission: state.submission ,
                submission_message: action.payload.message,
                isGraded: action.payload.isGraded,
                isSubmitted: true,
                grade: action.payload.grade,
                showGrade: action.payload.showGrade,
                showSolution: action.payload.showSolution,
                solution:action.payload.solution
            }

        case MCQ_TAKE_ERROR:
            return {
                loading: false,
                submission: state.submission,
                qpaper: state.qpaper,
                error: action.payload
            }

        case MCQ_TAKE_CLEAR:
            return { }

        default:
            return state
    }


}





export const MCQGetAnalyticsReducer = (state = {analytics:null}, action) => {

    switch(action.type){

        case MCQ_GET_ANALYTICS:
            return { loading: false, analytics: action.payload }

        case MCQ_GET_ANALYTICS_FAIL:
            return { loading: false, error: action.payload, analytics:state.analytics }

        case MCQ_GET_ANALYTICS_CLEAR:
            return { }

        default:
            return state
    }


}






export const mcqSubmissionsReducer = (state = {submissions:[], submission:null}, action) => {

    switch(action.type){

        case MCQ_TEACHER_GET_SUBMISSIONS_ERROR:
            return { loading: false, error: action.payload, submissions:state.submissions }

        case MCQ_TEACHER_GET_SUBMISSIONS:
            return { loading: false, submissions: action.payload }


        case MCQ_TEACHER_GET_SUBMISSIONSBYID_ERROR:
            return { loading: false, error: action.payload, submissions:state.submissions, submission:state.submission }

        case MCQ_TEACHER_GET_SUBMISSIONSBYID:
            return { loading: false, submission: action.payload, submissions:state.submissions }


        case MCQ_MANUAL_GRADE_QUESTION:
            return { 
                loading: false, 
                submission: {...state.submission, grading: action.payload.grading },
                submissions:state.submissions 
            }

        case MCQ_TEACHER_GET_SUBMISSIONS_CLEAR:
            return { }


        case MCQ_AUTOGRADE_EXAM:
            return { loading: false, submission: action.payload, submissions:state.submissions }

        case MCQ_AUTOGRADE_ALL_EXAMS:
            return { loading: false, submission: null, submissions:action.payload }


        default:
            return state
    }


}




