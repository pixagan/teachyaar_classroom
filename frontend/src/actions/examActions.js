// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import axios from 'axios';

import {

    EXAM_REQUEST,
    EXAM_SUCCESS,
    EXAM_FAIL,
    EXAM_ADD,
    EXAM_SUBMIT,
    EXAM_ALL_CARD,
    EXAM_ALL_FAIL,



} from '../constants/examConstants'



//Load cards for a channel all or by keyword
export const listStudentExam = (channel_id, card_id) => async (dispatch, getState) => {

    try{
        dispatch({ type: EXAM_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/exams/${channel_id}/${card_id}`, config)

        console.log(data)

        dispatch({
            type: EXAM_SUCCESS,
            payload: data
        })

    }catch (error){

        dispatch({
            type: EXAM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}




//Load cards for a channel all or by keyword
export const listStudentExamById = (channel_id, studentexam_id) => async (dispatch, getState) => {

    try{
        dispatch({ type: EXAM_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log("Get Exam by Id ", studentexam_id)

        const { data } = await axios.get(`/api/exams/grade/${channel_id}/${studentexam_id}`, config)

        console.log(data)

        dispatch({
            type: EXAM_SUCCESS,
            payload: data
        })

    }catch (error){

        dispatch({
            type: EXAM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}





export const submitStudentExamGrade = ( channel_id, submission_id, marks, grade, feedback ) => async (dispatch, getState) => {
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


        console.log("Submit graded exam : ", submission_id, marks, grade, feedback)

        const { data } = await axios.post(`/api/exams/grade/${channel_id}/${submission_id}`,  {marks, grade, feedback}, config)

        dispatch({
            type: EXAM_SUCCESS,
            payload: data
        })



    } catch(error){

        dispatch({
            type: EXAM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}


















export const startStudentExam = ( channel_id, studentexam_id, card_id ) => async (dispatch, getState) => {
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


        console.log(card_id)

        //const { data } = await axios.post(`/api/exams/start/${channel_id}/${studentexam_id}`,  {}, config)

        const { data } = await axios.get(`/api/downloads/exam/${card_id}`, config)


        console.log("Exam ", data)


        var FileSaver = require('file-saver');
        var blob = new Blob([data], {type: "image/png"});
        FileSaver.saveAs(blob, "imgdown.png");


        dispatch({
            type: EXAM_ADD,
            payload: data
        })



    } catch(error){

        dispatch({
            type: EXAM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}




export const submitStudentExam = ( channel_id, card_id, filename ) => async (dispatch, getState) => {
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


        console.log(card_id, filename)

        const { data } = await axios.post(`/api/exams/submit/${channel_id}/${card_id}`,  {filename}, config)



        console.log("Exam data ", data)


        dispatch({
            type: EXAM_SUBMIT,
            payload: data
        })



    } catch(error){

        dispatch({
            type: EXAM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}



//Load cards for a channel all or by keyword
export const listAllStudentExam = (channel_id, card_id) => async (dispatch, getState) => {

    try{
        //dispatch({ type: EXAM_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/exams/all/${channel_id}/${card_id}`, config)

        console.log(data)

        dispatch({
            type: EXAM_ALL_CARD,
            payload: data
        })

    }catch (error){

        dispatch({
            type: EXAM_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}






export const downloadedGradedExam = ( submission_id ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            responseType: 'blob'
        }


        console.log(submission_id, userInfo.token)

        //const { data } = await axios.get(`/api/exams/grade/downloadsubmission/${submission_id}`, config)

        const { data } = await axios.get(`/api/downloads/exam/submitted/${submission_id}`, config)



        console.log("Exam Submission", data)


        var FileSaver = require('file-saver');
        var blob = new Blob([data], {type: "application/pdf"});
        FileSaver.saveAs(blob, submission_id + "_submission.pdf");


        dispatch({
            type: EXAM_ADD,
            payload: data
        })



    } catch(error){

        dispatch({
            type: EXAM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}

