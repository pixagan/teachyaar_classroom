// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Row, Col, ListGroup } from 'react-bootstrap'


export const LectureStudyNote = ({card}) => {



    useEffect(() => {
        //getQandA()
    }, [])





    return (

        <>


                    <br />
                    

                    <Row>
                        <Col >

                        
                    
{/* 
                            <Form onSubmit={addItem}>


                            <Row>
                                <Col md={9}>
                                    <Form.Group controlId='itenText'>
                                    <Form.Control type='text' placeholder='Add Item Text' value={itemText} onChange={(e) => setItemText(e.target.value)}> 
                                    </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={1}>
                                    <Button type='submit' variant='primary'>
                                        <i className="fas fa-plus fa-xs"></i>
                                    </Button>
                                </Col>

                            </Row>


                            </Form> */}


                    



                        </Col>
                    </Row>


                    <br />

                    <Row>

                        {card && card.items && (

                            <Col>

                            <ListGroup as="ul">


                            {card.items && card.items.map((item) => (
                            <ListGroup.Item as="li">

                                {item.text}

                                {/* <Button onClick={()=>dispatch(deleteItemStudyCard(card._id, item._id))}>
                                    <i className="fas fa-times fa-xs"></i>
                                 </Button> */}
              

                            </ListGroup.Item>
                                        
                            ))}

                            </ListGroup>

                            </Col>

                        )}


                    </Row>



            

        </>
    )
}


export default LectureStudyNote
