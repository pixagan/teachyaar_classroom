// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import axios from 'axios'
import {setAlert} from './alertActions';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL } from "../constants/userConstants"
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_LOGOUT } from "../constants/userConstants"
import { USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET} from "../constants/userConstants"
import { USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET } from "../constants/userConstants"
import { USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL } from "../constants/userConstants"
import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET } from "../constants/userConstants"
import { USER_PASSWORD_RESET_REQUEST_SEND, USER_PASSWORD_RESET_REQUEST_FAIL, USER_PASSWORD_RESET_OTP_SEND, USER_PASSWORD_RESET_OTP_FAIL} from "../constants/userConstants"
import { VERIFY_PHONE_SUCCESS, VERIFY_PHONE_FAIL, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAIL} from '../constants/userConstants'

// import {    CARD_LIST_CLEAR,
//     CARD_STUDYNOTES_CLEAR,
//     CARD_LIVE_CLEAR,
//     CARD_TAKE_EXAM_CLEAR} from '../constants/cardConstants.js'

// import {    CHANNEL_LIST_CLEAR,
//     CHANNEL_DETAIL_CLEAR,
//     CHANNEL_SELECT_CLEAR
// } from '../constants/channelConstants.js'

// import {    EXAM_CLEAR,
//     EXAM_ALL_CLEAR
//     } from '../constants/examConstants.js'


// import {
//     NOTIFICATION_LIST_CLEAR,
//     NOTIFICATION_LATEST_CLEAR
// } from '../constants/notificationConstants.js'

// import {
//     QANDA_LIST_CLEAR,
//     QANDACARD_LIST_CLEAR 
// } from '../constants/qandaConstants.js'


// import {
//     SUPPORT_LIST_CLEAR,
//     SUPPORTCARD_LIST_CLEAR,
//     CONTACTUS_CLEAR
// } from '../constants/supportConstants.js'


// import {USER_PASSWORD_RESET_CLEAR, VERIFY_USER_CLEAR} from '../constants/userConstants'




import {
    deviceDetect
  } from "react-device-detect";



export const register = (name, email, phoneNo, password, isTeacher, acceptTerms, recommendationToken, accessCode) => async (dispatch) => {
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const currDevice = deviceDetect()

        const { data } = await axios.post('/api/users', {name, email, phoneNo, password, isTeacher, acceptTerms, recommendationToken, currDevice, accessCode}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })



        dispatch(setAlert('User Successfully Registered', 'success'));


    } catch(error){

        console.log("Error : ", error.message)

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

        dispatch(setAlert('User Registration failed', 'danger'));


    }
}




export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const { data } = await axios.post('/api/users/login', {email, password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))


        dispatch(setAlert('User Logged In', 'success'));

    } catch(error){

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


        dispatch(setAlert('User Login failed', 'danger'));


    }
}




export const logout = () => async (dispatch, getState) => {

    try{
        // dispatch({
        //     type: USER_LOGOUT_REQUEST
        // })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        //const { data } = await axios.post('/api/users/logout', {}, config)

    

        localStorage.removeItem('userInfo')
        dispatch({ type: USER_LOGOUT })
        // dispatch({ type: USER_REGISTER_LOGOUT })
        // dispatch({ type: USER_DETAILS_RESET })
        // dispatch({ type: USER_LIST_RESET })

        // dispatch({type: CARD_LIST_CLEAR})
        // dispatch({type: CARD_STUDYNOTES_CLEAR})
        // dispatch({type: CARD_LIVE_CLEAR})
        // dispatch({type: CARD_TAKE_EXAM_CLEAR})

        // dispatch({type: CHANNEL_LIST_CLEAR})
        // dispatch({type: CHANNEL_DETAIL_CLEAR})
        // dispatch({type: CHANNEL_SELECT_CLEAR})

        // dispatch({type: EXAM_CLEAR})
        // dispatch({type: EXAM_ALL_CLEAR})

        // dispatch({type: NOTIFICATION_LIST_CLEAR})
        // dispatch({type: NOTIFICATION_LATEST_CLEAR})

        // dispatch({type: QANDA_LIST_CLEAR})
        // dispatch({type: QANDACARD_LIST_CLEAR})

        // dispatch({type: SUPPORT_LIST_CLEAR})
        // dispatch({type: SUPPORTCARD_LIST_CLEAR})
        // dispatch({type: CONTACTUS_CLEAR})

        // dispatch({type: USER_PASSWORD_RESET_CLEAR})
        // dispatch({type: VERIFY_USER_CLEAR})

        //clear all the data structures in the reducers


        dispatch(setAlert('User successfully logged out', 'success'));


    } catch(error){

        dispatch({
            type: USER_LOGOUT,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

        //dispatch(setAlert('User Login failed at the server level', 'danger'));


    }


    
}
