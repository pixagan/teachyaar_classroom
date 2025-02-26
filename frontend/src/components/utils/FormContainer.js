// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({children}) => {
    return (
        <Container>

            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>

        </Container>
    )
}

export default FormContainer