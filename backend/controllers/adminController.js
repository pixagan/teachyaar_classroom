// Date Created: 02/02/2021
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import asyncHandler from 'express-async-handler'

import Channel from '../models/channelModel.js'
import User from '../models/userModel.js'
import Tycard from '../models/tycardModel.js'
import Activity from '../models/activityModel.js';
import Qanda from '../models/qandaModel.js'
import {Exam} from '../models/examModel.js'
import Studentexam from '../models/studentexamModel.js'
import Notifications from '../models/notificationModel.js'
//import Feedback from '../models/feedbackModel.js'
import Usertemp from '../models/usertempModel.js'
//import Support from '../models/supportModel.js'
//import Contactus from '../models/contactUsModel.js'
//import Appmetrics from '../models/appmetricsModel.js'
//-------------------- Verify Users -----------------------





// @desc Auth user & get token
// @route POST /api/users/login
// @access Public route
const verifyUsersAdmin = asyncHandler(async (req,res, next) => {


    //generate otp using twilio
    const user_id = req.params.user_id 
    const { phoneOTP } = req.body;

    console.log('Reset Password ', user_id, phoneOTP)

    const user = await Usertemp.findById(user_id)


    console.log('User selected ', user, phoneOTP, user.tempPasswordPhone.otp)


    if(user && phoneOTP === user.tempPasswordPhone.otp){
        user.phoneisVerified = true
        user.tempPasswordPhone = {}
        const updatedUsertemp = await user.save()

        console.log('User Phone is verified')

        req.usertemp = updatedUsertemp

        console.log('Moving to authenticate', req.user)

        next()

        //res.json({message :'Phone is verified'})


    }else{

        user.tempPasswordPhone = {}
        await user.save()
        res.status(404)
        throw new Error('Incorrect OTP')
    }


})




// // @desc Fetch all products 
// // @route GET /api/products
// // @access Public route
// const verifyUsersAdmin = asyncHandler(async (req,res) => {

//     console.log("Verify Users ")
//     const user_id = req.params.user_id;
//     console.log("User id ",user_id)
//     const user = await Usertemp.findById(user_id)

//     if(user){



//         user.isVerified = true;

//         const updatedUsers = await user.save()


//         console.log("Load Users ")
//         const unverified_users = await User.find({isTeacher:true, isVerified:false});
    
//         const verified_users = await User.find({isTeacher:true, isVerified:true});
    
//         console.log("verified : ",verified_users, "unverified : ",unverified_users)
//         res.json({"verified":verified_users, "unverified":unverified_users});


//     }else{
//         res.status(404)
//         throw new Error('Unable to verify')
//     }


// })



// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const verifyUsersAdminOld = asyncHandler(async (req,res) => {

    console.log("Verify Users ")
    const user_id = req.params.user_id;
    console.log("User id ",user_id)
    const user = await User.findById(user_id)

    if(user){

        user.isVerified = true;

        const updatedUsers = await user.save()


        console.log("Load Users ")
        const unverified_users = await User.find({isTeacher:true, isVerified:false});
    
        const verified_users = await User.find({isTeacher:true, isVerified:true});
    
        console.log("verified : ",verified_users, "unverified : ",unverified_users)
        res.json({"verified":verified_users, "unverified":unverified_users});


    }else{
        res.status(404)
        throw new Error('Unable to verify')
    }


})





//--------------------Load Metrics -------------------------


// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const loadTeachYaarMetrics = asyncHandler(async (req,res) => {

    console.log("Get TeachYaar metrics ")

    const channel_count = await Channel.countDocuments({})
    const card_count    = await Tycard.countDocuments({})
    const qanda_count   = await Qanda.countDocuments({})

    const studentexam_count    = await Studentexam.countDocuments({})

    const user_count = await User.countDocuments({})
    const teacher_count = await User.countDocuments({isTeacher:true})

    const activity_count = await Activity.countDocuments({})

    console.log("Channel : ", channel_count, "Card : ", card_count,
    "Qanda : ", qanda_count, "Student Exam : ", studentexam_count, 
    "Teacher : ", teacher_count, "Users : ", user_count, 
    "Activity : ", activity_count)


    res.json({"Channel":channel_count, "Card":card_count,
    "Qanda":qanda_count, "StudentExam":studentexam_count, 
    "Teacher":teacher_count, "Users":user_count, 
    "Activity":activity_count});


})

