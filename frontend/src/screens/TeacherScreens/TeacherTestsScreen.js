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

import {useInterval} from '../../hooks/useInterval'
import { useHistory } from 'react-router-dom'

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
    deviceDetect
  } from "react-device-detect";

import { useNavigate } from 'react-router-dom';



export const TeacherTestsScreen = ({}) => {
    

    const loading = false;
    const error = null;

    const deviceType = isMobile ? 'Mobile' : 'Desktop';

    const dispatch = useDispatch()
    //const history = useHistory()
    const navigate = useNavigate();


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const channelDetail = useSelector(state => state.channelDetail)
    const { loading:loadingCS, error:errorCS, channel:channelCS } = channelDetail

    const tests = [{
        id:1,
        title:'Tests 1',
        description:'This is a test',
        content:'This is the content of the note',
        createdAt:'2021-01-01',
        updatedAt:'2021-01-01'
    }]



    useEffect(() => {


            //dispatch(listChannels())



    }, [])



    return (

        <div style={{padding:'10px', margin:'20px', minHeight:'98vh'}}>
          

            <h1>Tests</h1>

            {tests && tests.map((ctest, cindex)=>(
                <Card>
                    <Card.Header>
                        <Card.Title>{ctest.title}</Card.Title>
                    </Card.Header>
                </Card>
            ))}


      
  

        </div>
    )
}


export default TeacherTestsScreen
