// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import express from 'express'
import multer from 'multer'
import path from 'path'
//import imageThumbnail from 'image-thumbnail'
import sharp from 'sharp'
//import sharp from 'image-thumbnail'

import { v4 as uuidv4 } from 'uuid';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

import { protect, admin, teacher, subscribed } from '../middleware/authMiddleware.js'

import User from '../models/userModel.js'
import Tycard from '../models/tycardModel.js'
import Studentexam from '../models/studentexamModel.js'
import {Tyfile} from '../models/tyfileModel.js'
import Appmetrics from '../models/appmetricsModel.js'

import dotenv from 'dotenv';

import { logActivitypre,  logActivitypost} from '../middleware/activityMiddleware.js'


const storage = multer.memoryStorage();

dotenv.config()


const router = express.Router()


const maxSize = 5242880

const s3 = new aws.S3({
    endpoint: process.env.DOSPACESENDPOINT,
    credentials: new aws.Credentials(process.env.SPACES_KEY, process.env.SPACES_SECRET, null)
});

const BucketName = process.env.DO_BUCKETNAME



// const storage = multer.diskStorage({
//     destination(req,file,cb){
//         cb(null, 'uploads/')
//     },
//     filename(req, file, cb){
//         console.log("FieldName ", file.fieldname, file.originalname)
//         const uuid = uuidv4();
//         cb(null, `${file.fieldname}-${uuid}${path.extname(file.originalname)}`)
//         //cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
//     }
// })



function checkFileType(file, cb){
    const filetypes = /jpg|jpeg|png|pdf|JPEG/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    console.log("file type, mime : ", file.originalname, file.mimetype, extname,mimetype )

    //if file is image create a thumbnail


    if(extname && mimetype){
        return cb(null, true)
    }else{
        cb('Images or PDF only')
    }
}


function checkFileTypePdf(file, cb){
    const filetypes = /pdf/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    console.log("file type, mime : ", file.originalname, file.mimetype, extname,mimetype )

    //if file is image create a thumbnail


    if(extname && mimetype){
        return cb(null, true)
    }else{
        cb('PDF only')
    }
}



function generateThumbnail(file,cb){

}


// const upload = multer({
//     storage,
//     fileFilter: function(req, file, cb){
//         checkFileType(file, cb)
//     },
//     limits: { fileSize: maxSize }
// })



// const uploadpdf = multer({
//     storage,
//     fileFilter: function(req, file, cb){
//         checkFileTypePdf(file, cb)
//     },
//     limits: { fileSize: maxSize }
// })




const upload = multer({ storage: storage, limits: { fileSize: maxSize } });
const uploadpdf = multer({ storage: storage, limits: { fileSize: maxSize } });



