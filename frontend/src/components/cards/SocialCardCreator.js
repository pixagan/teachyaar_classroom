// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React, {useState,  Fragment} from 'react'
import { Form, Button, Row, Col, Card, Tooltip, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../utils/Message'
import Loader from '../utils/Loader'
import { createQPost } from '../../actions/qandaActions'
import {listTYCards, createTYCard} from '../../actions/cardActions'

import { Notebook, Bell, ClipboardList, Video, MessageSquareText } from 'lucide-react';


const SocialCardCreator = ({channel_id, board_id, card_id, updateToggleInteraction} ) => {

    const [question, setQuestion ] = useState('')
    const [message, setMessage] = useState(null)
    const [messagetype, setMessagetype] = useState(null)
    const [messageTo, setMessageTo] = useState(null)
    const [postType, setPostType] = useState(null)

    const [addCardtoggle, setaddCardtoggle ] = useState(true)
    const toggleAddCard = () => {
        setaddCardtoggle(addCardtoggle => !addCardtoggle)
    }

    const selectPostType = (postType_in) => {

        if(postType_in == postType){
            setPostType(null)
        }else{
            setPostType(postType_in)
        }
        
    }


    const addCard = (cardType) => {
        //e.preventDefault()
        dispatch(createTYCard(cardType, channel_id))
        
    }



    const dispatch = useDispatch()

    const loading = false;
    const error = null;


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const autoResizeTextArea = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }



    const submitHandler = (e) => {
        e.preventDefault()

        if(question != null && question != ''){
            dispatch(createQPost(question, "Question", channel_id, card_id, false))
            setQuestion('')
        }

    }


    //Pop overs
    const askDoubtTooltip = (
        <Tooltip id="popover-basic">
            Enter your text above to ask a doubt or interact with your teachers/students
        </Tooltip>
    );

    return (


        <div style={{padding:'10px'}}>
        
        <Row>



            <Col style={{padding:'10px'}}>

                {userInfo && userInfo.isTeacher && (

                <Card style={{border:'None', padding:'10px'}}>
                    <InputGroup>
                    <Button className="button_gen" onClick={()=>selectPostType ('Announcement')}>
                        <Bell color="blue" size={20} />
                        </Button>
                        <Button className="button_gen" onClick={()=>selectPostType ('Notes')}>
                            <Notebook color="blue" size={20} />
                        </Button>
                        <Button className="button_gen" onClick={()=>selectPostType ('Exam')}>
                            <ClipboardList color="blue" size={20} />
                        </Button>
                        <Button className="button_gen" onClick={()=>selectPostType ('Live')}>
                            <Video color="blue" size={20} />
                        </Button>
                        <Button className="button_gen" onClick={()=>updateToggleInteraction()}>
                            <MessageSquareText color="blue" size={20} />
                        </Button>
                    </InputGroup>
                


                </Card>

                )}



            </Col>


            </Row>


        
        
    
            <Card>

                <Card.Header>


                {postType == 'Announcement' && (

                    <>
                    
                        
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='question'>
                        <Form.Control as='textarea' placeholder='Enter Message / Doubt' rows={3} value={question} onChange={(e) => {setQuestion(e.target.value); autoResizeTextArea(e)}} onKeyDown={autoResizeTextArea}> 
                        </Form.Control>
                    </Form.Group>



                    <Row>
                    <Col>

                    {userInfo && userInfo.isTeacher ? (
                        <Fragment>

                        <Form.Group controlId="studentTeacherSelect">
                        <Form.Label>Send To</Form.Label>
                        <Form.Control as="select"  onChange={(e) => setMessagetype(e.target.value)} >
                            <option>Class</option>
                        </Form.Control>
                        </Form.Group>


                        </Fragment>


                    ) : (

                        <Form.Group controlId="studentTeacherSelect">
                        <Form.Label>Send to</Form.Label>
                        <Form.Control as="select"  onChange={(e) => setMessagetype(e.target.value)} >
                            <option>Class</option>
                            <option>Teacher only</option>
                        </Form.Control>
                    </Form.Group>
                    )}

                    </Col>

                    <Col>



                    <br/>
                    <Button className="button_gen" type='submit' variant='primary'>
                        Send
                    </Button>

                    </Col>

                    </Row>


                    </Form>

                                        
                    
                    
                    </>
        

                    
                )}

                {postType == 'Notes' && (
                    <>
                    <p>Post Notes</p>
                    </>
                    
                )}


                {postType == 'Test' && (
                    <>
                    <p>Post a Test</p>
                    </>
                                    
                )}

                {postType == 'Live' && (
                    <>
                    <p>Live Class</p>
                    </>
                                    
                )}

        


                </Card.Header>

            </Card>
        

        </div>
    )
}


export default SocialCardCreator
