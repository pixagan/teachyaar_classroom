// Date Created: 02/02/2021
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import Usertemp from '../models/usertempModel.js'
import generateToken from '../utils/generateToken.js'
import Activity from '../models/activityModel.js';
import Channel from '../models/channelModel.js';
import Tycard from '../models/tycardModel.js';
import {Teacherprofile, Studentprofile} from '../models/userProfileModel.js'
//import Usernetwork from '../models/userNetworkModel.js'
import {Tyfile} from '../models/tyfileModel.js'
import Qanda from '../models/qandaModel.js'



import generator from 'generate-password'
import moment from 'moment'

import bcrypt from 'bcryptjs'

import validator from 'express-validator'
const { check, validationResult } = validator

import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

import sgMail from '@sendgrid/mail'
//import * as sgMail from "@sendgrid/mail";

//const sendgrid = require("sendgrid")(process.env.SENDGRID_APIKEY);

import dotenv from 'dotenv';


dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_APIKEY);


//import client from 'twilio'
//const myClient = client(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)


const s3 = new aws.S3({
    endpoint: process.env.DOSPACESENDPOINT,
    credentials: new aws.Credentials(process.env.SPACES_KEY, process.env.SPACES_SECRET, null)
});
const BucketName = process.env.DO_BUCKETNAME

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public route
const authUser = asyncHandler(async (req,res) => {

        const { email, password } = req.body;

        console.log("Login user")

        // const user = await User.findOne({$or: [
        //     {email: email},
        //     {phoneNo: email}
        // ]})

        const user = await User.findOne(
            {email: email}
        )

        console.log("User", user)

        if(!user){
            res.status(401)
            throw new Error('Login error')
        }

        console.log("Entered Password ", password)


        if(user && await user.matchPassword(password)){

            res.json({
                _id: user._id,
                name: user.name,
                isAdmin: user.isAdmin,
                isTeacher: user.isTeacher,
                token: generateToken(user._id),
            })
        }else{
            res.status(401)
            throw new Error('Invalid Login Credentials')
        }



})




// @desc Auth user & get token
// @route POST /api/users/login
// @access Public route
const logoutUser = asyncHandler(async (req,res) => {

    const user = await User.findById(req.user._id)

    if(user){

        user.isLoggedIn = false
        user.loggedIn   = null
        await user.save()
        
    } else{
        res.status(401)
        throw new Error('Unable to logout user')
    }


})





