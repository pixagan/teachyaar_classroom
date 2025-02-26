// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import axios from 'axios';
import {setAlert} from './alertActions';

import {

    CARD_LIST_REQUEST,
    CARD_LIST_SUCCESS,
    CARD_LIST_FAIL,
    CARD_LIST_ADD,
    CARD_LIST_DELETE,
    CARD_ADDTAG,
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

    
    CARD_LIVE_START,
    CARD_LIVE_JOIN,
    CARD_LIVE_LEAVE,
    CARD_LIVE_END,
    CARD_LIVE_ERROR,

    CARD_TAKE_EXAM,
    CARD_TAKE_EXAM_ERROR,

    CARD_ADD_ANNOUNCEMENT,

    


} from '../constants/cardConstants'

import {
    CHANNEL_SELECT
} from '../constants/channelConstants'



//Load cards for a channel all or by keyword
export const listTYCards = (channel_id, keyword='', pageNumber = '') => async (dispatch, getState) => {

    try{
        dispatch({ type: CARD_LIST_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log("---------------------------------------------------------")
        console.log("Channel Select : ", channel_id)

        dispatch({
            type: CHANNEL_SELECT,
            payload: channel_id
        })


        //localStorage.setItem('selectedChannel', JSON.stringify(channel_id))

        const { data } = await axios.get(`/api/tycards/${channel_id}?keyword=${keyword}`, config)

        console.log(data)



        dispatch({
            type: CARD_LIST_SUCCESS,
            payload: data
        })

    }catch (error){

        dispatch({
            type: CARD_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}






//Load cards for a channel all or by keyword
export const updatelistTYCards = (channel_id, keyword='', pageNumber = '') => async (dispatch, getState) => {

    try{
        dispatch({ type: CARD_LIST_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/tycards/${channel_id}?keyword=${keyword}`, config)

        console.log(data)

        dispatch({
            type: CARD_LIST_SUCCESS,
            payload: data
        })

    }catch (error){

        dispatch({
            type: CARD_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}


export const createTYCard = ( cardType, channelselect ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(cardType, channelselect)

        const { data } = await axios.post(`/api/tycards/${channelselect}`,  {cardType}, config)

        dispatch({
            type: CARD_LIST_ADD,
            payload: data
        })



    } catch(error){

        dispatch({
            type: CARD_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}









export const addItemStudyCard = ( channel_id, card_id, itemtype, itemText, notesFile, boardFile ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_ADDITEM_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(card_id, itemText)

        const { data } = await axios.post(`/api/tycards/items/${channel_id}/${card_id}`,  {itemtype, itemText, notesFile, boardFile }, config)

        console.log("Data : ", data)

        dispatch({
            type: CARD_ADDITEM,
            payload: data
        })



    } catch(error){

        dispatch({
            type: CARD_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}






//Load cards for a channel all or by keyword
export const listLectureCardNotes = (channel_id, card_id) => async (dispatch, getState) => {

    try{
        //dispatch({ type: CARD_LIST_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/tycards/notes/${channel_id}/${card_id}`, config)

        console.log(data)

        dispatch({
            type: CARD_LIST_STUDYNOTES,
            payload: data
        })

    }catch (error){

        dispatch({
            type: CARD_STUDYNOTES_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}






export const addLectureCardNotes = ( channel_id, card_id, cardNotesText ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(channel_id, card_id, cardNotesText)

        const { data } = await axios.post(`/api/tycards/notes/${channel_id}/${card_id}`,  {cardNotesText}, config)

        dispatch({
            type: CARD_ADD_STUDYNOTES,
            payload: data
        })



    } catch(error){

        dispatch({
            type: CARD_STUDYNOTES_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}







export const addTagStudyCard = ( card_id, tagC ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_ADDTAG_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(card_id, tagC)

        const { data } = await axios.post(`/api/tycards/tags/${card_id}`,  {tagC}, config)

        dispatch({
            type: CARD_ADDTAG,
            payload: data
        })



    } catch(error){

        dispatch({
            type: CARD_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}





//-----------------------------


export const updateExamCard = ( card_id, examDescription,  numQuestions, maxMarks,  startDate, startTime, DeadlineDate, DeadlineTime ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(card_id)

        const { data } = await axios.post(`/api/tycards/exams/updateCard/${card_id}`,  {examDescription,  numQuestions, maxMarks,  startDate, startTime, DeadlineDate, DeadlineTime}, config)

        dispatch({
            type: CARD_UPDATE_EXAM,
            payload: data
        })



    } catch(error){

        dispatch({
            type: CARD_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}


export const addExamFile = ( card_id, ExamFile ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(card_id, ExamFile)

        const { data } = await axios.post(`/api/tycards/exams/${card_id}`,  {ExamFile}, config)

        dispatch({
            type: CARD_ADD_EXAMQFILE,
            payload: data
        })



    } catch(error){

        dispatch({
            type: CARD_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}






//Load cards for a channel all or by keyword
export const takeExamCard = (channel_id, card_id) => async (dispatch, getState) => {

    try{
        //dispatch({ type: CARD_LIST_REQUEST })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/tycards/exams/${channel_id}/${card_id}`, config)

        console.log(data)

        dispatch({
            type: CARD_TAKE_EXAM,
            payload: data
        })

    }catch (error){

        dispatch({
            type: CARD_TAKE_EXAM_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })

    }

}


//----------------Post --------------------------



export const postCard = ( channel_id, card_id ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_ADDTAG_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(card_id)

        const { data } = await axios.post(`/api/tycards/post/${channel_id}/${card_id}`,  {}, config)

        console.log('post success', data)

        dispatch({
            type: CARD_POST,
            payload: data
        })



    } catch(error){

        console.log('Post error ', error)

        dispatch(setAlert('You havent added a question paper to the Exam', 'danger'));

        dispatch({
            type: CARD_POST_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}





export const deleteCard = (channel_id, card_id) => async (dispatch, getState) => {
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



        await axios.delete(`/api/tycards/${channel_id}/${card_id}`,  config)

        dispatch({
            type: CARD_LIST_DELETE,
            payload: card_id
        })



    } catch(error){

        dispatch({
            type: CARD_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}






export const deleteCardItem = (channel_id, card_id, item_id) => async (dispatch, getState) => {
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


        console.log(" detet item details ", channel_id, card_id, item_id)

        const {data} = await axios.delete(`/api/tycards/items/${channel_id}/${card_id}/${item_id}`, config)

        console.log('data back delete ', data)

        dispatch({
            type: CARD_DELETEITEM,
            payload: data
        })



    } catch(error){

        dispatch({
            type: CARD_DELETEITEM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}



export const editCardItem = (channel_id, card_id, item_id, item_text) => async (dispatch, getState) => {
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



        await axios.post(`/api/tycards/item//${channel_id}/${card_id}/${item_id}`, {item_text} ,config)

        dispatch({
            type: CARD_LIST_DELETE,
            payload: card_id
        })



    } catch(error){

        dispatch({
            type: CARD_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}



//------------------------------------------------------------------------------


//----------------Post --------------------------



export const getLiveCard = ( channel_id ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_ADDTAG_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(channel_id)

        const { data } = await axios.post(`/api/tycards/live/getCard/${channel_id}`,  {}, config)

        dispatch({
            type: CARD_LIVE_START,
            payload: data
        })



    } catch(error){

        dispatch({
            type: CARD_LIVE_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}





export const joinLive = ( channel_id ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_ADDTAG_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log("Chanel id  ", channel_id)

        const { data } = await axios.post(`/api/tycards/live/join/${channel_id}`,  {}, config)

        dispatch({
            type: CARD_LIVE_JOIN,
            payload: data
        })



    } catch(error){

        dispatch({
            type: CARD_LIVE_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}















export const startLive = ( card_id ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_ADDTAG_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(card_id)

        const { data } = await axios.post(`/api/tycards/live/start/${card_id}`,  {}, config)

        dispatch({
            type: CARD_LIVE_START,
            payload: data
        })



    } catch(error){

        dispatch({
            type: CARD_LIVE_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}





export const leaveLive = ( channel_id ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_ADDTAG_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log("Channel live ", channel_id)

        const { data } = await axios.post(`/api/tycards/live/leave/${channel_id}`,  {}, config)

        dispatch({
            type: CARD_LIVE_LEAVE,
            payload: data
        })



    } catch(error){

        dispatch({
            type: CARD_LIVE_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}




export const endLive = ( card_id ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_ADDTAG_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(card_id)

        const { data } = await axios.post(`/api/tycards/live/end/${card_id}`,  {}, config)

        dispatch({
            type: CARD_LIVE_END,
            payload: data
        })



    } catch(error){

        dispatch({
            type: CARD_LIVE_ERROR,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}




//--------------------CARD TAKE EXAM -------------



//--------------Announcement ---------------------


export const addAnnouncementText = ( channel_id, card_id, announcementText ) => async (dispatch, getState) => {
    try{
        // dispatch({
        //     type: STUDYCARD_CREATE_REQUEST
        // })


        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        console.log(channel_id, card_id, announcementText)

        const { data } = await axios.post(`/api/tycards/announcement/${card_id}`,  {announcementText}, config)

        dispatch({
            type: CARD_ADD_ANNOUNCEMENT,
            payload: data
        })



    } catch(error){

        dispatch({
            type: CARD_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })


    }
}









// export const createLectureStudyCard = ( parent, itemText, mode="lecture" ) => async (dispatch, getState) => {
//     try{
//         // dispatch({
//         //     type: STUDYCARD_CREATE_REQUEST
//         // })


//         const { userLogin: { userInfo }} = getState()

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }


//         console.log(parent, itemText)

//         const { data } = await axios.post(`/api/tycards/${parent}`,  {itemText, mode}, config)

//         dispatch({
//             type: CARD_LIST_ADD,
//             payload: data
//         })



//     } catch(error){

//         dispatch({
//             type: CARD_LIST_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message,

//         })


//     }
// }
