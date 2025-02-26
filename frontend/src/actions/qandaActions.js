// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import axios from 'axios';

import {


    QANDA_LIST_REQUEST,
    QANDA_LIST_SUCCESS,
    QANDA_LIST_FAIL,
    QANDA_ADD,
    QANDA_DELETE,
    QANDA_REPLY,
    QANDA_REPLY_DELETE,
    QANDA_REPLY_DELETE_FAIL,

    QANDA_LIST_CARD,
    QANDACARD_LIST_FAIL,



} from '../constants/qandaConstants'




export const createQPost = ( question, post_type, channel_id, card_id, isPrivate) => async (dispatch, getState) => {
    try{
        dispatch({
            type: QANDA_LIST_REQUEST
        })

        console.log(question, post_type, channel_id)

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(question, post_type, channel_id, card_id)

        const { data } = await axios.post(`/api/qanda/${channel_id}`,  {card_id, question, post_type, isPrivate}, config)

        console.log("Qanda add data ", data)

        dispatch({
            type: QANDA_ADD,
            payload: data
        })



    } catch(error){

        dispatch({
            type: QANDA_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}



export const listQPosts = (channel_id) => async (dispatch, getState) => {

    try{
        dispatch({ type: QANDA_LIST_REQUEST })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/qanda/${channel_id}`, config)

        console.log(data)

        dispatch({
            type: QANDA_LIST_SUCCESS,
            payload: data
        })

    }catch (error){

        dispatch({
            type: QANDA_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}




export const deleteQPosts = (channel_id, qpost_id) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: PRODUCT_DELETE_REQUEST
        // })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }



        await axios.delete(`/api/qanda/${channel_id}/${qpost_id}`,  config)

        dispatch({
            type: QANDA_DELETE,
            payload: qpost_id
        })



    } catch(error){

        dispatch({
            type: QANDA_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}







export const listQPostsCard = (channel_id, card_id) => async (dispatch, getState) => {

    try{
        // dispatch({ type: QANDA_LIST_REQUEST })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log("IDs ", channel_id, card_id)

        const { data } = await axios.get(`/api/qanda/card/${channel_id}/${card_id}`, config)

        console.log(data)

        dispatch({
            type: QANDA_LIST_CARD,
            payload: data
        })

    }catch (error){

        dispatch({
            type: QANDACARD_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}




export const createPostReply = ( reply, channel_id, qanda_id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: QANDA_LIST_REQUEST
        })

        console.log(reply, channel_id, qanda_id)

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(reply)

        const { data } = await axios.post(`/api/qanda/postreply/${channel_id}/${qanda_id}`,  {reply}, config)


        console.log(data)

        dispatch({
            type: QANDA_REPLY,
            payload: data
        })



    } catch(error){

        dispatch({
            type: QANDA_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}



export const deleteQPostsReply = (channel_id, qpost_id, reply_id) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: PRODUCT_DELETE_REQUEST
        // })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }



        const {data} = await axios.delete(`/api/qanda/postreply/${channel_id}/${qpost_id}/${reply_id}`,  config)

        dispatch({
            type: QANDA_REPLY_DELETE,
            payload: data
        })



    } catch(error){

        dispatch({
            type: QANDA_REPLY_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}
