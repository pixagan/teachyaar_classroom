// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';

import { userRegisterReducer,  userLoginReducer} from './reducers/userReducers'

import { channelListReducer, channelDetailReducer, selectedChannelReducer } from './reducers/channelReducers'
import { cardListReducer, cardStudynotesReducer, cardLivelectureReducer, cardTakeExamReducer } from './reducers/cardReducers'
import { qandaListReducer, qandaCardListReducer } from './reducers/qandaReducers'


const reducer = combineReducers({
    userRegister:userRegisterReducer,  
    userLogin:userLoginReducer,
    channelList: channelListReducer,
    cardList: cardListReducer,
    qandaList: qandaListReducer,
    qandaCardList: qandaCardListReducer,
    cardStudynotes: cardStudynotesReducer,
    channelDetail: channelDetailReducer,


})

const userInfoItemsFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {

   userState: { userInfo: userInfoItemsFromStorage },

} 

const store = configureStore({reducer:reducer, initialState}); //, devTools);


export default store