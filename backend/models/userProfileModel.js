// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema;

const teacherProfileSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNo:{
        type: String,
    },
    profilepic:{
        type: String,
    },
    qualifications:[{
        degree:{type:String},
        institution:{type:String}
    }],
    experience:[{
        institution:{type:String}
    }],
    courses:[mongoose.Schema.Types.ObjectId],
    
    

}, {
    timestamps: true
})



const Teacherprofile = mongoose.model('Teacherprofile', teacherProfileSchema);



const studentProfileSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNo:{
        type: String,
    },
    profilepic:{
        type: String,
    },
    courses:[mongoose.Schema.Types.ObjectId],
    guardianContact:{
        name:{type:String},
        phoneNo:{type:String}
    },
  
}, {
    timestamps: true
})



const Studentprofile = mongoose.model('Studentprofile', studentProfileSchema);




export {Teacherprofile, Studentprofile};