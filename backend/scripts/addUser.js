// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import mongoose from 'mongoose'
import dotenv  from 'dotenv'
import colors from 'colors'
import User from '../models/userModel.js'
import {Teacherprofile, Studentprofile} from '../models/userProfileModel.js'

import generator from 'generate-password'
import bcrypt from 'bcryptjs'


dotenv.config({ path:'../.env'})

var conn = null;

const connectDB = async () => {

    try {
        conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewURLParser: true,
            useCreateIndex: true,
        })

        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)

    } catch(error){

        console.error(`Error : ${error.message}`.red.underline.bold)
        process.exit(1)

    }

}
//password protect this and check for confirmation maybe even otp

const addTeacher = async (username, password, email) => {

    //try{

        const salt = await bcrypt.genSalt(10)
        const saltedpassword = await bcrypt.hash(password, salt)
    

        const user = await  User.create({
            name:username,
            email:email,
            password:saltedpassword,
            isTeacher:true,
            acceptTerms: true,
        })


        const updatedUser = await user.save()

        if(user){
            const newteacher = await Teacherprofile.create({
                user:user._id,
                name: username,
                email:email,
                phoneNo:" ",
                profilepic:" ",
                qualifications:[],
                experience:[],
                courses:[]
            })
        }

        console.log(`Teacher Created: ${updatedUser.name}`.green.underline.bold)


    //}catch(error){
       // console.log("Unable to Create Teacher")

    //}


}




const updateUser = async () => {

    try{

        const user = await User.findById(user_id)

        user.name = name
        user.email = email
        user.phoneNo = phoneNo
        user.password = password

        const updatedUser = await user.save()


    }catch(error){
        console.log("Unable to Update")

    }


}



const deleteUser = async () => {

    try{

        const adminUsers = await User.find({isAdmin:true})

        if (adminUsers.length > 1){
            const user = await User.findById(user_id)
            await user.remove()
        }else{
            console.log("Unable to delete admin as only 1 admin exists")
        }


    }catch(error){
        console.log("Unable to Delete")

    }


}




const addStudent = async (username, password, email) => {

    //try{

        const salt = await bcrypt.genSalt(10)
        const saltedpassword = await bcrypt.hash(password, salt)
    

        const user = await  User.create({
            name:username,
            email:email,
            password:saltedpassword,
            isStudent:true,
            acceptTerms: true,
        })


        const updatedUser = await user.save()

        if(user){
            const newstudent = await Studentprofile.create({
                user:user._id,
                name: username,
                email:email,
                phoneNo:" ",
                profilepic:" ",
                courses:[],
                guardianContact:{
                    
                },
            })
        }

        console.log(`Student Created: ${updatedUser.name}`.green.underline.bold)


    //}catch(error){
       // console.log("Unable to Create Teacher")

    //}


}







await connectDB()

// const username = 'teacher1'
// const password = 'teacher1'
// const email    = 'teacher1@example.com'
// addTeacher(username, password, email)


const username = 'student1'
const password = 'student1'
const email    = 'student1@example.com'
addStudent(username, password, email)