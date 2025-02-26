// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import mongoose from 'mongoose'
import dotenv  from 'dotenv'
import colors from 'colors'
import User from '../models/userModel.js'

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

const createAdmin = async (username, password, email) => {

    try{

        const salt = await bcrypt.genSalt(10)
        const saltedpassword = await bcrypt.hash(password, salt)
    

        const user = await  User.create({
            name:username,
            email:email,
            password:saltedpassword,
            isAdmin:true,
            acceptTerms: true
        })


        const updatedUser = await user.save()

        console.log(`Admin User Created: ${updatedUser.name}`.green.underline.bold)


    }catch(error){
        console.log("Unable to Create Admin User")

    }


}




const updateAdmin = async () => {

    try{

        const user = await User.findById(user_id)

        user.name = name
        user.email = email
        user.password = password

        const updatedUser = await user.save()


    }catch(error){
        console.log("Unable to Update")

    }


}



const deleteAdmin = async () => {

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

const username = 'admin1'
const password = 'admin1'
const email    = 'admin1@example.com'


await connectDB()
createAdmin(username, password, email)