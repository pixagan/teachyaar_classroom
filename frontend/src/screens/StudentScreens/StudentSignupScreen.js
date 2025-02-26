// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React, {useState, useEffect, Fragment} from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Row, Col, ListGroup, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/utils/Message'
import Loader from '../../components/utils/Loader'
import FormContainer from '../../components/utils/FormContainer'
import { login } from '../../actions/userActions'

import { useNavigate } from 'react-router-dom';

const StudentSignupScreen = ( {} ) => {

    const [name, setName ] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [password, setPassword ] = useState('')
    const [isTeacher, setIsTeacher ] = useState(false)
    const [acceptTerms, setAcceptTerms ] = useState(false)
    const [confirmPassword, setConfirmPassword ] = useState('')
    const [message, setMessage] = useState(null)
    const [recommendationNo, setRecommendationNo] = useState('test')
    const [accessCode, setAccessCode] = useState('')
    

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } =  userLogin



    useEffect(() => {
        if(userInfo){

            if(userInfo.isStudent) {
                navigate(`/student/login`)
            }

            
        }
    }, [userInfo, userLogin])


    const popover = (
        <Tooltip id="popover-basic">
            Signup by clicking here
        </Tooltip>
    );



    const ValidateMobileNo = (mobileno) =>{
        const nDigits = mobileno.length

        let isnum = /^\d+$/.test(mobileno)


        let isMob = /^[6-9]\d{9}$/.test(mobileno) 

        if(nDigits == 10 && isnum && isMob) {
            return true
        }
        else{
            return false
        } 
    }


    const ValidateName = (name) => {

        const unstringed = name.replace(/\s/g, '')

        if (unstringed.length<=0 || !unstringed.length) {
            return false
        }

        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        console.log(format.test(unstringed))
        if(format.test(unstringed)){
            return false
        }


        return true


    }


    const ValidatePassword = (password, confirmPassword) => {


        if(password !=  confirmPassword){
            return false
        }

        const nDigits = password.length
        if(nDigits<6){
            setMessage('Passwords should be atleast 6 characters')
            return false
        }

        const unstringed = password.replace(/\s/g, '')
        if (unstringed.length<=0 || !unstringed.length) {
            setMessage('Passwords cannot be only blank spaces')
            return false
        }
    

        return true

    }



    const submitHandler = (e) => {
        e.preventDefault()


        if(acceptTerms){

            const isName = ValidateName(name)
            if(!isName){
                setMessage('Name is invalid')
            }

            const isMobile = ValidateMobileNo(phoneNo)
            if(!isMobile){
                setMessage('Mobile number is invalid')
            }

            if(password != confirmPassword){
                setMessage('Passwords do not match')
            }

            const isPassword = ValidatePassword(password, confirmPassword)

            if(isName && isMobile ){
                setMessage(null)
                //dispatch(register(name, email, phoneNo, password, isTeacher, acceptTerms, recommendationNo, accessCode))
                setAcceptTerms(false)
                document.getElementById('AgreeTermsCheckbox').checked = false


            }

        }else{
            setMessage('Please Accept Terms and Conditions, Privacy Policy and Teacher-On Boarding Policy by clicking on the checkbox ')
        }


    }


    return (


        <div style={{padding:'5px', minHeight:'95vh', padding:'20px'}}>

            <h3 style={{textAlign:'center'}}>Student Signup Screen</h3>
            <hr />

            
            <FormContainer>

                                
           
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} required> 
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} required> 
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='phoneNo'>
                    <Form.Label>Mobile No (+91)</Form.Label>
                    <Form.Control type='text' placeholder='Enter Mobile Number' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required>  
                    </Form.Control>
                </Form.Group>




                <Form.Group controlId='accessCode'>
                    <Form.Label>Access Code</Form.Label>
                    <Form.Control type='password' placeholder='Enter Access Code' value={accessCode} onChange={(e) => setAccessCode(e.target.value)}> 
                    </Form.Control>
                </Form.Group>


                
                <Form.Group className="mb-3" controlId="AgreeTermsCheckbox" value={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)}>
                    <Form.Check type="checkbox" label={<div> <span>I have read and agree to the </span>
                                                            <Link to = 'termsandconditions'>Terms and Conditions</Link>
                                                            <span>, </span>
                                                            <Link to = '/privacypolicy'>Privacy Policy </Link> 
                                                            <span>and </span>
                                                            <Link to='/teacheronboarding'>Teacher on-Boarding Policy</Link></div>} />
                </Form.Group>

                <OverlayTrigger  placement="right" overlay={popover}>
                    <Button className="button_gen" type='submit' variant='primary'>
                        Sign Up
                    </Button>
                </OverlayTrigger>



            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? <Link to={`/login`}> Login </Link>
                </Col>
            </Row>
            </FormContainer>



        </div>


    )
}


export default StudentSignupScreen
