// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, ListGroup, Form, OverlayTrigger, Tooltip, InputGroup } from 'react-bootstrap'
import Message from '../../components/utils/Message'
import Loader from '../../components/utils/Loader'
import TYCard from '../../components/cards/TYCard'
import QandaForm from '../../components/qanda/QandaForm'
import QandaItem from '../../components/qanda/QandaItem'

import {listChannels, createChannel, deleteChannel, updateChannelRT, enrollRequestChannel, unsubscribeChannel, listChannelDetail} from '../../actions/channelActions'
import {listTYCards, createTYCard} from '../../actions/cardActions'
import {listQPosts} from '../../actions/qandaActions'

import {listCourseNotebooks} from '../../actions/channelActions'
import {createNotebook} from '../../actions/notebookActions'

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



export const TeacherNotebooksScreen = ({}) => {
    

    const loading = false;
    const error = null;

    const deviceType = isMobile ? 'Mobile' : 'Desktop';

    const dispatch = useDispatch()
    //const history = useHistory()
    const navigate = useNavigate();

    const { course_id } = useParams();

    const [notebookTitle, setNotebookTitle] = useState('')


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const notebookList = useSelector(state => state.notebookList)
    const { notebooks:notebooks } = notebookList

    const notes = [{
        _id:"asd3adasdadads",
        title:'Note 1',
        description:'This is a note',
        content:'This is the content of the note',
        createdAt:'2021-01-01',
        updatedAt:'2021-01-01'
    }]

    const addNotebookRequest = (e) => {
        e.preventDefault()
        dispatch(createNotebook(notebookTitle, course_id))
    }

    const navigateToNotebook = (notebook_id) => {
        navigate(`/teacher/notebook/${notebook_id}`)
    }



    useEffect(() => {

            dispatch(listCourseNotebooks(course_id))

    }, [])



    return (

        <div style={{padding:'10px', margin:'20px', minHeight:'98vh'}}>
          

            <h1>Notes</h1>

            <Card style={{border:'None', marginBottom:'10px'}}>

                <Form onSubmit={addNotebookRequest}>

                    <InputGroup>

                        <Form.Group controlId='channelName' style={{width:'80%'}}>
                            <Form.Control type='text' placeholder='Notebook Title' value={notebookTitle} onChange={(e) => setNotebookTitle(e.target.value)}> 
                            </Form.Control>
                        </Form.Group>


                        <Button className="button_gen" type='submit' variant='primary'>
                            Create
                        </Button>
                     
                    </InputGroup>



                </Form>


            </Card>

            

            {notebooks && notebooks.map((cnote, cindex)=>(
                <Card key={cindex} onClick={() => navigateToNotebook(cnote._id)}>
                    <Card.Header>
                        <Card.Title>{cnote.title}</Card.Title>
                    </Card.Header>
                </Card>
            ))}


      
  

        </div>
    )
}


export default TeacherNotebooksScreen