//---------------------------------------------------------------

// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const getAdminChannelUpdateRT = asyncHandler(async (req,res) => {


    const user = await User.findById(req.user._id)

    //const userChannels = user.channels

    const lastUpdate =  Date.now()

    //const channels = await Channel.find({ _id: userChannels})
    const channels = await Channel.find({instructor:req.user._id});

    const channel_id = req.params.channel_id
   
    console.log(channels)


    const Scards = await Tycard.find({channel: channel_id}).sort({ updatedAt: -1});  //.limit(pageSize).skip(pageSize*(page-1))
   


    const qanda = await Qanda.find({channel: channel_id}).sort({ updatedAt: -1})


    res.json({"channels":channels, "cards":Scards, "qanda":qanda, "lastUpdate":lastUpdate});

    

})




//----------------------------------------------------------s

// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const listTeachYaarChannels = asyncHandler(async (req,res) => {

    console.log("Load Channels ")

    const channels = await Channel.find({instructor:req.user._id});

    console.log(channels)
    res.json(channels);


})


// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const createTeachYaarChannels = asyncHandler(async (req,res) => {


    const { name, description, subject, level, instructionLanguage } = req.body;


    const user = await User.findById(req.user._id)

    const newChannel = new Channel({
        name: name,
        description: description,
        language: "English",
        subject: "general",
        level: "general",
        interactive: false,
        category: 'ty',
        instructor: req.user._id
        // channelQandaBoard: createdBoard._id
    })


    //newChannel.instructorprofile = newInstructorprofile

    //if an error here, delete created board before exiting

    const createdChannel2 = await newChannel.save()
    user.channels.unshift(createdChannel2._id)
    const updatedUser = await user.save()
    
    res.status(201).json(createdChannel2)


})



//-------------------------------------------








//----------------Cards ----------------------



// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const listTYAdminCards = asyncHandler(async (req,res) => {

    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const mode = req.query.mode
    const keyword = req.query.keyword

    const channel_id = req.params.channel_id

    console.log("Channel id ", channel_id)

    //Check that the user is qualified to access the channel

    const curr_channel = await Channel.findById(channel_id);


    if(req.user.isAdmin){

        const Scards = await Tycard.find({channel: channel_id}).sort({ updatedAt: -1});  //.limit(pageSize).skip(pageSize*(page-1))
   
        console.log(Scards)
        res.json(Scards);

    }else{

        const Scards = await Tycard.find({channel: channel_id}).sort({ updatedAt: -1});  //.limit(pageSize).skip(pageSize*(page-1))
   
        console.log(Scards)
        res.json(Scards);

    }





})





// @desc Create a post
// @route POST /api/post
// @access Private route/Admin
const createTYAdminCards = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user._id)

    const { cardType, cardtitle, examname, examdescription } = req.body;


    const channelselect = req.params.channel_id


    const channelC = await Channel.findById(channelselect)
    
    const myChannel = true

    //console.log(user, user.isTeacher, myChannel)

    if(user.isAdmin && myChannel){

        const Scard = new Tycard({
            user: req.user._id,
            channel: channelselect,
            type: cardType,
            public: true,
            title: cardtitle,
            tags: []
        })



        //console.log("SCard 1 : ", Scard)


        Scard.tags.unshift(channelC.name)

        //Announcement



        if(cardType == "Offer"){


        }

        if(cardType == "Video"){


        }



        const createdSCard = await Scard.save()

        res.status(201).json(createdSCard)


    }else{

        res.status(404)
        throw new Error('User not authorized')

    }




})