const registerUserVerified = asyncHandler(async (req,res) => {


    const { name, email, phoneNo, password, isTeacher, acceptTerms, recommendationToken, currDevice, accessCode } = req.body;


    if(accessCode === process.env.SAC.toString()){


    const userExists = await User.findOne({$or: [
        {email: email},
        {phoneNo: phoneNo}
    ]})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }


    const ipAddress = req.connection.remoteAddress

    var loggedin = null;


    if(currDevice){

        loggedin = {
            dateTime: Date.now(),
            deviceID: "none",
            userIP: ipAddress,
            osName: currDevice.osName,
            osVersion: currDevice.osVersion,
            isBrowser: currDevice.isBrowser,
            browserName: currDevice.browserName,
            engineName: currDevice.engineName,
            engineVersion: currDevice.engineVersion
    
        }

    }else{

        loggedin = {
            dateTime: Date.now(),
            deviceID: "none",
            userIP: ipAddress
    
        }

    }


    const tempUser = await Usertemp.findOne({$or: [
        {email: email},
        {phoneNo: phoneNo}
    ]})


    if(tempUser){
        await tempUser.remove()
    }



    const createdUser = await  Usertemp.create({
        name,
        email,
        phoneNo,
        isTeacher,
        acceptTerms: acceptTerms,
    })




    if(createdUser){

       

        const otp = generator.generate({
            length: 8,
            numbers: true
        })

        const validTill = Date.now()


        const newotp = {
            otp:otp,
            validTill:validTill
        }

        createdUser.tempPasswordEmail = newotp;

        const emailmessage = {
            to: email,
            from: process.env.SENDER_EMAIL.toString(),
            subject: "Teachyaar account email OTP",
            text: `Your Teachyaar OTP to verify your email is ${otp}`
            // html: `<h5> Your OTP for TeachYaar password reset is ${otp} </h5>`
        };

        await createdUser.save()

        //phone otp twilio
        const twilio_phone = '+91'+phoneNo


        if(process.env.NODE_ENV == 'production'){

        //temporarily hold off email send till bug fix
        await sgMail.send(emailmessage).
        then( async(response) => {
            console.log(response[0].statusCode)
            //console.log(response[0].headers)
            console.log('Email Send')


            //try{
                await myClient.verify.services(process.env.TWILIO_VERIFICATION_SERVICE)
                .verifications
                .create({to:twilio_phone, channel:'sms'})
                .then(async(verification) => {
                    console.log(verification.status)
                    return res.status(201).json({
                        name: createdUser.name,
                        email: createdUser.email,
                        phone: createdUser.phoneNo,
                        isTeacher: createdUser.isTeacher,
                    })
                
                }
                    
                    
                )


        
        })
        .catch((error) => console.log("Email error : ", error.message));

        }else{


        //send phone No verification
        const potp = generator.generate({
            length: 8,
            numbers: true
        })

        const validTillP = Date.now()


        const newpotp = {
            otp:potp,
            validTill:validTillP
        }


        createdUser.tempPasswordPhone = newpotp;



        await  createdUser.save()


        return res.status(201).json({
            name: createdUser.name,
            email: createdUser.email,
            phone: createdUser.phoneNo,
            isTeacher: createdUser.isTeacher,
        })

        }








    }else{

        res.status(400)
        throw new Error('Invalid user data')

    }


    }else{
        res.status(401)
        throw new Error('Not Authorized. You need an access code to use the app')
    }



    // //email:

    // const email = new sendgrid.Email();

    // email.addTo(process.env.RECEIVER_EMAIL);
    // email.setFrom(process.env.SENDER_EMAIL);
    // email.setSubject("Verify your email id TeachYaar");
    // email.setHtml("and easy to do anywhere, even with Node.js");
    // sendgrid.send(email);






})



// @desc Register a new user
// @route POST /api/users
// @access Public route
const registerUser = asyncHandler(async (req,res) => {

    const { name, email, phoneNo, password, isTeacher, acceptTerms, recommendationToken, currDevice, accessCode } = req.body;

    //Data in validation


    //ensure the name and or email is not a teachyaar or pixagan name or email

    console.log("SAC ", process.env.SAC, accessCode)

    if(accessCode === process.env.SAC.toString()){


    let isMob = /^[6-9]\d{9}$/.test(mobileno) 

    if(!isMob){
        res.status(401)
        throw new Error('Invalid Phone No')
    }

    //const userExists = await User.findOne({ email })

    const userExists = await User.findOne({$or: [
        {email: email},
        {phoneNo: phoneNo}
    ]})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }


    const ipAddress = req.connection.remoteAddress

    var loggedin = null;

    if(currDevice){

        loggedin = {
            dateTime: Date.now(),
            deviceID: "none",
            userIP: ipAddress,
            osName: currDevice.osName,
            osVersion: currDevice.osVersion,
            isBrowser: currDevice.isBrowser,
            browserName: currDevice.browserName,
            engineName: currDevice.engineName,
            engineVersion: currDevice.engineVersion
    
        }

    }else{

        loggedin = {
            dateTime: Date.now(),
            deviceID: "none",
            userIP: ipAddress
    
        }

    }

    const salt = await bcrypt.genSalt(10)
    const saltedpassword = await bcrypt.hash(this.password, salt)

    const user = await  User.create({
        name,
        email,
        phoneNo,
        password:saltedpassword,
        isTeacher,
        loggedIn:loggedin,
        isLoggedIn: true,
        acceptTerms: acceptTerms,
        recommendationToken: generator.generate({
            length: 15,
            numbers: true
        }),
    })




    //------------Add default channels -----

    const ty_channel = await Channel.find({category:'ty', isPublic:true})

    if(ty_channel){
        ty_channel.map(channel =>{
            user.channels.unshift(channel._id)
        })
    }

    const createdUser = await user.save()




    //create user profile ------------------

    var userProfile = await Userprofile.create({
        user: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        phoneNo: createdUser.phoneNo,
        recommendationToken: createdUser.recommendationToken,
        recommendedBy: null,
        recommendations:[]
    })



 




    if(recommendationToken){


        const recommender = await Userprofile.findOne({recommendationToken: recommendationToken})

        if(recommender){

            userProfile.recommendedBy =  recommender.user
            recommender.recommendations.unshift(createdUser._id)
            

            const updatedRecommender = await recommender.save()

          

            
           
        }

        
    }


    const userProfileCreated = await userProfile.save()
    



    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNo: phoneNo,
            isAdmin: user.isAdmin,
            isTeacher: user.isTeacher,
            isVerified: user.isVerified,
            recommendationToken: user.recommendationToken,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }


    }else{
        res.status(400)
        throw new Error('Not Authorized')
    }

})





