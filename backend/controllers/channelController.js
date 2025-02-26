// Date Created: 29/06/2021
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import asyncHandler from 'express-async-handler'

import { v4 as uuidv4 } from 'uuid';
import generator from 'generate-password'
import mongoose from 'mongoose'


import User from '../models/userModel.js';
import Activity from '../models/activityModel.js';
import Channel from '../models/channelModel.js'
import Tycard from '../models/tycardModel.js'
import {Tyfile} from '../models/tyfileModel.js'
import Qanda from '../models/qandaModel.js'
import Appmetrics from '../models/appmetricsModel.js'
import {Teacherprofile, Studentprofile} from '../models/userProfileModel.js'

import multerS3 from 'multer-s3';
import aws from 'aws-sdk';


const maxSize = 5242880

const s3 = new aws.S3({
    endpoint: process.env.DOSPACESENDPOINT,
    credentials: new aws.Credentials(process.env.SPACES_KEY, process.env.SPACES_SECRET, null)
});
const BucketName = process.env.DO_BUCKETNAME


// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const getChannels = asyncHandler(async (req,res) => {

    const user = await User.findById(req.user._id)

    const user_id = mongoose.Types.ObjectId(req.user._id)

    const teacherprofile = await Teacherprofile.findOne({user: user_id})

    const courselist = teacherprofile.courses

    const courses = await Channel.find({ _id: courselist})
   
    res.json(courses);

})





// @desc Create a product
// @route POST /api/products
// @access Private route/Admin
const createChannel = asyncHandler(async(req, res) => {

    console.log('Create Channel : ',req.user._id)

    const { name } = req.body;


    const user = await User.findById(req.user._id)

    const user_id = mongoose.Types.ObjectId(req.user._id)

    const teacherprofile = await Teacherprofile.findOne({user: user_id})

    console.log('Teacher profile : ', teacherprofile)

    const newInstructorprofile = {
        name: user.name
    }

    const token = generator.generate({
        length: 4,
        numbers: true
    });
    const enrollmentCode = token


    const newChannel = new Channel({
        name: name,
        instructor: req.user._id,
        enrollmentCode: enrollmentCode,
        instructorprofile: {}
    })


    newChannel.instructorprofile = newInstructorprofile


    const createdChannel = await newChannel.save()
    teacherprofile.courses.unshift(createdChannel._id)
    const updatedProfile = await teacherprofile.save()



   
    // console.log('Create live lecture card')
    // const Scard = new Tycard({
    //     user: req.user._id,
    //     channel: createdChannel._id,
    //     type: 'Live',
    //     public: false,
    //     title: 'Live Lecture ',
    //     tags: [],
    //     liveVideo: {}
    // })

    // const random_name = generator.generate({
    //     length: 5,
    //     numbers: true
    // });

    // var password = generator.generate({
    //     length: 10,
    //     numbers: true
    // });


    // console.log('Room')

    // const roomname = createdChannel.name + "_" + random_name

    // console.log('Roomname : ', roomname)
    // const liveVideo = {
    //     roomname: roomname,
    //     token: password,
    //     meetpassword: password,
    //     startedAt: Date.now(),
    //     completedAt: Date.now(),
    //     adminJoined: true,
    //     isStarted: true,
    //     numJoined: 1,
    //     timelimit: 90,
    //     numJoinedLimit: 20,
    //     joinedList: [],
    //     channelname : createdChannel.name
    // }

    // Scard.liveVideo = liveVideo
    // const updatedCard = await Scard.save()

    // console.log('Updated card')

    
    res.status(201).json(createdChannel)


})














// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const getChannelUpdateRT = asyncHandler(async (req,res) => {


    

    const user = await User.findById(req.user._id)

    const userChannels = user.channels



    const lastUpdate =  Date.now()

    const channels = await Channel.find({ _id: userChannels})

    const channel_id = req.params.channel_id
   
    console.log(channels)

    var Scards = null;

    if(req.user.isTeacher){

        Scards = await Tycard.find({channel: channel_id, type:{$ne: 'Live'}}).sort({ updatedAt: -1});  //.limit(pageSize).skip(pageSize*(page-1))
   


    }else{

        Scards = await Tycard.find({channel: channel_id, isPost: true, type:{$ne: 'Live'}}).sort({ updatedAt: -1});  //.limit(pageSize).skip(pageSize*(page-1))
   

    }

    const qanda = await Qanda.find({channel: channel_id}).sort({ updatedAt: -1})


    res.json({"channels":channels, "cards":Scards, "qanda":qanda, "lastUpdate":lastUpdate});

    

})