// @desc Create a product
// @route POST /api/products
// @access Private route/Admin
const createAdminQPost = asyncHandler(async(req, res) => {


    const { question, post_type, card_id } = req.body;

    console.log("create QandA post")

    const user_id    = req.user._id;
    const channel_id = req.params.channel_id;

    const user    = await User.findById(req.user._id)
    const channel = await Channel.findById(channel_id)

    console.log(question, post_type)

    const post = new Qanda({
        user: user_id,
        username: user.name,
        channel: channel_id,
        type: post_type,
        questionText: question,
    })

    //board.posts.unshift()

    if(card_id){
        post.card = card_id

    }

    const newPost = await post.save()

    if(card_id){

        const card = await Tycard.findById(card_id)
        card.qanda.unshift(newPost._id)
        const updatedCard = await card.save()
        
    }

    //const createdPost = await post.save()
    res.status(201).json(newPost)

})




// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const getAdminQPosts = asyncHandler(async (req,res) => {

    const user_id  = req.user._id;
    const channel_id = req.params.channel_id;

    console.log("Load Posts")

    const posts = await Qanda.find({channel: channel_id}).sort({ updatedAt: -1})  //.limit(pageSize).skip(pageSize*(page-1))
   
    console.log(posts)
    //res.status(201).json({boards});
    res.json(posts);

})





// @desc Delete card by it's ID
// @route DELETE /api/products
// @access Private route/Admin
const deleteAdminQPosts = asyncHandler(async(req, res) => {

    const qanda = await Qanda.findById(req.params.qanda_id);
    
    if(qanda) {
        await qanda.remove()
        res.json({message: 'Qanda removed' })
    }else{

        res.status(404)
        throw new Error('Qanda not found')
    }

})













//--------Update exising DB values ------------

// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const updateAllChannelDBs = asyncHandler(async (req,res) => {

    console.log("Load Channels ")

    const channels = await Channel.find({});

    //console.log(Scards)
    res.json(channels);


})



// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const updateAllUserDBs = asyncHandler(async (req,res) => {

    console.log("Load Channels ")

    const channels = await Channel.find({});

    //console.log(Scards)
    res.json(channels);


})


// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const updateAllCardDBs = asyncHandler(async (req,res) => {

    console.log("Load Channels ")

    const channels = await Channel.find({});

    //console.log(Scards)
    res.json(channels);


})






// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const listEnrollmentRequestsAdmin = asyncHandler(async (req,res) => {

    console.log("Load Users ")
    //const unverified_users = await User.find({isTeacher:true, isVerified:false});


    const unverified_users = await Usertemp.find({})
    const verified_users = await User.find({isTeacher:true, isVerified:true});

    console.log("verified : ",verified_users, "unverified : ",unverified_users)
    res.json({"verified":verified_users, "unverified":unverified_users});


})




//--------------------------------- Admin Customer Support --------------

// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const listTickets = asyncHandler(async (req,res) => {

    // const pageSize = 10
    // const page = Number(req.query.pageNumber) || 1

    // const mode = req.query.mode
    // const keyword = req.query.keyword

    console.log('Load Tickets ')

    //Check that the user is qualified to access the channel
    const tickets = await Support.find({resolved:false});

    if(tickets){
        res.json(tickets)
    }else{
        res.status(404)
        throw new Error('Ticket not found')
    }


})


// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const addNoteTickets = asyncHandler(async (req,res) => {

    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const mode = req.query.mode
    const keyword = req.query.keyword

    const channel_id = req.params.channel_id

    console.log("Channel id ", channel_id)

    //Check that the user is qualified to access the channel

    const curr_channel = await Channel.findById(channel_id);


    if(req.user.isTeacher){

        const Scards = await Tycard.find({channel: channel_id}).sort({ updatedAt: -1});  //.limit(pageSize).skip(pageSize*(page-1))
   
        console.log(Scards)
        res.json(Scards);

    }else{

        const Scards = await Tycard.find({channel: channel_id, isPost: true}).sort({ updatedAt: -1});  //.limit(pageSize).skip(pageSize*(page-1))
   
        console.log(Scards)
        res.json(Scards);

    }



})




// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const resolveTickets = asyncHandler(async (req,res) => {

    const ticket_id = req.params.ticket_id

    console.log("Ticket id ", ticket_id)

    //Check that the user is qualified to access the channel


    if(req.user.isAdmin){

        const Sticket = await Support.findById(ticket_id)
   

        Sticket.resolved = true
        Sticket.resolvedAt = Date.now()

        const updatedSticket = await Sticket.save().sort({ updatedAt: -1})

        console.log(Sticket)
        res.json(Sticket);

    }





})