// @desc Get user profile
// @route GET /api/users/profile
// @access Private route
const getUserProfile = asyncHandler(async (req,res) => {


    const userprofile = await Userprofile.findOne({user:req.user._id})


    if(userprofile){

        res.status(201).json(userprofile)

        // res.json({
        //     _id: user._id,
        //     name: user.name,
        //     email: user.email,
        //     isAdmin: user.isAdmin,
        //     isVerified: user.isVerified
        // })


    }else{
        res.status(404)
        throw new Error('User not found')
    }



})




// @desc Update user profile
// @route PUT /api/users/profile
// @access Private route
const updateUserProfile = asyncHandler(async (req,res) => {

    const user = await User.findById(req.user._id)


    if(user){

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        //encrypted by default because model is encrypted
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })


    }else{
        res.status(404)
        throw new Error('User not found')
    }



})








// @desc Auth user & get token
// @route POST /api/users/login
// @access Public route
const changePassword = asyncHandler(async (req,res) => {


    const { currentPassword, newPassword, otp } = req.body;


    console.log("Change password", currentPassword, newPassword, req.user._id)

    const cuser = await User.findById(req.user._id)

    console.log("User : ", cuser)


    if(cuser && (await cuser.matchPassword(currentPassword))){

        console.log("Passwords matched")

        cuser.updatePassword(newPassword)
        //cuser.password = newPassword
        const updatedUser = await cuser.save()

        // res.json({
        //     _id: user._id,
        //     name: user.name,
        //     email: user.email,
        //     phone: user.phoneNo,
        //     isAdmin: user.isAdmin,
        //     isTeacher: user.isTeacher,
        //     isVerified: user.isVerified,
        //     token: generateToken(user._id),
        // })

        res.json({message:"Password successfully changed"})


    } else{
        res.status(401)
        throw new Error('Password could not be reset')
    }



})








// // @desc Get all Users
// // @route GET /api/users/
// // @access Private/Admin route
// const getUsers = asyncHandler(async (req,res) => {

//     const users = await User.find()
//     res.json(users)


// })



// @desc Admin delete user
// @route DELETE /api/users/:id
// @access Private/Admin route
const deleteUserRequest = asyncHandler(async (req,res) => {

    const user = await User.findById(req.user._id)

    //verify password

    if(user){
    
        //Send OTP to confirm


        const otp = generator.generate({
            length: 8,
            numbers: true
        })

        const validTill = Date.now()


        const newotp = {
            otp:otp,
            validTill:validTill
        }

        user.tempPasswordEmail = newotp;

        const emailmessage = {
            to: process.env.RECEIVER_EMAIL.toString(),
            from: process.env.SENDER_EMAIL.toString(),
            subject: "Account Deletion Request for TeachYaar account",
            text: `Your Teachyaar OTP to delete you account is ${otp}`
            // html: `<h5> Your OTP for TeachYaar password reset is ${otp} </h5>`
        };


        sgMail.send(emailmessage).
        then( async (response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
            console.log('Email Send')

            await user.save()
    
            res.json({message:'Password reset email Sent', email:email})
        })
        .catch((error) => console.log("Email error : ", error.message));



    }else{
        res.status(404)
        throw new Error('User not found')
    }
    res.json({message: 'User removed'})


})



