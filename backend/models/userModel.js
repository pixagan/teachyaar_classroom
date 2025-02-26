// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema;


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    emailisVerified:{
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
    isTeacher:{
        type: Boolean,
        required: true,
        default: false
    },
    isStudent:{
        type: Boolean,
        default: false
    },
    isVerified:{
        type: Boolean,
        required: true,
        default: false
    },
    isLoggedIn:{
        type: Boolean,
        required: true,
        default: false
    },
    tempPasswordEmail:{
        otp:{type: String},
        validTill: {type:Date}
    },
    lastUpdate:{ type: Date }
}, {
    timestamps: true
})


userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}



userSchema.methods.updatePassword = async function(enteredPassword){

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(enteredPassword, salt)
    this.save()
}


const User = mongoose.model('User', userSchema);

export default User;