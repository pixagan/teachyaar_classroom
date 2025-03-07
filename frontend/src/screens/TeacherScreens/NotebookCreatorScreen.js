// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Card, Form, Button, ListGroup, InputGroup, OverlayTrigger, Popover, Tooltip, Badge } from 'react-bootstrap'
import { useNavigate,  useParams } from 'react-router-dom';

import NotebookPageTitle from '../../components/notebook/NotebookPageTitle'
import AddNotebookCardForm from '../../components/notebook/AddNotebookCardForm'
import EditNotebookCard from '../../components/notebook/EditNotebookCard'


import CreateTextItem from '../../components/notebook/items/CreateTextItem'
import NoteItem from '../../components/notebook/items/NoteItem'
// import MainMenu from '../components/MainMenu'

import { listNotebooksById } from '../../actions/notebookActions'

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    deviceDetect
  } from "react-device-detect";


export const NotebookCreatorScreen = ({match, history}) => {


    // var course_id = match.params.course_id

    const {notebook_id}  = useParams();

    const [selectSession, setSelectedSession ] = useState('')

    const dispatch = useDispatch()

    // const notebookcardList = useSelector(state => state.notebookcardList)
    // const { notebookcards } = notebookcardList

    const notebookItems = useSelector(state => state.notebookItems)
    const { notebookcards } = notebookItems

    const notebookR = useSelector(state => state.notebookR)
    const { title, sessionMode } = notebookR


    useEffect(() => {

        dispatch(listNotebooksById(notebook_id))

    }, [])

   


    return (

        <>

    
            <div style={{minHeight:'100vh', marginTop:'10px', padding:'10px'}}>


                 <NotebookPageTitle />



                <Card style={{margin:'10px', padding:'5px', border:'None'}}>
                    <Card.Header style={{border:'None', margin:'3px', borderRadius:'10px'}}>   


                        {notebookcards && notebookcards.map((item, index)=>(
                            <NoteItem citem={item}/>
                        ))}

                        <CreateTextItem notebook_id={notebook_id}/>
        


                    </Card.Header>
                </Card>


                
                
                {/* {notebookcards && notebookcards.map((icard, index)=>(
                    <EditNotebookCard card_in={icard}/>
                ))}


                {sessionMode == 'edit' && (
                    <>
                        <AddNotebookCardForm />
                    </>
                )}

                 */}


            </div>

         

  

        </>
    )
}


export default NotebookCreatorScreen
