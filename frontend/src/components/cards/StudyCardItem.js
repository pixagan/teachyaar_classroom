// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import React , {useState, useEffect } from 'react'

import { Row, Col,  ListGroup, Card, Button, Form } from 'react-bootstrap'


export const StudyCardItem = ({card}) => {


    const [itemText, setItemText ] = useState('')

    const card_id = card._id



    useEffect(() => {
        //getQandA()
    }, [])





    const addItem = (e) => {
        //e.preventDefault()
        //dispatch(addItemStudyCard(card_id, itemText))
    }






    return (

        <>


                <Card>


                    <Card.Body>

                    <br />

                    <Row>
                        <Col >

                        
                        <Card>

                            <Form onSubmit={addItem}>

                            <Row>
                                <Col>
                                <Button> Text </Button>
                                <Button> File </Button>
                                <Button> Equation </Button>
                                <Button> Board </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={11}>
                                    <Form.Group controlId='itenText'>
                                    <Form.Control type='text' placeholder='Add Item Text' value={itemText} onChange={(e) => setItemText(e.target.value)}> 
                                    </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={1}>
                                    <Button type='submit' variant='primary'>
                                        Add Item
                                    </Button>
                                </Col>

                            </Row>


                            </Form>


                        </Card>



                        </Col>
                    </Row>


                    <br />

                    <Row>

                        {card.items && (

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

                    </Card.Body>


                </Card>  

            

        </>
    )
}


export default StudyCardItem
