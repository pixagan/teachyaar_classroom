import React , {useState, useEffect,  Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Card, Button, Form,  OverlayTrigger, Tooltip, InputGroup, ListGroup, Badge } from 'react-bootstrap'

import Moment from 'react-moment';

import {updateCardItem} from '../../../actions/notebookActions'

export const TableItem = ({card_id, item_id, item_in}) => {

    const dispatch = useDispatch()

    const notebookR = useSelector(state => state.notebookR)
    const { sessionMode } = notebookR

    const [text, setText] = useState('')

    const [cellValue, setCellValue] = useState('')

    const [nrows, setNrows] = useState(2)
    const [ncols, setNcols] = useState(2)
    const [values, setValues] = useState({})

    const [selectedRow, setSelectedRow] = useState(-1)
    const [selectedCol, setSelectedCol] = useState(-1)

    const onSelectCell = (irow, icol) => {
        setSelectedRow(irow+1)
        setSelectedCol(icol+1)
    }



    const [viewMode, setViewMode] = useState('view')
    const toggleViewMode = () => {

        console.log("View toggle", viewMode)

        if(viewMode == 'view'){
            setViewMode('edit')
            setText(item_in.text)

            // setValues(item_in.table.values)
            // setNcols(item_in.table.nrows)
            // setNrows(item_in.table.ncols)

        }else{
            setViewMode('view')
        }
    }

    const deleteItem = () => {

    }

    const addRow = () => {
        setNrows(parseInt(nrows) + 1)
    }

    const addCol = () => {
        setNcols(parseInt(ncols) + 1)
    }

    const deleteColumn = () => {

    }

    const deleteRows = () => {

    }

    const updateCell = (index1, index2) => {
        var ctable = values
        ctable[index1.toString() + "," + index2.toString()] = cellValue
        setValues(ctable)

        console.log("table ", ctable)

        setSelectedRow(-1)
        setSelectedCol(-1)
    }


    useEffect(() => {
        
        setText(item_in.text)

        setValues(item_in.table.values)
        setNcols(parseInt(item_in.table.nrows))
        setNrows(parseInt(item_in.table.ncols))
    }, [])

    const updateTextItem = () => {

        setViewMode('view')
        var newItem = item_in
        
        newItem.nrows = nrows
        newItem.ncols = ncols
        newItem.values = values

        dispatch(updateCardItem(card_id, item_id, newItem))

    }


    return (

        <>

            {viewMode == 'view' ? (

                <>
                    <p>{item_in.text}</p>

                    <InputGroup>
                        <Badge style={{paddingTop:'2px', paddingBottom:'2px', backgroundColor:'#8c8d8f', color:'white', marginRight:'2px'}} onClick={()=>addRow()}>+ Rows</Badge>
                        <Badge style={{paddingTop:'2px', paddingBottom:'2px', backgroundColor:'#8c8d8f', color:'white', marginRight:'2px'}} onClick={()=>addCol()} >+ Cols</Badge>
                        <Badge style={{paddingTop:'2px', paddingBottom:'2px', backgroundColor:'#8c8d8f', color:'white'}} onClick={()=>updateTextItem()} >Update</Badge>
                    </InputGroup>

                    <table style={{marginTop:'2px'}}>
                        {Array(nrows).fill(0).map((val, index1) =>(
                            <tr>

                                {Array(ncols).fill(0).map((val, index2) =>(
                                    <td style={{minWidth:'10vw', border:'solid', borderWidth:'1px'}} onClick={()=>onSelectCell(index1, index2)}>
                                        
                                        {(selectedRow == index1+1 && selectedCol == index2+1) ? (

                                                <>
                                                    <InputGroup>

                                                    <Form.Control type='text' placeholder='text' value={cellValue} onChange={(e) => setCellValue(e.target.value)} style={{backgroundColor:'white'}}> 
                                                    </Form.Control>
                                                    <Badge onClick={()=>updateCell(index1, index2)}>
                                                        <i className="fas fa-check" ></i>
                                                    </Badge>
                                                    
                                                    </InputGroup>
                                                    
                                                
                                                </>

                                        ) : (

                                            <>

                                            {values && values[index1+ "," + index2] ? (
                                            
                                                <p>{values[index1+ "," + index2]}</p>

                                            

                                                ) : (

                                                    <p></p>

                                                )}


                                            </>

                                        )}

                                        
                                        
                                    </td>

                                ))}

                            </tr>
                        ))}

                    </table>

                    
                
                </>
                

            ): (

                <>
                {sessionMode == 'edit' && (
                    <InputGroup>
                    <Form.Control type='text' placeholder='text' value={text} onChange={(e) => setText(e.target.value)} style={{backgroundColor:'white'}}> 
                    </Form.Control>
                    <Badge>
                        <i className="fas fa-check" onClick={()=>updateTextItem()}></i>
                    </Badge>
                </InputGroup>
                    )}

                </>
                
            )}

                {sessionMode == 'edit' && (
                    <span>
                    <Badge style={{padding:'5px'}} onClick={()=>toggleViewMode()}><i className="fas fa-edit" ></i></Badge>
                    <Badge style={{padding:'5px'}} onClick={()=>deleteItem()}><i className="fas fa-trash" ></i></Badge>
                </span>
                )}
            
                

        </>

    )
}


export default TableItem
