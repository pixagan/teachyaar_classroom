// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React from 'react'
import {  Row, Col } from 'react-bootstrap'
import {Nav  } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Container} from 'react-bootstrap'


const Footer = () => {
    return (

        <>
        
        <footer className="footer">
        

        <Container>

        <hr/>

        <Row>
          <Col>
          <LinkContainer to='/termsandconditions'>
                    <Nav.Link> 
                    <span style={{color:'white'}}>Terms and Conditions</span>
                    </Nav.Link>
            </LinkContainer>
          
          </Col>
          <Col>
          <LinkContainer to='/privacypolicy'>
                <Nav.Link> 
                <span style={{color:'white'}}>Privacy Policy</span>
                </Nav.Link>
            </LinkContainer>
          
          </Col>
          <Col>
          
             
              <span style={{color:'white'}}></span>
             
            
         
          </Col>
        </Row>

        <hr/>



        <hr />

        </Container>





        </footer>
        
        </>


        )
    }
    
    export default Footer