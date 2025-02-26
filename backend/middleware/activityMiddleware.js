// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Channel from '../models/channelModel.js'
import Activity from '../models/activityModel.js';



const logActivitypre = AsyncHandler(async(req,res,next) =>{


    const channel_id = req.params.channel_id
    const channel    = await Channel.findById(channel_id)

    console.log('Request URL:', req.originalUrl)

    const ipAddress = req.connection.remoteAddress


    // if(req.user && req.user._id.equals(channel.instructor)){
    //     next()
    // }else{
    //     res.status(401)
    //     throw new Error("Not subscribed to channel")
    // }


    const newActivity = new Activity({
        url: req.originalUrl,
        startTime: Date.now(),
        ipAddress: ipAddress
    })

    const savedActivity = await newActivity.save()

    req.activity = savedActivity

    next()



})


const logActivitypost = AsyncHandler(async(req,res,next) =>{


    const channel_id = req.params.channel_id
    const channel    = await Channel.findById(channel_id)

    console.log('Request URL:', req.originalUrl)


    // if(req.user && req.user._id.equals(channel.instructor)){
    //     next()
    // }else{
    //     res.status(401)
    //     throw new Error("Not subscribed to channel")
    // }

    const currActivity = req.activity

    currActivity.endTime = Date.now()
    currActivity.responseTime = currActivity.startTime-currActivity.endTime
    currActivity.success = true

    await currActivity.save()


    next()


})

export { logActivitypre,  logActivitypost}



// const subscribed = (req,res,next) =>{


//     const channel_id = req.params.channel_id
//     const channel_subscribed = req.user.channels.includes(channel_id)

//     if(req.user && channel_subscribed){
//         next()
//     }else{
//         res.status(401)
//         throw new Error("Not subscribed to channel")
//     }
// }