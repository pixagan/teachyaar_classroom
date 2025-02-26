// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import axios from 'axios';
import { setAlert } from './alertActions';
import {

    CHANNEL_LIST_REQUEST,
    CHANNEL_LIST_SUCCESS,
    CHANNEL_LIST_FAIL,
    CHANNEL_LIST_ADD,
    CHANNEL_LIST_DELETE,

    CHANNEL_ADD_SUBSCRIBER,
    CHANNEL_DETAIL,
    CHANNEL_DETAIL_FAIL,






} from '../constants/channelConstants'

import {
    CARD_LIST_SUCCESS
} from '../constants/cardConstants'

import {
    QANDA_LIST_SUCCESS
} from '../constants/qandaConstants'


export const listChannels = () => async (dispatch, getState) => {

    try{
        dispatch({ type: CHANNEL_LIST_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/channels`, config)


        dispatch({
            type: CHANNEL_LIST_SUCCESS,
            payload: data
        })

    }catch (error){

        dispatch({
            type: CHANNEL_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}




export const updateChannelRT = (selectedChannel_in) => async (dispatch, getState) => {

    try{
        dispatch({ type: CHANNEL_LIST_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { selectedChannel: { selectedChannel }} = getState()


        console.log("Updating Dashbiard RT Action : ", selectedChannel)




        const { data } = await axios.post(`/api/channels/RT/${selectedChannel}`, {}, config)

        console.log("Databack : ", data)

        const updatedChannels = data.channels
        const updatedCards    = data.cards
        const updatedQandA    = data.qanda

        // console.log("Updated Channels : ", updatedChannels)
        // console.log("Updated Cards    : ", updatedCards)
        // console.log("Updated Q and A : ", updatedQandA)

        if(updatedChannels){

            dispatch({
                type: CHANNEL_LIST_SUCCESS,
                payload: updatedChannels
            })

        }



        if(updatedCards){
            dispatch({
                type: CARD_LIST_SUCCESS,
                payload: updatedCards
            })
        }


        if(updatedQandA){
            dispatch({
                type: QANDA_LIST_SUCCESS,
                payload: updatedQandA
            })
        }


    }catch (error){

        // dispatch({
        //     type: CHANNEL_LIST_FAIL,
        //     payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        // })

    }

}



export const createChannel = (name) => async (dispatch, getState) => {
    try{
        

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log(name)

        const { data } = await axios.post(`/api/channels`,  {name}, config)

        dispatch({
            type: CHANNEL_LIST_ADD,
            payload: data
        })


        dispatch(setAlert(`Channel ${data.name} successfully created`, 'success'));

    } catch(error){

        dispatch({
            type: CHANNEL_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

        const error_message = error.response && error.response.data.message ? error.response.data.message : error.message

        dispatch(setAlert(error_message, 'danger'));


    }
}








export const listChannelDetail = (channel_id) => async (dispatch, getState) => {

    try{
        // dispatch({ type: CHANNEL_LIST_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/channels/${channel_id}`, config)

        console.log(data)

        dispatch({
            type: CHANNEL_DETAIL,
            payload: data
        })

    }catch (error){





        dispatch({
            type: CHANNEL_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}









//The student enrolling with a code

export const enrollRequestChannel = (enrollmentCode) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: CHANNEL_LIST_REQUEST
        // })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        const { data } = await axios.post(`/api/channels/enroll/${enrollmentCode}`,  {enrollmentCode}, config)

        // dispatch({
        //     type: CHANNEL_ADD_SUBSCRIBER,
        //     payload: data
        // })



    } catch(error){

        // const errors = error.response.data.errors;
        // console.log("Add subscriber : ", errors)

        // if(errors){
        //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        // }

        // dispatch({
        //     type: CHANNEL_LIST_FAIL,
        //     payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        // })


    }
}





//The student enrolling with a code

export const approveEnrollRequestChannel = (channel_id, student_id) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: CHANNEL_LIST_REQUEST
        // })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log("Enroll ",channel_id, student_id)

        const { data } = await axios.post(`/api/channels/enroll/approve/${channel_id}`,  {student_id}, config)

        dispatch({
            type: CHANNEL_ADD_SUBSCRIBER,
            payload: data
        })



    } catch(error){

        // const errors = error.response.data.errors;
        // console.log("Add subscriber : ", errors)

        // if(errors){
        //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        // }

        // dispatch({
        //     type: CHANNEL_LIST_FAIL,
        //     payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        // })


    }
}




export const unsubscribeChannel = (channel_id, student_id) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: PRODUCT_DELETE_REQUEST
        // })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }



        await axios.post(`/api/channels/unsubscribe/${channel_id}/${student_id}`,  {},config)

        // dispatch({
        //     type: CHANNEL_LIST_DELETE,
        // })



    } catch(error){

        // dispatch({
        //     type: CHANNEL_LIST_FAIL,
        //     payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        // })


    }
}







// //the teacher adding a student
// export const addSubscriberChannel = (channel_id, name, email, phoneNo) => async (dispatch, getState) => {
//     try{
//         // dispatch({
//         //     type: CHANNEL_LIST_REQUEST
//         // })

//         const { userLogin: { userInfo }} = getState()

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         console.log("Ad SUbscriber",channel_id, name, email, phoneNo)

//         const { data } = await axios.put(`/api/channels/subscribers/${channel_id}`,  {name, email, phoneNo}, config)

//         dispatch({
//             type: CHANNEL_ADD_SUBSCRIBER,
//             payload: data
//         })



//     } catch(error){

//         const errors = error.response.data.errors;
//         console.log("Add subscriber : ", errors)

//         if(errors){
//             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//         }

//         dispatch({
//             type: CHANNEL_LIST_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message,

//         })


//     }
// }








export const deleteChannel = (channel_id) => async (dispatch, getState) => {
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



        const {data} = await axios.delete(`/api/channels/${channel_id}`,  config)

        console.log('data : ',data)
        dispatch({
            type: CHANNEL_LIST_DELETE,
            payload: data
        })



    } catch(error){

        dispatch({
            type: CHANNEL_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}