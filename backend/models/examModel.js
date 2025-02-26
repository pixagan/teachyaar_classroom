// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import mongoose from 'mongoose'
import {tyfileSchema} from './tyfileModel.js'

const examSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    channel:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Channel'
    },
    card:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    },
    instructorname:{
        type: String,
        required: true,
    },
    examname:{
        type: String,
        required: true
    },
    examdescription:{
        type: String,
        required: true
    },
    examformat:{
        type: String,
        required: true,
        default: "Paper" //"Digital"
    },
    totalMarks:{
        type: Number,
        default: 0
    },
    numQuestions:{
        type: Number,
        default: 0
    },
    questionpaperfile : {
        fileid:{type: mongoose.Schema.Types.ObjectId,
        ref: 'Tyfile'},
        filename:{type: String},
        filetype:{type:String}
    },
    //questionpaperfile : tyfileSchema,
    // questionpaperfile : {
    //     type: String,
    // },
    public:{
        type: Boolean,
        required: true,
        default: false
    },
    isGraded:{
        type: Boolean,
        required: true,
        default: false
    },
    isPosted: {
        type: Boolean,
        required: true,
        default: false
    },
    finalize:{
        type: Boolean,
        required: true,
        default: false
    },
    autograde:{
        type: Boolean,
        required: true,
        default: false
    },
    nSubmissions:{
        type: Number,
        default: 0
    },
    nGraded:{
        type: Number,
        default: 0
    },
    startTime:{
        type: Date,
    },
    duration:{
        type: Number,
        default: 0
    },
    endTime:{
        type: Date,
    },

}, {
    timestamps: true
})

const Exam = mongoose.model('Exam', examSchema);

export { Exam, examSchema};