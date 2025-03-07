import React , {useState, useEffect,  Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Card, Button, Form,  OverlayTrigger, Tooltip, InputGroup, ListGroup, Badge } from 'react-bootstrap'

import Moment from 'react-moment';


import {updateNotebookTitle} from '../../actions/notebookActions'


export const NotebookPageTitle = ({index, slcard}) => {

    const dispatch = useDispatch()

    const notebookR = useSelector(state => state.notebookR)
    const { notebookdetail } = notebookR

    


    const [newTitle, setNewTitle] = useState("")


    const [viewMode, setViewMode] = useState("view")
    const toggleViewMode = () => {
        if(viewMode == 'view'){
            setNewTitle(notebookdetail.title)
            setViewMode('edit')
        }else{
            setViewMode('view')
        }
        
    }

    const onUpdateTitle = () => {

        const notebook_id = 1
        dispatch(updateNotebookTitle(notebook_id, newTitle))
        //setViewMode("view")
    }


    useEffect(() => {
        


        
    }, [])




    return (

        <Card style={{borderRadius:'20px'}}>
            <Card.Header style={{borderRadius:'20px'}}>
                
                {viewMode == 'view' ? (
                    <p className='h4' style={{textAlign:'center'}}>
                        <span>{notebookdetail.title} </span>
                  
                            <span>|<i className="fas fa-edit" onClick={()=>toggleViewMode()}></i></span>
               
                        
                        </p>

                ): (
                    <>
                    {viewMode == 'edit' && (
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
                
                


            </Card.Header>
        </Card>
    )
}


export default NotebookPageTitle
