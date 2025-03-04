// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect, Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Card, Form, Button, ListGroup, InputGroup, OverlayTrigger, Popover, Tooltip, Badge } from 'react-bootstrap'


import NotebookPageTitle from '../../components/notebook/NotebookPageTitle'
import AddNotebookCardForm from '../../components/notebook/AddNotebookCardForm'
import EditNotebookCard from '../../components/notebook/EditNotebookCard'

// import MainMenu from '../components/MainMenu'

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    deviceDetect
  } from "react-device-detect";


export const NotebookCreatorScreen = ({match, history}) => {


    // var course_id = match.params.course_id

    const {course_id}  = useParams();

    const [selectSession, setSelectedSession ] = useState('')

    const dispatch = useDispatch()

    // const cardList = useSelector(state => state.cardList)
    // const { cards } = cardList

    // const notebookR = useSelector(state => state.notebookR)
    // const { title, sessionMode } = notebookR



    useEffect(() => {



    }, [])

   


    return (

        <>

    
            <div style={{minHeight:'100vh'}}>


                {/* <NotebookPageTitle />
                

                {cards && cards.map((icard, index)=>(
                    <EditNotebookCard card_in={icard}/>
                ))}


                {sessionMode == 'edit' && (
                    <>
                        <AddNotebookCardForm />
                    </>
                )} */}

                


            </div>

         

  

        </>
    )
}


export default NotebookCreatorScreen
