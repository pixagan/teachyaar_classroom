import axios from 'axios';
import {setAlert} from './alertActions';
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
    MCQ_SUBMIT_SOLUTION,
    MCQ_GET_SOLUTION,
    MCQ_UPDATE_EXAM_STUDENT,
    MCQ_DELETE_FAIL,
    MCQ_DELETE,

    MCQ_BYID_GET,
    MCQ_BYID_ERROR,

    MCQ_LOAD_QUESTIONS,
    MCQ_LOAD_QUESTIONS_FAIL,
    MCQ_LOAD_QUESTIONS_CLEAR,


    MCQ_START_EXAM,
    MCQ_TAKE_ERROR,

    MCQ_TEACHER_GET_SUBMISSIONS_ERROR,
    MCQ_TEACHER_GET_SUBMISSIONS,
    MCQ_TEACHER_GET_SUBMISSIONS_CLEAR,

    MCQ_TEACHER_GET_SUBMISSIONSBYID,
    MCQ_TEACHER_GET_SUBMISSIONSBYID_ERROR,

    MCQ_ADD_QUESTION,
    MCQ_EDIT_QUESTION,
    MCQ_DELETE_QUESTION,
    MCQ_QUESTION_FAIL,

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



//Load mcqs/tests for a course
export const listMCQExams = (course_id) => async (dispatch, getState) => {

    try{
        dispatch({ type: MCQ_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        if(course_id == null){
            const { data } = await axios.get(`/api/mcq`, config)

            console.log(data)

            dispatch({
                type: MCQ_LOAD,
                payload: data
            })
        }else{
            const { data } = await axios.get(`/api/mcq?course=${course_id}`, config)

            console.log(data)

            dispatch({
                type: MCQ_LOAD,
                payload: data
            })
        }

        



    }catch (error){

        dispatch({
            type: MCQ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}





export const addCourseMCQ = ( course_id, test_title ) => async (dispatch, getState) => {
    try{
     

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        const { data } = await axios.post(`/api/mcq`,  {course_id, test_title}, config)

        dispatch({
            type: MCQ_ADD,
            payload: data
        })



    } catch(error){

        dispatch({
            type: MCQ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}



//Load MCQ by ID
export const getMCQById = (mcq_id) => async (dispatch, getState) => {

    try{
        //dispatch({ type: MCQ_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log('Get MCQ by ID ', mcq_id)

        const { data } = await axios.get(`/api/mcq/${mcq_id}`, config)

        console.log(data)

        dispatch({
            type: MCQ_BYID_GET,
            payload: data.mcq
        })

        dispatch({
            type: MCQ_LOAD_QUESTIONS,
            payload: data.questions
        })

    }catch (error){

        dispatch({
            type: MCQ_BYID_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}









export const addQuestion = ( mcq_id ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(mcq_id)

        const { data } = await axios.post(`/api/mcq/questions/${mcq_id}`,  {}, config)


        console.log('Add question data ', data)

        dispatch({
            type: MCQ_ADD_QUESTION,
            payload: data
        })




    } catch(error){

        dispatch({
            type: MCQ_QUESTION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}





export const updateMCQQuestion = ( mcq_id, question_id, nMarks, examType, questionText, option1, option2, option3, option4, fileData ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(mcq_id)

        const { data } = await axios.put(`/api/mcq/questions/${mcq_id}/${question_id}`,  {nMarks, examType, questionText, option1, option2, option3, option4, fileData}, config)




        dispatch({
            type: MCQ_EDIT_QUESTION,
            payload: data
        })




    } catch(error){

        dispatch({
            type: MCQ_QUESTION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}





export const deleteMCQQuestion = ( mcq_id, question_id ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(mcq_id)

        const { data } = await axios.delete(`/api/mcq/questions/${mcq_id}/${question_id}`, config)



        dispatch({
            type: MCQ_DELETE_QUESTION,
            payload: data
        })




    } catch(error){

        dispatch({
            type: MCQ_QUESTION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}














export const submitMCQSolution = ( question_id, solution ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(question_id, solution)

        const { data } = await axios.post(`/api/mcq/solution/${question_id}`,  {solution}, config)

        dispatch({
            type: MCQ_SUBMIT_SOLUTION,
            payload: data
        })



    } catch(error){

        dispatch({
            type: MCQ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}





//Load cards for a channel all or by keyword
export const getMCQByIdStudent = (mcq_id) => async (dispatch, getState) => {

    try{
        //dispatch({ type: MCQ_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.get(`/api/mcq/${mcq_id}`, config)

        console.log(data)

        dispatch({
            type: MCQ_BYID_GET,
            payload: data
        })

    }catch (error){

        dispatch({
            type: MCQ_BYID_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}




export const submitMCQ = ( mcq_id, submission_id, solutions, answeredQ, numAnswered ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }


        console.log(mcq_id, submission_id, solutions, answeredQ, numAnswered)

        const { data } = await axios.post(`/api/mcq/submit/${submission_id}`,  {mcq_id, solutions, answeredQ, numAnswered}, config)




        dispatch({
            type: MCQ_SUBMIT_STUDENT,
            payload: data
        })




    } catch(error){

        dispatch({
            type: MCQ_TAKE_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}





export const takeMCQUpdate = ( mcq_id, submission_id, index, value, numAnswered ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }


        console.log(mcq_id, submission_id, index, value)

        const { data } = await axios.post(`/api/mcq/answer/${submission_id}`,  {mcq_id, index, value, numAnswered}, config)

        dispatch({
            type: MCQ_UPDATE_EXAM_STUDENT,
            //payload: data
        })



    } catch(error){

        dispatch({
            type: MCQ_TAKE_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}





export const takeMCQUpdateText = ( mcq_id, submission_id, index, value, numAnswered ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }


        console.log(mcq_id, submission_id, index, value)

        const { data } = await axios.post(`/api/mcq/answer/${submission_id}`,  {mcq_id, index, value, numAnswered}, config)

        dispatch({
            type: MCQ_UPDATE_EXAM_STUDENT,
            //payload: data
        })



    } catch(error){

        dispatch({
            type: MCQ_TAKE_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}





//Load cards for a channel all or by keyword
export const getTeacherMCQSolution = (mcq_id) => async (dispatch, getState) => {

    try{
        //dispatch({ type: MCQ_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log('Get MCQ solution ', mcq_id)

        const { data } = await axios.get(`/api/mcq/solution/${mcq_id}`, config)

        console.log(data)

        dispatch({
            type: MCQ_GET_SOLUTION,
            payload: data
        })

    }catch (error){

        dispatch({
            type: MCQ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}





//Load cards for a channel all or by keyword
export const getTeacherMCQSubmissions = (mcq_id) => async (dispatch, getState) => {

    try{
        //dispatch({ type: MCQ_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log('Get MCQ solution ', mcq_id)

        const { data } = await axios.get(`/api/mcq/submissions/${mcq_id}`, config)

        console.log(data)

        dispatch({
            type: MCQ_TEACHER_GET_SUBMISSIONS,
            payload: data
        })

    }catch (error){

        dispatch({
            type: MCQ_TEACHER_GET_SUBMISSIONS_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}






//Load cards for a channel all or by keyword
export const getTeacherMCQSubmissionById = (mcq_id, submission_id) => async (dispatch, getState) => {

    try{
        //dispatch({ type: MCQ_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log('Get MCQ solution ', mcq_id, submission_id)

        const { data } = await axios.get(`/api/mcq/submissionById/${mcq_id}/${submission_id}`, config)

        console.log(data)
        

        dispatch({
            type: MCQ_TEACHER_GET_SUBMISSIONSBYID,
            payload: data
        })

    }catch (error){

        dispatch({
            type: MCQ_TEACHER_GET_SUBMISSIONSBYID_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}






//Load cards for a channel all or by keyword
export const deleteMCQExam = (mcq_id) => async (dispatch, getState) => {

    try{
        //dispatch({ type: MCQ_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log('Get MCQ solution ', mcq_id)

        const { data } = await axios.delete(`/api/mcq/${mcq_id}`, config)

        console.log(data)
        

        dispatch({
            type: MCQ_DELETE,
            payload: mcq_id
        })

    }catch (error){

        dispatch({
            type: MCQ_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}





//Load cards for a channel all or by keyword
export const updateMCQExam = (mcq_id, name, nQuestions, startDate, startTime, DeadlineDate, DeadlineTime, timeZone, showSolutionOnSubmission, showGradeOnSubmission) => async (dispatch, getState) => {

    try{
        //dispatch({ type: MCQ_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log('Update MCQ solution ', mcq_id, name, nQuestions, startDate, startTime, DeadlineDate, DeadlineTime, timeZone)

        const { data } = await axios.put(`/api/mcq/${mcq_id}`, {name, nQuestions, startDate, startTime, DeadlineDate, DeadlineTime, timeZone,showSolutionOnSubmission, showGradeOnSubmission}, config)

        console.log(data)
        

        dispatch({
            type: MCQ_EDIT,
            payload: data
        })

    }catch (error){

        dispatch({
            type: MCQ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}







export const addManualGradeQuestion = ( mcq_id, submission_id, question_id, marks, comment ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log('Grade question ',mcq_id, submission_id, question_id, marks)

        const { data } = await axios.post(`/api/mcq/grade/submission/question/${mcq_id}/${submission_id}/${question_id}`,  {marks, comment}, config)


        console.log('Add question data ', data)

        dispatch({
            type: MCQ_MANUAL_GRADE_QUESTION,
            payload: data
        })




    } catch(error){

        dispatch({
            type: MCQ_MANUAL_GRADE_QUESTION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}






export const AutogradeExamById = ( mcq_id, submission_id ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log('Grade question ',mcq_id, submission_id)

        const { data } = await axios.post(`/api/mcq/grade/submission/${mcq_id}/${submission_id}`,  {}, config)


        console.log('AUTOGRADE EXAM ', data)

        dispatch({
            type: MCQ_AUTOGRADE_EXAM,
            payload: data
        })




    } catch(error){

        dispatch({
            type: MCQ_AUTOGRADE_EXAM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}






export const AutogradeAllExams = ( mcq_id ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log('Grade question ',mcq_id)

        const { data } = await axios.post(`/api/mcq/grade/${mcq_id}`,  {}, config)


        console.log('AUTOGRADE ALL EXAMS ', data)

        dispatch({
            type: MCQ_AUTOGRADE_ALL_EXAMS,
            payload: data
        })




    } catch(error){

        dispatch({
            type: MCQ_AUTOGRADE_ALL_EXAMS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}





export const getMCQAnalytics = ( mcq_id ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log('Exam Analytics ', mcq_id)

        const { data } = await axios.get(`/api/mcq/analytics/${mcq_id}`, config)


        console.log('Analytics in ', data)

        dispatch({
            type: MCQ_GET_ANALYTICS,
            payload: data
        })




    } catch(error){

        dispatch({
            type: MCQ_GET_ANALYTICS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}





export const addEquationMCQ = ( mcq_id, question_id, equationText ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log('Exam Analytics ', mcq_id, question_id, equationText)

        const { data } = await axios.post(`/api/mcq/question/equation/${mcq_id}/${question_id}`, {equationText},config)


        console.log('Analytics in ', data)

        dispatch({
            type: MCQ_EDIT_QUESTION,
            payload: data
        })




    } catch(error){

        dispatch({
            type: MCQ_EQUATION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}






export const updateEquationMCQ = ( mcq_id, question_id, equation_id, equationText ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log('Update Equation ', mcq_id, question_id, equation_id, equationText)

        const { data } = await axios.post(`/api/mcq/question/equation/${mcq_id}/${question_id}/${equation_id}`, {equationText},config)


        console.log('Analytics in ', data)

        dispatch({
            type: MCQ_EDIT_QUESTION,
            payload: data
        })




    } catch(error){

        dispatch({
            type: MCQ_EQUATION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}





export const deleteImageMCQ = ( mcq_id, question_id, image_id ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log('Exam Analytics ', mcq_id, question_id, image_id)

        const { data } = await axios.delete(`/api/mcq/question/image/${mcq_id}/${question_id}`,config)


        console.log('Analytics in ', data)

        dispatch({
            type: MCQ_EDIT_QUESTION,
            payload: data
        })




    } catch(error){

        dispatch({
            type: MCQ_EQUATION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}




export const deleteEquationMCQ = ( mcq_id, question_id, equation_id ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log('Exam Analytics ', mcq_id, question_id, equation_id)

        const { data } = await axios.delete(`/api/mcq/question/equation/${mcq_id}/${question_id}/${equation_id}`,config)


        console.log('Analytics in ', data)

        dispatch({
            type: MCQ_EDIT_QUESTION,
            payload: data
        })




    } catch(error){

        dispatch({
            type: MCQ_EQUATION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}
