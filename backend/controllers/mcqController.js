// Date Created: 25/10/2021
// Modified last: 25/10/2021
// License : Proprietary
// Property of : Anil Variyar/ Pixagan Technologies Private Limited

import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Appmetrics from '../models/appmetricsModel.js'

import {Mcq} from '../models/mcqModel.js'
import {Mcqsol, Question, Mcqanalytics, Mcqsubmission} from '../models/mcqModel.js'

import moment from 'moment-timezone'

import path from 'path'
import { Tyfile } from '../models/tyfileModel.js'
// import Userlimits from '../models/userlimitsModel.js'

import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config()

const s3 = new aws.S3({
    endpoint: process.env.DOSPACESENDPOINT,
    credentials: new aws.Credentials(process.env.SPACES_KEY, process.env.SPACES_SECRET, null)
});
const BucketName = process.env.DO_BUCKETNAME

const __dirname = path.resolve()




// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const getTeacherMCQs = asyncHandler(async(req, res) => {
    

    const user = await User.findById(req.user._id)
    //const course = req.query.course
    
    var exams = null;

    const course_id = req.query.course

    console.log('Course ', req.query.course)

/*     if(req.query.course == undefined){
        console.log('All courses')
        exams   = await Mcq.find({instructor:req.user._id}).sort({ updatedAt: -1});

    }else{ */
        console.log('MCQs : ', course_id)
        exams   = await Mcq.find({course:course_id}).sort({ updatedAt: -1});

/*     } */
    

    res.json(exams);

    

})








// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const createDigitalMCQ = asyncHandler(async(req, res) => {
    
   
    const user = await User.findById(req.user._id)

    const {course_id, test_title} = req.body

    const newMcq = await Mcq.create({
        instructor: req.user._id,
        examname: test_title,
        course: course_id,
        numQuestions: 0,
        autograde: false,
        examtype:'digital'
    })

    const questions = 
/* 

    if(startDate && startTime){

        const date = startDate + " " + startTime

        const st_dt = moment.tz(startDate + ' ' + startTime, timeZone);

        const startDateC = new Date(st_dt.format()) //new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: timeZone}));
        newMcq.startTime = startDateC

        
        newMcq.timeZone = timeZone
    }
    
    if(DeadlineDate && DeadlineTime){

        const date = DeadlineDate + " " + DeadlineTime

        const end_dt = moment.tz(DeadlineDate + ' ' + DeadlineTime, timeZone);

        const endDateC = new Date(end_dt.format()) //new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: timeZone}));
        newMcq.endTime = endDateC

       
        newMcq.timeZone = timeZone
    }

    const updatedMcq = await newMcq.save()

    const userLimits = await Userlimits.findOne({user:req.user._id})



    userLimits.exams = userLimits.exams + 1
    userLimits.digitalExams = userLimits.digitalExams + 1
    await userLimits.save()

    const appmet = await Appmetrics.findOne({type:'user'})
    appmet.mcqMets.created = appmet.mcqMets.created + 1
    appmet.mcqMets.createdDigital = appmet.mcqMets.createdDigital + 1
    await appmet.save()
 */


    res.json(newMcq)


})






// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const getTeacherMCQById = asyncHandler(async(req, res) => {
    

    //const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id

    const mcq = await Mcq.findById(mcq_id)

    console.log("MCQ : ", mcq)

    const questionlist = mcq.questions

    const questions = await Question.find({_id:questionlist})

    console.log("Questions : ", questions)

    if(mcq){

        console.log(mcq)
        res.json({'mcq':mcq, 'questions':questions});

    }else{

        res.status(404)
        throw new Error('Exams not found')

    }


})







// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const addQuestionMcq = asyncHandler(async(req, res) => {
    
    const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id

    const exam   = await Mcq.findById(mcq_id);

    if(exam && exam.numQuestions < 101){

        const qNo = exam.questions.length + 1
        const questionText = 'question_' + qNo.toString()

        const newQuestion = await Question.create({
            mcq: mcq_id,
            course: exam.course,
            qNo: exam.questions.length + 1,
            Qtext: questionText,
            options:{},
            Qtype: 'MCQ',
            nMarks: 1
        })

        exam.questions.push(newQuestion)

        exam.numQuestions = exam.questions.length

    

    const updatedExam  = await exam.save()

     console.log("Add question ", updatedExam)

    res.json(newQuestion);

    }else{
        res.status(404)
        throw new Error('MCQ not found, too many questions')
    }


})



// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const updateQuestionMcq = asyncHandler(async(req, res) => {
    

    const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id
    const question_id = req.params.question_id

    const {nMarks, examType, questionText, option1, option2, option3, option4, fileinfo} = req.body

    const exam   = await Mcq.findById(mcq_id);

    const question = await Question.findById(question_id)



    // //based on the question id
    // const editIndex = await exam.questions.map(question => question._id.toString()).indexOf(question_id.toString());

    // console.log('Exams ', nMarks, examType, questionText)
    // console.log('Exams 2',option1, option2, option3, option4)

    if(examType){
         //exam.questions[editIndex].Qtype = examType
         question.Qtype = examType
    }
   
    if(questionText){
        //exam.questions[editIndex].Qtext = questionText
        question.Qtext = questionText
    }

    if(nMarks){
        //exam.questions[editIndex].nMarks = nMarks
        question.nMarks = nMarks
    }
    
    if(option1){
        //exam.questions[editIndex].options.set('1', option1)
        question.options.set('1', option1)
    }

    if(option2){
        //exam.questions[editIndex].options.set('2',option2)
        question.options.set('2',option2)
    }
    
    if(option3){
        //exam.questions[editIndex].options.set('3', option3)
        question.options.set('3', option3)
    }
    
    if(option4){
        //exam.questions[editIndex].options.set('4', option4)
        question.options.set('4', option4)
    }

    const updatedQuestion = await question.save()
    

    res.json(updatedQuestion);


})



// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const deleteQuestionMcq = asyncHandler(async(req, res) => {
    

    const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id
    const question_id = req.params.question_id

    const exam   = await Mcq.findById(mcq_id);

    const removeIndex = exam.questions.indexOf(question_id);

    exam.questions.splice(removeIndex,1)

    exam.numQuestions = exam.questions.length

    const question = await Question.findById(question_id)
    await question.remove()

    const updatedExam  = await exam.save()

    res.json(question_id);


/* 

    //delete the images associated with that question
    if(exam.questions[removeIndex].image && exam.questions[removeIndex].image.filename){

        const image = exam.questions[removeIndex].image

        const itemfile = await Tyfile.findById(image.fileid)

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


        //remove question paper
        await Tyfile.remove({_id: image.fileid})

        exam.questions[removeIndex].image = null;



    }
 */






})



















// @desc Get submissions
// @route GET /api/products
// @access Public route
const getTeacherMCQSubmissions = asyncHandler(async(req, res) => {
    

    console.log('Get MCQ sol')
    const user = await User.findById(req.user._id)

    console.log('User ', user )

    const mcq_id = req.params.mcq_id

    console.log('MCQ ID ', mcq_id)

    const mcq = await Mcq.findById(mcq_id)

    console.log('MCQ ', mcq)

    const submissions   = await Mcqsubmission.find({mcqid:mcq_id})

    console.log('Submissions ', submissions)

    if(submissions && req.user._id.equals(mcq.instructor)){

        console.log(submissions)
        res.json(submissions);

    }else{

        res.status(404)
        throw new Error('Exams not found')

    }


})








// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const getTeacherMCQSubmissionsById = asyncHandler(async(req, res) => {
    

    //const user = await User.findById(req.user._id)

    const submission_id = req.params.submission_id

    const mcqsubmission = await Mcqsubmission.findById(submission_id)

    console.log("MCQ sub: ", mcqsubmission)

    if(mcqsubmission){

        console.log(mcqsubmission)
        res.json(mcqsubmission);

    }else{

        res.status(404)
        throw new Error('Submissions not found')

    }


})











// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const updateSolution = asyncHandler(async(req, res) => {
    

    const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id

    const mcq = await Mcq.findById(mcq_id)

    const {solution, answeredQ} = req.body

    console.log('Solution ', solution)

    //check if solution already exists if so overwrite else create new

    const existingMcqsol = await Mcqsol.findOne({mcq:mcq_id})

    if(existingMcqsol){
        existingMcqsol.solutions = solution
        const updatedMcqsol = await existingMcqsol.save()
        return res.json({'solution':updatedMcqsol, 'examid':mcq_id})
    }else{

    const newMcqsol = await Mcqsol.create({
        instructor: user._id,
        mcq: mcq_id,
        numQuestions: mcq.numQuestions,
        solutions: []
    })


    newMcqsol.solutions = solution
    // newMcqsol.solutions = solution

    const createdMcqsol = newMcqsol.save()

    //sol.solution

    res.json({'solution':createdMcqsol, 'examid':mcq_id})

    }


})




// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const getTeacherMCQSolution = asyncHandler(async(req, res) => {
    

    //const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id

    const mcqsol = await Mcqsol.findOne({mcq:req.params.mcq_id})

    console.log("MCQ : ", mcqsol)

    if(mcqsol){

        console.log(mcqsol)

        res.json({'solution':mcqsol, 'examid':mcq_id})

    }else{

        res.status(404)
        throw new Error('Exam solution not found')

    }


})






// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const startMCQExam = asyncHandler(async(req, res) => {
    
    const mcq_id = req.params.mcq_id

    console.log('MCQ Id ', mcq_id)
    const mcq = await Mcq.findById(mcq_id)

    console.log('MCQ ', mcq)

    const {name, email, password} = req.body

    const user = await User.findById(mcq.instructor)
    //const userlimits = await Userlimits.findOne({user:user._id})


    if(mcq.examtype == 'paper' ){
        res.status(404)
        throw new Error(`Sorry you have exceeded your paper exam taken limit for the month. You can create a digital exam or increase your paper exam limits using add ons`)
    }
    

    console.log('Name email ', name, email)

    if(mcq.startTime){

        console.log('Start Time ', mcq.startTime, Date.now(), mcq.startTime>Date.now())

        if(Date.now()>mcq.startTime && Date.now()<= mcq.endTime){


            const newSol = await Mcqsubmission.create({
                studentname: name,
                mcqid: mcq._id,
                nQuestions: mcq.numQuestions,
                isStarted: true,
                autograde: mcq.autograde,
                startTime: Date.now(),
              })
          
              const updatedSol = await newSol.save()
        
              console.log('new sol ', updatedSol)
            //sol.solution


            
            //const userlimits = await Userlimits.findOne({user:user._id})
/*             const appmet = await Appmetrics.findOne({type:'user'})

            if(mcq.examtype == 'paper'){
                userlimits.paperExamsTaken = userlimits.paperExamsTaken + 1
                appmet.mcqMets.takenPaper = appmet.mcqMets.takenPaper + 1
            }else if(mcq.examtype == 'digital'){
                userlimits.digitalExamsTaken = userlimits.digitalExamsTaken + 1
                appmet.mcqMets.takenDigital = appmet.mcqMets.takenDigital + 1
            }
            
            appmet.mcqMets.taken = appmet.mcqMets.taken + 1
            
            await userlimits.save()
            await appmet.save() */
        
            return res.json(updatedSol)


        }else{


        res.status(404)
        throw new Error(`Exam starts at ${mcq.startTime} and ends at ${mcq.endTime}`)
        }




    }else{

        const newSol = await Mcqsubmission.create({
            studentname: name,
            email: email,
            mcqid: mcq._id,
            nQuestions: mcq.numQuestions,
            isStarted: true,
            autograde: mcq.autograde,
            startTime: Date.now(),
          })
      
          const updatedSol = await newSol.save()
    
          console.log('new sol ', updatedSol)
        //sol.solution

        
        const appmet = await Appmetrics.findOne({type:'user'})

        if(mcq.examtype == 'paper'){
            userlimits.paperExamsTaken = userlimits.paperExamsTaken + 1
            appmet.mcqMets.takenPaper = appmet.mcqMets.takenPaper + 1
        }else if(mcq.examtype == 'digital'){
            userlimits.digitalExamsTaken = userlimits.digitalExamsTaken + 1
            appmet.mcqMets.takenDigital = appmet.mcqMets.takenDigital + 1
        }
      
        userlimits.examsTaken = userlimits.examsTaken + 1
        appmet.mcqMets.taken = appmet.mcqMets.taken + 1
        
        await userlimits.save()
        await appmet.save()
    
        return res.json(updatedSol)




    }




})










// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const updateAnswersStudentRT = asyncHandler(async(req, res) => {
    

    const submission_id = req.params.submission_id
    const {mcq_id, index, value, numAnswered} = req.body


    const mcq = await Mcq.findById(mcq_id)

    const mcqSub = await Mcqsubmission.findById(submission_id)
    var grading = {}
    var total = 0
    var marks = 0
    var questionmark = {}


    if(mcqSub && !mcqSub.isSubmitted){


        if(mcq.endTime){
            if(Date.now()>mcq.endTime){
                return res.json('Exam Submission Time Over')
            }
        }

        // if(!mcqSub.solutions[index]){

            console.log('Answer ', index, value)

            mcqSub.solutions.set(index, value)
            await mcqSub.save()


            const mcqSol = await Mcqsol.findOne({mcq:mcq_id})

            //console.log('MCQ ', mcq_id, mcqSol)

            //if solutions are uploaded
            if(mcqSol && mcqSol.solutions){
                const correct_value = mcqSol.solutions.get(index.toString())

                console.log('mcqsol ', mcqSol.solutions )

                console.log('mcqsol solution ', index, mcqSol.solutions.get(index.toString()))

                console.log('Correction ', index, correct_value, value)


                const marksQ = mcq.questions[index-1].nMarks

                if(value == correct_value){
                    mcqSub.grading.set(index, marksQ)
                    // grading[index] = 1
                    // total = total + 1
                    //mcqSub.totalGrade =  mcqSub.totalGrade + 1


                    console.log('Grading sub ', mcqSub.totalGrade, mcqSub.grading)
                    //marks = marks + questionmark[index]
                }else{
                    //grading[index] = 0
                    mcqSub.grading.set(index, 0)
                }
            }else{
                //no grading
            }

            await mcqSub.save()
    
            res.json('Updated')
        // }else{
        //     res.status(404)
        //     throw new Error('Already Answered')
        // }



    }else{
        res.status(404)
        throw new Error('Exam solution not found')
    }


})








// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const submitExamStudent = asyncHandler(async(req, res) => {
    
    console.log('Submit Student Exam')

    const submission_id = req.params.submission_id
    
    console.log('Submission ID ', submission_id)

    const {solutions, answeredQ, numAnswered} = req.body

    //check if the num answered tallies with the num answered here

    const studentsubmission = await Mcqsubmission.findById(submission_id)

    const mcq_id = studentsubmission.mcqid

    const mcqSol = await Mcqsol.findOne({mcq:studentsubmission.mcqid})

    const mcq = await Mcq.findById(mcq_id)

    const user = await User.findById(mcq.instructor)

    console.log('Student Exam ', studentsubmission)
    console.log('Mcqsol : ', mcqSol)
    var totalGrade = 0

    if(studentsubmission){

        var isGraded = false;

        if(mcqSol && mcqSol.solutions){

            isGraded = true

            studentsubmission.grading.map(grade => {
                    totalGrade = totalGrade + grade 
            })

            studentsubmission.totalGrade = totalGrade
            studentsubmission.isGraded = true
            

        }

        studentsubmission.isSubmitted = true
        await studentsubmission.save()


        //const studentgrade = studentsubmission.totalGrade

        console.log('Grade ', totalGrade)

        const userlimits = await Userlimits.findOne({user:user._id})
        const appmet = await Appmetrics.findOne({type:'user'})

        if(mcq.examtype == 'paper'){
            //userlimits.paperExamsTaken = userlimits.paperExamsTaken + 1
            appmet.mcqMets.submissionPaper = appmet.mcqMets.submissionPaper + 1
        }else if(mcq.examtype == 'digital'){
            //userlimits.digitalExamsTaken = userlimits.digitalExamsTaken + 1
            appmet.mcqMets.submissionDigital = appmet.mcqMets.submissionDigital + 1
        }
        
        appmet.mcqMets.submissions = appmet.mcqMets.submissions + 1
        
        await userlimits.save()
        await appmet.save()


        var solution_out = null
        var grade_out = null
        var showGrade = false
        var showSolution = false

        if(mcq.showMarksOnSubmission){
            grade_out = totalGrade
            showGrade = true
        }

        if(mcq.showSolutionOnSubmission && mcqSol){
            solution_out = mcqSol.solutions
            showSolution = true
        }


        res.json({'isGraded': isGraded, 'showGrade':showGrade , 'grade':grade_out, 'showSolution':showSolution, 'solution':solution_out  ,'message':'Submitted'})




    }else{
        res.status(404)
        throw new Error('Not Authorized')
    }




})







// @desc Delete MCQ
// @route GET /api/products
// @access Public route
const deleteMCQExam = asyncHandler(async(req, res) => {
    
    console.log('Delete MCQ Exam')

    const mcq_id = req.params.mcq_id

    console.log('Params ', mcq_id)

    const user = await User.findById(req.user._id)

    //console.log('User ', user)

    const mcq = await Mcq.findById(mcq_id)



    if(user._id.equals(mcq.instructor)){

        //Delete all submissions
        await Mcqsubmission.remove({mcqid:mcq_id})

        //Delete solution
        await Mcqsol.remove({mcq:mcq_id})

        //remove question paper
        //delete question paper
        
        const questionfiles = await Tyfile.find({card: mcq_id})


        questionfiles.map(async(itemfile) => {

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
            

        })



        //delete any images added
        await Tyfile.remove({card: mcq_id})

        //Delete MCQ
        await Mcq.remove({_id:mcq_id})

        const userlimits = await Userlimits.findOne({user:req.user._id})
        const appmet = await Appmetrics.findOne({type:'user'})

        if(mcq.examtype == 'paper'){
            userlimits.paperExamsDeleted = userlimits.paperExamsDeleted + 1
            appmet.mcqMets.deletedPaper = appmet.mcqMets.deletedPaper + 1
        }else if(mcq.examtype == 'digital'){
            userlimits.digitalExamsDeleted = userlimits.digitalExamsDeleted + 1
            appmet.mcqMets.deletedDigital = appmet.mcqMets.deletedDigital + 1
        }
        
        userlimits.deleted = userlimits.deleted + 1
        appmet.mcqMets.deleted = appmet.mcqMets.deleted + 1
        appmet.mcqMets.deletedDigital = appmet.mcqMets.deletedDigital + 1
        
        await userlimits.save()
        await appmet.save()


        res.json('Done deleting')

    }else{

        res.status(404)
        throw new Error('Not Authorized')

    }




})





// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const editMcq = asyncHandler(async(req, res) => {
    

    //const user = await User.findById(req.user._id)

    console.log('Update MCQ')

    const mcq_id = req.params.mcq_id

    const {name, nQuestions, startDate, startTime, DeadlineDate, DeadlineTime, timeZone, showSolutionOnSubmission, showGradeOnSubmission} = req.body

    const mcq = await Mcq.findById(mcq_id)



    if(mcq){
        mcq.name = name
        mcq.nQuestions = nQuestions
        mcq.showMarksOnSubmission = showGradeOnSubmission
        mcq.showSolutionOnSubmission = showSolutionOnSubmission

        console.log('MCQ t ', nQuestions)

        if(startDate && startTime){
            
            const date = startDate + " " + startTime
            //const startDateC = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: timeZone}));
            //mcq.startTime = startDateC

            //const newDateTest = new Date(date)

            //console.log('Date ', date)
            //console.log('Date T', newDateTest)
            //console.log('startDateC', startDateC)

            console.log('MCq tm ', startDate, startTime)

            const st_dt = moment.tz(startDate + ' ' + startTime, timeZone);

            console.log('st+dt ', st_dt)
            console.log('st dt format ', st_dt.format())

            mcq.startTime = new Date(st_dt.format())
            //mcq.startTime = new Date(startDate + " " + startTime)
            mcq.timeZone = timeZone
        }
        
        if(DeadlineDate && DeadlineTime){

            const date = DeadlineDate + " " + DeadlineTime
            //const endDateC = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: timeZone}));
            //mcq.endTime = endDateC

            const end_dt = moment.tz(DeadlineDate + ' ' + DeadlineTime, timeZone);

            mcq.endTime = new Date(end_dt.format())
            //mcq.endTime = new Date(DeadlineDate + " " + DeadlineTime)
            mcq.timeZone = timeZone
        }



        const updatedMCQ = await mcq.save()

        console.log('Updated MCQ', updatedMCQ)


        return res.json(updatedMCQ)

    }else{

        res.status(404)
        throw new Error('MCQ not found')

    }


})










const GradeAllUnGraded = asyncHandler(async(req, res) => {


    const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id

    const studentsubmissions = await Mcqsubmission.find({mcqid:mcq_id})

    console.log('Student Submissions ', studentsubmissions)

    const mcqSol = await Mcqsol.findOne({mcq:mcq_id})


    console.log('Solutions ', mcqSol)

    const mcq   = await Mcq.findById(mcq_id);

    if(mcqSol){

    await studentsubmissions.map(async(submission)=>{

        submission.totalGrade = 0.0

        await submission.solutions.map((solution, index) => {

            if(index>0){

            

            const marksQ = mcq.questions[index-1].nMarks


            const correct_value = mcqSol.solutions.get(index.toString())
            
            if(solution==correct_value){

                submission.grading.set(index, marksQ)
                submission.totalGrade = submission.totalGrade + marksQ
            }else{
                submission.grading.set(index, 0)
            }

            }

        })

        await submission.save()


    })


    }else{
        res.status(404)
        throw new Error('Exam solutions have not been uplaoded')
    }



    res.json(studentsubmissions)

})


const GradeSubmissionById = asyncHandler(async(req, res) => {


    const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id

    const submission_id = req.params.submission_id

    const studentsubmission = await Mcqsubmission.findById(submission_id)
    const mcqSol = await Mcqsol.findOne({mcq:mcq_id})
    const mcq   = await Mcq.findById(mcq_id);

    console.log('Student Submision ', studentsubmission)
    console.log('MCQ ', mcqSol)

    if(mcqSol){

        studentsubmission.totalGrade = 0.0

        await studentsubmission.solutions.map((solution, index) => {

            console.log('MCQ Index ', index)

            if(index>0){

            

            const qgrade = mcq.questions[index-1].nMarks

            const correct_value = mcqSol.solutions.get(index.toString())
    

            if(solution==correct_value){
                studentsubmission.grading.set(index,  qgrade)
                studentsubmission.totalGrade = studentsubmission.totalGrade + qgrade
            }else{
                studentsubmission.grading.set(index, 0)
            }

            }
    
        })
    
        await studentsubmission.save()
    
    
        res.json(studentsubmission)

    }else{
        res.status(404)
        throw new Error('Exam solutions have not been uplaoded')
    }



})