// @desc Admin delete user
// @route DELETE /api/users/:id
// @access Private/Admin route
const deleteUserConfirmation = asyncHandler(async (req,res) => {


    const user = await User.findById(req.user._id)


    const {password, OTP} = req.body;


    console.log('Delete User ', password, OTP, req.user._id)

    console.log('Check ', user.tempPasswordEmail.otp == OTP)

    console.log('Check password ', await user.matchPassword(password))

    if(user && user.tempPasswordEmail.otp == OTP && await user.matchPassword(password)){



    //if password confirmed
    if(user){


        if(user.isTeacher){


            console.log('Starting with channels')
            //delete cards
            const channels = await Channel.find({instructor: req.user._id})

            console.log('Channels ', channels)

            await channels.map(async(channel)=>{

                const currFiles = await Tyfile.find({channel:channel._id})
                console.log('Channel files ', currFiles)

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
    
                    //user.limits.filememory = user.limits.filememory - filesize
                    //await user.save()
                    console.log('Done deleting file ', filename)
    
                })


                console.log('Delete Files')
                await Tyfile.remove({channel:channel._id})
    
    
                //await currCard.remove()
                console.log('Delete Cards')
                await Tycard.remove({channel:channel._id})
    
    
                //remove Q and A
                console.log('Delete Qanda Channels')
                const qanda_channel = await Qanda.remove({channel:channel._id})
    
    
    
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
    


            })

            console.log('Delete Channel')
            await Channel.remove({instructor:req.user._id})



        //delete channels

        }

        //delete user profile
        console.log('Remove Profile')
        await Userprofile.remove({user: req.user._id})

    

        //move user to past users

        //delete user
        await user.remove()


        console.log('Remove User')

    }else{
        res.status(404)
        throw new Error('User not found')
    }
    res.json({message: 'User removed'})




    }else{
        res.status(404)
        throw new Error('User not Authorized')
    }


})






// @desc Get User by ID
// @route GET /api/users/:id
// @access Private/Admin route
const getUserById = asyncHandler(async (req,res) => {

    const user = await User.findById(req.params.id).select('-password')

    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }


})







// @desc Auth user & get token
// @route POST /api/users/login
// @access Public route
const resetPasswordRequest = asyncHandler(async (req,res) => {

    //generate password token
    const {email} = req.body


    const user = await User.findOne(
        {email: email}
    )

    if(user){

        //generate otp

        const otp = generator.generate({
            length: 8,
            numbers: true
        })

        //const curr_datetime = Date.now()
        const validTill = Date.now() //moment().add(10, 'minutes')

        console.log('validTill ', validTill)
    
        const newotp = {
            otp:otp,
            validTill:validTill
        }

        user.tempPasswordEmail = newotp;

        console.log('Temp password', newotp)

        // using SendGrid's Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        
        //const sgrid = new sendgrid.Email();
        // sgrid.addTo(process.env.RECEIVER_EMAIL);
        // sgrid.setFrom(process.env.SENDER_EMAIL);
        // ssgrid.setSubject("Password Reset Request for TeachYaar account");
        // sgrid.setHtml(`<h5> Your OTP for TeachYaar password reset is ${otp} </h5>`);


            console.log("Sender email ",process.env.RECEIVER_EMAIL,  process.env.SENDER_EMAIL)

         const emailmessage = {
            to: email,
            from: process.env.SENDER_EMAIL.toString(),
            subject: "Password Reset Request for TeachYaar account",
            text: `Your Teachyaar password reset OTP is ${otp}`
            // html: `<h5> Your OTP for TeachYaar password reset is ${otp} </h5>`
        };


        console.log('Email Message ',  emailmessage)

        console.log('')

        if(process.env.NODE_ENV == 'production'){

            console.log('Sending reset email')

        sgMail.send(emailmessage).
        then( async (response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
            console.log('Email Send')

            await user.save()
    
            res.json({message:'Password reset email Sent', email:email})
        })
        .catch((error) => console.log("Email error : ", error.message));

        }

        //console.log('Sent Email')

        await user.save()

        res.json({message:'Password reset email Sent'})



    }else{
        res.status(404)
        throw new Error('User not found')
    }




})





