// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React, {useState, useEffect, Fragment} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/utils/Message'
import Loader from '../../components/utils/Loader'
import FormContainer from '../../components/utils/FormContainer'
import { login } from '../../actions/userActions'

import { useNavigate } from 'react-router-dom';

const AdminLoginScreen = ( {} ) => {

    const [email, setEmail] = useState('')
    const [password, setPassword ] = useState('')
    

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } =  userLogin



    useEffect(() => {
        if(userInfo){

            if(userInfo.isAdmin) {
                navigate(`/admindashboard`)
            }else{
                navigate(`/dashboard`)
            }

            
        }
    }, [userInfo, userLogin])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    return (


        <div style={{padding:'5px', minHeight:'95vh', padding:'20px'}}>

            
            <FormContainer>
            <h3> Admin : Login In </h3>
            <hr />
            {error && <Message variant='danger'>{error}</Message> }
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address/Phone No</Form.Label>
                    <Form.Control type='text' placeholder='Enter Email/Phone No' value={email} onChange={(e) => setEmail(e.target.value)}> 
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}> 
                    </Form.Control>
                </Form.Group>


                <Button className="button_gen" type='submit' variant='primary'>
                    Log in
                </Button>

            </Form>
            



        </FormContainer>



        </div>


    )
}


export default AdminLoginScreen
