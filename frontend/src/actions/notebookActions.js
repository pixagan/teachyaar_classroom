import axios from 'axios';
import { setAlert } from './alertActions';

import {

    ADD_CARD,
    CARDS_FAIL,
    CARD_LIST,
    DELETE_CARD,
    UPDATE_CARD_TITLE,

    ADD_CARD_ITEM,
    UPDATE_CARD_ITEM,
    DELETE_CARD_ITEM,

    UPDATE_VIDEO_CARD,

    ADD_QUESTION_TEST




} from '../constants/notebookConstants'



export const addCard = ( card_in ) => async (dispatch, getState) => {

    try{

        //const { userLogin: { userInfo }} = getState()


        console.log("Adding Card")

        dispatch({
            type: ADD_CARD,
            payload: card_in
        })

        

    }catch (error){

        dispatch({
            type: CARDS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}




export const deleteCard = ( card_id ) => async (dispatch, getState) => {

    try{

        //const { userLogin: { userInfo }} = getState()


        console.log("Deleting Card")

        dispatch({
            type: DELETE_CARD,
            payload: card_id
        })

        

    }catch (error){

        dispatch({
            type: CARDS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}



export const updateCardTitle = ( card_id, title_in ) => async (dispatch, getState) => {

    try{


        console.log("Updating Card Title", card_id, title_in)

        dispatch({
            type: UPDATE_CARD_TITLE,
            payload: {
                "_id":card_id,
                "title":title_in
            }
        })

    }catch (error){

        dispatch({
            type: CARDS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}




export const addCardItem = ( card_id, item_in ) => async (dispatch, getState) => {

    try{


        console.log("Add Card Item")

        dispatch({
            type: ADD_CARD_ITEM,
            payload: {
                "card_id":card_id,
                "item":item_in
            }
        })

    }catch (error){

        dispatch({
            type: CARDS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}

export const updateVideoCard = (card_id, url, description) => async (dispatch, getState) => {
    try{


        console.log("Update Video Card")

        dispatch({
            type: UPDATE_VIDEO_CARD,
            payload: {
                "card_id":card_id,
                "url":url,
                "description":description
            }
        })

    }catch (error){

        dispatch({
            type: CARDS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}



export const updateCardItem = ( card_id, item_id, newItem ) => async (dispatch, getState) => {

    try{


        console.log("Update Card Item")

        dispatch({
            type: UPDATE_CARD_ITEM,
            payload: {
                "card_id":card_id,
                "item_id":item_id,
                "item":newItem
            }
        })

    }catch (error){

        dispatch({
            type: CARDS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}



export const deleteCardItem = ( card_id, item_id ) => async (dispatch, getState) => {

    try{


        console.log("Delete Card Item")

        dispatch({
            type: DELETE_CARD_ITEM,
            payload: {
                "card_id":card_id,
                "item_id":item_id,
            }
        })

    }catch (error){

        dispatch({
            type: CARDS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}



//-------------- Test --------------



export const addQuestionTest = (card_id,question) => async (dispatch, getState) => {
    try{


        console.log("Add Question Test ", card_id, question)

        dispatch({
            type: ADD_QUESTION_TEST,
            payload: {
                "card_id":card_id,
                "question":question
            }
        })

    }catch (error){

        dispatch({
            type: CARDS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}

