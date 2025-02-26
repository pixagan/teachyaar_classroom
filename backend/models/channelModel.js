// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import mongoose from 'mongoose'


const teacherprofileSchema = mongoose.Schema({
    name: {type: String, required: true},
    qualification: {type: String},
    description: {type: String},
    channelMessage: {type: String},
    rating: {type: Number},
},{
    timestamps: true
})


const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true, default: 0},
    comment: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
},{
    timestamps: true
})



const channelSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    subject:{
        type: String,
    },
    level:{
        type: String,
    },
    language:{
        type: String,
        default: 'English'
    },
    interactive:{
        type: Boolean,
        required: true,
        default: false
    },
    category:{
        type: String,  //regular, short, free, sample,ty
        required: true,
        default: 'regular'
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    instructorprofile:teacherprofileSchema,
    image:{
        type: String,
    },
    advVideo:[{
        type: String,
    }],
    institution: {
        type: String,
        required: true,
        default: "Private"
    },
    reviews:[reviewSchema],
    rating:{
        type: Number,
        required: true,
        default: 0
    },
    numReviews:{
        type: Number,
        required: true,
        default: 0
    },
    numFollowers:{
        type: Number,
        required: true,
        default: 0
    },
    subscriptionRequests:[ {
        user:{type: mongoose.Schema.Types.ObjectId, required:true},
        name:{type: String, required: true},
    }],
    subscribers:[mongoose.Schema.Types.ObjectId],
    numSubscribers:{
        type: Number,
        required: true,
        default: 0
    },
    subscribersDet:[{
        userid:{type: mongoose.Schema.Types.ObjectId},
        name:{type: String},
        email:{type: String},
        phoneNo:{type: String},
    }],
    timeline:{
        type: Number,
        required: true,
        default: 0
    },
    isPublic:{
        type: Boolean,
        required: true,
        default: false
    },
    type:{
        type: String,
        required: true,
        default: "PrivateTeacher" //Student, PublicTeacher
    },
    payModel:{
        type: String,
        required: true,
        default: "Free" //PrivatePremium, PublicPremium
    },
    channelQandaBoard:{
        type: mongoose.Schema.Types.ObjectId,
    },
    updateStateNo:{
        type: Number,
        required: true,
        default: 0
    },
    updateStateDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    enrollmentCode: {
        type: String,
        // required: true,
        // default: "Free"
    },
    classIsLive:{
        type: Boolean,
        default: false
    }


}, {
    timestamps: true
})

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;