router.post('/:channel_id/:card_id',logActivitypre, protect, teacher, subscribed, upload.single('image'), async (req,res) =>{
    console.log("Loading File : ", req.params.card_id)


    const file = req.file

    const user = await User.findById(req.user._id)

    console.log("File ", req.file)

    const uuid = uuidv4();
    //cb(null, `${file.fieldname}-${uuid}${path.extname(file.originalname)}`)

    const newFilename = `${file.fieldname}-${uuid}${path.extname(file.originalname)}`

    let uploadParameters = {
        Bucket: BucketName,
        ContentType: req.file.mimetype,
        Body: req.file.buffer,
        ACL: 'private',
        Key: newFilename,
      };

      if( user.limits.filememory + req.file.size <= 1073741824){

  

      s3.upload(uploadParameters, async(error, data)=> {
        if (error){
          console.error(error);
          res.sendStatus(500);
          return;
        }



    //load card
    const card_id = req.params.card_id
    const channel_id = req.params.channel_id

    const Ncard = await Tycard.findById(card_id)
    
    if(Ncard){
        //generate and save thumbnail
        var resizedImageOut = null

        //image file types
        //const imageextname = imagefiletypes.test(path.extname(file.originalname).toLowerCase())
        const imagefiletypes = /jpg|jpeg|png|JPEG/
        const pdffiletypes = /pdf|PDF/


        //pdf file
        if(pdffiletypes.test(req.file.mimetype)){


            console.log("File pdf ", req.file.filename)

            const file_in = new Tyfile({
                type: 'pdf',
                user: req.user._id,
                originalname: req.file.originalname,
                mimeType: req.file.mimetype,
                destination: req.file.destination,
                filename: newFilename, //req.file.filename,
                path:req.file.path,
                size:req.file.size,
                channel: channel_id,
                card: card_id,
                cardType: Ncard.type
            })

            const addedFile = await file_in.save()

            console.log('New file ', addedFile)


            const newItem = {
                file: {
                    fileid:addedFile._id,
                    filename: addedFile.originalname,
                    filetype: addedFile.type
                }
            }

            console.log('newItem ', newItem)

            console.log("Card : ", Ncard)
    
            Ncard.items.unshift(newItem)
    
            const updatedCard = await Ncard.save()

            console.log("filemomeory count ",user.limits.filememory, req.file.size, user.limits.filememory + req.file.size )
            user.limits.filememory = user.limits.filememory + req.file.size
            await user.save()

            const appmet = await Appmetrics.findOne({type:'user'})
            appmet.fileMets.uploads = appmet.fileMets.uploads + 1
            appmet.fileMets.uploadSize = appmet.fileMets.uploadSize + req.file.size
            await appmet.save()
    
            return res.status(201).json(updatedCard)
        }

        //image file
        if(imagefiletypes.test(req.file.mimetype)){

            await sharp(req.file.buffer).resize(200, 200).toFile('uploads/' + 'thumbnails-' + newFilename, async(err, resizeImage) => {
            //await sharp(req.file.path).resize(200, 200).toFile('uploads/' + 'thumbnails-' + req.file.filename, async(err, resizeImage) => {
                if (err) {
                    console.log(err);
                    res.status(401)
                    throw new Error('Upload Failed')
                } else {
                    console.log(resizeImage);
                    resizedImageOut = resizeImage
    
                    //update card     
                    
                    
                    console.log("File ", req.file)
                    console.log("thumbnail ", resizedImageOut)
            
                //         fieldname: 'image',
                // [0]   originalname: '14_Tao_W-K_Hurricane_qsum.big-1_SC13_big.jpeg',
                // [0]   encoding: '7bit',
                // [0]   mimetype: 'image/jpeg',
                // [0]   destination: 'uploads/',
                // [0]   filename: 'image-d66c1925-c39e-4f3e-a76a-a267b885a93e.jpeg',
                // [0]   path: 'uploads/image-d66c1925-c39e-4f3e-a76a-a267b885a93e.jpeg',
                // [0]   size: 46474
            
                    const file_in = Tyfile({
                        type: 'image',
                        user: req.user._id,
                        originalname: req.file.originalname,
                        mimeType: req.file.mimetype,
                        destination: req.file.destination,
                        filename: newFilename, //req.file.filename,
                        path:req.file.path,
                        size:req.file.size,
                        thumbnail:'uploads/' + 'thumbnails-' + req.file.filename,
                        channel: channel_id,
                        card: card_id,
                        cardType: Ncard.type
                    })

                    const addedFile = await file_in.save()
            
            
                    const newItem = {
                        file: {
                            fileid:addedFile._id,
                            filename: addedFile.originalname,
                            filetype: addedFile.type
                        }
                    }
    
                    console.log("Card : ", Ncard)
            
                    Ncard.items.unshift(newItem)
            
                    const updatedCard = await Ncard.save()

                    user.limits.filememory = user.limits.filememory + req.file.size
                    await user.save()

                    const appmet = await Appmetrics.findOne({type:'user'})
                    appmet.fileMets.uploads = appmet.fileMets.uploads + 1
                    appmet.fileMets.uploadSize = appmet.fileMets.uploadSize + req.file.size
                    await appmet.save()
            
                    return res.status(201).json(updatedCard)
            
                }
            })

        }




    }else{
        res.status(401)
        throw new Error('Upload Failed')
    }



            // //res.sendStatus(200);
        //res.send(req.file.originalname)
    });




      }


    // res.send(`/${req.file.path}`)
})







router.post('/qpaper/:channel_id/:card_id', logActivitypre, protect, teacher, subscribed, uploadpdf.single('pdf'), async (req,res) =>{
    console.log("Loading File")



    const file = req.file
    const uuid = uuidv4();
    const newFilename = `${file.fieldname}-${uuid}${path.extname(file.originalname)}`


    const card_id = req.params.card_id
    const channel_id = req.params.channel_id

    const user = await User.findById(req.user._id)
    const Ncard = await Tycard.findById(card_id)

    const appmet = await Appmetrics.findOne({type:'user'})


    //if qpaper already exists , remove existing one
    if(Ncard.exam && Ncard.exam.questionpaperfile && Ncard.exam.questionpaperfile.fileid){
        //delete existing question paper

        console.log('deleting existing question paper')


        const itemfile = await Tyfile.findById(Ncard.exam.questionpaperfile.fileid)


        if(itemfile){


        console.log('item ', itemfile)

            const filename = itemfile.filename
            const filesize = itemfile.size

            let deleteParameters = {
                Bucket: BucketName,
                Key: filename
            };


            //await s3.deleteObject(deleteParameters)

            await s3.deleteObject(deleteParameters, async(err, data) =>{
                if (err) {
                    console.log(err, err.stack);
                }else {
                    console.log("Successfully deleted file ",data);

                }
            });

            
            appmet.fileMets.filedeleted = appmet.fileMets.filedeleted + 1
            appmet.fileMets.filedeletedSize = appmet.fileMets.filedeletedSize + filesize

            user.limits.filememory = user.limits.filememory - filesize
            //await user.save()
            console.log('Done deleting file ', filename)



            await itemfile.remove()

        }


        // res.status(401)
        // throw new Error('Question Paper Already Uploaded. Please Delete the existing Paper')


    }



    let uploadParameters = {
        Bucket: BucketName,
        ContentType: req.file.mimetype,
        Body: req.file.buffer,
        ACL: 'private',
        Key: newFilename,
      };


      if( user.limits.filememory + req.file.size <= 1073741824){



      s3.upload(uploadParameters, async(error, data)=> {
        if (error){
          console.error(error);
          res.sendStatus(500);
          return;
        }



    const card_id = req.params.card_id
    const channel_id = req.params.channel_id

    



    if(Ncard && req.user._id.equals(Ncard.user)){


        const pdffiletypes = /pdf|PDF/

        //pdf file
        if(pdffiletypes.test(req.file.mimetype)){


            const file_in = new Tyfile({
                type: 'pdf',
                user: req.user._id,
                originalname: req.file.originalname,
                mimeType: req.file.mimetype,
                destination: req.file.destination,
                filename: newFilename, //req.file.filename,
                path:req.file.path,
                size:req.file.size,
                channel: channel_id,
                card: card_id,
                cardType: Ncard.type
            })

            const addedFile = await file_in.save()


            const newExam = {
                fileid:addedFile._id,
                filename: addedFile.originalname,
                filetype: addedFile.type
            }

            console.log("Card : ", Ncard)

            Ncard.exam.questionpaperfile = newExam

            const updatedCard = await Ncard.save()

            user.limits.filememory = user.limits.filememory + req.file.size
            await user.save()

            
            appmet.fileMets.uploads = appmet.fileMets.uploads + 1
            appmet.fileMets.uploadSize = appmet.fileMets.uploadSize + req.file.size
            await appmet.save()

            return res.status(201).json(updatedCard)
        }


    }else{

        res.status(401)
        throw new Error('Not authorized')

    }



    });


}

    
    //res.send(`/${req.file.path}`)
})


