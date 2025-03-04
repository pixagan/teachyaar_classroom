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



export const cardListReducer = (state = { cards: []}, action) => {

    switch(action.type){

        case CARD_LIST:
            return { loading: true, cards:action.payload}
        
       
        case ADD_CARD:
            return { loading: true, cards:[...state.cards, action.payload]}
        

        case DELETE_CARD:
            return { loading: true, cards:state.cards.filter(card => card._id != action.payload)}
        


        case UPDATE_VIDEO_CARD:
            return { loading: true, 
                cards: state.cards.map(card => card._id === action.payload.card_id ? { ...card,url: action.payload.url, description: action.payload.description} : card),
            }
        

        case ADD_CARD_ITEM:
            return { loading: true, cards:state.cards.map(card => card._id === action.payload.card_id ? { ...card, items:[...card.items, action.payload.item]} : card)}
        
        case ADD_QUESTION_TEST:
            return { loading: true, 
                cards: state.cards.map(card => card._id === action.payload.card_id ? { ...card, questions:[...card.questions, action.payload.question]} : card)}



        case UPDATE_CARD_ITEM:
            return { loading: true, 
    
                cards: state.cards.map(card => card.id === action.payload.card_id ? { 
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
                cards:state.cards.map(card => card._id === action.payload.card_id ? { ...card, items:card.items.filter(item=>item._id != action.payload.item_id )} : card)
            }
    
        

        case UPDATE_CARD_TITLE:
            return { loading: true, 
                cards: state.cards.map(card => card._id === action.payload._id ? { ...card, title: action.payload.title} : card), 
            }
        


        
        case CLEAR_CARDS:
            return { loading: true, cards:[]}
        


        case CARDS_FAIL:
            return { loading: false, error: action.payload, cards:state.cards }
        default:
            return state
    }

}




export const notebookReducer = (state = { title: "Title", sessionMode:'edit'}, action) => {

    switch(action.type){
        case UPDATE_SESSION_TITLE:
            return { loading: true, title:action.payload, sessionMode:state.sessionMode}
        

        case SESSION_VIEW_MODE:
            return { loading: true, title:state.title, sessionMode:action.payload}
        

        case CLEAR_SESSION:
            return { loading: true, title:"Title", sessionMode:state.sessionMode}
        


        case SESSION_TITLE_FAIL:
            return { loading: false, error: action.payload, title:state.title, sessionMode:state.sessionMode }
        
        default:
            return state
    }

}






export const sessionRollReducer = (state = { sessionRoll:'single'}, action) => {

    switch(action.type){
        case UPDATE_SESSION_TITLE:
            return { loading: true, title:action.payload, sessionMode:state.sessionMode}
        

        case SESSION_VIEW_MODE:
            return { loading: true, title:state.title, sessionMode:action.payload}
        

        case CLEAR_SESSION:
            return { loading: true, title:"Title", sessionMode:state.sessionMode}
        


        case SESSION_TITLE_FAIL:
            return { loading: false, error: action.payload, title:state.title, sessionMode:state.sessionMode }
        
        default:
            return state
    }

}





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

