// Author : Anil Variyar
// Date Created/Modified last: 21/1/2021
// License : Proprietary
// Property of : Anil Variyar/ Pixagan Technologies Private Limited


import mongoose from 'mongoose'
import {tyfileSchema} from './tyfileModel.js'



const mcqAnalyticsSchema = mongoose.Schema({
    mcqid:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    numQuestions:{
        type: Number,
        default: 0
    },
    metrics:{
        numberTaken:{type:Number},
        maxScore:{type:Number},
        minScore:{type:Number},
        avgScore:{type:Number},
        medianScore:{type:Number},
    },
    qNos:[Number],
    correct:[Number],
    incorrect:[Number],
    notAnswered:[Number],
    average:[Number]

}, {
    timestamps: true
})

const Mcqanalytics = mongoose.model('Mcqanalytics', mcqAnalyticsSchema);





const QuestionSchema = mongoose.Schema({
   mcq:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'Channel'
    },
    qNo:{
        type:{Number},
    },
    Qtype:{type:String,
        required:true,
        default: 'MCQ'
    }, //mcq, short, large, drawing, code
    Qtext:{
        type:String,
        required: true,
        default: ''
    },
    nMarks:{
        type: Number,
        required: true,
        default: 1
    },
    image:{
        fileid:{type: mongoose.Schema.Types.ObjectId,
            ref: 'Tyfile'},
        filename:{type: String},
        filetype:{type:String}
    },
    equations:[{
        text:{type:String}
    }],
    video:{
        type:String,
    },
    audio:{
        type:String
    },
    options: {type: Map},
    language:{
        type: String,
        default: 'english',
    }

}, {
    timestamps: true
})

const Question = mongoose.model('Question', QuestionSchema);



const questionSolutionSchema = mongoose.Schema({
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    question_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    solutionText:[],
    solutionMCQ:{type:String}

}, {
    timestamps: true
})

const Questionsol = mongoose.model('Questionsol', questionSolutionSchema);







const mcqSolutionSchema = mongoose.Schema({
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    mcq:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    numQuestions:{
        type: Number,
        default: 0
    },
    solutions:{type: Map},
    shareSolution:{type:Boolean, default:false},
    solutionLink:{type:String},
    language:{
        type: String,
        default: 'english',
    }

}, {
    timestamps: true
})

const Mcqsol = mongoose.model('Mcqsol', mcqSolutionSchema);



const mcqSectionSchema = mongoose.Schema({
    mcq:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Mcq'
    },
    numQuestions:{
        type: Number,
        default: 0
    },
    questions:[]

}, {
    timestamps: true
})

const Mcqsection = mongoose.model('Mcqsection', mcqSectionSchema);




const mcqSchema = mongoose.Schema({
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    },
    exampassword: {
        type: String
    },
    examname:{
        type: String,
        required: true
    },
    examtype:{
        type:String,
        required: true,
        default: 'paper'
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    },
    totalMarks:{
        type: Number,
        default: 0
    },
    numQuestions:{
        type: Number,
        default: 0
    },
    questionpapertype: {
        type: String,
        default: 'paper',  //'paper', 'digital'
        required: true
    },
    questionpaperfile : {
        fileid:{type: mongoose.Schema.Types.ObjectId,
        ref: 'Tyfile'},
        filename:{type: String},
        filetype:{type:String}
    },
    questions: [],
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
    answerpapertype:{
        type: String,
        default: 'digital', //'digital', 'paper'
        required: true
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
    utcOffset:{
        type:Date,
    },
    timeZone:{
        type:String,
    },
    showMarksOnSubmission:{
        type: Boolean,
        default: true,
    },
    showSolutionOnSubmission:{
        type: Boolean,
        default: false,
    },
    nTaken:{
        type:Number,
        default: 0,
        required: true
    },
    language:{
        type: String,
        default: 'english',
    }

}, {
    timestamps: true
})

const Mcq = mongoose.model('Mcq', mcqSchema);


const mcqsubmissionSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    studentname:{
        type: String,
        required: true,
    },
    mcqid:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    channel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    },
    card:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
    },
    maxMarks:{
        type: Number,
        default: 0
    },
    totalMarks:{
        type: Number,
        default: 0
    },
    nQuestions:{
        type: Number,
        default: 0
    },
    solutions : [{
        type: String,
    }],
    grading:[{
        type: Number,
    }],
    totalGrade:{
        type:Number,
        default:0
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

const Mcqsubmission = mongoose.model('Mcqsubmission', mcqsubmissionSchema);

//export default Mcqsubmission;

export { Mcq, Mcqsol, mcqSchema, Question, Questionsol, Mcqanalytics,Mcqsubmission};