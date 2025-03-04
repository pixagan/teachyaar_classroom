import React , {useState, useEffect,  Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Card, Button, Form,  OverlayTrigger, Tooltip, InputGroup, ListGroup, Badge } from 'react-bootstrap'

import Moment from 'react-moment';

import TextItem from './TextItem'
// import TextItemMenu from './TextItemMenu'

import EquationItem from './EquationItem'
import CodeItem from './CodeItem'
import TableItem from './TableItem'

export const NoteItem = ({card_in}) => {

    const dispatch = useDispatch()

    const notebookR = useSelector(state => state.notebookR)
    const { sessionMode } = notebookR


    useEffect(() => {
        
        
    }, [])



    return (

        <>
        
            <ListGroup>
                {card_in.items && card_in.items.map((citem, index)=>(
                    <ListGroup.Item>

                        {citem.type == 'text' && (
                            <TextItem item_in={citem} card_id={card_in._id} item_id={citem._id}/>
                        )}

                        
                        {citem.type == 'equation' && (
                            <EquationItem item_in={citem} card_id={card_in._id} item_id={citem._id}/>
                        )}

                        {citem.type == 'table' && (
                            <TableItem item_in={citem} card_id={card_in._id} item_id={citem._id}/>
                        )}


                        {citem.type == 'code' && (
                            <TextItem item_in={citem} card_id={card_in._id} item_id={citem._id}/>
                        )}

                    
                    </ListGroup.Item>
                ))}

            </ListGroup>


            {/* {sessionMode == 'edit' && (
                <TextItemMenu card_id={card_in._id}/>
            )} */}
            
        
        
        </>

    )
}


export default NoteItem
