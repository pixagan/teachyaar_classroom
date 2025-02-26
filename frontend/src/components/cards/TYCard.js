// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect,  Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Card, Button, Form,  OverlayTrigger, Tooltip } from 'react-bootstrap'


import Moment from 'react-moment';

import ExamItem from './ExamItem'
import LiveLectureItem from './LiveLectureItem'
import NotesItem from './NotesItem'
import StudyCardItem from './StudyCardItem'
// import AdminNotificationCard from '../components/AdminNotificationCard'
import LectureStudyNote from './LectureStudyNote'

import AnnouncementItem from './AnnouncementItem'

// //import QandaItem from '../components/QandaItem'
import QandaForm from '../qanda/QandaForm'
import QandaItem from '../qanda/QandaItem'



import {listLectureCardNotes, addLectureCardNotes, addTagStudyCard, postCard, deleteCard} from '../../actions/cardActions'

import {listQPostsCard} from '../../actions/qandaActions'

import DateFormatted from '../utils/DateFormatted'


export const TYCard = ({card, channel_id, qandaboard_id}) => {

    const dispatch = useDispatch()

    const [tagC, setTagC ] = useState('')

    const [cardMode, setCardMode] = useState(false)
    const togglecardMode = () => {
        setCardMode(cardMode => !cardMode)
    }

    const [cardNotesText, setCardNotesText ] = useState('')

    const card_id = card._id



    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const qandaCardList = useSelector(state => state.qandaCardList);
    const { loading:loadingQA, error:errorQA, qandacardlist } = qandaCardList;


    const cardStudynotes = useSelector(state => state.cardStudynotes);
    const { loading:loadingSN, error:errorSN, studynote } = cardStudynotes;




    const [addTagtoggle, setaddTagtoggle ] = useState(false)
    const toggleAddTag = () => {
        setaddTagtoggle(addTagtoggle => !addTagtoggle)
    }


    

    const [doubtViewtoggle, setDoubtViewtoggle ] = useState(false)
    const [studynoteViewtoggle, setStudynoteViewtoggle ] = useState(false)

    const toggledoubtView = () => {

        if(!doubtViewtoggle){
            dispatch(listQPostsCard(channel_id, card._id))
        }
        setDoubtViewtoggle(doubtViewtoggle => !doubtViewtoggle)


        setStudynoteViewtoggle(false)

    }


    
    const toggleStudynoteView = () => {

        if(!studynoteViewtoggle){
            dispatch(listLectureCardNotes(channel_id, card._id))
        }

        setStudynoteViewtoggle(studynoteViewtoggle => !studynoteViewtoggle)
        setDoubtViewtoggle(false)
    }


    useEffect(() => {
      


        
    }, [])




    const submitHandler = (e) => {
        e.preventDefault()
      
    }

    const addItem = (e) => {
        e.preventDefault()
     

        dispatch( addLectureCardNotes(channel_id, card_id, cardNotesText))

    }


    const addTags = (e) => {
        e.preventDefault()
        dispatch(addTagStudyCard(card._id, tagC))
        setTagC('')
    }



    const updateTitle = () => {

    }



    const [updateTitletoggle, setUpdateTitletoggle ] = useState(false)
    const toggleUpdateTitle = (e) => {
        e.preventDefault()
        setUpdateTitletoggle(updateTitletoggle => !updateTitletoggle)
    }





    const deleteCardConfirm = (channel_id, card_id) => {

        if(window.confirm("Are you sure you want to DELETE your  \'"+card.title+"\'  card?")){
            dispatch(deleteCard(channel_id, card_id))
        }
    }


    const postCardCheck = (channel_id, card_id) => {

        dispatch(postCard(channel_id, card_id))
    }


    
    const postTooltip = (
        <Tooltip id="popover-basic">
            Post your card, the students in the channel can see the card and anything you add to it
        </Tooltip>
    );

    const unpostTooltip = (
        <Tooltip id="popover-basic">
            Unpost your card, only the teacher can see the card.
        </Tooltip>
    );


    const deleteTooltip = (
        <Tooltip id="popover-basic">
            Delete your card, it will be permanently removed
        </Tooltip>
    );

    const interactTooltip = (
        <Tooltip id="popover-basic">
            Ask a doubt to your teacher. The doubt will also show up on the Interaction wall but will have the tag of the associated card.
        </Tooltip>
    );

    const privatenotesTooltip = (
        <Tooltip id="popover-basic">
            Enter your private notes. These will only be visible to you.
        </Tooltip>
    );



    return (

        <>


                <Card border="primary" className="card_ty_main" style={{borderRadius:'10px'}}>
 
                    <Card.Header as="h5" style={{border:'None'}}>

                        <Row>
                            <Col md={8}>                     
                       
                             {card.title} ||
                      
                        
                        </Col>
                            <Col md={4}>

                            {(userInfo.isTeacher || userInfo.isAdmin) && userInfo._id==card.user && (
                            <Fragment>


                        {card.isPost ? (
                            <OverlayTrigger  placement="top" overlay={unpostTooltip}>
                            <Button className="button_gen" onClick={()=>dispatch(postCard(card.channel, card._id))}>
                                UNPOST
                             </Button> 
                             </OverlayTrigger>
                        ) : (
                            <OverlayTrigger  placement="top" overlay={postTooltip}>
                            <Button className="button_gen" onClick={()=>dispatch(postCard(card.channel, card._id))}>
                                POST
                            </Button> 
                            </OverlayTrigger>
                        )} 


                        <OverlayTrigger  placement="top" overlay={deleteTooltip}>
                        <Button variant="danger" onClick={()=>deleteCardConfirm(channel_id, card._id)}>
                            <i className="fas fa-times fa-xs"></i>
                        </Button>
                        </OverlayTrigger>


                            </Fragment>
                        )}
                            
                            </Col>

                        </Row>




                    </Card.Header>

                        {/* <Row>

                            <Col>
                                <DateFormatted date_in={card.updatedAt}/>

                            </Col>
                        </Row> */}

                    <Card.Body>

                   



                    {card.type=="Notes" && (
                        <NotesItem channel_id={channel_id} card={card} cardedit={cardMode} />
                    )}


                    {card.type=="Exam" && (
                        <ExamItem channel_id={channel_id} card={card} cardedit={cardMode}/>
                    )}


                    {card.type=="Live" && (
                        <LiveLectureItem channel_id={channel_id} card={card} cardedit={cardMode}/>
                    )}


                    {card.type=="Study" && (
                        <StudyCardItem channel_id={channel_id} card={card} cardedit={cardMode}/>
                    )}

                    {card.type=="Announcement" && (
                        <AnnouncementItem channel_id={channel_id} card={card} cardedit={cardMode}/>
                    )}

                    {/* {card.type=="Notification" && (
                        <AdminNotificationCard channel_id={channel_id} card={card} cardedit={cardMode}/>
                    )} */}

                


                    {userInfo && !userInfo.isAdmin && (
                    <Row>
                        <Col>
                        
                            <OverlayTrigger  placement="top" overlay={interactTooltip}>
                            <Button className="button_gen" onClick={toggledoubtView}>Interact</Button>
                            </OverlayTrigger>

                            <OverlayTrigger  placement="top" overlay={privatenotesTooltip}>
                            <Button className="button_gen" onClick={toggleStudynoteView}>Private Notes</Button>
                            </OverlayTrigger>
                        </Col>
                    </Row>

                    )}

                    {userInfo && userInfo.isAdmin && (
                    <Row>
                        <Col>
                        <OverlayTrigger  placement="top" overlay={interactTooltip}>
                            <Button className="button_gen" onClick={toggledoubtView}>Interact</Button>
                        </OverlayTrigger>
                        </Col>
                    </Row>

                    )}





                    
                    {userInfo && !userInfo.isAdmin && studynoteViewtoggle && (

                        <Fragment>
                          
                            <Form onSubmit={addItem}>

                            <Row>
                                <Col>
                                    <Form.Group controlId='studentNotesText'>
                                    <Form.Control type='text' placeholder='Add Notes' value={cardNotesText} onChange={(e) => setCardNotesText(e.target.value)}> 
                                    </Form.Control>
                                   
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Button className="button_gen" type='submit' variant='primary'>
                                    <i className="fas fa-plus fa-xs"></i>
                                    </Button>
                                </Col>

                            </Row>

                            </Form>



                            <Fragment>
                                <LectureStudyNote card={studynote}/>
                                <br />
                            </Fragment>



                          
                        </Fragment>

                    )}
                    

                    {doubtViewtoggle && (

                        <Fragment>

                            <QandaForm  channel_id={channel_id} card_id={card._id}/>


                            {qandacardlist && qandacardlist.map((qanda) => (

                                <Fragment>
                                    <QandaItem channel_id={channel_id} qandaboard_id={qandaboard_id} qanda={qanda}/>
                                    <br />
                                </Fragment>


                            ))}


                        </Fragment>

                    )}



                    <br />

                    </Card.Body>


                </Card>  

            

        </>
    )
}


export default TYCard
