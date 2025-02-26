// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import mongoose from 'mongoose'
import {examSchema} from './examModel.js'

const tyfileSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    channel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    },
    type:{type: String},
    filetype:{type: String}, //note, qpaper, anspaper
    path:{type: String},
    filename: {type: String},
    originalname:{type: String},
    size:{type: Number},
    mimeType:{type: String},
    thumbnail:{type: String},
    destination: {type:String},
    cardType:{type:String}, //notes, examqpaper, examanspaper
    card: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    },
    nDownloads:{type:Number, default:0},
    accessType:{type:String, default:'Channel'},  //'Instructor'
    deleteDate:{type:Date}
}, {
    timestamps: true
})


const Tyfile = mongoose.model('Tyfile', tyfileSchema);

export {Tyfile, tyfileSchema};