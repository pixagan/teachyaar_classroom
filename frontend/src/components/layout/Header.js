// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React, { useEffect } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import {Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import { logout }  from '../../actions/userActions'

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())

        navigate("/")

    }



    useEffect(() => {


    }, [])

    const navigateToHome = () => {
        navigate('/')
    }


    return (
        <header className="header" style={{border:'None', marginBottom:'0px', borderLeft:'None', borderRight:'None'}}>

            <Navbar expand="lg" collapseOnSelect style={{padding:'0px', borderColor:'#b861fb'}}>
                
                <Container>
                <LinkContainer to='/'>
                    <>
                    <Nav.Link onClick={()=>navigateToHome()}>

                         <Button style={{  margin:'1px', paddingTop:'5px', paddingBottom:'5px', borderRadius:'20px', backgroundColor:'white', color:'black',  border:'None', borderColor:'#c2179a'}}>
                            TeachYaar Classroom
                         </Button>
                         
                        </Nav.Link>

                    </>

                </LinkContainer>

                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />



                <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="ml-auto">


                    <LinkContainer to='/'>
                        <Nav.Link className='navbarlink'><Button style={{  margin:'1px', paddingTop:'5px', paddingBottom:'5px', borderRadius:'20px', backgroundColor:'white', color:'black',  border:'None', borderColor:'#c2179a'}}>Home</Button></Nav.Link>
                    </LinkContainer>


                {!userInfo && (

                    <>


                    <LinkContainer to='/teacher/login'>
                    <Nav.Link className='navbarlink'><Button style={{  margin:'1px', paddingTop:'5px', paddingBottom:'5px', borderRadius:'20px', backgroundColor:'white', color:'black',  border:'None', borderColor:'#c2179a'}}>Teacher Login</Button></Nav.Link>
                    </LinkContainer>

                    <LinkContainer to='/student/login'>
                    <Nav.Link className='navbarlink'><Button style={{  margin:'1px', paddingTop:'5px', paddingBottom:'5px', borderRadius:'20px', backgroundColor:'white', color:'black',  border:'None', borderColor:'#c2179a'}}>Student Login</Button></Nav.Link>
                    </LinkContainer>
                    
                    </>


                )}


                {userInfo && (

                <NavDropdown  className='navbarlink' title={"Hi " + userInfo.name} id='username'>

                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

              


                </NavDropdown>




                )}

                   

                  
                </Nav>

            </Navbar.Collapse> 


            </Container>

        </Navbar>

        </header>
    )
}

export default Header