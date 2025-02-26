// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema;


//Check about last logged in
//Create a log in history

const usertempSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    isTeacher:{
        type: Boolean,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    emailisVerified:{
        type: String,
        required: true,
        default: false
    },
    phoneNo:{
        type: String,
        required: true,
        unique: true
    },
    phoneNoisVerified:{
        type: String,
        required: true,
        default: false
    },
    acceptTerms:{
        type: Boolean,
        required: true,
        default: false
    },
    tempPasswordEmail:{
        otp:{type: String},
        createdAt:{type:Date},
        validTill: {type:Date},
        attempts:{type:Number, default:2}
    },
    tempPasswordPhone:{
        otp:{type: String},
        createdAt:{type:Date},
        validTill: {type:Date},
        attempts:{type:Number, default:2}
    }
}, {
    timestamps: true
})



const Usertemp = mongoose.model('Usertemp', usertempSchema);

export default Usertemp;