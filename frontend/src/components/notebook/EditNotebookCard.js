import React , {useState, useEffect,  Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Card, Button, Form,  OverlayTrigger, Tooltip, InputGroup, ListGroup, Badge } from 'react-bootstrap'

import Moment from 'react-moment';

import CardTitle from './CardTitle'

import CodeItem from './items/CodeItem'
import NoteItem from './items/NoteItem'
import ImageItem from './items/ImageItem'



export const EditNotebookCard = ({card_in}) => {

    const dispatch = useDispatch()



    useEffect(() => {
        


        
    }, [])



    return (

        <Card style={{margin:'10px', padding:'5px', border:'None'}}>
            <Card.Header style={{border:'None', margin:'3px', borderRadius:'10px'}}>

                <CardTitle card_id={card_in._id} title_in={card_in.title} />


                {card_in.type == 'note' && (
                    <>
                        <NoteItem card_in={card_in}/>

                    </>
                )}

                

                {card_in.type == 'image' && (
                    <>
                        <ImageItem item_in={card_in}/>    
                    </>
                )}

                



            </Card.Header>            

        </Card>
    )
}


export default EditNotebookCard