// @desc Auth user & get token
// @route POST /api/users/login
// @access Public route
const resetPasswordSubmission = asyncHandler(async (req,res) => {

    //generate otp using twilio
    const { email, emailOTP, newPassword } = req.body;

    //console.log('Reset Password ', email, emailOTP, newPassword)

    const user = await User.findOne({email})


    //console.log('User selected ', user)


    if(user && emailOTP === user.tempPasswordEmail.otp){

        //user.password = newPassword

        user.updatePassword(newPassword) 

        user.tempPasswordEmail = {}
        await user.save()

        res.json({message :'Password reset successfully'})


    }else{

        user.tempPasswordEmail = {}
        await user.save()
        res.status(404)
        throw new Error('Incorrect OTP')
    }


})





// @desc Auth user & get token
// @route POST /api/users/login
// @access Public route
const verifyPhoneOTP = asyncHandler(async (req,res, next) => {

    //generate otp using twilio
    const { phone, phoneOTP } = req.body;

    //console.log('Reset Password ', email, emailOTP, newPassword)

    const user = await Usertemp.findOne({email})


    //console.log('User selected ', user)


    if(user && phoneOTP === user.tempPasswordPhone.otp){
        user.phoneisVerified = true
        user.tempPasswordPhone = {}
        await user.save()

        req.usertemp = user
        next()

        //res.json({message :'Phone is verified'})


    }else{

        user.tempPasswordEmail = {}
        await user.save()
        res.status(404)
        throw new Error('Incorrect OTP')
    }


})




// @desc Auth user & get token
// @route POST /api/users/login
// @access Public route
const verifyEmailOTP = asyncHandler(async (req,res, next) => {

    //generate otp using twilio
    const { email, emailOTP } = req.body;

    //console.log('Reset Password ', email, emailOTP)

    const user = await Usertemp.findOne({email})


    //console.log('User selected ', user)

    //console.log('OTP check ', emailOTP,user.tempPasswordEmail.otp )

    if(user && emailOTP === user.tempPasswordEmail.otp){

        user.emailisVerified = true
        user.tempPasswordEmail = {}
        await user.save()

        // if(!user.isTeacher){
        //     req.usertemp = user
        //     next()
        // }else{


            //const temppasswordphone = user.tempPasswordPhone.otp

            //console.log('Set temp password phone', temppasswordphone)
            res.json({message :'Email is Verified'})
        //}

        


    }else{

        //user.tempPasswordEmail = {}
        await user.save()
        res.status(404)
        throw new Error('Incorrect OTP')
    }


})




// @desc Auth user & get token
// @route POST /api/users/login
// @access Public route
const verifyEmailOTPFirst = asyncHandler(async (req,res, next) => {

    //generate otp using twilio
    const { email, emailOTP } = req.body;

    //console.log('Reset Password ', email, emailOTP)

    const user = await Usertemp.findOne({email})


    //console.log('User selected ', user)

    //console.log('OTP check ', emailOTP,user.tempPasswordEmail.otp )

            //phone otp twilio
            const twilio_phone = '+91'+phoneNo

    if(user && emailOTP === user.tempPasswordEmail.otp){

        user.emailisVerified = true
        user.tempPasswordEmail = {}
        await user.save()

        await myClient.verify.services(process.env.TWILIO_VERIFICATION_SERVICE)
        .verifications
        .create({to:twilio_phone, channel:'sms'})
        .then(async(verification) => {
            console.log(verification.status)
        
        })

        // if(!user.isTeacher){
        //     req.usertemp = user
        //     next()
        // }else{


            //const temppasswordphone = user.tempPasswordPhone.otp

            //console.log('Set temp password phone', temppasswordphone)
        res.json({message :'Email is Verified'})
        //}

        


    }else{

        //user.tempPasswordEmail = {}
        await user.save()
        res.status(404)
        throw new Error('Incorrect OTP')
    }


})







