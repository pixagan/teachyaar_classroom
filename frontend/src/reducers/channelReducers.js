// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import {

    CHANNEL_LIST_REQUEST,
    CHANNEL_LIST_SUCCESS,
    CHANNEL_LIST_FAIL,
    CHANNEL_LIST_ADD,
    CHANNEL_LIST_DELETE,
    CHANNEL_LIST_UPDATE,

    CHANNEL_ADD_SUBSCRIBER,
    CHANNEL_DETAIL,
    CHANNEL_DETAIL_FAIL,

    CHANNEL_UPDATE_RT,

    CHANNEL_SELECT,

    CHANNEL_LIST_CLEAR,
    CHANNEL_DETAIL_CLEAR,
    CHANNEL_SELECT_CLEAR


} from '../constants/channelConstants'




export const channelListReducer = (state = { channels: []}, action) => {

    switch(action.type){
        case CHANNEL_LIST_REQUEST:
            return { loading: true, channels: state.channels }
        case CHANNEL_LIST_SUCCESS:
            return { loading: false, channels: action.payload }
        case CHANNEL_LIST_ADD:
            return { loading: false, channels:[action.payload, ...state.channels] }
        case CHANNEL_LIST_FAIL:
            return { loading: false, error: action.payload, channels:state.channels }
        case CHANNEL_LIST_DELETE:
            console.log('Payload ', action.payload, state.channels)
            return {loading:false, channels: state.channels.filter(channel => channel._id.toString() !== action.payload)}

        case CHANNEL_LIST_CLEAR:
            return { }
        default:
            return state
    }


}




export const channelDetailReducer = (state = { }, action) => {

    switch(action.type){
        case CHANNEL_DETAIL:
            return { loading: false, channel: action.payload }
        case CHANNEL_ADD_SUBSCRIBER:
            return { loading: false, channel: action.payload }
        case CHANNEL_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        case CHANNEL_DETAIL_CLEAR:
            return { }
        default:
            return state
    }


}


export const selectedChannelReducer = (state = {selectedChannel:null}, action) => {

    switch(action.type){
        case CHANNEL_SELECT:
            console.log("Updating selected channel : ", action.payload)
            return { loading: false, selectedChannel: action.payload }
        case CHANNEL_SELECT_CLEAR:
            return { }
        default:
            return state
    }


}