// @desc Fetch one product by it's ID
// @route GET /api/products
// @access Public route
const getChannelById = asyncHandler(async(req, res) => {
    
    

    const user = await User.findById(req.user._id)

    const channel_id = req.params.channel_id

    const channel_subscribed = user.channels.includes(channel_id)


    if(channel_subscribed){

        const channel = await Channel.findById(req.params.channel_id);

    
        if(channel) {
            res.json(channel);
        }else{
    
            res.status(404)
            throw new Error('Channel not found')
        }


    }else{

        res.status(404)
        throw new Error('Channel not found')

    }


})







// @desc UPDATE A SUBSCRIBER LIST
// @route PUT /api/products/:id
// @access Private route/Admin
const enrollmentRequestChannel = asyncHandler(async(req, res) => {

    console.log("enrollment request ")

    const {enrollmentCode} = req.body

    const channel = await Channel.findOne({enrollmentCode: enrollmentCode})

    console.log("Enrollment Request :", enrollmentCode, req.user._id)


        if(channel){


            console.log("Hello")

            //Check if the user has not already sybscribed to the channel or has not already sent a request
            const removeIndex = channel.subscriptionRequests.map(subsreq => subsreq.user.toString()).indexOf(req.user._id);

            console.log("Duplicates 1 ", removeIndex)

            const alreadysubscribed = channel.subscribers.map(subsreq => subsreq.toString()).indexOf(req.user._id);


            //console.log("Duplicates ", alreadysubscribed)

            if(removeIndex<0 && alreadysubscribed<0){

                const subsReq = {
                    user: req.user._id,
                    name: req.user.name
                }


                channel.subscriptionRequests.unshift(subsReq)

                await channel.save()
                res.json("Request Submitted")

            }else{

                res.status(404)
                throw new Error('Already subscribed')

            }



            

        }else{
            res.status(404)
            throw new Error('Invalid Channel')
        }



})




// @desc UPDATE A SUBSCRIBER LIST
// @route PUT /api/products/:id
// @access Private route/Admin
const approveEnrollmentRequestChannel = asyncHandler(async(req, res) => {

    const {student_id} = req.body
    const approvedUser_id = student_id

    console.log("Approve :", student_id)

    const approvedUser = await User.findById(approvedUser_id)

    const channel = await Channel.findById(req.params.channel_id)

    const user = await User.findById(req.user._id)

    console.log('Channel subs det : ', channel.subscribers.length, user.limits.subscribers)

    //add subscription limit
    if(channel.subscribers.length <= 20 ){


        if(user.limits.subscribers < 100){


            console.log("Enrollment Request :", approvedUser)


            if(channel && approvedUser){

                const alreadysubscribed = channel.subscribers.map(subsreq => subsreq.toString()).indexOf(approvedUser._id);

                console.log('ALready subscribed ',alreadysubscribed )

                if(alreadysubscribed<0){

                    channel.subscribers.unshift(approvedUser_id)

                    const newSubs = {
                        userid:approvedUser._id,
                        name:approvedUser.name,
                    }
        
                    channel.subscribersDet.unshift(newSubs)
        
                    console.log("Added subscriber")
        
                    approvedUser.channels.unshift(channel._id)
        
        
                    console.log("Add channel to user")
        
                    //remove the user request from here
                    //channel.subscriptionRequests.unshift(newSubs)
        
                    //Get remove index
                    const removeIndex = channel.subscriptionRequests.map(subsreq => subsreq.user.toString()).indexOf(approvedUser._id);
        
                    if(removeIndex >= 0){
                        channel.subscriptionRequests.splice(removeIndex,1);
        
                        //save the updated like
                        //await channel.save();
        
                    }
        
                    console.log("Remove requests")
        
                    const updated_currUser = await approvedUser.save()
        
                    const updatedChannel = await channel.save()

                    user.limits.subscribers = user.limits.subscribers + 1
                    await user.save()
        
                    res.json(updatedChannel)

                }else{
                    res.json(channel)
                }



            }else{
                res.status(404)
                throw new Error('Invalid Channel')
            }


        }else{

            res.status(404)
            throw new Error('Max enrollment limit reached for your account')
        }






    }else{
        res.status(404)
        throw new Error('Reached Channel limit')
    }



})







