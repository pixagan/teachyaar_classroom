// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import mongoose from 'mongoose'

const questionanswerSchema = mongoose.Schema({
    question:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
        default: 'MC'  //Text, multiple choice, Math (ability to add equation), drawing - allow board

    },
    options: [{
        type: String,
    }],
    image: {
        type: String,
    },
    answer:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Qandaboard'
    }
}, {
    timestamps: true
})


const questionSchema = mongoose.Schema({
    question:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
        default: 'MC'  //Text, multiple choice, Math (ability to add equation), drawing - allow board

    },
    options: [{
        type: String,
    }],
    image: {
        type: String,
    }
}, {
    timestamps: true
})




const questiongroupSchema = mongoose.Schema({
    user: {
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
        required: true, //exam, normal
    },
    questions:[questionSchema],
    public:{
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})


const Questiongroup = mongoose.model('Questiongroup', questiongroupSchema);

export default Questiongroup;