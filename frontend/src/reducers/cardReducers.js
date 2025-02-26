// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import {

    CARD_LIST_REQUEST,
    CARD_LIST_SUCCESS,
    CARD_LIST_FAIL,
    CARD_LIST_ADD,
    CARD_LIST_DELETE,
    CARD_LIST_UPDATE,
    CARD_ADDTAG,
    CARD_DELETETAG,
    CARD_ADDITEM,
    CARD_DELETEITEM,
    CARD_DELETEITEM_FAIL,

    CARD_LIST_STUDYNOTES,
    CARD_ADD_STUDYNOTES,
    CARD_STUDYNOTES_FAIL,

    CARD_ADD_EXAMQFILE,
    CARD_UPDATE_EXAM,
    CARD_POST,
    CARD_POST_ERROR,

    CARD_UPDATE_RT,

    CARD_LIVE_START,
    CARD_LIVE_JOIN,
    CARD_LIVE_LEAVE,
    CARD_LIVE_END,
    CARD_LIVE_ERROR,

    CARD_TAKE_EXAM,
    CARD_TAKE_EXAM_ERROR,

    CARD_ADD_ANNOUNCEMENT,

    CARD_LIST_CLEAR,
    CARD_STUDYNOTES_CLEAR,
    CARD_LIVE_CLEAR,
    CARD_TAKE_EXAM_CLEAR



} from '../constants/cardConstants'



export const cardListReducer = (state = { scards: []}, action) => {

    switch(action.type){

        case CARD_LIST_REQUEST:
            return { loading: true, scards: [] }

        case CARD_LIST_FAIL:
            return { loading: false, scards: state.scards, error: action.payload }

        case CARD_LIST_SUCCESS:
            return { loading: false, scards: action.payload }


        case CARD_LIST_ADD:
            return { 
                loading: false, 
                scards: [action.payload, ...state.scards], 
            }

        case CARD_LIST_DELETE:
            return { 
                loading: false, 
                scards: state.scards.filter(card => card._id !== action.payload),
            }

        case CARD_LIST_UPDATE:
            return { 
                loading: false, 
                scards: state.scards.map(card => card._id === action.payload._id ? { ...card, name: action.payload.name, description: action.payload.description} : card), 
            }

        case CARD_ADDTAG:
            return { 
                loading: false, 
                scards: state.scards.map(card => card._id === action.payload._id ? { ...card, tags: action.payload.tags} : card), 
            }

        case CARD_ADDITEM:
            return { 
                loading: false, 
                scards: state.scards.map(card => card._id === action.payload._id ? { ...card, items: action.payload.items} : card), 
            }


        case CARD_DELETEITEM:
            console.log("payload in ", action.payload)
            return { 
                loading: false, 
                scards: state.scards.map(card => card._id === action.payload._id ? { ...card, items: action.payload.items} : card), 
            }


        case CARD_ADD_EXAMQFILE:
            return { 
                loading: false, 
                scards: state.scards.map(card => card._id === action.payload._id ? { ...card, exam: action.payload.exam} : card), 
            }

        case CARD_UPDATE_EXAM:
            return { 
                loading: false, 
                scards: state.scards.map(card => card._id === action.payload._id ? { ...card, exam: action.payload.exam} : card), 
            }

        case CARD_ADD_ANNOUNCEMENT:
            return { 
                loading: false, 
                scards: state.scards.map(card => card._id === action.payload._id ? { ...card, description: action.payload.description} : card), 
            }

        case CARD_DELETEITEM_FAIL:
            return{
                loading: false, 
                scards: state.scards
            }
        case CARD_LIST_CLEAR:
            return{
                scards: []
            }
        case CARD_POST:
            return{
                loading: false,
                scards: state.scards.map(card => card._id === action.payload._id ? { ...card, isPost: action.payload.isPost} : card), 
            }
        case CARD_POST_ERROR:
            return{
                loading:false,
                scards: state.scards
            }


        // case CARD_UPDATE_RT:

            

        //     return { 
        //         loading: false, 
        //         scards: state.scards.map(
        //             card => card._id === action.payload._id ? 
        //             { ...card, name: action.payload.name, description: action.payload.description}
        //              : card), 
        //     }



        // case CARD_DELETETAG:
        //     return { 
        //         loading: false, 
        //         scards: state.scards.map(card => card._id === action.payload._id ? { ...card, name: action.payload.name, description: action.payload.description} : card), 
        //     }

        // case CARD_ADDITEM:
        //     return { 
        //         loading: false, 
        //         scards: state.scards.map(card => card._id === action.payload._id ? { ...card, name: action.payload.name, description: action.payload.description} : card), 
        //     }


        // case CARD_DELETEITEM:
        //     return { 
        //         loading: false, 
        //         scards: state.scards.map(card => card._id === action.payload._id ? { ...card, name: action.payload.name, description: action.payload.description} : card), 
        //     }

        
        default:
            return state
    }


}



export const cardStudynotesReducer = (state = { }, action) => {

    switch(action.type){

        case CARD_LIST_STUDYNOTES:
            return { loading: false, success: true, studynote: action.payload }

        case CARD_ADD_STUDYNOTES:
            return { loading: false, success: true, studynote: action.payload }

        case CARD_STUDYNOTES_FAIL:
            return { loading: false, error: action.payload }

        case CARD_STUDYNOTES_CLEAR:
            return {  }


        default:
            return state
    }

}


export const cardLivelectureReducer = (state = {livelecture:null }, action) => {

    switch(action.type){

        case CARD_LIVE_START:
            return { loading: false, success: true, livelecture: action.payload }

        case CARD_LIVE_JOIN:
            return { loading: false, success: true, livelecture: action.payload }

        case CARD_LIVE_LEAVE:
            return { loading: false, success: true, livelecture: null }

        case CARD_LIVE_END:
            return { loading: false, success: true, livelecture: null }

        case CARD_LIVE_ERROR:
            return { loading: false, error: action.payload }

        case CARD_LIVE_CLEAR:
            return {  }

        default:
            return state
    }

}



export const cardTakeExamReducer = (state = {exampaper:null}, action) => {

    switch(action.type){

        case CARD_TAKE_EXAM:
            return { loading: false, success: true, exampaper: action.payload }

        case CARD_TAKE_EXAM_ERROR:
            return { loading: false, error: action.payload }

        case CARD_TAKE_EXAM_CLEAR:
            return { }

        default:
            return state
    }

}