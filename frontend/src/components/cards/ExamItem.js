// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col,  Card, Button, Form, Table } from 'react-bootstrap'
import axios from 'axios'

//import { addItemStudyCard, addTagStudyCard, deleteItemStudyCard, deleteTagStudyCard, deleteStudyCard } from '../actions/studycardActions'
import Moment from 'react-moment';
import { addExamFile, updateExamCard, deleteCardItem } from '../../actions/cardActions'
import { listAllStudentExam } from '../../actions/examActions'
import DateFormatted from '../utils/DateFormatted'

import  DownloadPdfFile from '../utils//DownloadPdfFile'
import  ViewPdf2 from '../utils/ViewPdf2'

import {setAlert} from '../../actions/alertActions';



import {
    CARD_ADD_EXAMQFILE,
} from '../../constants/cardConstants'



export const ExamItem = ({channel_id, card, cardedit}) => {

    const dispatch = useDispatch()


    const [examDescription, setExamDescription ] = useState('')
    const [numQuestions, setNumQuestions ] = useState(0)
    const [maxMarks, setMaxMarks ] = useState(0)

    const [startDate, setStartDate ] = useState('')
    const [startTime, setStartTime ] = useState('')

    const [DeadlineDate, setDeadlineDate ] = useState('')
    const [DeadlineTime, setDeadlineTime ] = useState('')

    const [cardEditloc, setCardEditloc] = useState('')
    const togglecardEditloc = () => {
        setCardEditloc(cardEditloc => !cardEditloc)
    }

    const card_id = card._id

    //var submissions = []



    const [addFiletoggle, setaddFiletoggle ] = useState(false)
    const toggleAddFile = () => {
        setaddFiletoggle(addFiletoggle => !addFiletoggle)
    }

    const [addSubmissiontoggle, setaddSubmissiontoggle ] = useState(false)
    const toggleAddSubmission = () => {

        if(userInfo.isTeacher) {
        setaddSubmissiontoggle(addSubmissiontoggle => !addSubmissiontoggle)
        //getStudentSubmissions()

        if(!addSubmissiontoggle){
            dispatch(listAllStudentExam(card.channel, card._id))
        }

        }
    }


    const [gradeExamtoggle, setGradeExamtoggle ] = useState(false)
    const toggleGradeExam = () => {
        setGradeExamtoggle(gradeExamtoggle => !gradeExamtoggle)
    }



    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const studentexamList = useSelector(state => state.studentexamList);
    const { loading:loadingSE, error:errorSE, submissions, channelSubmission, cardSubmission} = studentexamList;



    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${userInfo.token}`
    //     }
    // }


    // const getStudentSubmissions = async() =>{

    //     console.log("channel : ",channel_id)
    //     console.log("card : ",card_id)
    //     const { data } = await axios.get(`/api/exams/all/${card.channel}/${card_id}`, config)

    //     console.log(data)

    //     submissions = data

    // }



    useEffect(() => {
        //getQandA()

        // {card && card.exam && (
        //     dispatch(listExam(card.exam.examid))
        // )}

        
    }, [])




    const submitFileHandler = (e) => {
        e.preventDefault()
        //console.log(reply)
        dispatch(addExamFile(card_id, ExamFile))
    }






    const updateExamCardLocal = (e) => {
        e.preventDefault()
        dispatch(updateExamCard(card_id, examDescription,  numQuestions, maxMarks,  startDate, startTime, DeadlineDate, DeadlineTime ))
    }



    const [uploading, setUploading] = useState(false)
    const [ExamFile, setExamFile] = useState('')

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]

        var filetype = null;

        //if file is pdf
        if(file.type === 'application/pdf'){
            filetype = 'pdf'
        }

        if(filetype == 'pdf'){

            if(file.size<=5242880){

                const formData = new FormData()
                formData.append('pdf', file)
                setUploading(true)
        
                try{
                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${userInfo.token}`
        
                        }
                    }

                    console.log('card ', card, card._id, card.channel)
        
                    const { data } = await axios.post(`/api/uploads/qpaper/${card.channel}/${card._id}`, formData, config)
        

                    dispatch({
                        type: CARD_ADD_EXAMQFILE,
                        payload: data
                    })

                    setExamFile(data)
        
                    setUploading(false)
                }catch(error){
                    console.error(error)
                    setUploading(false)
                }


            }else{
                            
                dispatch(setAlert('File is too large, we currently only allow a maximum file size of 5MB, you can store the file on google drive or dropbox and share a link here', 'danger'));

            }


        }else{
            
            dispatch(setAlert('Invalid file type: Use a Pdf file', 'danger'));


        }


    }







    return (

        <>


                <Card>


                    <Card.Body>

                    <br />

                    {userInfo.isTeacher ? (
                        <Fragment>

                            <Row>
                                <Col>
                                {card.exam && (!card.exam.questionpaperfile || ( card.exam.questionpaperfile && !card.exam.questionpaperfile.filename  ) ) && (
                                    <p className='h6'> Question paper is not uploaded </p>
                                )}
                                </Col>
                            </Row>

                        <Row>
                            <Col>
                                {/* <Button>
                                    Questions
                                </Button> */}



                                <Button className="button_gen" onClick={togglecardEditloc}>
                                    Edit
                                </Button>

                                <Button className="button_gen" onClick={toggleAddFile}>
                                    Question Paper
                                </Button>

                                <Button className="button_gen" onClick={toggleAddSubmission}>
                                    Submissions
                                </Button>

                                {/* <Button onClick={()=> dispatch(downloadExampaper(card_id))}>
                                    Downloads
                                </Button> */}

                                {/* {card.exam.questionpaperfile && (
                                    <Link to={`/studentexam/${card.channel}/${card._id}`}>
                                    <Button className="button_gen">
                                        View
                                    </Button>
                                    </Link>

                                )} */}



                            </Col>
                        </Row>

                        </Fragment>
                    ):(
                        <Fragment>

                            {card.exam && card.exam.questionpaperfile && card.exam.questionpaperfile.filename && (

                                <Row>
                                <Col>
                                    <Link to={`/studentexam/${card.channel}/${card._id}`}>
                                    <Button className="button_gen">
                                        Take Exam
                                    </Button>
                                    </Link>

                                    {/* <Button>
                                        View Submission
                                    </Button> */}

                                    {/* <Button onClick={toggleAddSubmission}>
                                        Download
                                    </Button> */}
                                </Col>
                                </Row>


                            )}

                                {card.exam && (!card.exam.questionpaperfile || ( card.exam.questionpaperfile && !card.exam.questionpaperfile.filename  ) ) && (
                                    <p className='h6'> Question paper is not uploaded </p>
                                )}

                        </Fragment>

                        )}



                    {/* <Row>
                        <Col>
                            <p>Exam Name</p>
                        </Col>
                    </Row> */}



                    {userInfo.isTeacher && addFiletoggle && (

                        <Fragment>

                        <br />

                        {card.exam.questionpaperfile && (
                            <div>
                            {/* Question Paper : {card.exam.questionpaperfile.filename} || <i class="fas fa-file-pdf fa-2x"></i> */}

                            {/* < DownloadPdfFile card={card} fileInfo={card.exam.questionpaperfile}/> */}

                            < ViewPdf2 card={card}  fileInfo={card.exam.questionpaperfile}/>




                            {/* <Button onClick={()=> dispatch(downloadExampaper(card_id))}><i className="fas fa-download fa-xs"></i></Button> */}
                            </div>
                             
                        )}

                        <br />

                        {/* <Form onSubmit={submitFileHandler}> */}
                        <Form onSubmit={submitFileHandler}>

                        {/* <Form.Group controlId='image'>

                            <Form.File id='exam-file' label={ExamFile} custom onChange={uploadFileHandler}></Form.File>
                            <Form.Label>Add Question Paper File</Form.Label>

                            {uploading && <Loader />}
                        </Form.Group> */}


                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Add Question Paper File</Form.Label>
                            <Form.Control type="file" onChange={uploadFileHandler}/>
                        </Form.Group>

                        {/* <Button className="button_gen" type='submit' variant='primary'>
                            Submit
                        </Button> */}

                        </Form>


                        </Fragment>


                    )}


                    {userInfo.isTeacher && addSubmissiontoggle &&  cardSubmission==card._id  && (
                        // <ExamSubmissionItem channel_id={channel_id} card_id={card_id}/>


                            <Card>

                            <Card.Body>

                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th> Student</th>
                                        <th> Exam Start</th>
                                        <th> Exam Submission</th>
                                        <th> Marks</th>
                                        {/* <th> Grade</th> */}
                                        <th>Actions</th>
                                    </tr>
                                </thead>


                                <tbody>

                                    {submissions && submissions.map((submission, index) => (

                                        
                                    <tr key={index}>
                                        <td>{submission.studentname}</td>
                                        <td><DateFormatted date_in={submission.startTime}/></td>
                                        <td><DateFormatted date_in = {submission.submissionTime}/></td>
                                        <td>{submission.isGraded ? submission.totalMarks : "Not Graded"}</td>
                                        {/* <td>{submission.isGraded ? submission.grade : "Not Graded"}</td> */}
                                        <td><Link to={`/gradeExam/${card.channel}/${submission._id}/${card._id}`}>  <Button className="button_gen" >Grade</Button> </Link></td>
                                    </tr>




                                    ))}




                                    
                                </tbody>

                            </Table>




                            </Card.Body>

                            </Card>  
                    )}






                    <br />


                    {card && card.exam && (
                        <Fragment>


                            {/* {cardedit == true ? ( */}
                            {cardEditloc == true ? (

                                <Fragment>

                                    <Form onSubmit={updateExamCardLocal}>

                                        <Row>

                                            <Col>Start Date : 
                                                <Form.Group controlId='startDate'>
                                                <Form.Control type='date' placeholder='startDate' value={startDate} onChange={(e) => setStartDate(e.target.value)}> 
                                                </Form.Control>
                                                </Form.Group>
                                            
                                            </Col>

                                            <Col>Start Time : 
                                                <Form.Group controlId='startTime'>
                                                <Form.Control type='time' placeholder='startTime' value={startTime} onChange={(e) => setStartTime(e.target.value)}> 
                                                </Form.Control>
                                                </Form.Group>
                                            
                                            </Col>

                                        </Row>
                                        <Row>


                                            <Col>Deadline Date : 
                                                <Form.Group controlId='DeadlineDate'>
                                                <Form.Control type='date' placeholder='DeadlineDate' value={DeadlineDate} onChange={(e) => setDeadlineDate(e.target.value)}> 
                                                </Form.Control>
                                                </Form.Group>
                                            
                                            </Col>

                                            <Col>Deadline Time : 
                                                <Form.Group controlId='DeadlineTime'>
                                                <Form.Control type='time' placeholder='DeadlineTime' value={DeadlineTime} onChange={(e) => setDeadlineTime(e.target.value)}> 
                                                </Form.Control>
                                                </Form.Group>
                                            
                                            </Col>


                                        </Row>

                                        <Row>
                                            <Col>
                                                Exam Instructions:
                                                <Form.Group controlId='itemText'>
                                                <Form.Control type='text' placeholder='Exam Instructions' value={examDescription} onChange={(e) => setExamDescription(e.target.value)}> 
                                                </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>

                                            <Col>nQuestions : 
                                                <Form.Group controlId='itemText'>
                                                <Form.Control type='text' placeholder='numQuestions' value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)}> 
                                                </Form.Control>
                                                </Form.Group>
                                            
                                            </Col>
                                            <Col>Max Marks: 
                                                <Form.Group controlId='itemText'>
                                                <Form.Control type='text' placeholder='max Marks' value={maxMarks} onChange={(e) => setMaxMarks(e.target.value)}> 
                                                </Form.Control>
                                                </Form.Group>

                                            </Col>

                                            <Col>
                                                <Button className="button_gen" type='submit' variant='primary'>
                                                    Update
                                                </Button>
                                            </Col>

                                        </Row>




                                    </Form>




                                </Fragment>

                            ): (
                                <Fragment>


                                    <Row>
                                    <Col>
                                    <p>Start : {card.exam.startTime ?(<DateFormatted date_in={card.exam.startTime} />) : ("Not set")}</p>


                                    </Col>
                                    <Col>
                                    <p>End : {card.exam.endTime ? (<DateFormatted date_in={card.exam.endTime} />) : ("Not set")}</p>

                                    </Col>
                                    {/* <Col>
                                    <p>Duration : {card.exam.duration}</p>
                                    </Col> */}
                                </Row>

                                <Row>
                                    <Col>Format : {card.exam.examformat}</Col>
                                    <Col>nQuestions : {card.exam.numQuestions}</Col>
                                    <Col>Max Marks: {card.exam.totalMarks} </Col>
                                    <Col>nSubmissions : {card.exam.nGraded}</Col>
                                </Row>

                                <Row>
                                    <Col>
                                        Exam Instructions: {card.exam.examdescription}
                                    </Col>
                                </Row>



                                </Fragment>

                            )}


                        </Fragment>
                    )}









                    </Card.Body>


                </Card>  

            

        </>
    )
}


export default ExamItem
