// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React, {useState,  Fragment} from 'react'
import { Form, Button, Row, Col, Card, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../utils/Message'
import Loader from '../utils/Loader'
import { createQPost } from '../../actions/qandaActions'

const QandaForm = ({channel_id, board_id, card_id} ) => {



    const [question, setQuestion ] = useState('')
    const [message, setMessage] = useState(null)
    const [messagetype, setMessagetype] = useState(null)
    const [messageTo, setMessageTo] = useState(null)

    const dispatch = useDispatch()

    const loading = false;
    const error = null;


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin





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

        <Fragment>
            <Card>


                {message && <Message variant='danger'>{message}</Message> }
                {error && <Message variant='danger'>{error}</Message> }
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='question'>
                        {/* <Form.Label>Question</Form.Label> */}
                        <Form.Control type='text' placeholder='Enter Message / Doubt' value={question} onChange={(e) => setQuestion(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>



                    <Row>
                    <Col>

                    {userInfo && userInfo.isTeacher ? (
                        // <Button>To Student Only</Button>

                        <Fragment>

                        <Form.Group controlId="studentTeacherSelect">
                        <Form.Label>Send To</Form.Label>
                        <Form.Control as="select"  onChange={(e) => setMessagetype(e.target.value)} >
                            <option>Class</option>
                            {/* <option>Student only</option> */}
                        </Form.Control>
                        </Form.Group>


                        </Fragment>


                    ) : (
                        // <Button>To Instructor Only</Button>

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

            </Card>
        </Fragment>


    )
}


export default QandaForm
