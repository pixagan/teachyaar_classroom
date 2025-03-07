
import {



    ADD_CARD,
    CARDS_FAIL,
    CARD_LIST,
    DELETE_CARD,
    UPDATE_CARD_TITLE,

    ADD_CARD_ITEM,
    UPDATE_CARD_ITEM,
    DELETE_CARD_ITEM,
    UPDATE_VIDEO_CARD,

    UPDATE_SESSION_TITLE,
    SESSION_TITLE_FAIL,
    SESSION_VIEW_MODE,

    ADD_QUESTION_TEST,

    CLEAR_CARDS,
    CLEAR_SESSION


} from '../constants/notebookConstants'


import {
    LOAD_NOTEBOOK_LIST,
    NOTEBOOK_LIST_FAIL,
    DELETE_NOTEBOOK,
    ADD_NOTEBOOK,

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

} from '../constants/notebookConstants'




export const notebookListReducer = (state = { notebooks: []}, action) => {

    switch(action.type){
        case LOAD_NOTEBOOK_LIST:
            return { loading: true, notebooks: action.payload }
        

        case ADD_NOTEBOOK:
            return { loading: true, notebooks:[...state.notebooks, action.payload]}

        case NOTEBOOK_LIST_FAIL:
            return { loading: false, error: action.payload, notebooks:state.notebooks }
        
        case DELETE_NOTEBOOK:
            return { loading: true, notebooks:state.notebooks.filter(notebook => notebook._id != action.payload)}
        
        default:
            return state
    }


}




export const notebookReducer = (state = { notebookdetail:{}}, action) => {

    switch(action.type){
        case LOAD_NOTEBOOK_DETAIL:
            return { loading: true, notebookdetail:action.payload}
        

        case UPDATE_NOTEBOOK_TITLE:
            return { loading: true, notebookdetail:action.payload}

        case NOTEBOOK_DETAIL_FAIL:
            return { loading: true, notebookdetail:state.notebookdetail}
        

        default:
            return state
    }

}






export const notebookItemsReducer = (state = { notebookcards: []}, action) => {

    switch(action.type){

        case NOTEBOOK_ITEM_LIST:
            return { loading: true, notebookcards:action.payload}
        
       
        case ADD_NOTEBOOK_ITEM:
            return { loading: true, notebookcards:[...state.notebookcards, action.payload]}
        

        case DELETE_NOTEBOOK_ITEM:
            return { loading: true, notebookcards:state.notebookcards.filter(card => card._id != action.payload)}
        


        case UPDATE_NOTEBOOK_ITEM:
            return { loading: true, 
    
                notebookcards: state.notebookcards.map(card => card.id === action.payload.card_id ? { 
                    ...card, 
                        items:
                        [...card.items.map( item => item._id === action.payload.item_id ?{ ...item, 
                            text:action.payload.text
                        }: item

                        ),
                        ]
                }:card)
            
            }
        case CLEAR_NOTEBOOK_ITEMS:
            return { loading: true, notebookcards:[]}
        


        case NOTEBOOK_ITEM_FAIL:
            return { loading: false, error: action.payload, notebookcards:state.notebookcards }
        default:
            return state
    }

}










export const notebookcardListReducer = (state = { notebookcards: []}, action) => {

    switch(action.type){

        case CARD_LIST:
            return { loading: true, notebookcards:action.payload}
        
       
        case ADD_CARD:
            return { loading: true, notebookcards:[...state.notebookcards, action.payload]}
        

        case DELETE_CARD:
            return { loading: true, notebookcards:state.notebookcards.filter(card => card._id != action.payload)}
        


        case UPDATE_VIDEO_CARD:
            return { loading: true, 
                notebookcards: state.notebookcards.map(card => card._id === action.payload.card_id ? { ...card,url: action.payload.url, description: action.payload.description} : card),
            }
        

        case ADD_CARD_ITEM:
            return { loading: true, notebookcards:state.notebookcards.map(card => card._id === action.payload.card_id ? { ...card, items:[...card.items, action.payload.item]} : card)}
        
        case ADD_QUESTION_TEST:
            return { loading: true, 
                notebookcards: state.notebookcards.map(card => card._id === action.payload.card_id ? { ...card, questions:[...card.questions, action.payload.question]} : card)}



        case UPDATE_CARD_ITEM:
            return { loading: true, 
    
                notebookcards: state.notebookcards.map(card => card.id === action.payload.card_id ? { 
                    ...card, 
                        items:
                        [...card.items.map( item => item._id === action.payload.item_id ?{ ...item, 
                            text:action.payload.text
                        }: item

                        ),
                        ]
                }:card)
            
            }


        case DELETE_CARD_ITEM:
            return { loading: true, 
                notebookcards:state.notebookcards.map(card => card._id === action.payload.card_id ? { ...card, items:card.items.filter(item=>item._id != action.payload.item_id )} : card)
            }
    
        

        case UPDATE_CARD_TITLE:
            return { loading: true, 
                notebookcards: state.notebookcards.map(card => card._id === action.payload._id ? { ...card, title: action.payload.title} : card), 
            }
        


        
        case CLEAR_CARDS:
            return { loading: true, notebookcards:[]}
        


        case CARDS_FAIL:
            return { loading: false, error: action.payload, notebookcards:state.notebookcards }
        default:
            return state
    }

}








// export const sessionRollReducer = (state = { sessionRoll:'single'}, action) => {

//     switch(action.type){
//         case UPDATE_SESSION_TITLE:
//             return { loading: true, title:action.payload, sessionMode:state.sessionMode}
        

//         case SESSION_VIEW_MODE:
//             return { loading: true, title:state.title, sessionMode:action.payload}
        

//         case CLEAR_SESSION:
//             return { loading: true, title:"Title", sessionMode:state.sessionMode}
        


//         case SESSION_TITLE_FAIL:
//             return { loading: false, error: action.payload, title:state.title, sessionMode:state.sessionMode }
        
//         default:
//             return state
//     }

// }





// export const slcardListReducer = (state = { slcards: []}, action) => {

//     switch(action.type){
//         case SLCARD_LIST:
//             return { loading: true, slcards:action.payload}
        
        
//         case SLCARD_LIST_GENERATE:
//             return { loading: false, slcards:[action.payload, ...state.slcards] }
        
        
//         case SLCARD_LIST_FAIL:
//             return { loading: false, error: action.payload, slcards:state.slcards }
        
        
//         case SLCARD_EXAMPLE_GENERATE:
//             return { loading: false,                 
//                 slcards: state.slcards.map(slcard => slcard.hashtag === action.payload.hashtag ? { ...slcard, example:action.payload}:slcard), 
//                 question:state.question,
//                 requestType:state.requestType
//             }
//         case Qs_SUBMIT_ANSWER_SL:
//             return { loading: false,                 
//                 slcards: state.slcards.map(slcard => slcard.id === action.payload.card_id ? { ...slcard, example:{
//                     ...slcard.example, answer:action.payload.submitted, correct:action.payload.correct, isAnswered:true, learn:action.payload.learn}
//                 }:slcard), 
                
//                 question:state.question,
//                 requestType:state.requestType
//             }

//         case SEARCH_DOUBT:
//             return { loading: false, slcards:[action.payload.answer, ...state.slcards], question:action.payload.questions, requestType:action.payload.requestType, practice:action.payload.practice }

      

//         case SLCARD_EXAMPLE_FAIL:
//             return { loading: false, error: action.payload, slcards:state.slcards, question:state.question, requestType:state.requestType }
//         default:
//             return state
//     }

// }