// @desc Auth user & get token
// @route POST /api/users/login
// @access Public route
const resendEmailOTP = asyncHandler(async (req,res) => {

    //generate otp using twilio
    //const { email } = req.body;

    //console.log('Resend email otp ' )
    

    const {email} = req.body

    //console.log('user id email ', email)

    const user = await User.findOne({email:email})

    //console.log('User ', user)

    if(user){

        //console.log('Deleting user ', user.name )

    const otp = generator.generate({
        length: 6,
        numbers: true
    })

    const validTill = Date.now()


    const newotp = {
        otp:otp,
        validTill:validTill
    }

    user.tempPasswordEmail = newotp;

    const emailmessage = {
        to: email,
        from: process.env.SENDER_EMAIL.toString(),
        subject: "Teachyaar account email OTP",
        text: `Your Teachyaar Email OTP is ${otp}`
        // html: `<h5> Your OTP for TeachYaar password reset is ${otp} </h5>`
    };

    //console.log('Email OTP ', emailmessage)


    if(process.env.NODE_ENV == 'production'){

        console.log('Send email OTP')

    await sgMail.send(emailmessage).
    then( async (response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
        console.log('Email Send')

        

        // res.json({message:'Password reset email Sent', email:email})
    })
    .catch((error) => console.log("Email error : ", error.message));


    }

    await user.save()

    }else{

        res.status(404)
        throw new Error('Incorrect Email')
    }


})






// @desc Auth user & get token
// @route POST /api/users/login
// @access Public route
const resendPhoneOTP = asyncHandler(async (req,res) => {

    //generate otp using twilio
    const { email } = req.body;

    //console.log('Reset Password ', email )

    const user = await Usertemp.findOne({email})

    if(user){


    const otp = generator.generate({
        length: 8,
        numbers: true
    })

    const validTill = Date.now()


    const newotp = {
        otp:otp,
        validTill:validTill
    }

    user.tempPasswordEmail = newotp;

    const emailmessage = {
        to: email,
        from: process.env.SENDER_EMAIL.toString(),
        subject: "Teachyaar account email OTP",
        text: `Your Teachyaar OTP to verify your email is ${otp}`
        // html: `<h5> Your OTP for TeachYaar password reset is ${otp} </h5>`
    };


    await sgMail.send(emailmessage).
    then( async (response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
        console.log('Email Send')

        

        // res.json({message:'Password reset email Sent', email:email})
    })
    .catch((error) => console.log("Email error : ", error.message));



    }else{

        res.status(404)
        throw new Error('Incorrect Email')
    }


})





