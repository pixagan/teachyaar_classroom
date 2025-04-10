// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, ListGroup, Form, OverlayTrigger, Tooltip, InputGroup } from 'react-bootstrap'


import QuestionItemTake from '../../components/tests/QuestionItemTake'


import { getMCQById, addQuestion } from '../../actions/mcqActions'

import {useInterval} from '../../hooks/useInterval'
import { useHistory } from 'react-router-dom'

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    deviceDetect
  } from "react-device-detect";

import { useNavigate,  useParams } from 'react-router-dom';



export const TakeTestScreen = ({}) => {
    

    const loading = false;
    const error = null;

    const deviceType = isMobile ? 'Mobile' : 'Desktop';

    const dispatch = useDispatch()
    //const history = useHistory()
    const navigate = useNavigate();

    const { test_id } = useParams();


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    const mcqById = useSelector(state => state.MCQById)
    const { mcq:testDetail } = mcqById

    const mcqQuestions = useSelector(state => state.MCQQuestions)
    const { questions } = mcqQuestions


    // const testDetail = {
    //     _id:1,
    //     title:'Tests 1',
    //     description:'This is a test',
    //     content:'This is the content of the note',
    //     createdAt:'2021-01-01',
    //     updatedAt:'2021-01-01'
    // }

    // const questions = [
    //     {
    //         id:1,
    //         title:'Tests 1 : Question 1',
    //         description:'This is a test',
    //         content:'This is the content of the note',
    //         createdAt:'2021-01-01',
    //         updatedAt:'2021-01-01'
    //     },
    //     {
    //         id:2,
    //         title:'Tests 1 : Question 2',
    //         description:'This is a test',
    //         content:'This is the content of the note',
    //         createdAt:'2021-01-01',
    //         updatedAt:'2021-01-01'
    //     }
    // ]


    const addQuestionRequest = () => {
        console.log('addQuestion')

        dispatch(addQuestion(test_id))

    }


    useEffect(() => {


            dispatch(getMCQById(test_id))



    }, [])



    return (

        <div style={{padding:'10px', margin:'20px', minHeight:'98vh'}}>
          

            <Card style={{marginBottom:'20px'}}>

                <Card.Header>
                    <Card.Title>

                        {testDetail && testDetail.examname && (
                            <p className='h4'>{testDetail.examname}</p>
                        )}

                    </Card.Title>
                </Card.Header>
                
                
            </Card>



            <ListGroup>
                {questions && questions.map((cquestion, cindex)=>(
                    <ListGroup.Item>
                        
                        {/* <p className='h5'>{cquestion.Qtext}</p> */}

                        <QuestionItemTake question={cquestion} mcq_id={test_id} index={cindex+1}/>
                        
                    </ListGroup.Item>
                ))}

            </ListGroup>
           


      

        </div>
    )
}


export default TakeTestScreen
