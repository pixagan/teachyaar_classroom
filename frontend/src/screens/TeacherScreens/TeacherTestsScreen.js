// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, ListGroup, Form, OverlayTrigger, Tooltip, InputGroup } from 'react-bootstrap'


import {useInterval} from '../../hooks/useInterval'
import { useHistory } from 'react-router-dom'

import {listMCQExams, addCourseMCQ} from '../../actions/mcqActions'

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    deviceDetect
  } from "react-device-detect";

import { useNavigate,  useParams } from 'react-router-dom';



export const TeacherTestsScreen = ({}) => {
    

    const loading = false;
    const error = null;

    const deviceType = isMobile ? 'Mobile' : 'Desktop';

    const dispatch = useDispatch()
    //const history = useHistory()
    const navigate = useNavigate();


    const { course_id } = useParams();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const channelDetail = useSelector(state => state.channelDetail)
    const { loading:loadingCS, error:errorCS, channel:channelCS } = channelDetail

    const mcqList = useSelector(state => state.mcqList)
    const { mcqs:tests } = mcqList

    const [testTitle, setTestTitle] = useState('')


    // const tests = [{
    //     _id:1,
    //     title:'Tests 1',
    //     description:'This is a test',
    //     content:'This is the content of the note',
    //     createdAt:'2021-01-01',
    //     updatedAt:'2021-01-01'
    // }]


    const navigateToTestCreator = (test_id) => {
        navigate(`/teacher/test/${test_id}`)
    }


    const addTestRequest = () => {
        console.log('addTestRequest')
        dispatch(addCourseMCQ(course_id,testTitle))
    }

    useEffect(() => {


            dispatch(listMCQExams(course_id))



    }, [])



    return (

        <div style={{padding:'10px', margin:'20px', minHeight:'98vh'}}>
          

            <h1>Tests</h1>


            <InputGroup>
            <Form.Group controlId='channelName' style={{width:'80%'}}>
                <Form.Control type='text' placeholder='Test Title' value={testTitle} onChange={(e) => setTestTitle(e.target.value)}> 
                </Form.Control>
             </Form.Group>

            <Button className='button_gen' style={{marginBottom:'20px'}} onClick={()=>addTestRequest()}>Add Test</Button>

            </InputGroup>

            {tests && tests.map((ctest, cindex)=>(
                <Card onClick={()=>navigateToTestCreator(ctest._id)}>
                    <Card.Header>
                        <Card.Title>

                            {ctest.examname && (
                                <p className='h4'>{ctest.examname}</p>
                            )}
                    

                        </Card.Title>

                    </Card.Header>
                    {/* <Card.Body>

                        <p className='h5'>{'Test Topic'}</p>

                        <p className='h5'>{'N Questions : 10'}</p>

                    </Card.Body> */}


                </Card>
            ))}


      

        </div>
    )
}


export default TeacherTestsScreen
