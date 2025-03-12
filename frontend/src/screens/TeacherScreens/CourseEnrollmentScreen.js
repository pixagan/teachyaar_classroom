// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, ListGroup, Form, OverlayTrigger, Tooltip, InputGroup } from 'react-bootstrap'


import {useInterval} from '../../hooks/useInterval'
import { useHistory } from 'react-router-dom'


import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    deviceDetect
  } from "react-device-detect";

import { useNavigate,  useParams } from 'react-router-dom';



export const CourseEnrollmentScreen = ({}) => {
    

    const loading = false;
    const error = null;

    const deviceType = isMobile ? 'Mobile' : 'Desktop';

    const dispatch = useDispatch()
    //const history = useHistory()
    const navigate = useNavigate();


    const { course_id } = useParams();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    // const channelDetail = useSelector(state => state.channelDetail)
    // const { loading:loadingCS, error:errorCS, channel:channelCS } = channelDetail

    const enrollments = [
        {
            'student_id':1,
            'student_name':'John Doe',
            'student_email':'john.doe@example.com',
            'enrollment_date':'2021-01-01',
            'enrollment_status':'Active'
        },
        {
            'student_id':2,
            'student_name':'Jane Doe',
            'student_email':'jane.doe@example.com',
            'enrollment_date':'2021-01-01',
            'enrollment_status':'Active'
        },
        {
            'student_id':3,
            'student_name':'John Doe',
            'student_email':'john.doe@example.com',
            'enrollment_date':'2021-01-01',
            'enrollment_status':'Active'
        }
        
    ]



    useEffect(() => {


            //dispatch(listCourseEnrollments(course_id))



    }, [])



    return (

        <div style={{padding:'10px', margin:'20px', minHeight:'98vh'}}>
          

            <p className='h3'>Enrollment</p>

            <Button className='button_gen' style={{marginBottom:'20px'}} >Check Enrollment</Button>

            <ListGroup> 

                {enrollments && enrollments.map((enrollment, index)=>(
                    <ListGroup.Item key={index}>
                        <p className='h5'>{enrollment.student_name}</p>
                        <p className='h5'>{enrollment.student_email}</p>
                        <p className='h5'>{enrollment.enrollment_date}</p>
                        <p className='h5'>{enrollment.enrollment_status}</p>
                    </ListGroup.Item>
                ))}

            </ListGroup>

      

        </div>
    )
}


export default CourseEnrollmentScreen
