// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Channel from '../models/channelModel.js'

const protect = AsyncHandler(async (req, res, next) => {
    let token

  
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {


        try{
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)


            req.user = await User.findById(decoded.id).select('-password')


            next()
        } catch(error){
            console.log("Token error")
            res.status(401)
            throw new Error('Not authorized, token failed')
        }

    } 

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})


const admin = (req,res,next) =>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error("Not authorized as an admin")
    }
}


const teacher = (req,res,next) =>{
    if(req.user && req.user.isTeacher){
        next()
    }else{
        res.status(401)
        throw new Error("Not authorized as a teacher")
    }
}


const student = (req,res,next) =>{
    if(req.user && !req.user.isTeacher){
        next()
    }else{
        res.status(401)
        throw new Error("Not authorized as a student")
    }
}



const subscribed = (req,res,next) =>{


    const channel_id = req.params.channel_id
    const channel_subscribed = req.user.channels.includes(channel_id)

    if(req.user && channel_subscribed){
        next()
    }else{
        res.status(401)
        throw new Error("Not subscribed to channel")
    }
}





export { protect, admin, teacher, student, subscribed}