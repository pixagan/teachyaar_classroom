// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import axios from 'axios';

import {


    QANDA_LIST_REQUEST,
    QANDA_LIST_SUCCESS,
    QANDA_LIST_FAIL,
    QANDA_ADD,
    QANDA_UPDATE,
    QANDA_DELETE,
    QANDA_REPLY,
    QANDA_REPLY_DELETE,
    QANDA_REPLY_DELETE_FAIL,
    QANDA_LIST_CARD,
    QANDACARD_LIST_FAIL,
    QANDA_LIST_CLEAR,
    QANDACARD_LIST_CLEAR


} from '../constants/qandaConstants'




export const qandaListReducer = (state = { qandalist:[] }, action) => {

    switch(action.type){
        case QANDA_LIST_REQUEST:
            return { loading: true, qandalist: state.qandalist }
        case QANDA_LIST_SUCCESS:
            return { loading: false, success: true, qandalist: action.payload }
        case QANDA_ADD:
            return { loading: false, success: true, qandalist:[action.payload, ...state.qandalist] }
        case QANDA_UPDATE:
            return { loading: false, success: true, qandalist: action.payload }
        case QANDA_DELETE:
            return { loading: false, success: true,
                qandalist: state.qandalist.filter(qanda => qanda._id !== action.payload) }
            
        case QANDA_REPLY:
            console.log(action.payload)
            return { 
                loading: false, 
                success: true, 
                //qandalist:[action.payload, ...state.qandalist]
                qandalist: state.qandalist.map(qanda => qanda._id === action.payload._id ? { ...qanda, comments: action.payload.comments } : qanda),
            }
        case QANDA_LIST_FAIL:
            return { loading: false, error: action.payload }
        
        // case QANDABOARD_CREATE_RESET:
        //     return { }

        case QANDA_REPLY_DELETE:
            return{
                loading:false,
                success: true,
                qandalist: state.qandalist.map(qanda => qanda._id === action.payload._id ? { ...qanda, comments: action.payload.comments } : qanda),
            }

        case QANDA_REPLY_DELETE_FAIL:
            return{
                loading:false,
                success: false,
                qandalist: state.qandalist,
            }

        case QANDA_LIST_CLEAR:
            return {  }

        default:
            return state
    }


}


export const qandaCardListReducer = (state = { qandacardlist:[]}, action) => {

    switch(action.type){

        case QANDA_LIST_CARD:
            return { loading: false, success: true, qandacardlist: action.payload }
        case QANDACARD_LIST_FAIL:
            return { loading: false, error: action.payload }
        // case QANDABOARD_CREATE_RESET:
        //     return { }
        case QANDACARD_LIST_CLEAR:
            return {  }
        default:
            return state
    }


}