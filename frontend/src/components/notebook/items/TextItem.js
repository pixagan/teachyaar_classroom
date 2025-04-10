import React , {useState, useEffect,  Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Card, Button, Form,  OverlayTrigger, Tooltip, InputGroup, ListGroup, Badge } from 'react-bootstrap'

import Moment from 'react-moment';

import {updateCardItem} from '../../../actions/notebookActions'

export const TextItem = ({item_in, item_id}) => {

    const dispatch = useDispatch()

    

    const [text, setText] = useState('')

    const [viewMode, setViewMode] = useState('view')
    const toggleViewMode = () => {

        console.log("View toggle", viewMode)

        if(viewMode == 'view'){
            setViewMode('edit')
            setText(item_in.text)
        }else{
            setViewMode('view')
        }
    }

    const deleteItem = () => {

    }


    useEffect(() => {
        
        setText(item_in.text)
    }, [])

    const updateTextItem = () => {

        setViewMode('view')
        var newItem = item_in
        newItem.text = text
        //updateCardItem(item_id, newItem)

    }


    return (

        <>

            {viewMode == 'view' ? (

                <>
                    <p className='h5'>{item_in.text}</p>

                    
                
                </>
                

            ): (

                <>
                {viewMode == 'edit' && (
                    <InputGroup>
                    <Form.Control type='text' placeholder='text' value={text} onChange={(e) => setText(e.target.value)} style={{backgroundColor:'white'}}> 
                    </Form.Control>
                    <Badge>
                        <i className="fas fa-check" onClick={()=>updateTextItem()}></i>
                    </Badge>
                </InputGroup>
                    )}

                </>
                
            )}

                {viewMode == 'edit' && (
                    <span>
                    <Badge style={{padding:'5px'}} onClick={()=>toggleViewMode()}><i className="fas fa-edit" ></i></Badge>
                    <Badge style={{padding:'5px'}} onClick={()=>deleteItem()}><i className="fas fa-trash" ></i></Badge>
                </span>
                )}
            
                

        </>

    )
}


export default TextItem
