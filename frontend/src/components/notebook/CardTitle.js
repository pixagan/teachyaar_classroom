import React , {useState, useEffect,  Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Card, Button, Form,  OverlayTrigger, Tooltip, InputGroup, ListGroup, Badge } from 'react-bootstrap'

import Moment from 'react-moment';
import DateFormatted from '../utils/DateFormatted'

import {updateCardTitle, deleteCard} from '../../actions/notebookActions'


import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    deviceDetect
  } from "react-device-detect";

export const CardTitle = ({card_id, title_in}) => {

    const dispatch = useDispatch()

    const notebookR = useSelector(state => state.notebookR)
    const { sessionMode } = notebookR

    
    const [newTitle, setNewTitle] = useState("")


    const [viewMode, setViewMode] = useState("view")
    const toggleViewMode = () => {
        if(viewMode == 'view'){
            setViewMode('edit')
        }else{
            setViewMode('view')
        }
        
    }

    const onUpdateTitle = () => {

        dispatch(updateCardTitle(card_id, newTitle))
        setViewMode("view")
    }

    const onDeleteCard = () => {
        dispatch(deleteCard(card_id))
    }



    useEffect(() => {
        
        setNewTitle(title_in)

        
    }, [])




    return (

        <>

        {isMobile ? (
            <>

                <p style={{padding:'5px', marginBottom:'5px', backgroundColor:'#89de6f', color:'white', borderRadius:'5px'}}>
                            
                            {viewMode == 'view' ? (
                                <span className='h5' style={{color:'white'}}>
                                    <span>{newTitle} </span>
                                    {sessionMode == 'edit' && (
                                        <>
                                        <span>|<i className="fas fa-edit" onClick={()=>toggleViewMode()}></i></span>
                                        <span>|<i className="fas fa-trash" onClick={()=>onDeleteCard()}></i></span>
                                        </>
                                        
                                    )}
                                    
                                    </span>
                            ):
                            (
                                <>
                                {sessionMode == 'edit' && (
                                        <InputGroup>
                                        <Form.Control type='text' placeholder='Title' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{backgroundColor:'white'}}> 
                                        </Form.Control>
                                        <Badge>
                                        <i className="fas fa-check" onClick={()=>onUpdateTitle()}></i>
                                        </Badge>
                                        </InputGroup>
                                )}
                                
                                
                                </>
                                
                            )}
                        </p>

            </>
        ): (
            <>

                <Badge style={{padding:'5px', marginBottom:'5px', backgroundColor:'#89de6f', color:'white', borderRadius:'5px'}}>
                            
                            {viewMode == 'view' ? (
                                <span className='h5' style={{color:'white'}}>
                                    <span>{newTitle} </span>
                                    {sessionMode == 'edit' && (
                                        <>
                                        <span>|<i className="fas fa-edit" onClick={()=>toggleViewMode()}></i></span>
                                        <span>|<i className="fas fa-trash" onClick={()=>onDeleteCard()}></i></span>
                                        </>
                                        
                                    )}
                                    
                                    </span>
                            ):
                            (
                                <>
                                {sessionMode == 'edit' && (
                                        <InputGroup>
                                        <Form.Control type='text' placeholder='Title' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{backgroundColor:'white'}}> 
                                        </Form.Control>
                                        <Badge>
                                        <i className="fas fa-check" onClick={()=>onUpdateTitle()}></i>
                                        </Badge>
                                        </InputGroup>
                                )}
                                
                                
                                </>
                                
                            )}
                        </Badge>


            </>
        )}
        
       
        
        </>

       


   
    )
}


export default CardTitle
