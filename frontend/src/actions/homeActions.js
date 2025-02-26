// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import axios from 'axios'
import {setAlert} from './alertActions';
import { 
    LOAD_COURSE_LIST,
    COURSE_LIST_FAIL,
    LOAD_COURSE_DETAIL,
    COURSE_DETAIL_FAIL,

} from "../constants/courseConstants"



export const loadLLMApps = () => async (dispatch, getState) => {
    try{


        const config = {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${userInfo.token}`
            }
        }

        const url = `/api/courses`

        const { data } = await axios.get(url, config)


        console.log("Load Courses ", data)

        dispatch({
            type: LOAD_COURSE_LIST,
            payload: data
        })
        dispatch(setAlert('Courses loaded Successfully loaded', 'success'));

    } catch(error){

        dispatch({
            type: COURSE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


        dispatch(setAlert('Sorry unable to load Apps', 'danger'));


    }
}




export const loadLLMAppDetail = (course_url) => async (dispatch, getState) => {
    try{


        const config = {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${userInfo.token}`
            }
        }

        const url = `/api/courses/${course_url}`

        const { data } = await axios.get(url, config)


        console.log("Load Course Detail ", data)

        dispatch({
            type: LOAD_COURSE_DETAIL,
            payload: data
        })

        dispatch(setAlert('Apps loaded Successfully loaded', 'success'));

    } catch(error){

        dispatch({
            type: COURSE_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


        dispatch(setAlert('Sorry unable to load Course', 'danger'));


    }
}





