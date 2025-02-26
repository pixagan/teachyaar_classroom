// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React , {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {  Button } from 'react-bootstrap'

import axios from 'axios';


export const LoadImage = ({card, item_no, fileInfo}) => {


    const card_id = card._id
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [imgIsLoaded, setImgIsLoaded] = useState(false)

    //const card_id = card._id

    var blob = null;

    const toggleImageButton = () =>{
        //setToggleImage(toggleImage != toggleImage)
        DownloadImageFile()
    }



    const DownloadImageFile = async() =>{


        // const { userInfo } = getState()

        if(!imgIsLoaded){

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                responseType: 'blob'
            }
    
            //const { data } = await axios.get(`/api/downloads/exam/${card_id}`, config)
    
    
            console.log("Download image from file ", fileInfo)

            const file_id = fileInfo.fileid
    
            const { data } = await axios.post(`/api/downloads/image/${card.channel}/${card._id}`, {file_id}, config)
    
            console.log(data)
    
            // //return download(new Blob(data), "imgdown", 'image/png');
    
            //var FileSaver = require('file-saver');
            blob = new Blob([data], {type: "image/png"});
            //FileSaver.saveAs(blob, "imgdown.png");
    
            const url = URL.createObjectURL(blob)
    
            console.log("URL : ", url)
    
            const img = document.createElement('img')
            img.src = url
            img.className = 'notes_image'
            document.getElementById('imag_311_'+card_id+"_"+item_no).appendChild(img)
    
            setImgIsLoaded(true)

        }



    }


    useEffect(() => {
        
    }, [])


    return (

        <>

            <Button className="button_gen" onClick={() => toggleImageButton()}>{fileInfo.filename} </Button>
            {/* <img src={URL.createObjectURL(blob)}/> */}

            <div className='notes_image' id={`imag_311_${card_id}_${item_no}`}></div>


            


        </>
    )
}


export default LoadImage