const AddManualGradeQuestionById = asyncHandler(async(req, res) => {


    const {marks, comment} = req.body

    console.log('Marks ', marks)

    const floatmarks = parseFloat(marks)

    const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id

    const submission_id = req.params.submission_id

    const question_id = req.params.question_id

    const studentsubmission = await Mcqsubmission.findById(submission_id)

    console.log('STudent Submission ', studentsubmission)

    var prevMarks = 0.0

    console.log('Pre marks', studentsubmission.grading[question_id])

    if(studentsubmission.grading[question_id] != undefined){
        prevMarks = parseFloat(studentsubmission.grading[question_id])
    }

    

    studentsubmission.grading.set(question_id, floatmarks)

    studentsubmission.totalGrade = studentsubmission.totalGrade - prevMarks + floatmarks

    await studentsubmission.save()


    res.json(studentsubmission)

})




const GenerateMCQAnalytics = asyncHandler(async(req, res) => {


    const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id

    const analytics = await Mcqanalytics.findOne({mcqid:mcq_id})

    if(analytics){

        res.json(analytics)

    }else{
        res.status(404)
        throw new Error('Exam solutions have not been uplaoded')
    }



})




const ComputeMCQAnalytics = asyncHandler(async(req, res) => {


    const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id

    var newAnalytics = null;

    const mcq = await Mcq.findById(mcq_id)

    newAnalytics = await Mcqanalytics.findOne({mcqid:mcq_id})


    if(!newAnalytics){

        newAnalytics = await Mcqanalytics.create({
            mcqid: mcq._id,
            numQuestions: mcq.numQuestions,
            metrics:{},
            correct:[],
            incorrect:[],
            notAnswered:[]
        })
    }


    //const mcq = await Mcq.findById(mcq_id)

    console.log('New Analytics ', newAnalytics)

    const newMetrics = {
        numberTaken: 0.0,
        minScore: 0.0,
        maxScore: 0.0,
        avgScore: 0.0,
        medianScore: 0.0
    }

    newAnalytics.metrics = newMetrics
    newAnalytics.correct = Array(mcq.numQuestions).fill(0)
    newAnalytics.incorrect = Array(mcq.numQuestions).fill(0)
    newAnalytics.notAnswered = Array(mcq.numQuestions).fill(0)

    const submissions = await Mcqsubmission.find({mcqid:mcq._id})

    newAnalytics.metrics.numberTaken = submissions.length


    if(submissions.length > 0){


        newAnalytics.metrics.minScore = submissions[0].totalGrade
        newAnalytics.metrics.maxScore = submissions[0].totalGrade
        newAnalytics.metrics.avgScore = 0.0
        var totalScore = 0.0
        var medianScore = 0.0

        const numSubmissions = submissions.length

        submissions.map(submission => {

            if(submission.totalGrade < newAnalytics.metrics.minScore){
                newAnalytics.metrics.minScore = submission.totalGrade
            }

            if(submission.totalGrade > newAnalytics.metrics.maxScore){
                newAnalytics.metrics.maxScore = submission.totalGrade
            }

            totalScore = totalScore + submission.totalGrade
            newAnalytics.metrics.avgScore  = newAnalytics.metrics.avgScore + submission.totalGrade/numSubmissions


            Array(mcq.numQuestions).fill(0).map((val,index)=> {

                    if(submission.grading[index+1]>0.0){
                        newAnalytics.correct[index] = newAnalytics.correct[index] + 1
                    }

                    if(submission.grading[index+1]==0.0){
                        newAnalytics.incorrect[index] = newAnalytics.incorrect[index] + 1
                    }

                    if(submission.grading[index+1]==null || submission.grading[index+1]== undefined){
                        newAnalytics.notAnswered[index] = newAnalytics.notAnswered[index] + 1
                    }

                    if(submission.grading[index+1]!=null || submission.grading[index]!= undefined){
                        newAnalytics.average[index] = newAnalytics.average[index] + parseFloat(submission.grading[index])/numSubmissions
                    }


            })





        })


    }

    const updatedAnalytics = await newAnalytics.save()



    if(updatedAnalytics){

        res.json(updatedAnalytics)

    }else{
        res.status(404)
        throw new Error('Error Computing Analytics')
    }



})






