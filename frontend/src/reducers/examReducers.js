// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import axios from 'axios';

import {

    EXAM_REQUEST,
    EXAM_SUCCESS,
    EXAM_FAIL,
    EXAM_ADD,
    EXAM_DELETE,
    EXAM_UPDATE,
    EXAM_SUBMIT,
    EXAM_ALL_CARD,
    EXAM_ALL_FAIL,
    
    EXAM_CLEAR,
    EXAM_ALL_CLEAR





} from '../constants/examConstants'




export const studentexamReducer = (state = {}, action) => {

    switch(action.type){

        case EXAM_REQUEST:
            return { loading: true, exam: null }

        case EXAM_FAIL:
            return { loading: false, error: action.payload }

        case EXAM_SUCCESS:
            return { loading: false, exam: action.payload }

        case EXAM_SUBMIT:
            return { loading: false, exam: state.examaction.payload }

        case EXAM_UPDATE:
            return { 
                loading: false, 
                //exam: state.scards.map(card => card._id === action.payload._id ? { ...card, name: action.payload.name, description: action.payload.description} : card), 
            }

        case EXAM_CLEAR:
            return { }

        
        default:
            return state
    }


}



export const studentexamListReducer = (state = {submissions:[]}, action) => {

    switch(action.type){

        case EXAM_ALL_CARD:
            console.log("Payload ", action.payload)
            return { loading: true, submissions: action.payload.exams, channelSubmission:action.payload.channel_id, cardSubmission:action.payload.card_id }

        case EXAM_ALL_FAIL:
            return { loading: false, error: action.payload }

        case EXAM_ALL_CLEAR:
            return {}

        default:
            return state
    }


}