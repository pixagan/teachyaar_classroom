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



export const TeacherDashboardScreen = ({}) => {
    

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

    const channelDetail = useSelector(state => state.channelDetail)
    const { loading:loadingCS, error:errorCS, channel:channelCS } = channelDetail

    const cardList = useSelector(state => state.cardList);
    const { loading:loadingCA, error:errorCA, scards:tycards } = cardList;

    const qandaList = useSelector(state => state.qandaList);
    const { loading:loadingQA, error:errorQA, qandalist } = qandaList;


  

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
          

            { loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : 
            (   
                <>

                <div  className="body">

                    <div className="sidenav">

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


                    <div className="content">
                            <Row>
                                <Col>
                                <p></p>
                                <div><span className ='h5'>Content Wall :</span>  <span>{selectedChannelName}</span> </div> 
                                </Col>
                                <Col>
                                <p></p>
                             {userInfo.isTeacher && (<span><span className='h55'>EnrollmentCode  : </span> <span> {channelCS && channelCS.enrollmentCode} </span> </span>)} 
                                </Col>


                                {selectedChannelName && (

                            <Col>
                                {userInfo && userInfo.isTeacher && (
                                    <OverlayTrigger  placement="top" overlay={deleteChannelTooltip}>
                                    <Button variant="danger" onClick={() => deleteChannelCall()} style={{borderRadius:'10px'}}>Delete Class</Button>
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
                            
                      

                        {selectedChannelName && (

                            <Row>



                            <Col>

                                {userInfo && userInfo.isTeacher && (

                                <Card style={{border:'None', padding:'10px'}}>
                                    <InputGroup>
                                        <Button className="button_gen" onClick={()=>addCard('Announcement')}><i className="fa fa-bullhorn"></i></Button>
                                        <Button className="button_gen" onClick={()=>addCard('Notes')}><i className="fa fa-file-text"></i></Button>
                                        <Button className="button_gen" onClick={()=>addCard('Exam')}><i className="fa fa-pencil-square"></i></Button>
                                        <Button className="button_gen" onClick={()=>addCard('Live')}><i className="fa fa-video"></i></Button>
                                    </InputGroup>
                                   

                                {/* <Form onSubmit={addCard}>

                                <Row>

                                    <Col>
                                        <Form.Group controlId="cardType">
                                        <Form.Label></Form.Label> 
                                        <Form.Control as="select" value={cardTextT} onChange={(e) => SetCardTypeMap(e.target.value)}>
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

                                </Form> */}

                                </Card>

                                )}

                            

                            </Col>
                            {/* <Col md={2}>

                            <OverlayTrigger  placement="top" overlay={liveLectureTooltip}>
                            <Link to={`/livelecture/${selectedChannel}`}><Button variant="success" className='btn-circle'>Live Lecture</Button></Link>
                            </OverlayTrigger>

                            </Col> */}

                            


                            </Row>

                        )}




                       

                    

                        {tycards && tycards.map((card) => (

                            <Fragment>
                                <TYCard card={card} channel_id={selectedChannel} qandaboard_id={selectedChannelQandaBoard}/>
                                <br />
                            </Fragment>


                        ))}



                    </div>



                    <div className="content_right">
                         <div><span className='h5'>Interaction Wall : </span> <span>{selectedChannelName} </span></div>
                         
                        <QandaForm board_id={selectedChannelQandaBoard} channel_id={selectedChannel}/>

                     

                        {qandalist && qandalist.map((qanda) => (

                        <Fragment>
                            <QandaItem channel_id={selectedChannel} qandaboard_id={selectedChannelQandaBoard} qanda={qanda}/>
                          
                        </Fragment>


                        ))}

                    </div>



                </div>

            
                </>

            )}
                
  

        </>
    )
}


export default TeacherDashboardScreen