//--------------------Contact US ----

// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const getContactUsPosts = asyncHandler(async (req,res) => {

    const user_id  = req.user._id;

    const posts = await Contactus.find({}).sort({ updatedAt: -1})  //.limit(pageSize).skip(pageSize*(page-1))
   
    console.log(posts)
    //res.status(201).json({boards});
    res.json(posts);

})



//-------------------Notifications 

const createNotifications = asyncHandler(async (req,res) => {

    const user_id  = req.user._id;
    const card_id = req.params.card_id;
    const channel_id = req.params.channel_id;

    const {notificationText} = req.body;

    console.log("Add a notification")

    const noti = new Notification({
        user: user_id,
        notificationText: notificationText,
    })

    const createdNoti = await noti.save()


    const Scard = Tycard.findById(card_id)

    // const Scard = new Tycard({
    //     user: req.user._id,
    //     channel: channel_id,
    //     type: 'Notification',
    //     public: true,
    //     title: cardTitle,
    //     tags: []
    // })

    const notificationItem = {
        text:notificationText,
        notificationid: noti._id
    }
    Scard.notification = notificationItem


    res.json(Scard);

})




const createFeedbackForm = asyncHandler(async (req,res) => {

    const user_id  = req.user._id;
    const channel_id = req.params.channel_id;
    const card_id = req.params.card_id;

    const {feedbackText, feedbackOptions, imageFile} = req.body;

    console.log("Add a notification")

    const Scard = Tycard.findById(card_id)




    const newFeedback = new Feedback({
        user: user_id,
        type: 'Normal',
        text: feedbackText,
        options: []
    })

    if(feedbackOptions){
        noti.options = options
    }

    if(imageFile){
        noti.image = image
    }

    const createdFeedback = await newFeedback.save()

    // const Scard = new Tycard({
    //     user: req.user._id,
    //     channel: channel_id,
    //     type: 'Notification',
    //     public: true,
    //     title: cardTitle,
    //     tags: []
    // })


    //add a feedback item
    const feedbackItem = {
        text:feedbackText,
        feedbackid: createdFeedback._id,
        options: createdFeedback.options
    }

    if(imagefile){
        feedbackItem.image = image
    }

    Scard.feedback = feedbackItem

    const updatedCard = await Scard.save()


    res.json(Scard);

})




// //
// const updateAllSchemaDefaults =  asyncHandler(async (req,res) => {

//     console.log("Update all schema ")


//     const {SchemaIn, schemaSelected, defaultValue} = req.body

//     //backup all data structures

//     // if(schemaIn=='Channels'){
//     //     const channels = await Channel.find();
//     //     channels.map(channel => {
//     //         if(!channel[schemaSelected]){
//     //             channel[schemSelected] = defaultValue
//     //             await channel.save()
//     //         }
//     //     })
//     // }


//     res.json("Update Completed");


// })







// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const listUsersAdmin = asyncHandler(async (req,res) => {

    console.log("Load Users ")
    const users = await User.find({});

    //console.log(Scards)
    res.json(users);


})



// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const listChannelsAdmin = asyncHandler(async (req,res) => {

    console.log("Load Channels ")

    const channels = await Channel.find({});

    console.log('Channels ', channels)

    //console.log(Scards)
    res.json(channels);


})



// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const listActivitiesAdmin = asyncHandler(async (req,res) => {

    console.log("Load Activities ")

    const activities = await Activity.find({});

    //console.log(Scards)
    res.json(activities);


})





export {

    createTeachYaarChannels,
    listTeachYaarChannels,

    createTYAdminCards,
    listTYAdminCards,

    listUsersAdmin,
    listChannelsAdmin,
    listActivitiesAdmin,

    loadTeachYaarMetrics,
    listEnrollmentRequestsAdmin,

    verifyUsersAdmin,
    getAdminChannelUpdateRT,

    createNotifications,
    createFeedbackForm,

    resolveTickets,
    listTickets,
    getContactUsPosts

}