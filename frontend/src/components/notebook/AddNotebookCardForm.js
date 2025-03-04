import React , {useState, useEffect,  Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Card, Button, Form,  OverlayTrigger, Tooltip, InputGroup, ListGroup, Badge } from 'react-bootstrap'

import Moment from 'react-moment';
import DateFormatted from '../utils/DateFormatted'
import { v4 as uuidv4 } from 'uuid';

import {addCard} from '../../actions/notebookActions'


export const AddNotebookCardForm = ({index, slcard}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        

    }, [])


    const addCardRequest = (cardType) => {

        if(cardType == 'note'){

            var newCard = {
                "_id":uuidv4().toString(),
                "type":cardType,
                "title":"",
                "items":[],
                "references":[]
            }
    
            dispatch(addCard(newCard))

            //sessionStorage.setItem("bnrows", JSON.stringify(nrowsl));


        }


        if(cardType == 'example'){

            var newCard = {
                "_id":uuidv4().toString(),
                "type":cardType,
                "title":"",
                "items":[],
                "question":[],
                "answer":[],
                "explanation":[],
                "references":[]
            }

            dispatch(addCard(newCard))

        }

        
        if(cardType == 'test'){

            var newCard = {
                "_id":uuidv4().toString(),
                "type":cardType,
                "title":"",
                "questions":[],
                "references":[],
                "items":[]
            }

            dispatch(addCard(newCard))

        }


        if(cardType == 'video'){

            var newCard = {
                "_id":uuidv4().toString(),
                "type":cardType,
                "title":"",
                "description":[],
                "url":"",
                "source":'youtube'
            }

            dispatch(addCard(newCard))


        }

        

    }



    return (

        <Card style={{margin:'10px', padding:'5px', border:'None'}}>
            <Card.Header style={{border:'None', margin:'3px', borderRadius:'20px'}}>

                <InputGroup>
                
                    <Button style={{backgroundColor:'#c2179a', paddingTop:'2px', paddingBottom:'2px'}} onClick={()=>addCardRequest('note')}>Note</Button>
                    {/* <Button style={{backgroundColor:'#c2179a', paddingTop:'2px', paddingBottom:'2px'}} onClick={()=>addCardRequest('example')}>Example</Button> */}
                    <Button style={{backgroundColor:'#c2179a', paddingTop:'2px', paddingBottom:'2px'}} onClick={()=>addCardRequest('test')}>Test</Button>
                    <Button style={{backgroundColor:'#c2179a', paddingTop:'2px', paddingBottom:'2px'}} onClick={()=>addCardRequest('video')}>Video</Button>
                    {/* <Button>Slide</Button>
                    <Button>Canvas</Button> */}
                
                </InputGroup>

            </Card.Header>            

        </Card>
    )
}


export default AddNotebookCardForm
