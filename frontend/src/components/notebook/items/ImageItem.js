import React , {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {  Button } from 'react-bootstrap'

import axios from 'axios';


export const ImageItem = ({card_in}) => {


    const dispatch = useDispatch()

    const [imageUrl, setImageUrl] = useState('')

   
    var blob = null;

    

    useEffect(() => {

        if(card_in.image){
            const imageUrlTemp = card_in.image ? URL.createObjectURL(card_in.image) : '';
            setImageUrl(imageUrlTemp)
        }
        
    }, [])


    return (

        <>

            {imageUrl && <img src={imageUrl} alt="Uploaded" />}

        </>
    )
}


export default ImageItem
