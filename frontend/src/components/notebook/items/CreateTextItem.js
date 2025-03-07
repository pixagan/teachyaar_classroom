import React , {useState, useEffect,  Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Card, Button, Form,  OverlayTrigger, Tooltip, InputGroup, ListGroup, Badge } from 'react-bootstrap'

import Moment from 'react-moment';
import { v4 as uuidv4 } from 'uuid';

//import MathJax from 'react-mathjax';

import {addNotebookItem} from '../../../actions/notebookActions'

export const CreateTextItem = ({notebook_id}) => {

    const dispatch = useDispatch()

    const [text, setText] = useState(' ')
    const [image, setImage] = useState('')

    const [viewMode, setViewMode] = useState('view')
    const toggleViewMode = () => {
        
    }

    const [itemType, setItemType] = useState('text')
    const toggleItemType = (mode_in) => {
        setItemType(mode_in)
    }



    const addItemRequest = () => {

        if(itemType == 'image'){

            var newItem = {
                "_id":uuidv4().toString(),
                "text":text,
                "type":itemType,
                "table":{
                    "nrows":2,
                    "ncols":2,
                    "values":{}
                },
                "image":image
            }
            dispatch(addNotebookItem(notebook_id, newItem))
            setText("")

        }else{

            var newItem = {
                "_id":uuidv4().toString(),
                "text":text,
                "type":itemType,
                "table":{
                    "nrows":2,
                    "ncols":2,
                    "values":{}
                },
                "image":null
            }
            dispatch(addNotebookItem(notebook_id, newItem))
            setText("")

        }

        
    }


    const onLoadImage = (event) => {
        const file = event.target.files[0];
        if (!file) {
          return;
        }
    
        try {
            console.log("Image ", file)
            setImage(file)
            
          } catch (error) {
            console.error("Error reading file", error);
          }


    }

    useEffect(() => {
        

    }, [])




    return (

        <>

            {itemType == 'equation' && (
                <>
                    {/* <MathJax.Provider>
                        <div style={{display:'flex', justifyContent:'left'}}>
                            <MathJax.Node formula={text}/>
                        </div>
                    </MathJax.Provider> */}

                </>
            )}

            {itemType == 'image' && (
                <>
                    <input type="file" onChange={onLoadImage} accept="image/*" />
    

                </>
            )}


            <InputGroup>
                <Form.Control as='textarea' placeholder='text' rows={5} value={text} onChange={(e) => setText(e.target.value)} style={{backgroundColor:'white'}}> 
                </Form.Control>
                <Badge style={{backgroundColor:'#00bdee', color:'white'}} bg='#ebdc0c'>
                    <i className="fas fa-check" onClick={()=>addItemRequest()}></i>
                </Badge>
            </InputGroup>

            {/* <InputGroup>
            <Form.Control type='text' placeholder='text' value={text} onChange={(e) => setText(e.target.value)} style={{backgroundColor:'white'}}> 
            </Form.Control>
            <Badge style={{backgroundColor:'#00bdee', color:'white'}} bg='#ebdc0c'>
                <i className="fas fa-check" onClick={()=>addItemRequest()}></i>
            </Badge>
            </InputGroup> */}
            

            {/* <InputGroup>
                <Badge bg={itemType == 'text' ? '#f5deb3' : '#00bdee'} onClick={()=>setItemType('text')}  style={{padding:'5px', backgroundColor:itemType == 'text' ? '#147eb3' : '#00bdee', color:'white', marginRight:'2px'}}><i className="fa fa-text fa-lg">T</i></Badge>
                <Badge bg={itemType == 'equation' ? '#f5deb3' : '#00bdee'} onClick={()=>setItemType('equation')}  style={{padding:'5px', backgroundColor:itemType == 'equation' ? '#00bdee' : '#00bdee', color:'white', marginRight:'2px'}}><i className="fa fa-text fa-lg">E</i></Badge>
                <Badge bg={itemType == 'text' ? '#f5deb3' : '#00bdee'} onClick={()=>setItemType('code')}  style={{padding:'5px', backgroundColor:itemType == 'code' ? '#147eb3' : '#c2179a', color:'white', marginRight:'2px'}}><i className="fa fa-code fa-lg"></i></Badge> 
                <Badge bg={itemType == 'list' ? '#f5deb3' : '#00bdee'} onClick={()=>setItemType('list')}  style={{padding:'5px', backgroundColor:itemType == 'list' ? '#147eb3' : '#00bdee', color:'white', marginRight:'2px'}}><i className="fas fa-list fa-lg"></i></Badge>
                <Badge bg={itemType == 'image' ? '#f5deb3' : '#00bdee'} onClick={()=>setItemType('image')}  style={{padding:'5px', backgroundColor:itemType == 'image' ? '#147eb3' : '#00bdee', color:'white', marginRight:'2px'}}><i className="fas fa-image fa-lg"></i></Badge>
                <Badge bg={itemType == 'table' ? '#f5deb3' : '#00bdee'} onClick={()=>setItemType('table')}  style={{padding:'5px', backgroundColor:itemType == 'table' ? '#147eb3' : '#00bdee', color:'white', marginRight:'2px'}}><i className="fa fa-table fa-lg"></i></Badge>
                <Badge onClick={()=>setItemType('chart')}  style={{padding:'5px', backgroundColor:itemType == 'chart' ? '#147eb3' : '#c2179a', color:'white'}}><i className="fa fa-bar-chart fa-lg"></i></Badge>
            </InputGroup> */}
                        
        </>

    )
}


export default CreateTextItem
