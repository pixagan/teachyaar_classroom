// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Card, Button } from 'react-bootstrap'

//import { addItemStudyCard, addTagStudyCard, deleteItemStudyCard, deleteTagStudyCard, deleteStudyCard } from '../actions/studycardActions'



export const LiveLectureItem = ({card}) => {



    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        //getQandA()
    }, [])








    return (

        <>


                <Card>


                    <Card.Body>


                        {card.liveVideo && (

                            <Fragment>
                            
                            <Row>
                                <Col>
                                {(card.liveVideo.isStarted && !card.liveVideo.isEnded) ? (
                                    <Fragment>
                                        <p>Lecture is now live    </p>

                                        {/* <p>Started at : <Moment>{card.liveVideo.startedAt}</Moment></p> */}

                                    </Fragment>
                                    
                                ): (card.liveVideo.isEnded) ? (

                                    <p>Ended</p>
                                ): (!card.liveVideo.isStarted) ? (

                                    <p>Not Started</p>
                                ) : (
                                    <p></p>
                                ) }

                                </Col>

                                <Col>
                                {card.liveVideo.isStarted && (
                                    <p>Number Joined : {card.liveVideo.joinedList.length}</p>
                                )}
                                </Col>

                                {/* <Col>
                                
                                {card.liveVideo.isEnded ? (
                                    <p>Lecture has ended</p>

                                    // <p>Completed : <Moment>{card.liveVideo.completedAt}</Moment></p>
                                ):(
                                    <p></p>
                                )}
                                
                                </Col> */}

                            </Row>



                            {userInfo.isTeacher ? (
                                <Fragment>

                                <Link to={`/livelecture/${card.channel}/${card._id}`}>
                                    <Button>Start</Button>
                                </Link>                           
                                
                                <Button>Stop</Button>


                                </Fragment>
                            ): (
                                <Fragment>
                       

                                <Link to={`/livelecture/${card.channel}/${card._id}`}>
                                    <Button>Join</Button>
                                </Link>

                                <Button>Leave</Button>


                                </Fragment>
                            )}


                            </Fragment>


                        )}




                    {/* <div className="LiveVideoLec">
                    </div> */}


                    </Card.Body>


                </Card>  

            

        </>
    )
}


export default LiveLectureItem
