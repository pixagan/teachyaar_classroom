import React , {useState, useEffect,  Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Card, Button, Form,  OverlayTrigger, Tooltip, InputGroup, ListGroup, Badge } from 'react-bootstrap'

import Moment from 'react-moment';

import TextItem from './TextItem'
// import TextItemMenu from './TextItemMenu'

import EquationItem from './EquationItem'
import CodeItem from './CodeItem'
import TableItem from './TableItem'

import { Pencil, LetterText, Check, SquareFunction, SquareSigma, Code, Table } from 'lucide-react';


// import CreateTextItem from './CreateTextItem'

export const NoteItem = ({citem}) => {

    const dispatch = useDispatch()




    useEffect(() => {
        
        
    }, [])



    return (

        <>
        
            {/* <ListGroup>
                {card_in.items && card_in.items.map((citem, index)=>(
                    <ListGroup.Item> */}

                        {citem.itemType == 'text' && (
                            <TextItem item_in={citem.item} item_id={citem._id}/>
                        )}

                        
                        {/* {citem.itemType == 'equation' && (
                            <EquationItem item_in={citem.item} item_id={citem._id}/>
                        )}

                        {citem.itemType == 'table' && (
                            <TableItem item_in={citem.item} item_id={citem._id}/>
                        )}


                        {citem.itemType == 'code' && (
                            <TextItem item_in={citem.item} item_id={citem._id}/>
                        )} */}

{/*                     
                    </ListGroup.Item>
                ))}

            </ListGroup> */}

            <Pencil size={15} color="blue"/>



            {/* <CreateTextItem card_id={card_in._id}/> */}
     
            
        
        
        </>

    )
}


export default NoteItem
