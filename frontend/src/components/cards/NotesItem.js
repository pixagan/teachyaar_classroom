// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, ListGroup, Card, Button, Form, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'


import LoadImage from '../utils/LoadImage'


import  DownloadPdfFile from '../utils/DownloadPdfFile'
import  ViewPdf2 from '../utils/ViewPdf2'

import axios from 'axios'
import Resizer from "react-image-file-resizer";

import { addItemStudyCard, deleteCardItem, editCardItem } from '../../actions/cardActions'
import {setAlert} from '../../actions/alertActions';

import {

    CARD_ADDITEM,

} from '../../constants/cardConstants'

export const NotesItem = ({card}) => {

    const dispatch = useDispatch()

    const [itemText, setItemText ] = useState('')


    const card_id = card._id


    const [viewMode, setViewMode ] = useState('Text')
    const toggleViewMode = (mode_in) => {
        setViewMode(mode_in)
    }


    const [addTagtoggle, setaddTagtoggle ] = useState(false)
    const toggleAddTag = () => {
        setaddTagtoggle(addTagtoggle => !addTagtoggle)
    }

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        //getQandA()
    }, [])




    const submitHandler = (e) => {
        e.preventDefault()
        //console.log(reply)
        //dispatch(createPostReply(reply, board_id, qanda._id))
    }

    const addItem = (e) => {
        e.preventDefault()

        if(viewMode == "Text"){
            dispatch(addItemStudyCard(card.channel, card_id, viewMode, itemText, null, null))
        }else if(viewMode == "File"){
            dispatch(addItemStudyCard(card.channel, card_id, viewMode, null, NotesFile, null))
        }

        setItemText('')
        setNotesFile('')
   
    }


    const updateItem = (item) => {

        //e.preventDefault()
        dispatch(editCardItem(card.channel, card._id, item._id))
    }


    const addTags = ( ) => {
        
        //dispatch(addTagStudyCard(card_id, tagC))
    }





    const [uploading, setUploading] = useState(false)
    const [NotesFile, setNotesFile] = useState('')

    const uploadFileHandler = async(e) => {
        const imfile = e.target.files[0]


        var file = null;
        var filetype = null;

        //type: "application/pdf"
        //type: "image/jpeg"
        //size: 

        console.log("File ",imfile)

        //if file is pdf
        if(imfile.type === 'application/pdf'){
            file = imfile
            filetype = 'pdf'
        }


        //if file is image
        if(imfile.type === 'image/jpeg' || imfile.type ==='image/png'){

            //Compress file
            file = await resizeFile(imfile);
            filetype = 'image'
        }

        if(filetype == 'pdf' || filetype=='image' ){


        //console.log("Image Pic ", file)

            if(file.size<=5242880){

                console.log("PDF fileupload: ",file)


                const formData = new FormData()
                formData.append('image', file)
                setUploading(true)
                //console.log("Upload Image file")
        
                try{
                    const config = {
                        headers: {
        
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${userInfo.token}`
        
                        }
                    }
        
                    const { data } = await axios.post(`/api/uploads/${card.channel}/${card_id}`, formData, config)
        

                    dispatch({
                        type: CARD_ADDITEM,
                        payload: data
                    })

                    setNotesFile(data)
        
                    setUploading(false)
                }catch(error){
                    console.error(error)
                    setUploading(false)
                }

            }else{
                            
                dispatch(setAlert('File is too large, we currently only allow a maximum file size of 5MB, you can store the file on google drive or dropbox and share a link here', 'danger'));

            }




        }else{
            
            dispatch(setAlert('Invalid file type: Use image or Pdf file', 'danger'));


        }




    }

    const submitFileHandler = (e) => {
        e.preventDefault()
        //console.log(reply)
        //dispatch(addNotesFile(card_id, NotesFile))
    }


    const deleteCardItemConfirm = (card_id, item_id) => {
        dispatch(deleteCardItem(card.channel, card_id, item_id))
    }


    const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
        file,
        1400,
        800,
        "jpeg",
        100,
        0,
        (uri) => {
            resolve(uri);
        },
        "file"
        );
    });


        //Pop overs
        const addItemTooltip = (
            <Tooltip id="popover-basic">
                Add Text Item to Card
            </Tooltip>
        );



    return (

        <>


                <Card>


                    {/* <Card.Body> */}

                    <br />


                    {userInfo.isTeacher && (
                        <Fragment>


                        <Row>
                        <Col >

                        
                        <Card>



                        <Row>
                            <Col>

                                <Button className="button_gen" onClick={()=>toggleViewMode('Text')}>Text</Button>
                                <Button className="button_gen" onClick={()=>toggleViewMode('File')}>File</Button>
                            </Col>

                        </Row>


                            {viewMode == "Text" && (


                                <Form onSubmit={addItem}>

                                <Row>
                                    <Col md={11}>
                                        <Form.Group controlId='itenText'>
                                        <Form.Control as="textarea" placeholder='Add Item Text' value={itemText} onChange={(e) => setItemText(e.target.value)}> 
                                        </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}>
                                    <OverlayTrigger  placement="top" overlay={addItemTooltip}>
                                        <Button className="button_gen" type='submit' variant='primary'>
                                            {/* Add Item */}
                                            <i className="fas fa-plus fa-xs"></i>
                                        </Button>
                                        </OverlayTrigger>
                                    </Col>

                                </Row>


                                </Form>

                            )}





                            {viewMode == "File" && (

                                <Form onSubmit={addItem}>


                                <Row>
                                    <Col md={11}>
                                        
                                        {/* <Form.Group controlId='image'>

                                            <Form.Label>Add an Image or Pdf file to the notes</Form.Label>
                                            <Form.File id='exam-file'  label={NotesFile} custom onChange={uploadFileHandler}></Form.File>
                                            
                                            {uploading && <Loader />}
                                        </Form.Group> */}

                                        <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Add an Image or Pdf file to the notes</Form.Label>
                                        <Form.Control type="file" onChange={uploadFileHandler}/>
                                        </Form.Group>
                                    
                                    </Col>

                                    <Col md={1}>

                                    <Button className="button_gen" type='submit' variant='primary'>
                                    <i className="fas fa-plus fa-xs"></i>
                                    </Button>
                                    
                                    </Col>

                                </Row>




                                </Form>

                                
                            )}

                            {/* 
                            {viewMode == "Board" && (

                                <div>
                                    <WBCard card={card}/>
                                </div>


                            )} */ }






                        </Card>



                        </Col>
                    </Row>



                        </Fragment>
                    )}




                    <br />

                    <Row>

                        {card.items && (

                            <Col>

                            <ListGroup as="ul">


                            {card.items && card.items.map((item, index) => (
                            <ListGroup.Item as="li">


                                <Row>
                                    <Col md={10}>

                                    {item.text && (
                                    <p>{item.text}</p>
                                    )}

                                {item.file && (


                                    <Fragment>

                                    {item.file.filetype == 'pdf' && (
                                       // <p><i class="fas fa-file-pdf fa-2x"></i> : {item.file.filename}</p>
                                       
                                        <Fragment>
                                       
                                       {userInfo && userInfo.isTeacher && (
                                         < ViewPdf2 card={card} item_no={index} fileInfo={item.file}/>
                                        //< DownloadPdfFile card={card} item_no={index} fileInfo={item.file}/> 
                                       )}

                                       {userInfo && !userInfo.isTeacher && (
                                        < DownloadPdfFile card={card} item_no={index} fileInfo={item.file}/>    
                                        )}

                                        </Fragment>

                                        
                                    )}

                                    {(  item.file.filetype == 'image') && (
                                        <LoadImage card={card} item_no={index} fileInfo={item.file}/>
                                        //<p>File: {item.file}</p>
                                    )}



                                    </Fragment>

                                )}

                                </Col>
                                <Col md={2}>

                                
                                {/* {item.text && (

                                <span >
                                <i className="fas fa-edit fa-xs"></i> |
                                </span>

                                )}  */}

                                {userInfo._id == card.user && (
                                <span  variant='danger' onClick={()=>deleteCardItemConfirm(card._id, item._id)}>
                                <i className="fas fa-times fa-xs" ></i>
                                </span>
                                )}

                                    
                                    
                                    
                                    </Col>
                                </Row>


              

                            </ListGroup.Item>
                                        
                            ))}

                            </ListGroup>

                            </Col>

                        )}


                    </Row>

                    {/* </Card.Body> */}


                </Card>  

            

        </>
    )
}


export default NotesItem
