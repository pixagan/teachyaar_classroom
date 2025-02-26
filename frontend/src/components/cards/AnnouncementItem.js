// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { Row, Col, Card, Button, Form} from 'react-bootstrap'
import Moment from 'react-moment';
//import { canUseDOM } from 'react-helmet'
import { addAnnouncementText } from '../../actions/cardActions'

export const AnnouncementItem = ({card}) => {


    const dispatch = useDispatch()


    const [reply, setReply] = useState('')
    const [itemText, setItemText ] = useState('')


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        //getQandA()
    }, [])




    const submitHandler = (e) => {
        e.preventDefault()
        console.log(itemText)
        dispatch(addAnnouncementText(card.channel, card._id, itemText))
    }




    return (

        <>
            

                <Card>

                    <Card.Body>

                    <Row>
                        <Col>
                            <Card.Text>
                                Created At: <Moment>{card.createdAt}</Moment>
                            </Card.Text>
                            
                        </Col>
                        <Col>
                            <Card.Text>
                                Posted By : {card.username}
                            </Card.Text>
                        </Col>

                        {/* <Col>
                            <Button variant="danger" onClick={()=> dispatch(deleteQPosts(channel_id, qanda._id))}><i className="fas fa-times fa-xs" /></Button>

                        </Col> */}

                    </Row>

                    </Card.Body>



                    <Card.Body as='h5'>



                        {card.user == userInfo._id && (


                        <Form onSubmit={submitHandler}>

                        <Row>
                            <Col md={11}>
                                <Form.Group controlId='itenText'>
                                <Form.Control as="textarea" placeholder='Update Announcement Text' value={itemText} onChange={(e) => setItemText(e.target.value)}> 
                                </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={1}>
                                <Button type='submit' variant='primary'>
                                    <i className="fas fa-plus fa-xs"></i>
                                </Button>
                            </Col>

                        </Row>


                        </Form>

                        )}


                        {card.description}

                    </Card.Body>

                </Card>  

            

        </>
    )
}


export default AnnouncementItem
