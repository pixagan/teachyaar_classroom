import React , {useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { Row, Col,  Card, Button, Form, InputGroup } from 'react-bootstrap'
import DateFormatted from '../../components/utils/DateFormatted'
import {setAlert} from '../../actions/alertActions';
//import {updateMCQQuestion, deleteMCQQuestion} from '../../actions/mcqActions'
import Resizer from "react-image-file-resizer";

import Message from '../../components/utils/Message'

import axios from 'axios'
// import moment from 'moment-timezone'

// import LoadImageMCQ from './LoadImageMCQ'
// import EquationView from './EquationView'

//import {deleteImageMCQ} from '../../actions/mcqActions'

import {updateMCQQuestion, deleteMCQQuestion} from '../../actions/mcqActions'


import {MCQ_EDIT_QUESTION} from '../../constants/mcqConstants'

export const QuestionItem = ({question, mcq_id, index}) => {


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const toggleMode = (mode_in) => {
        
        if(mode == mode_in){
            setMode('view')
        }else{
            setMode(mode_in)
        }

    }


    const [mode, setMode] = useState('view') //edit, view
    const [nMarks, setnMarks] = useState(0) //
    const [examType, setExamType] = useState(question.Qtype) //
    const [questionText, setQuestionText] = useState('')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [option4, setOption4] = useState('')

    const [filedata, setFileData] = useState('')

    const [equation, setEquation] = useState('')

    const [eqImView, setEqImView] = useState(null)

    const toggleEqImView = (mode_in) => {
        if(mode_in == eqImView){
            setEqImView(null)
        }else{
            setEqImView(mode_in)
        }
    }



    useEffect(() => {
        //getQandA()

        setnMarks(question.nMarks)

        setExamType(question.Qtype)

        setQuestionText(question.Qtext)

        

        if(question.Qtype == 'MCQ'){

            console.log('Options ', question.options[1], question.options[2], question.options[3])

            if(question.options[1] && question.options[1]!=undefined){
                setOption1(question.options[1])
            }
   
            if(question.options[2] && question.options[2]!=undefined){
                setOption2(question.options[2])
            }

            if(question.options[3] && question.options[3]!=undefined){
                setOption3(question.options[3])
            }

            if(question.options[4] && question.options[4]!=undefined){
                setOption4(question.options[4])
            }

        }




    }, [question])


    const updateQuestion = (e) => {
        e.preventDefault()
        dispatch(updateMCQQuestion(mcq_id, question._id, nMarks, examType, questionText, option1, option2, option3, option4, fileinfo))

        setMode('view')
    }

    const deleteQuestion = (e) => {
        e.preventDefault()
        dispatch(deleteMCQQuestion(mcq_id, question._id))
    }


   
    const [isFile, setIsFile] = useState('')
    const [fileinfo, setFileInfo] = useState('')

    const uploadFileHandler = async(e) => {
        const imfile = e.target.files[0]

        var filetype = null;
        var file = null;

        const url = URL.createObjectURL(imfile)

        var image = new Image()
        image.src = url

        image.onload = async() => {
            console.log('Height ', image.height);
            console.log('Width ',image.width);


            console.log('File In ', imfile)
            console.log('Image obj ', image.height, image.width, image.height*image.width)
    
            const height = image.height
            const width = image.width

            const pixels = height*width
    
            //if file is pdf
            if(imfile && (imfile.type === 'image/jpeg' || imfile.type ==='image/png')){
                file = await resizeFile(imfile, height, width);
                filetype = 'image'
            }
    
            if(filetype == 'image'){
    
                console.log('Image file upload ', file)
    
                console.log('Size comp ', file.size , 25000, file.size<=22428)
    
                console.log('Pixxels comp ', 250000, pixels, pixels<250000)

                //if(file.size<=22428){
                if(file.size<=25000){
    
                    console.log('Setting file ', file)
    
                    setFileInfo(file)
                    setIsFile(true)
    
    
                }else{      
                    dispatch(setAlert('File is too large, we currently only allow a maximum file size of 20KB for questions, please upload a smaller file', 'danger'));
                }
    
            }else{
                
                dispatch(setAlert('Invalid file type: Use a Pdf file', 'danger'));
            }



        };

    }



    const [uploading, setUploading] = useState(false)
    const [ImageFile, setImageFile] = useState('')


    const submitHandler = async(e) => {
        e.preventDefault()
        const file = fileinfo //e.target.files[0]

        if(file && isFile){



        console.log('File ', fileinfo)


        console.log('File In ', file)

        //var timeZone = moment.tz.guess();


        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)


        console.log('form data ', formData)

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`

                }
            }

            //console.log('card ', card, card._id, card.channel)

            

            const { data } = await axios.post(`/api/mcq/question/file/${mcq_id}/${question._id}`, formData, config)


            dispatch({
                type: MCQ_EDIT_QUESTION,
                payload: data
            })

            setImageFile(data)

            setUploading(false)


        }catch(error){
            console.error(error)
            setUploading(false)
        }


    }
  

    }

    const resizeFile = (file, height, width) =>
    new Promise((resolve) => {

        var hwratio = height/width

        var scaleHeight = height
        var scaleWidth  = width
        var maxHW = Math.max(height, width)

        if(height>500){
            scaleHeight = 500
        }
        if(width>500){
            scaleWidth = 500
        }


        Resizer.imageFileResizer(
        file,
        scaleHeight,
        scaleWidth,
        "jpeg",
        90,
        0,
        (uri) => {
            resolve(uri);
        },
        "file"
        );



    });


    const addEquation = (e) => {

    }




    return (

        <>



                {mode == 'view' && (
                <Card style={{marginBottom:'2px', backgroundColor:'white', border:'None'}}>
                    
                <Card.Header style={{backgroundColor:'white', borderBottom:'None', marginBottom:0, paddingBottom:0}}>

                    <InputGroup style={{alignItems:'right'}}>
                    <Button className="button_gen" onClick={()=>toggleMode('edit')} style={{margin:'2px'}}> <i className='fas fa-edit'>  </i></Button>
                    <Button className="button_gen" onClick={deleteQuestion} style={{margin:'2px'}}> <i className='fas fa-trash'>  </i> </Button>
                    <Button className="button_gen" style={{margin:'2px'}} > <i className='fas fa-tags'>  </i> </Button>
                    </InputGroup>

                    <Row>

                    </Row>

                    <Row>
                        <Col>
                        <span className='h5' style={{backgroundColor:'white'}}> {index}) {question.Qtext} </span>
                        <span style={{textAlign:'center'}}> | {question.nMarks} marks</span>
                        </Col>
                    </Row>

                </Card.Header>


                <Card.Body className='card_channel_body' style={{border:'None', marginTop:'0', paddingTop:'0'}}>

                    {/* {question.image && question.image.filename && (
            
                        <LoadImageMCQ mcq_id={mcq_id} question_id={question._id} fileInfo={question.image}/>
         
                    )}

                    {question.equations && question.equations.length>0 && question.equations.map((equation,index)=>(
                         <EquationView key={equation._id}  mode_in='view' mcq_id={mcq_id}  question_id={question._id} equation={equation}/>
                    ))} */}


                    {question.Qtype == 'MCQ' && (
                        <Fragment >
                            <Row>
                                <Col>
                                    {question.options[1] && question.options[1]!==undefined && (
                                        <span> a) {question.options[1]} </span>
                                    )}
                                </Col>

                                <Col>
                                    {question.options[2] && question.options[2]!==undefined && (
                                        <span> b) {question.options[2]} </span>
                                    )}

                                </Col>
                            </Row>

                            <Row>

                                 <Col>
                                    {question.options[3] && question.options[3]!==undefined && (
                                        <span> c) {question.options[3]} </span>
                                    )}


                                </Col>

                                <Col>

                                     {question.options[4] && question.options[4]!==undefined && (
                                        <span> d) {question.options[4]} </span>
                                    )}

                                </Col>

                            </Row>
                        </Fragment>
                    )}

                </Card.Body>

            </Card>  
                )}






                
                {mode == 'edit' && (

                    <Card style={{marginBottom:'2px'}}>



            
                    <InputGroup style={{alignItems:'right'}}>
                    <Button className="button_gen" onClick={()=>toggleMode('edit')}> <i className='fas fa-edit'>  </i></Button>
                    <Button className="button_gen" onClick={deleteQuestion}> <i className='fas fa-trash'>  </i> </Button>
                    </InputGroup>


                    <Message>Click Done after adding or updating the question, mcq options, equations or image.</Message>

                    <Form>

                    <Card.Header>
                    
                            <Form.Group controlId='questionText'>
                                <Form.Label>Enter the Question</Form.Label>
                                <Form.Control type='text' placeholder='Question' value={questionText} onChange={(e) => setQuestionText(e.target.value)} style={{backgroundColor:'white'}}> 
                                </Form.Control>
                            </Form.Group>
                        <Row>
                            <Col>
                            <Form.Group controlId='nQuestions'>
                                <Form.Label>Enter how many marks for the question</Form.Label>
                                <Form.Control type='text' placeholder='Marks' value={nMarks} onChange={(e) => setnMarks(e.target.value)} style={{backgroundColor:'white'}}> 
                                </Form.Control>
                            </Form.Group>
                            </Col>

                            <Col>
                            {(examType == 'MCQ' || examType=='mcq')&& (
                                <Form.Group controlId="studentTeacherSelect">
                                <Form.Label>Select the type of Question Multiple choice or Text</Form.Label>
                                <Form.Control as="select"  defaultValue={examType} value={examType} onChange={(e) => setExamType(e.target.value)} style={{backgroundColor:'white'}}>
                                    <option value='MCQ'>MCQ</option>
                                    <option value='Text'>Text</option>
                                </Form.Control>
                            </Form.Group>
                            )}

                            {(examType == 'Text' || examType == 'Short' || examType == 'Long') && (
                                    <Form.Group controlId="studentTeacherSelect">
                                    <Form.Label>Select the type of Question Multiple choice or Text</Form.Label>
                                    <Form.Control as="select"  defaultValue={examType} value={examType} onChange={(e) => setExamType(e.target.value)} style={{backgroundColor:'white'}}>
                                        <option value='Text'>Text</option>
                                        <option value='MCQ'>MCQ</option>
                                    </Form.Control>
                                </Form.Group>
                            )}

                            </Col>
                        </Row>

                        <Row>
                            <Col>
                            {/* {question.equations && question.equations.length>0 && question.equations.map((equation,index)=>(
                                <EquationView key={equation._id}  mode_in='edit' mcq_id={mcq_id}  question_id={question._id} equation={equation}/>
                             ))} */}
                                
                            </Col>
                        </Row>


{/* 
                        <Row>
                            <Col>
                            {question.image && question.image.filename && (
            
                                <Row style={{background:'white'}}>
                                    <Col>

                                    <LoadImageMCQ mcq_id={mcq_id} question_id={question._id} fileInfo={question.image}/>
                                    
                                    </Col>
                                    <Col>
                                        <Button className='button_gen' onClick={()=>dispatch(deleteImageMCQ(mcq_id, question._id, question.image.fileid))} style={{top:'40%', position:'absolute'}}> <i class="fas fa-trash"></i> </Button>
                                    </Col>
                                </Row>
                                

                            )}
                                
                            </Col>
                        </Row> */}

                        {/* <Row style={{marginTop:'5px'}}>
                            <Col>
                                <Button className='button_gen' onClick={()=>toggleEqImView('image')}>Add Image</Button>
                                <Button className='button_gen' onClick={()=>toggleEqImView('equation')}>Add Equation</Button>
                            </Col>
                        </Row> */}


                        {/* {eqImView == 'image' && (
                        <Row>
                        <Col>

                            <Message>Images should have a max width and max height of 500px, 50kb in size. If you have already added an image it will be deleted and replaced with the new image you add</Message>
                            <InputGroup>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Add an Image</Form.Label>
                                <Form.Control type="file" onChange={uploadFileHandler}/>
                            </Form.Group>
                            <Button onClick={submitHandler} className='button_gen'>Add</Button>
                            </InputGroup>
                        </Col>
                            </Row>
                        )} */}

 


{/*                         {eqImView == 'equation' && (
                            <Row>
                                <Col>
                                    <EquationView mode_in='create' mcq_id={mcq_id}  question_id={question._id}/>
                                </Col>
                            </Row>                    
                        )} */}

 

                        


  
                    </Card.Header>


                    <Card.Body className='card_channel_body'>



                    {examType=='MCQ' && (
                            <Fragment>

                            <Message>You can enter upto 4 options for the MCQ options. If you do not enter any options or enter only 1,2 or 3 then only that many will show up</Message>

                            <Row>
                            <Col>
                            <Form.Group controlId='option1'>
                                {/* <Form.Label>No of questions (max 200 questions)</Form.Label> */}
                                <Form.Control type='text' placeholder='Option 1' value={option1} onChange={(e) => setOption1(e.target.value)} style={{}}> 
                                </Form.Control>
                            </Form.Group>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Form.Group controlId='option2'>
                                {/* <Form.Label>No of questions (max 200 questions)</Form.Label> */}
                                <Form.Control type='text' placeholder='Option 2' value={option2} onChange={(e) => setOption2(e.target.value)} style={{}}> 
                                </Form.Control>
                            </Form.Group>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Form.Group controlId='option3'>
                                {/* <Form.Label>No of questions (max 200 questions)</Form.Label> */}
                                <Form.Control type='text' placeholder='Option 3' value={option3} onChange={(e) => setOption3(e.target.value)} style={{}}> 
                                </Form.Control>
                            </Form.Group>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Form.Group controlId='option4'>
                                {/* <Form.Label>No of questions (max 200 questions)</Form.Label> */}
                                <Form.Control type='text' placeholder='Option 4' value={option4} onChange={(e) => setOption4(e.target.value)} style={{}}> 
                                </Form.Control>
                            </Form.Group>

                            </Col>
                        </Row>


                            </Fragment>
                        )}


                        <Button className="button_gen" onClick={updateQuestion}> Done </Button>
                        
                        <Button className="button_gen" onClick={()=>toggleMode('view')}> Cancel </Button>

                        

                    </Card.Body>


                    </Form>

                    </Card> 
                    
                )}









  

            

        </>
    )
}


export default QuestionItem
