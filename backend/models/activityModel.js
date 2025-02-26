// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import mongoose from 'mongoose'


const activitySchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    activityType:{
        type: String,
        default: 'Standard'
    },
    activityDescription:{
        type: String,
        default: 'Standard'
    },
    databaseRequests:{
        type: Number,
        required: true,
        default: 0
    },
    success:{
        type: Boolean,
        required: true,
        default: false
    },
    public:{
        type: Boolean,
        required: true,
        default: false
    },
    url:{
        type: String,
        required: true,
    },
    ipAddress:{
        type: String,
    },
    device:{
        type: String,
    },
    dataUse:{
        type: Number,
    },
    startTime:{
        type: Date,
    },
    endTime:{
        type: Date,
    },
    responseTime:{
        type: Date,
    },


}, {
    timestamps: true
})


const Activity = mongoose.model('Activity', activitySchema);

export default Activity;