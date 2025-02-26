// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import mongoose from 'mongoose'

const qandareplySchema = mongoose.Schema({
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
    username: {
        type: String,
        required: true,
    },
    qanda:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Qandaboard'
    },
    instructor:{
        type: Boolean,
        default: false
    },
    type:{
        type: String,
        required: true,
    },
    responseText:{
        type: String,
        required: true,
    },
    endorsed:{
        type: Boolean,
        default: false
    },
    likes:{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }
}, {
    timestamps: true
})




const qandaSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    username: {
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
        ref: 'Tycard'
    },
    type:{
        type: String,
        required: true,
    },
    questionText:{
        type: String,
        required: true,
    },
    private:{
        type: Boolean,
        required: true,
        default: false
    },
    resolved:{
        type: Boolean,
        required: true,
        default: false
    },
    nComments:{
        type: Number,
        required: true,
        default: 0
    },
    comments:[qandareplySchema],
    toInstructorOnly:{
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})


const Qanda = mongoose.model('Qanda', qandaSchema);

export default Qanda;