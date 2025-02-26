// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, ListGroup, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import TYCard from '../components/TYCard'
import QandaForm from '../components/QandaForm'
import QandaItem from '../components/QandaItem'

import {listChannels, createChannel, deleteChannel, updateChannelRT, enrollRequestChannel, unsubscribeChannel, listChannelDetail} from '../actions/channelActions'
import {listTYCards, createTYCard} from '../actions/cardActions'
import {listQPosts} from '../actions/qandaActions'
// import { Notifications } from '../components/Notifications'
import {useInterval} from '../hooks/useInterval'
import { useHistory } from 'react-router-dom'

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    deviceDetect
  } from "react-device-detect";

import { useNavigate } from 'react-router-dom';



export const StudentDashboardScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

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


    const cardList = useSelector(state => state.cardList);
    const { loading:loadingCA, error:errorCA, scards:tycards } = cardList;


    const qandaList = useSelector(state => state.qandaList);
    const { loading:loadingQA, error:errorQA, qandalist } = qandaList;



    const channelDetail = useSelector(state => state.channelDetail)
    const { loading:loadingCS, error:errorCS, channel:channelCS } = channelDetail


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
    // const [channelDescription, setChannelDescription] = useState('')
    // const [channelSubject, setChannelSubject] = useState('')
    // const [channelLevel, setChannelLevel] = useState('')


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



    //Commented out for debugging
    useInterval(async ()=>{
        //console.log("Polling server for updates")
        //dispatch(updateChannelRT(selectedChannel))
    }, 20000)



    useEffect(() => {


        if(!userInfo){
            navigate(`/`)
        }else{

            dispatch(listChannels())


            const deviceType = isMobile ? 'Mobile' : 'Desktop';
    
            // navigator.geolocation.getCurrentPosition(function(position) {
            //     console.log("Latitude is :", position.coords.latitude);
            //     console.log("Longitude is :", position.coords.longitude);
            // });
    
            console.log("My device : ",deviceDetect())
    
            

        }
        

    }, [selectedChannel])











    const loadCards = (channel_id) => {
        dispatch(listTYCards(channel_id))
    }

    const addCard = (e) => {
        e.preventDefault()
        dispatch(createTYCard(cardType, selectedChannel))
        // dispatch(createTYCard(cardType, cardTitle, selectedChannel))
        // setCardTitle('')
    }





    const ValidateChannelName = (name) => {

        const unstringed = name.replace(/\s/g, '')


        //check for only spaces
        if (unstringed.length<=0 || !unstringed.length) {
            setCreateChannelMessage('Invalid class name')
            return false
        }

        //remove spaces and check for special characters

        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        console.log(format.test(unstringed))
        if(format.test(unstringed)){
            setCreateChannelMessage('Invalid class name')
            return false
        }


        //check that the name of the user is not pixagan or teachyaar



        return true


    }


    const addChannel = (e) => {
        e.preventDefault()


        const isName = ValidateChannelName(channelName)

        if(isName){

            setCreateChannelMessage(null)
            dispatch(createChannel(channelName))
            //dispatch(createChannel(channelName, channelDescription, channelSubject, channelLevel, "English"))
            setChannelName('')
            // setChannelDescription('')
            // setChannelSubject('')
            // setChannelLevel('')

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


    const addCardTooltip = (
        <Tooltip id="popover-basic">
            Click to add a notes or exam card
        </Tooltip>
    );

    const liveLectureTooltip = (
        <Tooltip id="popover-basic">
            Click to start/join a live video lecture
        </Tooltip>
    );

    const deleteChannelTooltip = (
        <Tooltip id="popover-basic">
            Click to delete the class
        </Tooltip>
    );

    const unsubscribeChannelTooltip = (
        <Tooltip id="popover-basic">
            Click to delete the class
        </Tooltip>
    );



    return (

        <>
            <Meta />

            {/* <Notifications /> */}

            { loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : 
            (   
                <>

                <div  className="body">

                    <div className="sidenav">
                        <div className='h55'>CLASSES</div>


                        {createChannelMessage && <Message variant='danger'>{createChannelMessage}</Message> }

                        <Fragment>
                        {/* {userInfo && userInfo.isTeacher && (
                        <Button className="button_channel_side" onClick={toggleAddChannel}>Create</Button>
                        )} */}

                        {/* {userInfo && !userInfo.isTeacher && (
                            <Button className="button_channel_side" onClick={toggleEnrollChannel}>Enroll</Button>
                        )} */}
                            
                        </Fragment>



                        <br />

                        {addChanneltoggle && (

                            <Fragment>


                                {userInfo && userInfo.isTeacher && (

                                    <Card>

                                    <Form onSubmit={addChannel}>

                                    <Form.Group controlId='channelName'>
                                        {/* <Form.Label>Channel Name</Form.Label> */}
                                        <Form.Control type='text' placeholder='Enter Class Name' value={channelName} onChange={(e) => setChannelName(e.target.value)}> 
                                        </Form.Control>
                                    </Form.Group>

                                    {/* <Form.Group controlId='channelSubject'>
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Control type='text' placeholder='Enter Channel Subject' value={channelSubject} onChange={(e) => setChannelSubject(e.target.value)}> 
                                        </Form.Control>
                                    </Form.Group>


                                    <Form.Group controlId='channelLevel'>
                                        <Form.Label>Level</Form.Label>
                                        <Form.Control type='text' placeholder='Enter Channel Level' value={channelLevel} onChange={(e) => setChannelLevel(e.target.value)}> 
                                        </Form.Control>
                                    </Form.Group>


                                    <Form.Group controlId='channelDescription'>
                                        <Form.Label>Channel Description</Form.Label>
                                        <Form.Control type='text' placeholder='Enter Channel Description' value={channelDescription} onChange={(e) => setChannelDescription(e.target.value)}> 
                                        </Form.Control>
                                    </Form.Group> */}


                                    <OverlayTrigger  placement="top" overlay={createChannelTooltip}>
                                    <Button className="button_channel_side" type='submit' variant='primary'>
                                        Create Class
                                    </Button>
                                    </OverlayTrigger>

                                    </Form>


                                    </Card>

                                )}



                                {/* {!userInfo.isTeacher && (

                                <Card>

                                <Form onSubmit={addChannel}>

                                <Form.Group controlId='channelName'>
                                    <Form.Label>Channel Name</Form.Label>
                                    <Form.Control type='text' placeholder='Enter Channel Name' value={channelName} onChange={(e) => setChannelName(e.target.value)}> 
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='channelSubject'>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type='text' placeholder='Enter Channel Subject' value={channelSubject} onChange={(e) => setChannelSubject(e.target.value)}> 
                                    </Form.Control>
                                </Form.Group>


                                <Form.Group controlId='channelLevel'>
                                    <Form.Label>Level</Form.Label>
                                    <Form.Control type='text' placeholder='Enter Channel Level' value={channelLevel} onChange={(e) => setChannelLevel(e.target.value)}> 
                                    </Form.Control>
                                </Form.Group>


                                <Form.Group controlId='channelDescription'>
                                    <Form.Label>Channel Description</Form.Label>
                                    <Form.Control type='text' placeholder='Enter Channel Description' value={channelDescription} onChange={(e) => setChannelDescription(e.target.value)}> 
                                    </Form.Control>
                                </Form.Group>


                                <Button className="button_channel_side" type='submit' variant='primary'>
                                    Add Channel
                                </Button>

                                </Form>


                                </Card>

                                )} */}




                            </Fragment>

                        )}


                        {enrollChanneltoggle && !userInfo.isTeacher &&(

                            <Card>

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


                        {/* <hr />

                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Search for added channels"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            />
                            <Button variant="outline-secondary" id="button-addon2">
                            Search
                            </Button>
                        </InputGroup> */}

                        <hr />

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
                                    </Card.Header>

                                    <Card.Body>

                                    <Row>
                                        <Col>
                                        <p className="channel_header">Teacher: {channel.instructorprofile.name}</p>
                                        </Col>
                                    </Row>
                                    
                                    
                                    <Row>
                                        <Col>

                                        {/* <Link>
                                        <Button>
                                        <i className="fas fa-history fa-xs"></i>
                                        </Button>
                                        </Link> */}

                                        <OverlayTrigger  placement="top" overlay={selectChannelTooltip}>    
                                        <Link>
                                        <Button className="button_channel_side" onClick={()=>selectChannel(channel._id, channel.name, channel.channelQandaBoard)}>
                                        <i className="fas fa-list fa-xs"></i>
                                        </Button>
                                        </Link>
                                        </OverlayTrigger>

                                        {userInfo && userInfo.isTeacher && userInfo._id == channel.instructor && (

                                            
                                        <OverlayTrigger  placement="top" overlay={profileChannelTooltip}>
                                        <Link to={`/channelSubscribe/${channel._id}`}>
                                        <Button className="button_channel_side">
                                        <i className="fas fa-user fa-xs"></i>
                                        </Button>
                                        </Link>
                                        </OverlayTrigger>

                                        )}



                                        </Col>
                                    </Row>


                                        
                                    </Card.Body>

             
                                </Card>
                            
                            </Fragment>


                        ))}


                    </div>


                    <div className="content">
                            <Row>
                                <Col>
                                <p></p>
                            <div><span className ='h55'>Content Wall :</span>  <span>{selectedChannelName}</span> </div> 
                                </Col>
                                <Col>
                                <p></p>
                             {userInfo.isTeacher && (<span><span className='h55'>EnrollmentCode  : </span> <span> {channelCS && channelCS.enrollmentCode} </span> </span>)} 
                                </Col>


                                {selectedChannelName && (

                            <Col>
                                {userInfo && userInfo.isTeacher && (
                                    <OverlayTrigger  placement="top" overlay={deleteChannelTooltip}>
                                    <Button variant="danger" onClick={() => deleteChannelCall()}>Delete Class</Button>
                                    </OverlayTrigger>
                                )}

                                {userInfo && !userInfo.isTeacher && (
                                    <OverlayTrigger  placement="top" overlay={unsubscribeChannelTooltip}>
                                    <Button variant="danger" onClick={() => unsubscribeChannelCall()}>Unsubscribe Class</Button>
                                    </OverlayTrigger>
                                )}

                            </Col>
                                )}
                             </Row>


                        {!selectedChannelName && (
                            <Message variant='info'>{"Select a class to show the cards "}</Message>
                        )}

                        {selectedChannel && channelCS && channelCS.classIsLive!=undefined && channelCS.classIsLive==true && (
                            <Message variant='info'>{"Teacher is currently taking a live lecture "}</Message>
                        )}
                            
                        <hr />

                        {selectedChannelName && (

                            <Row>

                                {/* {userInfo && userInfo.isTeacher && (

                                    <Col>
                                    <OverlayTrigger  placement="top" overlay={addCardTooltip}>
                                    <Button className="button_gen" onClick={toggleAddCard}>Add Content</Button>
                                    </OverlayTrigger>
                                    </Col>

                                )} */}


                            <Col>

                                {userInfo && userInfo.isTeacher && (

                                <Card>

                                <Form onSubmit={addCard}>

                                <Row>

                                    <Col>
                                        <Form.Group controlId="cardType">
                                        {/* <Form.Label>Content</Form.Label> */}
                                        <Form.Label></Form.Label> 
                                        <Form.Control as="select" value={cardTextT} onChange={(e) => SetCardTypeMap(e.target.value)}>
                                        {/* <option>Live</option> */}
                                        <option>Create Notes</option>
                                        <option>Create Exam</option>
                                        </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                    <br />
                                    <Button className="button_gen" type='submit' variant='primary'>
                                    Create
                                    </Button>
                                    
                                    </Col>

                                </Row>

                                </Form>

                                </Card>

                                )}

                            

                            </Col>
                            <Col md={2}>

                            <OverlayTrigger  placement="top" overlay={liveLectureTooltip}>
                            <Link to={`/livelecture/${selectedChannel}`}><Button variant="success" className='btn-circle'>Live Lecture</Button></Link>
                            </OverlayTrigger>

                            </Col>

                            


                            </Row>

                        )}




                        
                        

                        {addCardtoggle && (

                            <Fragment>
                                {/* {userInfo && userInfo.isTeacher && (

                                    <Card>

                                    <Form onSubmit={addCard}>

                                    <Row>

                                        <Col>
                                            <Form.Group controlId="cardType">
                                            <Form.Label>Create Content</Form.Label>
                                            <Form.Control as="select" value={cardType} onChange={(e) => setCardType(e.target.value)}>
                                            <option>Notes</option>
                                            <option>Exam</option>
                                            </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                        <br />
                                        <Button className="button_gen" type='submit' variant='primary'>
                                        Create
                                        </Button>
                                        
                                        </Col>

                                    </Row>

                                    </Form>

                                    </Card>

                                )} */}

{/* 
                                {!userInfo.isTeacher && (

                                    <Card>

                                    <Form onSubmit={addCard}>
                                    <Form.Group controlId='title'>
                                        <Form.Label>Card Title</Form.Label>
                                        <Form.Control type='text' placeholder='Enter Card Title' value={cardTitle} onChange={(e) => setCardTitle(e.target.value)}> 
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="cardType">
                                        <Form.Control as="select" value={cardType} onChange={(e) => setCardType(e.target.value)}>
                                        <option>Study</option>
                                        </Form.Control>
                                    </Form.Group> 

                                    <Form.Group controlId='cardChannel'>
                                        <Form.Label>Card Channel</Form.Label>
                                        <Form.Control type='text' placeholder='Card Channel' value={selectedChannelName}> 
                                        </Form.Control>
                                    </Form.Group>


                                    <Button className="button_gen" type='submit' variant='primary'>
                                        Add Card
                                    </Button>

                                    </Form>

                                    </Card>
                                    
                                )} */}

                            </Fragment>





                        )}



                        <hr />

                        {/* <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Search for cards in the channel"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            />
                            <Button variant="outline-secondary" id="button-addon2">
                            Search
                            </Button>
                        </InputGroup>

                        <hr /> */}

                        {tycards && tycards.map((card) => (

                            <Fragment>
                                <TYCard card={card} channel_id={selectedChannel} qandaboard_id={selectedChannelQandaBoard}/>
                                <br />
                            </Fragment>


                        ))}







                    </div>





                    <div className="content_right">
                         <div><span className='h55'>Interaction Wall : </span> <span>{selectedChannelName} </span></div>
                         <br />
                        <QandaForm board_id={selectedChannelQandaBoard} channel_id={selectedChannel}/>

                        <hr />

                        {/* <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Search for relevant posts in the Interaction"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            />
                            <Button variant="outline-secondary" id="button-addon2">
                            Search
                            </Button>
                        </InputGroup>

                        <hr /> */}

                        {qandalist && qandalist.map((qanda) => (

                        <Fragment>
                            <QandaItem channel_id={selectedChannel} qandaboard_id={selectedChannelQandaBoard} qanda={qanda}/>
                            <br />
                        </Fragment>


                        ))}

                    </div>



                </div>

            
                </>

            )}
                
  

        </>
    )
}


export default StudentDashboardScreen
