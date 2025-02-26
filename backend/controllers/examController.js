// Date Created: 05/07/2021
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import asyncHandler from 'express-async-handler'
import Channel from '../models/channelModel.js'
import User from '../models/userModel.js'
import {Exam} from '../models/examModel.js'
import Studentexam from '../models/studentexamModel.js'
import Activity from '../models/activityModel.js';
import Tycard from '../models/tycardModel.js';
import Appmetrics from '../models/appmetricsModel.js'

import path from 'path'
const __dirname = path.resolve()

//---------------All file based exams

// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const getAllStudentExamSubmissions = asyncHandler(async(req, res) => {
    

    const user = await User.findById(req.user._id)

    const channel_id = req.params.channel_id
    const card_id    = req.params.card_id

    console.log("Channel card : ", channel_id, card_id)

    const exams   = await Studentexam.find({card: card_id, channel: channel_id})
    const channel = await Channel.findById(channel_id)


    if(exams && user.isTeacher && user._id.equals(channel.instructor)){

        console.log(exams)
        res.json({channel_id, card_id, exams});

    }else{

        res.status(404)
        throw new Error('Channel not found')

    }


})



// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const getStudentExam = asyncHandler(async(req, res) => {
    

    const user = await User.findById(req.user._id)

    const channel_id = req.params.channel_id
    const card_id    = req.params.card_id

    const exam   = await Studentexam.findOne({card: card_id, channel: channel_id, user:req.user._id})
    const card = await Tycard.findById(card_id)

    console.log("Exam card ; ",card)


    if(exam){

        console.log("Exam", exam)

        res.status(201).json(exam)


    }else{

        console.log("Creating new Exam", Date.now(), card.exam.startTime)
        console.log("End Time", Date.now(), card.exam.endTime)


        const exam = new Studentexam({
            user: req.user._id,
            studentname: req.user.name,
            instructor: card.exam.instructor,
            instructorname: card.exam.instructorname,
            channel: channel_id,
            card: card_id,
            examname: card.exam.examname,
            examdescription: card.exam.examdescription,
            examformat: card.exam.examformat,
            questionpaperfile: card.exam.questionpaperfile,
            maxMarks: card.exam.totalMarks,
            autograde: card.exam.autograde,
            startTimelimit: card.exam.startTime,
            submissionTimeLimit: card.exam.submissionTime,
            durationLimit: card.exam.duration,
            status: "created"

        })
    
        const createdExam = await exam.save()

        console.log("Exam", createdExam)
        console.log("Exam")
    
        //const createdPost = await post.save()
        res.status(201).json(createdExam)

    }


})













// @desc Create a product
// @route POST /api/products
// @access Private route/Admin
const startStudentExam = asyncHandler(async(req, res) => {

    console.log("Start Exam")

    const channel_id = req.params.channel_id;

    const channel = await Channel.findById(channel_id)

    const channel_subscribed = req.user.channels.includes(channel_id)

    const exam = await Studentexam.findById(req.params.studentexam_id)

    const card = await Tycard.findById(exam.card)

    console.log("Student exam ", req.params.studentexam_id, exam)


    console.log("Creating new Exam", Date.now(), examCard.exam.startTime)
    console.log("End Time", Date.now(), examCard.exam.endTime)




    //console.log("STudent exam start, ", channel_subscribed, exam.isStarted, Date.now() > exam.startTimeLimit)

    //if(channel_subscribed && exam && !exam.isStarted && Date.now() > exam.startTimeLimit){
    if(channel_subscribed && exam){

        if(!exam.isStarted){

            exam.startTime = Date.now()

            exam.isStarted = true

            exam.status    = "started"

        }

        // if(exam.startTimeLimit > Date.now()){

            // if(path.join(__dirname, exam.questionpaperfile)){
            //     res.status(404)
            //     throw new Error('No Question Paper')



            // }else{

                console.log(__dirname, card.exam.questionpaperfile)

                await exam.save()
                res.sendFile(path.join(__dirname, exam.questionpaperfile))
                
            // }


            //res.sendFile(path.join(__dirname, Scard.exam.questionpaperfile))


        // }else{

        //     res.status(404)
        //     throw new Error('To early to start Exam')

        // }


    }else{

        res.status(404)
        throw new Error('Channel not found')

    }



})







// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const submitStudentExam = asyncHandler(async(req, res) => {
    

    const channel_id = req.params.channel_id
    const studentexam_id    = req.params.studentexam_id

    const { filename } = req.body

    const Sexam = await Studentexam.findById(studentexam_id)

    const examCard = await Tycard.findById(Sexam.card)


    console.log("Submit student exam : ", filename)


    console.log("Creating new Exam", Date.now(), examCard.exam.startTime)
    console.log("End Time", Date.now(), examCard.exam.endTime)



    if(!Sexam.isSubmitted){

    

    //if(Sexam && !Sexam.isSubmitted && Date.now() <= Sexam.submissionTimeLimit){

        Sexam.answerpaperfile = filename
        Sexam.isSubmitted     = true
        Sexam.submissionTime  = Date.now()
        //Sexam.duration        = Sexam.submissionTime - Sexam.startTime
        Sexam.status          = "submitted"
        const updatedExam = await Sexam.save()


        // ecard.exam.nSubmissions = ecard.exam.nSubmissions + 1
        // const updatedecard = await ecard.save()
        res.status(201).json(updatedExam);

    }else{

        res.status(404)
        throw new Error('Exam already submitted!')

    }


})





// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
const getStudentExamById = asyncHandler(async(req, res) => {
    

    console.log("Get Student exam ")

    const user = await User.findById(req.user._id)

    //const channel_id = req.params.channel_id
    const studentexam_id    = req.params.studentexam_id



    console.log("Student Exam id ", studentexam_id)

    const exam = await Studentexam.findById(studentexam_id)

    console.log("Student Exam Submission ", exam)


    if(exam){

        res.json(exam);

    }else{

        res.status(404)
        throw new Error('Channel not found')

    }


})






// @desc Fetch one Exam by it's ID
// @route GET /api/products
// @access Public route
//How does the teacher return teh graded exam
const gradeStudentExamById = asyncHandler(async(req, res) => {
    
    //const channel_id = req.params.channel_id
    const submission_id    = req.params.studentexam_id

    const {marks, grade, feedback, gradedfile} = req.body

    const exam = await Studentexam.findById(submission_id)

    console.log("Grade Exam : ", submission_id, marks, grade, feedback)


    console.log("Exam : ", exam)

    console.log("Exam status: ",  exam.isSubmitted)

    if(exam && exam.isSubmitted){

        exam.feedback = feedback
        //exam.gradedpaperfile = gradedfile
        exam.totalMarks = marks

        exam.isGraded = true
        exam.status   = "graded"

        const gradedExam = await exam.save()

        res.json(gradedExam);

    }else{

        res.status(404)
        throw new Error('Channel not found')

    }


})




// @desc Create a product
// @route POST /api/products
// @access Private route/Admin
const downloadStudentExamSubmission = asyncHandler(async(req, res) => {

    console.log("Start Exam")

    const exam = await Studentexam.findById(req.params.submission_id)


    //const channel_subscribed = req.user.channels.includes(exam.channel)



    console.log("Student exam ", req.params.submission_id, exam)

    //console.log("STudent exam start, ", channel_subscribed, exam.isStarted, Date.now() > exam.startTimeLimit)

    //if(channel_subscribed && exam && !exam.isStarted && Date.now() > exam.startTimeLimit){
    if( exam){

        // if(exam.startTimeLimit > Date.now()){

        res.status(201).sendFile(path.join(__dirname, exam.answerpaperfile))

        //res.sendFile(path.join(__dirname, Scard.exam.questionpaperfile))


        // }else{

        //     res.status(404)
        //     throw new Error('To early to start Exam')

        // }


    }else{

        res.status(404)
        throw new Error('Channel not found')

    }



})








export {
    startStudentExam,
    getStudentExam, 
    getStudentExamById,
    getAllStudentExamSubmissions,
    submitStudentExam,
    gradeStudentExamById,
    downloadStudentExamSubmission

}
