import axios from 'axios';
import { setAlert } from './alertActions';

import {

    ADD_NOTEBOOK,
    LOAD_NOTEBOOK_LIST,
    NOTEBOOK_LIST_FAIL,
    DELETE_NOTEBOOK,

    NOTEBOOK_ITEM_LIST,
    ADD_NOTEBOOK_ITEM,
    UPDATE_NOTEBOOK_ITEM,
    DELETE_NOTEBOOK_ITEM,
    NOTEBOOK_ITEM_FAIL,
    CLEAR_NOTEBOOK_ITEMS,

    LOAD_NOTEBOOK_DETAIL,
    NOTEBOOK_DETAIL_FAIL,

    UPDATE_NOTEBOOK_TITLE,
    NOTEBOOK_TITLE_FAIL,



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




export const listNotebooks = () => async (dispatch, getState) => {

    try{

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/notebooks`, config)


        dispatch({
            type: LOAD_NOTEBOOK_LIST,
            payload: data
        })

    }catch (error){

        dispatch({
            type: NOTEBOOK_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}




export const createNotebook = ( notebook_title, course_id ) => async (dispatch, getState) => {

    try{

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log("Creating Notebook : ", notebook_title, course_id)

        const { data } = await axios.post(`/api/notebooks`, {title:notebook_title, course_id:course_id}, config)


        console.log("Adding Notebook ", data)

        dispatch({
            type: ADD_NOTEBOOK,
            payload: data
        })

        

    }catch (error){

        dispatch({
            type: NOTEBOOK_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}





export const listNotebooksById = (notebook_id) => async (dispatch, getState) => {

    try{

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/notebooks/${notebook_id}`, config)


        console.log("Notebook Detail : ", data)

        dispatch({
            type: LOAD_NOTEBOOK_DETAIL,
            payload: data.notebook
        })

        dispatch({
            type: NOTEBOOK_ITEM_LIST,
            payload: data.items
        })

    }catch (error){

        dispatch({
            type: NOTEBOOK_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}






export const deleteNotebook = (notebook_id) => async (dispatch, getState) => {

    try{

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/notebooks/${notebook_id}`, config)


        dispatch({
            type: DELETE_NOTEBOOK,
            payload: data
        })

    }catch (error){

        dispatch({
            type: NOTEBOOK_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}




export const updateNotebookTitle = ( notebook_id, title_in ) => async (dispatch, getState) => {

    try{

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/notebooks/title/${notebook_id}`, {title:title_in}, config)


        dispatch({
            type: UPDATE_NOTEBOOK_TITLE,
            payload: data
            
        })

    }catch (error){

        dispatch({
            type: NOTEBOOK_TITLE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}




export const addNotebookItem = ( notebook_id, item_in ) => async (dispatch, getState) => {

    try{

        //const { userLogin: { userInfo }} = getState()

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/notebooks/items/${notebook_id}`, {item:item_in}, config)


        console.log("Adding Card")

        dispatch({
            type: ADD_NOTEBOOK_ITEM,
            payload: data
        })

        

    }catch (error){

        dispatch({
            type: NOTEBOOK_ITEM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}





export const deleteCardNotebookItem = ( notebook_id, item_id ) => async (dispatch, getState) => {

    try{

        //const { userLogin: { userInfo }} = getState()

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/notebooks/items/${notebook_id}/${item_id}`, config)


        console.log("Delete Item")

        dispatch({
            type: ADD_NOTEBOOK_ITEM,
            payload: data
        })

        

    }catch (error){

        dispatch({
            type: NOTEBOOK_ITEM_FAIL,
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

