// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import mongoose from 'mongoose'
import {tyfileSchema} from './tyfileModel.js'

const studentexamSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    studentname:{
        type: String,
        required: true,
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    instructorname:{
        type: String,
        required: true,
    },
    channel:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Channel'
    },
    card:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
        required: true
    },
    examname:{
        type: String,
        required: true
    },
    examformat:{
        type: String,
        required: true,
        default: "File" //"Digital"
    },
    maxMarks:{
        type: Number,
        default: 0
    },
    totalMarks:{
        type: Number,
        default: 0
    },
    questionpaperfile : {
        type: String,
    },
    answerpaperfile:{
        fileid:{type: mongoose.Schema.Types.ObjectId,
        ref: 'Tyfile'},
        filename:{type: String},
        filetype:{type:String}
    },
    //answerpaperfile : tyfileSchema,
    // {
    //     type: String,
    // },
    gradedpaperfile : {
        type: String,
    },
    isStarted:{
        type: Boolean,
        required: true,
        default: false
    },
    isSubmitted:{
        type: Boolean,
        required: true,
        default: false
    },
    isGraded:{
        type: Boolean,
        required: true,
        default: false
    },
    autograde:{
        type: Boolean,
        required: true,
        default: false
    },
    feedback : {
        type: String,
    },
    nGraded:{
        type: Number,
        default: 0
    },
    startTime:{
        type: Date,
    },
    submissionTime:{
        type: Date,
    },
    startTimeLimit:{
        type: Date,
    },
    submissionTimeLimit:{
        type: Date,
    },
    duration:{
        type: Number,
        default: 0
    },
    durationLimit:{
        type: Number,
        default: 0
    },
    status: {
        type: String,
        required: true,
        default: "created" //"created","started", "submitted", "graded"
    }

}, {
    timestamps: true
})

const Studentexam = mongoose.model('Studentexam', studentexamSchema);

export default Studentexam;