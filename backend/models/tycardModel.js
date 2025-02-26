// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import mongoose from 'mongoose'
import {examSchema} from './examModel.js'
import {tyfileSchema} from './tyfileModel.js'

const tycardSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    channel:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Channel'
    },
    topic:{
        type: String,
    },
    type:{   //general : , admin: announcement, video, advert, offer, notification
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    items:[{
        text: {type: String},
        file:{
            fileid:{type: mongoose.Schema.Types.ObjectId,
            ref: 'Tyfile'},
            filename:{type: String},
            filetype:{type:String}
        },
        //file:tyfileSchema,
        // file: {
        //     type:{type: String},
        //     name:{type: String},
        //     size:{type: Number},
        //     thumbnail:{type: String},
        // },
        equation: {type: String},
        board: {type: String},
    }],
    exam:examSchema,
    // exam:{
    //     examid: {type: mongoose.Schema.Types.ObjectId},
    //     examname: {type: String},
    //     examstart: {type: Date},
    //     examend: {type: Date},
    //     examDuration: {type: Number},
    //     nQuestions: {type: Number},
    //     maxmarks:{type: Number},
    //     nSubmissions:{type: Number}
    // },
    liveVideo:{
        conftype:{type:String, default:'Jitsi'},
        roomname: {type: String},
        link: {type: String},
        token: {type: String},
        meetpassword: {type: String},
        startedAt: {type: String},
        completedAt: {type: String},
        isStarted: {type: Boolean, default: false},
        isEnded: {type: Boolean, default: false},
        adminJoined: {type: Boolean, default: false},
        numJoined: {type: Number, default: 0},
        timelimit: {type: Number, default: 90},
        numJoinedLimit: {type: Number, default: 20},
        joinedList: [{
            user: {type: mongoose.Schema.Types.ObjectId},
            joinedAt:{type: Date},
            leftAt:{type: Date},
        }],
        items: [{
            startedAt: {type: String},
            completedAt: {type: String},
            numJoined: {type: Number, default: 0},
        }],
        channelname:{type: String},
    },
    notification:{
        text:{type:String},
        notificationid: {type: mongoose.Schema.Types.ObjectId},
        image:{type:String},
        options:[{
            type:String
        }]
    },
    feedback:{
        text:{type:String},
        feedbackid: {type: mongoose.Schema.Types.ObjectId},
    },
    video:[{
        filename: {type: String}
    }],
    book:[{
        filename: {type: String}
    }],
    advert:[{
        filename: {type: String}
    }],
    images:[{
        type: String,
    }],
    public:{
        type: Boolean,
        required: true,
        default: false
    },
    tags:[{
        type: String
    }],
    qanda:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tycard'
    }],
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tycard'
    },
    isPost:{
        type: Boolean,
        required: true,
        default: false
    },
    enableDoubts:{
        type: Boolean,
        default: true
    },
    description:{
        type: String
    }

}, {
    timestamps: true
})


const Tycard = mongoose.model('Tycard', tycardSchema);

export default Tycard;