// Author : Anil Variyar
// Date Created/Modified last: 05/07/2021
// License : Proprietary
// Property of : Anil Variyar/ Pixagan Technologies Private Limited


import express from 'express'

import multer from 'multer'
import path from 'path'

import { v4 as uuidv4 } from 'uuid';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

import User from '../models/userModel.js';
import {Tyfile} from '../models/tyfileModel.js'
import Appmetrics from '../models/appmetricsModel.js'



import dotenv from 'dotenv';

const storage = multer.memoryStorage();

dotenv.config()


import { getTeacherMCQs, updateSolution, getTeacherMCQById, 
    getTeacherMCQSolution, startMCQExam, updateAnswersStudentRT, submitExamStudent, 
    getTeacherMCQSubmissions, getTeacherMCQSubmissionsById, deleteMCQExam, editMcq,
    addQuestionMcq, updateQuestionMcq, deleteQuestionMcq, createDigitalMCQ,
    GradeAllUnGraded, GradeSubmissionById,  AddManualGradeQuestionById,
    GenerateMCQAnalytics, ComputeMCQAnalytics, AddEquationToQuestion,
    DeleteImageQuestion, DeleteEquationQuestion,EditEquationQuestion, getTeacherQuestionSolution  } from '../controllers/mcqController.js'

import { protect, teacher, } from '../middleware/authMiddleware.js'
import { logActivitypre,  logActivitypost} from '../middleware/activityMiddleware.js'
import { Mcq } from '../models/mcqModel.js';

const router = express.Router()





const maxSize = 160000 //22428

const s3 = new aws.S3({
    endpoint: process.env.DOSPACESENDPOINT,
    credentials: new aws.Credentials(process.env.SPACES_KEY, process.env.SPACES_SECRET, null)
});

const BucketName = process.env.DO_BUCKETNAME





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


const upload = multer({ storage: storage, limits: { fileSize: maxSize } });




// @desc Fetch all exams
// @route GET /api/products
// @access Public route
router.route('/').get(logActivitypre, protect, teacher, getTeacherMCQs).post(logActivitypre, protect, teacher, createDigitalMCQ);

router.route('/:mcq_id').get(logActivitypre, protect, teacher, getTeacherMCQById).delete(logActivitypre, protect, teacher, deleteMCQExam).put(logActivitypre, protect, teacher, editMcq );



router.route('/solution/:question_id').post(logActivitypre, protect, teacher, updateSolution).get(logActivitypre, protect, teacher, getTeacherMCQSolution);

router.route('/start/:mcq_id').post(logActivitypre, startMCQExam);

router.route('/answer/:submission_id').post(logActivitypre, updateAnswersStudentRT);

router.route('/submit/:submission_id').post(logActivitypre, submitExamStudent);

router.route('/submissions/:mcq_id').get(logActivitypre, protect, teacher, getTeacherMCQSubmissions);



router.route('/questions/:mcq_id').post(logActivitypre, protect, teacher, addQuestionMcq);

router.route('/questions/:mcq_id/:question_id').put(logActivitypre, protect, teacher, updateQuestionMcq).delete(logActivitypre, protect, teacher, deleteQuestionMcq);

router.route('/questions/solution/:question_id').get(logActivitypre, protect, teacher, getTeacherQuestionSolution);


router.route('/submissionById/:mcq_id/:submission_id').get(logActivitypre, protect, teacher, getTeacherMCQSubmissionsById);

//router.route('/delete').get(logActivitypre, protect, teacher, getStudentExam);

router.route('/grade/:mcq_id').post(logActivitypre, protect, teacher, GradeAllUnGraded);

router.route('/grade/submission/:mcq_id/:submission_id').post(logActivitypre, protect, teacher, GradeSubmissionById);

router.route('/grade/submission/question/:mcq_id/:submission_id/:question_id').post(logActivitypre, protect, teacher, AddManualGradeQuestionById);

router.route('/analytics/:mcq_id').get(logActivitypre, protect, teacher, ComputeMCQAnalytics); //GenerateMCQAnalytics);



router.route('/question/equation/:mcq_id/:question_id').post(logActivitypre, protect, teacher, AddEquationToQuestion)

router.route('/question/equation/:mcq_id/:question_id/:equation_id').delete(logActivitypre, protect, teacher, DeleteEquationQuestion).post(logActivitypre, protect, teacher, EditEquationQuestion)

router.route('/question/image/:mcq_id/:question_id').delete(logActivitypre, protect, teacher, DeleteImageQuestion)



/* //Create Exam MCQ
router.post('/question/file/:mcq_id/:question_id', logActivitypre, protect, teacher, upload.single('image'), async (req,res) =>{
    console.log("Loading File")


    const user_id     = req.user._id
    const mcq_id      = req.params.mcq_id
    const question_id = req.params.question_id

    const user = await User.findById(user_id)
    const exam  = await Mcq.findById(mcq_id)

    const group = await Group.findOne({accountId:user_id})

    console.log('Group ', user_id, group )

    const editIndex = await exam.questions.map(question => question._id.toString()).indexOf(question_id.toString());


    if(exam.questions[editIndex].image){
        if(exam.questions[editIndex].image.fileid){
            //delete existing image
            const image = exam.questions[editIndex].image
            const itemfile = await Tyfile.findById(image.fileid)
            const filename = itemfile.filename

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

        //remove question paper
        await Tyfile.remove({_id: image.fileid})

        exam.questions[editIndex].image = null;

        }
    }


    const file = req.file
    const uuid = uuidv4();
    const newFilename = `${file.fieldname}-${uuid}${path.extname(file.originalname)}`


    let uploadParameters = {
        Bucket: BucketName,
        ContentType: req.file.mimetype,
        Body: req.file.buffer,
        ACL: 'private',
        Key: newFilename,
      };



      if( user.limits.filememory + req.file.size <= 16000000){


        s3.upload(uploadParameters, async(error, data)=> {
            if (error){
              console.error(error);
              res.sendStatus(500);
              return;
            }

            const imagefiletypes = /jpg|jpeg|png|JPEG/

            //pdf file
            if(imagefiletypes.test(req.file.mimetype)){


                const file_in = new Tyfile({
                    type: 'image',
                    user: req.user._id,
                    originalname: req.file.originalname,
                    mimeType: req.file.mimetype,
                    destination: req.file.destination,
                    filename: newFilename, //req.file.filename,
                    path:req.file.path,
                    size:req.file.size,
                    card: exam._id,
                    question: question_id,
                    cardType: 'question',
                    group: group._id
                })

                const addedFile = await file_in.save()


                const newFile = {
                    fileid:addedFile._id,
                    filename: addedFile.originalname,
                    filetype: addedFile.type
                }

                exam.questions[editIndex].image = newFile


                const updatedExam = await exam.save()

                await user.save()


                // const appmet = await Appmetrics.findOne({type:'user'})
                // appmet.fileMets.uploads = appmet.fileMets.uploads + 1
                // appmet.fileMets.uploadSize = appmet.fileMets.uploadSize + req.file.size
                // appmet.mcqMets.questionsImages = appmet.mcqMets.questionsImages + 1

                // await appmet.save()



                return res.status(201).json(updatedExam.questions)
            }
    
    
            })




      }else{
        res.status(401)
        throw new Error('Reached Limits')
      }



})
 */








export default router;