// @desc Register a new user
// @route POST /api/users
// @access Public route
const ActivateUserAccount = asyncHandler(async (req,res) => {


    //console.log('Activate Account ')
    const usertemp = req.usertemp


    //console.log('User temp : ', usertemp)

    if((usertemp.emailisVerified && !usertemp.isTeacher) || (usertemp.emailisVerified && usertemp.phoneNoisVerified && usertemp.isTeacher)){



    // const { name, email, phoneNo, password, isTeacher, acceptTerms, recommendationToken, currDevice, accessCode } = req.body;

    const name = usertemp.name
    const email = usertemp.email
    const phoneNo = usertemp.phoneNo
    const isTeacher = usertemp.isTeacher
    const acceptTerms = usertemp.acceptTerms
    const recommendationToken = usertemp.recommendationToken
    const currDevice = usertemp.currDevice
    const phoneisVerified = usertemp.phoneisVerified
    const emailisVerified = usertemp.emailisVerified



    //Data in validation


    //ensure the name and or email is not a teachyaar or pixagan name or email

    //console.log("SAC ", process.env.SAC, accessCode)

    // if(accessCode === process.env.SAC.toString()){




    //const userExists = await User.findOne({ email })

    const userExists = await User.findOne({$or: [
        {email: email},
        {phoneNo: phoneNo}
    ]})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }


    console.log('User doesnt already exist , Adding user')


    const ipAddress = req.connection.remoteAddress

    var loggedin = null;

    if(currDevice){

        loggedin = {
            dateTime: Date.now(),
            deviceID: "none",
            userIP: ipAddress,
            osName: currDevice.osName,
            osVersion: currDevice.osVersion,
            isBrowser: currDevice.isBrowser,
            browserName: currDevice.browserName,
            engineName: currDevice.engineName,
            engineVersion: currDevice.engineVersion
    
        }

    }else{

        loggedin = {
            dateTime: Date.now(),
            deviceID: "none",
            userIP: ipAddress
    
        }

    }

    //create temp password
    const tempPassword = generator.generate({
        length: 10,
        numbers: true
    })


    //console.log('Creating User ', tempPassword)

    const salt = await bcrypt.genSalt(10)
    const hashed_password = await bcrypt.hash(tempPassword, salt)

    const user = await  User.create({
        name,
        email,
        phoneNo,
        password:hashed_password,
        isTeacher,
        loggedIn:loggedin,
        isLoggedIn: true,
        acceptTerms: acceptTerms,
        recommendationToken: generator.generate({
            length: 15,
            numbers: true
        }),
        isVerified:true,
        phoneNoisVerified:phoneisVerified,
        emailisVerified:emailisVerified
    })



    //console.log('Match password ', await user.matchPassword(tempPassword))

    //------------Add default channels -----

    const ty_channel = await Channel.find({category:'ty', isPublic:true})

    if(ty_channel){
        ty_channel.map(channel =>{
            user.channels.unshift(channel._id)
        })
    }

    const createdUser = await user.save()


    //console.log('Match password ', await createdUser.matchPassword(tempPassword))


    //create user profile ------------------

    var userProfile = await Userprofile.create({
        user: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        phoneNo: createdUser.phoneNo,
        recommendationToken: createdUser.recommendationToken,
        recommendedBy: null,
        recommendations:[]
    })



    //create user network----------------------
    var userNetwork = await Usernetwork.create({
        user: createdUser._id,
        contacts: []
    })



    //console.log('Recommendation Token',recommendationToken )

    if(recommendationToken){


        console.log('Adding to Network')

        const recommender = await Userprofile.findOne({recommendationToken: recommendationToken})

        if(recommender){

            userProfile.recommendedBy =  recommender.user
            recommender.recommendations.unshift(createdUser._id)
            

            const updatedRecommender = await recommender.save()

            userNetwork.contacts.unshift(recommender.user)

            const recommenderNetwork = await Usernetwork.findOne({user: recommender.user})
            recommenderNetwork.contacts.unshift(createdUser._id)
            const updatedRecommenderNetwork = recommenderNetwork.save()
        }

        
    }


    const userProfileCreated = await userProfile.save()
    const userNetworkCreated = await userNetwork.save()



    //send temp email
    const emailmessage = {
        to: email,
        from: process.env.SENDER_EMAIL.toString(),
        subject: "Welcome to TeachYaar",
        text: `Welcome to TeachYaar. Your account has been activated. Your Teachyaar temporary password is ${tempPassword}. Login for the first time with this password and then please change your password.`
        // html: `<h5> Your OTP for TeachYaar password reset is ${otp} </h5>`
    };



    if(process.env.NODE_ENV == 'production'){

        await sgMail.send(emailmessage).
        then( async (response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
            console.log('Email Send')
        })
        .catch((error) => console.log("Email error : ", error.message));

    }

    


    //const finaluser = await createdUser.save()
    //
    console.log('Removeing temp user')
    await Usertemp.remove({email: email})
    console.log('Finished Removed temp user')

    console.log('Match password ', await createdUser.matchPassword(tempPassword))


    const appmet = await Appmetrics.findOne({type:'user'})
    appmet.userMets.created = appmet.userMets.created + 1
    await appmet.save()


    res.json({message:'User account has been activated, a temporary password has been sent', verified:true})
    //res.json({message:'Password reset email Sent', email:email})


    // if(user){
    //     res.status(201).json({
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email,
    //         phoneNo: phoneNo,
    //         isAdmin: user.isAdmin,
    //         isTeacher: user.isTeacher,
    //         isVerified: user.isVerified,
    //         recommendationToken: user.recommendationToken,
    //         token: generateToken(user._id),
    //     })
    // }else{
    //     res.status(400)
    //     throw new Error('Invalid user data')
    // }


    // }else{
    //     res.status(400)
    //     throw new Error('Not Authorized')
    // }


   


    }else{
        res.status(400)
        throw new Error('Invalid Request')
    }


})





export {

    authUser, 
    registerUser, 
    getUserProfile,  
    updateUserProfile, 
    deleteUserRequest, 
    getUserById, 
    logoutUser,
    changePassword,
    resetPasswordSubmission,
    resetPasswordRequest,

    registerUserVerified,
    ActivateUserAccount,
    verifyPhoneOTP,
    verifyEmailOTP,

    resendEmailOTP,
    resendPhoneOTP,

    deleteUserConfirmation



}