router.post('/anspaper/:channel_id/:card_id/:studentexam_id', logActivitypre, protect, subscribed, uploadpdf.single('pdf'), async (req,res) =>{
    console.log("Loading File")


    const user = await User.findById(req.user._id)

    const file = req.file
    const uuid = uuidv4();
    const newFilename = `${file.fieldname}-${uuid}${path.extname(file.originalname)}`


    const channel_id = req.params.channel_id
    const card_id = req.params.card_id
    const studentexam_id = req.params.studentexam_id

    let uploadParameters = {
        Bucket: BucketName,
        ContentType: req.file.mimetype,
        Body: req.file.buffer,
        ACL: 'private',
        Key: newFilename,
      };

      const Sexam = await Studentexam.findOne({user:req.user._id, card:card_id})

      const NCard = await Tycard.findById(Sexam.card)



      if( user.limits.filememory + req.file.size <= 1073741824){

        if(Sexam && req.user._id.equals(Sexam.user) && NCard){


            if(!Sexam.isSubmitted){

            s3.upload(uploadParameters, async(error, data)=> {
                if (error){
                console.error(error);
                res.sendStatus(500);
                return;
                }

        const card_id = req.params.card_id
        const studentexam_id = req.params.studentexam_id
        const channel_id = req.params.channel_id

        //const Sexam = await Studentexam.findById(studentexam_id)







        const file_in = new Tyfile({
            type: 'pdf',
            user: req.user._id,
            originalname: req.file.originalname,
            mimeType: req.file.mimetype,
            destination: req.file.destination,
            filename: newFilename, //req.file.filename,
            path:req.file.path,
            size:req.file.size,
            channel: channel_id,
            card: card_id,
            cardType: NCard.type,
            accessType: 'Instructor'
        })

        const addedFile = await file_in.save()


        const newExam = {
            fileid:addedFile._id,
            filename: addedFile.originalname,
            filetype: addedFile.type
        }

        //if(Sexam && !Sexam.isSubmitted && Date.now() <= Sexam.submissionTimeLimit){
    
            Sexam.answerpaperfile = newExam
            Sexam.isSubmitted     = true
            Sexam.submissionTime  = Date.now()
            //Sexam.duration        = Sexam.submissionTime - Sexam.startTime
            Sexam.status          = "submitted"
            const updatedExam = await Sexam.save()
    
            user.limits.filememory = user.limits.filememory + req.file.size
            await user.save()


            const appmet = await Appmetrics.findOne({type:'user'})
            appmet.fileMets.uploads = appmet.fileMets.uploads + 1
            appmet.fileMets.uploadSize = appmet.fileMets.uploadSize + req.file.size
            await appmet.save()


            // ecard.exam.nSubmissions = ecard.exam.nSubmissions + 1
            // const updatedecard = await ecard.save()
            res.status(201).json(updatedExam);
    
        



            });

        }else{
            
            res.status(404)
            throw new Error('Exam already submitted!')

        }



        }else{

        res.status(401)
        throw new Error('Not authorized')

        }




        
}


})






// router.post('/qpaper', protect, upload.single('image'), (req,res) =>{
//     console.log("Loading File")
//     res.send(`/${req.file.path}`)
// })


// router.post('/anspaper', protect, upload.single('image'), (req,res) =>{
//     console.log("Loading File")
//     res.send(`/${req.file.path}`)
// })

export default router