// @desc UPDATE A SUBSCRIBER LIST
// @route PUT /api/products/:id
// @access Private route/Admin
const unsubscribeChannel = asyncHandler(async(req, res) => {


    console.log("Unsubscribe User")

    const student_id = req.params.student_id
    const channel_id = req.params.channel_id

    console.log("Unsubscribe ", student_id, channel_id)

    const user = await User.findById(student_id)

    const channel = await Channel.findById(channel_id)

    const channelInstructor = await User.findById(channel.instructor)

    console.log("Auth check STudent", (req.user._id.equals(student_id)) && !req.user.isTeacher)
    console.log("Auth check teacher", (req.user.isTeacher && req.user._id.equals(channel.instructor)))

    //student unsubscribe from channel
    if(((req.user._id.equals(student_id)) && !req.user.isTeacher) || (req.user.isTeacher && req.user._id.equals(channel.instructor))  ){

        console.log("Authorized to remove")

        //if student is
        //Get remove index
        const removeIndex = user.channels.map(channel => channel.toString()).indexOf(channel_id);

        //if channel in user subscription list
        if(removeIndex >= 0){

            console.log("User channel remove index ", removeIndex)

            user.channels.splice(removeIndex, 1)

    
            //save the updated like
            //await channel.save();
        }

        //check if

        //Get remove index
        const removeIndexC = channel.subscribers.map(subsreq => subsreq.toString()).indexOf(student_id);

        console.log("Remove subscribers ", removeIndexC)

        if(removeIndexC >= 0){
            channel.subscribers.splice(removeIndexC,1);

            //save the updated like
            //await channel.save();
        }

        console.log("Remove subscribers ", removeIndexC)


        //Get remove index
        const removeIndexD = channel.subscribersDet.map(subsreq => subsreq.userid.toString()).indexOf(student_id);
        console.log("Remove subscribers D ", removeIndex)

        if(removeIndexD >= 0){
            channel.subscribersDet.splice(removeIndexD,1);

            //save the updated like
            //await channel.save();
        }

        console.log("Remove subscribers ", removeIndexD)

        await channel.save()
        await user.save()


        channelInstructor.limits.subscribers = channelInstructor.limits.subscribers - 1
        await channelInstructor.save()
         
        res.json("Successfully unsubscribed")



    }else{
            res.status(404)
            throw new Error('Invalid Channel or Unauthorized User')
    }



})












// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const updatelistChannelsRT = asyncHandler(async (req,res) => {

    const user = await User.findById(req.user._id)

    const userChannels = user.channels

    const channels = await Channel.find({ _id: userChannels})
   
    console.log(channels)
    res.json(channels);

})






// @desc Delete one product by it's ID
// @route DELETE /api/products
// @access Private route/Admin
const deleteChannel = asyncHandler(async(req, res) => {
    
    
    console.log("deleting Channel ")
    const user = await User.findById(req.user._id)

    const channel_id = req.params.channel_id

    const channel_subscribed = user.channels.includes(channel_id)

    console.log("Deleting Channel 1", user._id, channel_id, channel_subscribed)

    

    //console.log('appmet', appmet)

    if(user.isTeacher && channel_subscribed){


        const channel = await Channel.findById(req.params.channel_id);

        if(channel) {


            //remove channel from subscription list
            const currCard  = await Tycard.find({channel:channel_id})
            const nCards = currCard.length
            console.log('Channel cards ', currCard)

            const currFiles = await Tyfile.find({channel:channel_id})
            console.log('Channel files ', currFiles)
            const nFiles = currFiles.length

            await currFiles.map(async(itemfile) =>{

                const filename = itemfile.filename
                const filesize = itemfile.size

                let deleteParameters = {
                    Bucket: BucketName,
                    Key: filename
                };


                //await s3.deleteObject(deleteParameters)

                await s3.deleteObject(deleteParameters, async(err, data) =>{
                    if (err) {
                        console.log(err, err.stack);
                    }else {
                        console.log("Successfully deleted file ",data);

                    }
                });

                
                //appmet.fileMets.filedeleted = appmet.fileMets.filedeleted + 1
                //appmet.fileMets.filedeletedSize = appmet.fileMets.filedeletedSize + filesize
                //await appmet.save()

                user.limits.filememory = user.limits.filememory - filesize
                //await user.save()
                console.log('Done deleting file ', filename)

            })

            
            const appmet = await Appmetrics.findOne({type:'user'})


            if(nFiles>0){
                console.log('Delete Files', nFiles, nCards)
                await Tyfile.remove({channel:channel_id})
                appmet.fileMets.filedeleted = appmet.fileMets.filedeleted + nFiles
            }


            //await currCard.remove()
            if(nCards>0){
            console.log('Delete Cards')
            await Tycard.remove({channel:channel_id})
            appmet.cardMets.deleted = appmet.cardMets.deleted + nCards
            }

            //remove Q and A
            console.log('Delete Qanda Channels')
            const qanda_channel = await Qanda.find({channel:channel_id})
            console.log('Nchannels : ', qanda_channel.length)
            if(qanda_channel.length>0){
                await Qanda.remove({channel:channel_id})
                appmet.qandaMets.deleted = appmet.qandaMets.deleted + qanda_channel.length

            }

            console.log('Remove subscribers')
            //remove channel from subscribers list
            await channel.subscribers.map(async(subscriber) => {

                //fnd user
                const user = await User.findById(subscriber)

                const removeIndex = user.channels.map(channel => channel.toString()).indexOf(channel_id);

                //if channel in user subscription list
                if(removeIndex >= 0){
        
                    console.log("User channel remove index ", removeIndex)
        
                    user.channels.splice(removeIndex, 1)
                    
            
                    //save the updated like
                    
                }

            })


            
            //remove channel from users list -  notify them


            //delete cards associated with channels

            //delete QandA associated with channels

            //remove channel from subscribers list - policy


            console.log("Deleting Channel final", channel_id)

            const nSubscribers = channel.subscribers.length

            //await Channel.deleteOne({_id: channel_id})
            await channel.remove()

            //const appmet = await Appmetrics.findOne({type:'user'})
            appmet.channelMets.deleted = appmet.channelMets.deleted + 1
            await appmet.save()

            console.log()

            user.limits.subscribers = user.limits.subscribers - nSubscribers
            user.limits.nCards = user.limits.nCards - nCards
            const removeIndex = user.channels.map(channel => channel.toString()).indexOf(channel_id);
            if(removeIndex >= 0){
                user.channels.splice(removeIndex,1);        
            }
            await user.save();


            res.json({message: 'Channel removed', channel_id:channel_id })
        }else{
    
            res.status(404)
            throw new Error('Channel not found')
        }


    }else{

        res.status(404)
        throw new Error('Channel not found')

    }
    


})






