// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, ListGroup, Form, OverlayTrigger, Tooltip, InputGroup } from 'react-bootstrap'
import Message from '../../components/utils/Message'
import Loader from '../../components/utils/Loader'
import TYCard from '../../components/cards/TYCard'
import QandaForm from '../../components/qanda/QandaForm'
import QandaItem from '../../components/qanda/QandaItem'

import {listChannels, createChannel, deleteChannel, updateChannelRT, enrollRequestChannel, unsubscribeChannel, listChannelDetail} from '../../actions/channelActions'
import {listTYCards, createTYCard} from '../../actions/cardActions'
import {listQPosts} from '../../actions/qandaActions'

import {useInterval} from '../../hooks/useInterval'
import { useHistory } from 'react-router-dom'

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    deviceDetect
  } from "react-device-detect";

import { useNavigate } from 'react-router-dom';



export const TeacherCourseScreen = ({}) => {
    

    const loading = false;
    const error = null;

    const deviceType = isMobile ? 'Mobile' : 'Desktop';

    const dispatch = useDispatch()
    //const history = useHistory()
    const navigate = useNavigate();


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const channelList = useSelector(state => state.channelList);
    const { loading:loadingC, error:errorC, channels } = channelList;


    const [addCardtoggle, setaddCardtoggle ] = useState(true)
    const toggleAddCard = () => {
        setaddCardtoggle(addCardtoggle => !addCardtoggle)
    }


    const [cardType, setCardType] = useState('Notes')
    const [cardTextT, setCardTextT] = useState('Notes')
    const [cardTitle, setCardTitle] = useState('')
    const [selectedChannel, setSelectedChannel] = useState('')
    const [selectedChannelName, setSelectedChannelName] = useState('')
    const [selectedChannelQandaBoard, setSelectedChannelQandaBoard] = useState('')

    const [channelName, setChannelName] = useState('')

    const [channelEnrollmentCode, setChannelEnrollmentCode] = useState('')

    //error messages
    const [createChannelMessage, setCreateChannelMessage] = useState(null)

    const SetCardTypeMap = (card_text) =>{
        setCardTextT(card_text)
        if(card_text == 'Create Exam'){
            setCardType('Exam')
            

        }
        if(card_text == 'Create Notes'){
            setCardType('Notes')
        }

    }


    const selectChannel = (channel_id, channel_name, qandaboard) =>{
        setSelectedChannel(channel_id)
        setSelectedChannelName(channel_name)
        setSelectedChannelQandaBoard(qandaboard)

        //loadCards(channel_id)
        dispatch(listChannelDetail(channel_id))
        dispatch(listTYCards(channel_id))
        dispatch(listQPosts(channel_id))


    }

    const [addChanneltoggle, setaddChanneltoggle ] = useState(true)
    const toggleAddChannel = () => {
        setaddChanneltoggle(addChanneltoggle => !addChanneltoggle)
    }


    const [enrollChanneltoggle, setenrollChanneltoggle ] = useState(true)
    const toggleEnrollChannel = () => {
        setenrollChanneltoggle(enrollChanneltoggle => !enrollChanneltoggle)
    }


    const [doubtViewtoggle, setDoubtViewtoggle ] = useState(false)
    const toggledoubtView = () => {
        setDoubtViewtoggle(doubtViewtoggle => !doubtViewtoggle)
    }

    useInterval(async ()=>{
        //console.log("Polling server for updates")
        //dispatch(updateChannelRT(selectedChannel))
    }, 20000)



    useEffect(() => {


        // if(!userInfo){
        //     navigate(`/`)
        // }else{

            dispatch(listChannels())

            const deviceType = isMobile ? 'Mobile' : 'Desktop';

        //}
        

    }, [selectedChannel])


    const loadCards = (channel_id) => {
        dispatch(listTYCards(channel_id))
    }

    const addCard = (cardType) => {
        //e.preventDefault()
        dispatch(createTYCard(cardType, selectedChannel))
        
    }



    const ValidateChannelName = (name) => {

        const unstringed = name.replace(/\s/g, '')


       
        if (unstringed.length<=0 || !unstringed.length) {
            setCreateChannelMessage('Invalid class name')
            return false
        }

       

        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        console.log(format.test(unstringed))
        if(format.test(unstringed)){
            setCreateChannelMessage('Invalid class name')
            return false
        }


        return true


    }


    const addChannel = (e) => {
        e.preventDefault()

        const isName = ValidateChannelName(channelName)

        if(isName){

            setCreateChannelMessage(null)
            dispatch(createChannel(channelName))
            
            setChannelName('')
          

        }

    }


    const subscribeToChannel = (e) => {
        e.preventDefault()

            dispatch(enrollRequestChannel(channelEnrollmentCode))

    }



    const deleteChannelCall = () => {

        if(window.confirm("Are you sure you want to DELETE your  \'"+selectedChannelName+"\'  class?")){
            dispatch(deleteChannel(selectedChannel))
        }    
        
    }

    const unsubscribeChannelCall = () => {

        if(window.confirm("Are you sure you want to unsubscribe to the  \'"+selectedChannelName+"\'  class?")){
            dispatch(unsubscribeChannel(selectedChannel, userInfo._id))
        }    
        
    }


    //Pop overs
    const createChannelTooltip = (
        <Tooltip id="popover-basic">
            Enter your class name and click here to create a class
        </Tooltip>
    );

    const enrollChannelTooltip = (
        <Tooltip id="popover-basic">
            Enter the enrollment code for the class you want to subscribe to and click here to send an enrollment request to the instructor
        </Tooltip>
    );

    const selectChannelTooltip = (
        <Tooltip id="popover-basic">
            Click to select the class and view its cards
        </Tooltip>
    );

    const profileChannelTooltip = (
        <Tooltip id="popover-basic">
            Click to view the class's profile, enrollment code, subscription requests and add students.
        </Tooltip>
    );




    return (

        <div style={{padding:'10px', margin:'20px', minHeight:'98vh'}}>

                <InputGroup>
                    <Button className='button_gen'>Classroom</Button>
                    <Button className='button_gen'>Notes</Button>
                    <Button className='button_gen'>Exams</Button>
                </InputGroup>
          
    
                <div style={{padding:'10px', margin:'20px'}}>


                        <div className='h5' style={{textAlign:'center'}}>CLASSES</div>


                        {createChannelMessage && <Message variant='danger'>{createChannelMessage}</Message> }

                        <br />

                        {addChanneltoggle && (

                            <Fragment>


                                {userInfo && userInfo.isTeacher && (

                                    <Card style={{border:'None', marginBottom:'10px'}}>

                                    <Form onSubmit={addChannel}>

                                    <Form.Group controlId='channelName'>
                                        <Form.Control type='text' placeholder='Enter Class Name' value={channelName} onChange={(e) => setChannelName(e.target.value)}> 
                                        </Form.Control>
                                    </Form.Group>

                                   
                                    <OverlayTrigger  placement="top" overlay={createChannelTooltip}>
                                    <Button className="button_gen" type='submit' variant='primary'>
                                        Create
                                    </Button>
                                    </OverlayTrigger>

                                    </Form>


                                    </Card>

                                )}


                            </Fragment>

                        )}


                        {enrollChanneltoggle && !userInfo.isTeacher &&(

                            <Card style={{border:'None', marginBottom:'10px'}}>

                            <Form onSubmit={subscribeToChannel}>

                            <Form.Group controlId='channelName'>
                                <Form.Label>Enrollment Code</Form.Label>
                                <Form.Control type='text' placeholder='Enter Class Enrollment Code your teacher gave you' value={channelEnrollmentCode} onChange={(e) => setChannelEnrollmentCode(e.target.value)}> 
                                </Form.Control>
                            </Form.Group>


                            <OverlayTrigger  placement="top" overlay={enrollChannelTooltip}>
                            <Button className="button_channel_side" type='submit' variant='primary'>
                                Enroll
                            </Button>
                            </OverlayTrigger>

                            </Form>


                            </Card>

                        )}

                        

                        <ListGroup as="ul">

                        </ListGroup>

                        {channels && channels.map((channel) => (
                          
                            <Fragment>

                                <Card className="card_channel">
                                    <Card.Header>
                                    <Row>
                                        <Col>
                                        <h5 className="channel_header">{channel.name}</h5>
                                        </Col>
                                    </Row>
                                    

                                   

                                    {!userInfo.isTeacher && (
                                         <Row>
                                         <Col>
                                         <p className="channel_header">Teacher: {channel.instructorprofile.name}</p>
                                         </Col>
                                        </Row>
                                    )}
                                   
                                    
                                    
                                    <Row>
                                        <Col>

                                       

                                        <OverlayTrigger  placement="top" overlay={selectChannelTooltip}>    
                                        <Link>
                                        <Button className="button_gen" onClick={()=>selectChannel(channel._id, channel.name, channel.channelQandaBoard)}>
                                            <i className="fas fa-list fa-xs"></i>
                                        </Button>
                                        </Link>
                                        </OverlayTrigger>

                                        <Link to={`/teacher/notes/${channel._id}`}>
                                        <Button className="button_gen">
                                            <i className="fas fa-sticky-note fa-xs"></i>
                                        </Button>
                                        </Link>

                                        {userInfo && userInfo.isTeacher && userInfo._id == channel.instructor && (

                                            
                                        <OverlayTrigger  placement="top" overlay={profileChannelTooltip}>
                                        <Link to={`/channelSubscribe/${channel._id}`}>
                                        <Button className="button_gen">
                                            <i className="fas fa-user fa-xs"></i>
                                        </Button>
                                        </Link>
                                        </OverlayTrigger>

                                        )}



                                        </Col>
                                    </Row>


                                        
                                    </Card.Header>

             
                                </Card>
                            
                            </Fragment>


                        ))}


                   



                </div>
  

        </div>
    )
}


export default TeacherCourseScreen
