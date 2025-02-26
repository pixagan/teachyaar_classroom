// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col,  Card, Button, Form } from 'react-bootstrap'
import { createPostReply, deleteQPosts, deleteQPostsReply } from '../../actions/qandaActions'
import DateFormatted from '../utils/DateFormatted'


export const QandaItem = ({channel_id, qanda}) => {


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    const [reply, setReply] = useState('')


    useEffect(() => {
        //getQandA()
    }, [])



    const submitHandler = (e) => {
        e.preventDefault()
        console.log(reply)
        dispatch(createPostReply(reply, channel_id, qanda._id))
    }

    const deletePostReply = (channel_id, qanda_id, reply_id) => {
        dispatch(deleteQPostsReply(channel_id, qanda_id, reply_id))
    }




    return (

        <>
         


                <Card className="card_qanda">

                <Card.Header>

                <Row>
                    <Col>
                        <Card.Text>
                            <DateFormatted date_in={qanda.createdAt} />
                        </Card.Text>
                        
                    </Col>
                    <Col>
                        <Card.Text>
                            {qanda.username}
                        </Card.Text>
                    </Col>

                    {qanda && (qanda.user == userInfo._id || qanda.instructor == userInfo._id)  && (
                        <Col>
                            <Button variant="danger" onClick={()=> dispatch(deleteQPosts(channel_id, qanda._id))}><i className="fas fa-times fa-xs" /></Button>

                        </Col>

                    )}



                </Row>

                </Card.Header>

                    <Card.Body className='h55'>

                        Q : {qanda.questionText}

                    </Card.Body>

                    {/* <h5>Response</h5> */}

                    <Card.Body>

                        <Row>
                            <Col>
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='reply'>
                                    {/* <Form.Label>Reply</Form.Label> */}
                                    <Form.Control type='text' placeholder='Enter Reply' value={reply} onChange={(e) => setReply(e.target.value)}> 
                                    </Form.Control>

                                    <Button className="button_qanda" type='submit' variant='primary'>
                                    Reply
                                    </Button>
                                </Form.Group>
                            </Form>

                            </Col>
                        </Row>



                        {qanda.comments && qanda.comments.map((comment, index) => (

                        //<QandaItem board_id={board_id}  qanda={qanda}/>

                        
                        <Fragment>

                            <Card className='card_qanda_comment'>


                        <Card.Header>

                        <Row>
                            <Col>
                                <Card.Text as="strong" className='h6'>
                                    <strong>{comment.responseText}</strong>
                                </Card.Text>
                                
                            </Col>

                        </Row>
                        </Card.Header>

        
                        <Row>
                            <Col>
                                <Card.Text>
                                    <DateFormatted date_in={comment.createdAt} />
                                </Card.Text>
                                
                            </Col>
                            <Col>
                                <Card.Text>
                                     {comment.username}
                                </Card.Text>
                            </Col>

                            {comment.user == userInfo._id && (
                                <Col>

                                    <span  variant='danger' onClick={()=>deletePostReply(qanda.channel, qanda._id, index)}>
                                        <i className="fas fa-times fa-xs" ></i>
                                        </span>
                                </Col>

                            )}


                            {/* <Col>
                                <Badge onClick={()=> dispatch(deleteQPosts(index))}><i className="fas fa-times fa-xs" /></Badge>

                            </Col> */}

                        </Row>

                      





                            </Card>

                           

                        </Fragment>

                        

                        ))}


                    </Card.Body>





                </Card>  

            

        </>
    )
}


export default QandaItem
