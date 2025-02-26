// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import express from 'express'
import multer from 'multer'
import path from 'path'

import { protect, admin, subscribed } from '../middleware/authMiddleware.js'
import Tycard from '../models/tycardModel.js'
import Studentexam from '../models/studentexamModel.js'
import {Tyfile} from '../models/tyfileModel.js'
import asyncHandler from 'express-async-handler'
import { logActivitypre,  logActivitypost} from '../middleware/activityMiddleware.js'
import Appmetrics from '../models/appmetricsModel.js'

import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

import dotenv from 'dotenv';

const router = express.Router()

const __dirname = path.resolve()

const storage = multer.memoryStorage();

dotenv.config()

const s3 = new aws.S3({
    endpoint: process.env.DOSPACESENDPOINT,
    credentials: new aws.Credentials(process.env.SPACES_KEY, process.env.SPACES_SECRET, null)
});

const BucketName = process.env.DO_BUCKETNAME



router.post('/image/:channel_id/:card_id', logActivitypre, protect, subscribed, asyncHandler(async(req,res) =>{

    

    const {file_id} = req.body

    const fileDown  = await Tyfile.findById(file_id)

    const filename = fileDown.filename

    let downloadParameters = {
        Bucket: BucketName,
        Key: filename
      };


      s3.getObject(downloadParameters, async(error, data) => {
        if (error){
          console.error(error);
          res.sendStatus(500);
          return;
        }
        res.contentType(data.ContentType);

        const appmet = await Appmetrics.findOne({type:'user'})
        appmet.fileMets.downloads = appmet.fileMets.downloads + 1
        appmet.fileMets.downloadSize = appmet.fileMets.downloadSize + fileDown.size
        await appmet.save()


        res.end(data.Body, 'binary');
      });


    


    //console.log("Downloading Exam File", fileDown)

    //res.sendFile(path.join(__dirname, fileDown.path))


    // const card_id = req.params.card_id
    // const Scard   = await Tycard.findById(card_id)

    //res.sendFile(path.join(__dirname, Scard.exam.questionpaperfile))

}))



router.get('/pdf/:channel_id/:card_id/:file_id', logActivitypre, protect, subscribed, asyncHandler(async(req,res) =>{

    

    const file_id = req.params.file_id

    const fileDown  = await Tyfile.findById(file_id)

    const filename = fileDown.filename


    if(fileDown == 'Instructor'){

        //check if the user requesting is INstructor or the owner

        const card = await Tycard.findById(fileDown.card)

        if(req.user._id.equals(card.user) || req.user._id.equals(fileDown.user)){


            console.log("Downloading Exam File", fileDown, filename)

            let downloadParameters = {
                Bucket: BucketName,
                Key: filename
              };
        
        
              s3.getObject(downloadParameters, async(error, data) => {
                if (error){
                  console.error(error);
                  res.sendStatus(500);
                  return;
                }
                res.contentType(data.ContentType);

                const appmet = await Appmetrics.findOne({type:'user'})
                appmet.fileMets.downloads = appmet.fileMets.downloads + 1
                appmet.fileMets.downloadSize = appmet.fileMets.downloadSize + fileDown.size
                await appmet.save()

                res.end(data.Body, 'binary');
              });



        }else{
            res.sendStatus(500);

        }


    }else{



    console.log("Downloading Exam File", fileDown, filename)

    let downloadParameters = {
        Bucket: BucketName,
        Key: filename
      };


      s3.getObject(downloadParameters, async(error, data) => {
        if (error){
          console.error(error);
          res.sendStatus(500);
          return;
        }
        res.contentType(data.ContentType);


        const appmet = await Appmetrics.findOne({type:'user'})
        appmet.fileMets.downloads = appmet.fileMets.downloads + 1
        appmet.fileMets.downloadSize = appmet.fileMets.downloadSize + fileDown.size
        await appmet.save()


        res.end(data.Body, 'binary');
      });



    }


    //res.sendFile(path.join(__dirname, fileDown.path))


    // const card_id = req.params.card_id
    // const Scard   = await Tycard.findById(card_id)

    //res.sendFile(path.join(__dirname, Scard.exam.questionpaperfile))

}))








router.get('/exam/:card_id', logActivitypre, protect, asyncHandler(async(req,res) =>{

    console.log("Downloading Exam File")

    const card_id = req.params.card_id
    const Scard   = await Tycard.findById(card_id)

    console.log("Exam : ",Scard)

    res.sendFile(path.join(__dirname, Scard.exam.questionpaperfile))

}))


router.get('/exam/submitted/:exam_id', logActivitypre, protect, asyncHandler(async(req,res) =>{

    console.log("Downloading Student Exam File")

    const exam_id = req.params.exam_id
    const exam    = await Studentexam.findById(exam_id)

    res.sendFile(path.join(__dirname, exam.answerpaperfile))

}))


export default router