const AddEquationToQuestion = asyncHandler(async(req, res) => {


    const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id
    const question_id = req.params.question_id

    const {equationText} = req.body

    const exam = await Mcq.findById(mcq_id)

    if(exam){

        const editIndex = await exam.questions.map(question => question._id.toString()).indexOf(question_id.toString());

        const equationV = {
            text: equationText
        }

        exam.questions[editIndex].equations.push(equationV)
    
        const updatedExam =  await exam.save()


        res.json(updatedExam.questions)

    }else{
        res.status(404)
        throw new Error('Exam solutions have not been uplaoded')
    }



})






const DeleteImageQuestion = asyncHandler(async(req, res) => {


    const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id
    const question_id = req.params.question_id
    const {image_id} = req.body


    const exam = await Mcq.findById(mcq_id)

    if(exam){

        const editIndex = await exam.questions.map(question => question._id.toString()).indexOf(question_id.toString());

        const image = exam.questions[editIndex].image


        //delete file from server

        const itemfile = await Tyfile.findById(image.fileid)

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


        //remove question paper
        await Tyfile.remove({_id: image.fileid})

        exam.questions[editIndex].image = null;


        //delete image from file
    
        const updatedExam =  await exam.save()


        res.json(updatedExam.questions)

    }else{
        res.status(404)
        throw new Error('Exam solutions have not been uplaoded')
    }



})






const DeleteEquationQuestion = asyncHandler(async(req, res) => {


    const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id
    const question_id = req.params.question_id
    const equation_id = req.params.equation_id


    const exam = await Mcq.findById(mcq_id)

    if(exam){

        const editIndex = await exam.questions.map(question => question._id.toString()).indexOf(question_id.toString());

        //delete image from file

        const question_index = await exam.questions[editIndex].equations.map(equation => equation._id.toString()).indexOf(equation_id.toString());
    
        exam.questions[editIndex].equations.splice(question_index, 1)



        const updatedExam =  await exam.save()

        res.json(updatedExam.questions)

    }else{
        res.status(404)
        throw new Error('Exam solutions have not been uplaoded')
    }



})





const EditEquationQuestion = asyncHandler(async(req, res) => {


    const user = await User.findById(req.user._id)

    const mcq_id = req.params.mcq_id
    const question_id = req.params.question_id
    const equation_id = req.params.equation_id

    const {equationText} = req.body


    const exam = await Mcq.findById(mcq_id)

    if(exam){

        const editIndex = await exam.questions.map(question => question._id.toString()).indexOf(question_id.toString());

        //delete image from file

        const question_index = await exam.questions[editIndex].equations.map(equation => equation._id.toString()).indexOf(equation_id.toString());
    
        console.log('Equation Text ', equationText)


        exam.questions[editIndex].equations[question_index].text = equationText


        const updatedExam =  await exam.save()

        res.json(updatedExam.questions)

    }else{
        res.status(404)
        throw new Error('Exam solutions have not been uplaoded')
    }



})






export {
    getTeacherMCQs,
    updateSolution,
    getTeacherMCQById,
    getTeacherMCQSolution,
    startMCQExam,
    updateAnswersStudentRT,
    submitExamStudent,
    getTeacherMCQSubmissions,
    getTeacherMCQSubmissionsById,
    deleteMCQExam,
    editMcq,
    addQuestionMcq,
    updateQuestionMcq,
    deleteQuestionMcq,
    createDigitalMCQ,

    GradeAllUnGraded,
    GradeSubmissionById,
    AddManualGradeQuestionById,
    GenerateMCQAnalytics,
    ComputeMCQAnalytics,
    AddEquationToQuestion,
    DeleteImageQuestion,
    DeleteEquationQuestion,
    EditEquationQuestion

}
