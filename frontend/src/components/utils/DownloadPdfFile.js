// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

// import { Document, Page } from 'react-pdf';
// using ES6 modules
//import { pdf, Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import axios from 'axios';

//modes- notes, exam qpaper, exam grade, exam-submission
export const DownloadPdfFile = ({card, fileInfo}) => {
  
  
  const dispatch = useDispatch()

  const [imgIsLoaded, setImgIsLoaded] = useState(false)


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  console.log("Exam Card : ", card, "File INfo : ", fileInfo)

  var blob = null;

  const toggleImageButton = () =>{
    //setToggleImage(toggleImage != toggleImage)
    downloadPdf()
}
  


    const downloadPdf = async() =>{


        if(!imgIsLoaded){

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                responseType: 'blob'
            }


            var data_in = null;


            const { data } = await axios.get(`/api/downloads/pdf/${card.channel}/${card._id}/${fileInfo.fileid}`, config)


            console.log("Exam ", data)

            var FileSaver = require('file-saver');
            blob = new Blob([data], {type: "application/pdf"});
            //FileSaver.saveAs(blob, "filedown.pdf");

            const url = window.URL.createObjectURL(blob)

            console.log("URL : ", url)
            var FileSaver = require('file-saver');
            FileSaver.saveAs(blob, fileInfo.filename);


            setImgIsLoaded(true)

        }

    }


  return (
    <div>


        <i class="fas fa-file-pdf fa-2x"></i> : {fileInfo.filename} : 
        <Button className="button_gen" onClick={() => toggleImageButton()}><i class="fas fa-download"></i> </Button>

        

    </div>
  );

}
 

export default DownloadPdfFile