// @desc Update a product by id
// @route PUT /api/products/:id
// @access Private route/Admin
const updateChannel = asyncHandler(async(req, res) => {

    //const {name, price, description, image, brand, category, countInStock} = req.body

    const { channelname, description, subject, level, instructionLanguage } = req.body;

    const channel = await Channel.findById(req.params.id)

    if(channel){

        channel.name = channelname
        channel.description = description
        channel.subject = subject
        channel.level = level
        channel.language = instructionLanguage
        // interactive: false,
        // category: 'regular',
        // instructor: req.user._id,
        // channelQandaBoard: createdBoard._id

        // channel.name = name
        // channel.price = price
        // channel.description = description
        // channel.image = image
        // channel.brand = brand
        // channel.category = category
        // channel.countInStock = countInStock

        const updatedChannel = await channel.save()
        res.json(updatedChannel)

    }else{
        res.status(404)
        throw new Error('Channel not found')
    }

})





// // @desc UPDATE A SUBSCRIBER LIST
// // @route PUT /api/products/:id
// // @access Private route/Admin
// const subscribeChannel = asyncHandler(async(req, res) => {

//     const {name, email, phoneNo} = req.body

//     const channel = await Channel.findById(req.params.channel_id)

//     console.log("Subscription Request :", channel._id, email)


//     if(channel){

//         //check if the user exists
//         const current_user = await User.findOne({email: email})
//         if(current_user){
//             channel.subscribers.unshift(current_user._id)

//             const newSubs = {
//                 userid:current_user._id,
//                 name:current_user.name,
//                 email:current_user.email,
//                 phoneNo:current_user.phoneNo,
//             }

//             channel.subscribersDet.unshift(newSubs)


//             const updatedChannel = await channel.save()

//             current_user.channels.unshift(channel._id)

//             const updated_currUser = await current_user.save()


//             console.log("Updated subscribers ", current_user)
//             return res.json(updatedChannel)
//         }else{
//             console.log("User not on TaskYaar")
//             //send a taskyaar add request to the user via email, sms
//             res.status(404)
//             throw new Error('User not on TeachYaar, request sent by email, phone')
//             //return res.status(404).json("User not on TeachYaar, request sent by email, phone")
//         }

//     }else{
//         res.status(404)
//         throw new Error('Channel not found')
//     }

// })






export {
    getChannels,
    getChannelById,
    deleteChannel,
    createChannel,
    updateChannel,

    enrollmentRequestChannel,
    approveEnrollmentRequestChannel,

    //subscribeChannel,
    unsubscribeChannel,

    getChannelUpdateRT

}

