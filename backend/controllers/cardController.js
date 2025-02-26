// Date Created: 02/02/2021
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

import { v4 as uuidv4 } from 'uuid';
import generator from 'generate-password'
import multer from 'multer'
import path from 'path'

import Channel from '../models/channelModel.js'
import User from '../models/userModel.js'
import Tycard from '../models/tycardModel.js'
import Activity from '../models/activityModel.js';
import {Exam} from '../models/examModel.js'
import Usernote from '../models/usernoteModel.js'
import {Tyfile} from '../models/tyfileModel.js'
//import Appmetrics from '../models/appmetricsModel.js'

import {Teacherprofile, Studentprofile} from '../models/userProfileModel.js'


import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import dotenv from 'dotenv';

const storage = multer.memoryStorage();

dotenv.config()

const s3 = new aws.S3({
    endpoint: process.env.DOSPACESENDPOINT,
    credentials: new aws.Credentials(process.env.SPACES_KEY, process.env.SPACES_SECRET, null)
});

const BucketName = process.env.DO_BUCKETNAME

// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const listTYCards = asyncHandler(async (req,res) => {

    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const mode = req.query.mode
    const keyword = req.query.keyword

    const channel_id = req.params.channel_id

    console.log("Channel id ", channel_id)

    //Check that the user is qualified to access the channel

    const curr_channel = await Channel.findById(channel_id);


    if(req.user.isTeacher){

        const Scards = await Tycard.find({channel: channel_id, type:{$ne: 'Live'}}).sort({ updatedAt: -1});  //.limit(pageSize).skip(pageSize*(page-1))
   
        console.log(Scards)
        res.json(Scards);

    }else{

        const Scards = await Tycard.find({channel: channel_id, isPost: true , type:{$ne: 'Live'}}).sort({ updatedAt: -1});  //.limit(pageSize).skip(pageSize*(page-1))
   
        console.log(Scards)
        res.json(Scards);

    }





})




// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const updatelistTYCardsRT = asyncHandler(async (req,res) => {

    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const mode = req.query.mode
    const keyword = req.query.keyword

    const channel_id = req.params.channel_id

    console.log("Channel id ", channel_id)

    //Check that the user is qualified to access the channel

    //if channel update no and update date is diff from users no

    //load updated cards

    //const curr_channel = await Channel.find({channel:channel_id});

    const Scards = await Tycard.find({
        channel: channel_id,
        updatedAt: {
            $gte: new Date(2012, 7, 14), 
            $lt: Date.now()
        } 
    }).sort({ updatedAt: -1});  //.limit(pageSize).skip(pageSize*(page-1))
   
    console.log(Scards)
    res.json(Scards);


})




// @desc Create a post
// @route POST /api/post
// @access Private route/Admin
const createTYCards = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user._id)

    const { cardType } = req.body;

    const cardtitle = cardType

    const channelselect = req.params.channel_id

    const channelC = await Channel.findById(channelselect)

    const user_id = mongoose.Types.ObjectId(req.user._id)

    const teacherprofile = await Teacherprofile.findOne({user: user_id})

    
    const myChannel = teacherprofile.courses.includes(channelselect)


    console.log(user, user.isTeacher, myChannel)


    if(myChannel){


        const Scard = new Tycard({
            user: req.user._id,
            channel: channelselect,
            type: cardType,
            public: false,
            title: cardtitle,
            tags: []
        })



        //console.log("SCard 1 : ", Scard)

        Scard.tags.unshift(channelC.name)



        if(cardType == "Exam"){

            const exam = {
                user: user._id,
                instructor: user._id,
                instructorname: user.name,
                examname: cardtitle,
                examdescription: cardtitle,
                channel: channelC._id
            }

            Scard.exam = exam
    
            

        }

        if(cardType == "Live"){


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






// @desc Delete card by it's ID
// @route DELETE /api/products
// @access Private route/Admin
const deleteCard = asyncHandler(async(req, res) => {


    console.log("Delete card : ", req.params.channel_id, req.params.card_id)

    const user = await User.findById(req.user._id)

    const card = await Tycard.findById(req.params.card_id);

    var userfilememory = user.limits.filememory
    
    if(card) {

        //delete all files in the card

        await card.items.map(async(item) => {

                //if item is file -  delete file
                if(item.file && item.file.filename){

                    const itemfile = await Tyfile.findById(item.file.fileid)
                    
                    if(itemfile){


                  
                    
                    const filename = itemfile.filename
                    const filesize = itemfile.size

                    let deleteParameters = {
                        Bucket: BucketName,
                        Key: filename
                    };


                    await s3.deleteObject(deleteParameters, async(err, data) =>{
                        if (err) {
                            console.log(err, err.stack);
                        }else {
                            await console.log("Successfully deleted file ",data);

                        }
                    });

                    await itemfile.remove()

                    

                    console.log('Removing next item ', filename, filesize)

                    userfilememory = userfilememory - filesize
                    //user.limits.filememory = user.limits.filememory - filesize
                    //await user.save()

                    console.log('Done Removing next item ', user.limits.filememory)


                    }


                }


        })




        await card.remove()

       

        user.limits.cards = user.limits.cards - 1
        user.limits.filememory = userfilememory

        console.log('File memory' , user.limits.filememory)
        const updatedUser = await user.save()

        console.log('File memory 2', updatedUser.limits.filememory)

        res.json({message: 'Card removed' })
    }else{

        res.status(404)
        throw new Error('Card not found')
    }

})








// @desc Update a product by id
// @route PUT /api/products/:id
// @access Private route/Admin
const addTagsCards = asyncHandler(async(req, res) => {

    const {tagC} = req.body

    const Scard = await Tycard.findById(req.params.card_id)

    console.log("Card ", Scard)

    if(Scard && req.user._id.equals(Scard.user)){

        if(tagC){ 
            Scard.tags.unshift(tagC)
        }

        const createdSCard = await Scard.save()
        res.json(createdSCard)

    }else{
        res.status(404)
        throw new Error('Card not found')
    }

})





// @desc Update a product by id
// @route PUT /api/products/:id
// @access Private route/Admin
const addItemStudyCards = asyncHandler(async(req, res) => {

    const {itemtype, itemText, notesFile, boardFile } = req.body
    const card_id = req.params.card_id

    const Scard = await Tycard.findById(card_id)

    if(Scard && req.user._id.equals(Scard.user)){


        if(itemtype == "Text"){

            const newItem = {
                text: itemText
            }

            Scard.items.unshift(newItem)

        }else if(itemtype == "File"){


            //if file is an image file

            //generate a thumbnail
            //create an item





            const newItem = {
                file: notesFile
            }

            Scard.items.unshift(newItem)

        }else if(itemtype == "Board"){

            const newItem = {
                board: boardFile
            }

            Scard.items.unshift(newItem)

        }

        const createdSCard = await Scard.save()
        res.json(createdSCard)

    }else{
        res.status(404)
        throw new Error('Card not found')
    }

})





// @desc Delete card by it's ID
// @route DELETE /api/products
// @access Private route/Admin
const deleteItemStudyCard = asyncHandler(async(req, res) => {


    console.log("Delete card : ", req.params.channel_id, req.params.card_id)

    const item_id = req.params.item_id

    const user = await User.findById(req.user._id)
    

    const card = await Tycard.findById(req.params.card_id);
    

    if(card) {
    //get the comment from the post
    const item = card.items.find(item => item.id.toString() === req.params.item_id);

    console.log("Item ", item)


    //Make sure comment exists
    if(!item){
        return res.status(404).json({ msg: 'Item does not exist'});
    }

    // //check user
    // if(comment.user.toString() !== req.user.id){
    //     return res.status(401).json({ msg: 'User not authorized'});
    // }

    //if all ok
    //Get remove index
    //seems to be baseed on the user where a user can have multiple comments
    //const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
    

    console.log('check if file in item ', item.file)

    //if item is file -  delete file
    if(item.file && item.file.filename){

        const itemfile = await Tyfile.findById(item.file.fileid)


        if(itemfile){



        const filename = itemfile.filename
        const filesize = itemfile.size

        let deleteParameters = {
            Bucket: BucketName,
            Key: filename
        };


        try{

        await s3.deleteObject(deleteParameters, async(err, data) =>{
            if (err) {
                console.log(err, err.stack);
            }else {
                console.log("Successfully deleted file ",data);

            }
         });

        }catch(error){
            console.log('Unable to delete file, check for deletion')
            
        }


         await itemfile.remove()

         

         user.limits.filememory = user.limits.filememory - filesize
         await user.save()

    }


    }


    console.log('Removing Item ')
    //based on the comment id
    const removeIndex = card.items.map(item => item._id.toString()).indexOf(item_id);

    console.log('Remove Index ')

    var updatedCard = null;
    if(removeIndex >= 0){
        card.items.splice(removeIndex,1);

        //save the updated like
        updatedCard = await card.save();

    }

    console.log('Updated Card ')


    res.json(updatedCard)
    }else{

        res.status(404)
        throw new Error('Card not found')
    }

})








// @desc Post a Card
// @route PUT /api/products/:id
// @access Private route/Admin
const postCard = asyncHandler(async(req, res) => {

    const {tagC} = req.body

    const Scard = await Tycard.findById(req.params.card_id)

    console.log("Card ", Scard._id)

    if(Scard && req.user._id.equals(Scard.user) && req.user.isTeacher){



        if(Scard.type =='Exam'){

            console.log('Is Exam')

            if(Scard.isPost == false){

                console.log('Is not posted ',Scard.isPost )

                if(Scard.exam && Scard.exam.questionpaperfile && Scard.exam.questionpaperfile.filename){
                
                    console.log('Questionpaper exists ',Scard.isPost )

                    Scard.isPost = !Scard.isPost
    
                    const createdSCard = await Scard.save()
                    return res.json(createdSCard)
                }else{

                    console.log('Question paper does not exist ' )
                    res.status(404)
                    throw new Error('Questionpaper not added')
                }

            }else{
                console.log('Is posted ',Scard.isPost )
                Scard.isPost = !Scard.isPost
    
                const createdSCard = await Scard.save()
                return res.json(createdSCard)
            }


        }else{


            Scard.isPost = !Scard.isPost

            const createdSCard = await Scard.save()
            res.json(createdSCard)

        }





    }else{
        res.status(404)
        throw new Error('Card not found')
    }

})







// @desc Post a Card
// @route PUT /api/products/:id
// @access Private route/Admin
const joinLiveLecture = asyncHandler(async(req, res) => {


    console.log('Starting Live lecture ')

    var Scard = await Tycard.findOne({channel:req.params.channel_id, type:'Live'})


    console.log('Scard ', Scard)

    if(!Scard){

        console.log('Creating Scard')

        Scard = new Tycard({
            user: req.user._id,
            channel: req.params.channel_id,
            type: 'Live',
            public: false,
            title: 'Live Lecture ',
            tags: [],
            liveVideo: {}
        })


        const channel = await Channel.findById(req.params.channel_id)


        console.log('Creating channel passwords')

        const random_name = generator.generate({
            length: 5,
            numbers: true
        });

        var password = generator.generate({
            length: 10,
            numbers: true
        });

        const roomname = channel.name + "_" + random_name


        console.log('Creatign live video objects')

        const liveVideo = {
            roomname: roomname,
            token: password,
            meetpassword: password,
            startedAt: Date.now(),
            completedAt: Date.now(),
            adminJoined: true,
            isStarted: true,
            numJoined: 1,
            timelimit: 90,
            numJoinedLimit: 20,
            joinedList: [],
            channelname: channel.name
        }

        Scard.liveVideo = liveVideo
        const updatedCard = await Scard.save()

        console.log('Updated Card ', updatedCard)

        return res.json(updatedCard)

    
    }else{


        return res.json(Scard)


    }


        // res.status(404)
        // throw new Error('Card not found')


})



// @desc Post a Card
// @route PUT /api/products/:id
// @access Private route/Admin
const leaveLiveLecture = asyncHandler(async(req, res) => {

    const {tagC} = req.body


    //student
    //has left


    //teacher
    //close live lecture link - so new joins not allowed


    const Scard = await Tycard.findById(req.params.card_id)

    console.log("Card ", Scard)

    if(Scard){

        Scard.liveVideo.numJoined = Scard.liveVideo.numJoined - 1

        const updatedSCard = await Scard.save()
        res.json(updatedSCard)

    }else{
        res.status(404)
        throw new Error('Card not found')
    }

})























// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const listLectureCardNotes = asyncHandler(async (req,res) => {


    const card_id = req.params.card_id

    console.log("Card id ", card_id)

    //Check that the user is qualified to access the channel

    //const curr_card = await Tycard.findOne({user: req.user._id, parent: card_id});


    const curr_card = await Usernote.findOne({user: req.user._id, card: card_id});


    console.log(curr_card)
    res.json(curr_card);


})



// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const takeExam = asyncHandler(async (req,res) => {


    const card_id = req.params.card_id

    console.log("Card id ", card_id)

    //Check that the user is qualified to access the channel

    const curr_card = await Tycard.findById(card_id);

    if(curr_card){
        console.log(curr_card)
        res.json(curr_card);
    }else{
        res.status(404)
        throw new Error('Card not found')
    }




})





// @desc Create a post
// @route POST /api/post
// @access Private route/Admin
const addLectureCardNotes = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user._id)

    const { cardNotesText } = req.body;


    const card_id    = req.params.card_id
    const channel_id = req.params.channel_id

    console.log(card_id, channel_id, cardNotesText)

    //const channelC = await Channel.findById(channelselect)
    
    //const myChannel = true

    //console.log(user, user.isTeacher, myChannel)

    // if(user.isTeacher && myChannel){


    //const lecCard = await Tycard.findOne({parent: card_id, user: req.user._id, type:"Note"})

    const lecCard = await Usernote.findOne({card: card_id, user: req.user._id})

    console.log("Lec Card " , lecCard)

    if(!lecCard){


        const note = new Usernote({
            user: req.user._id,
            channel: channel_id,
            card: card_id,
            items: []
        })

        const newItem = {
            text: cardNotesText,
            isPublic: false,
        }

        note.items.unshift(newItem)

        const createdNote = await note.save()

        // const Scard = new Tycard({
        //     user: req.user._id,
        //     channel: channel_id,
        //     type: "Note",
        //     public: false,
        //     title: "lecture notes " + user.name,
        //     parent: card_id,
        //     tags: [],
        //     items: []
        // })


        // Scard.tags.unshift("note")

        // //console.log("SCard 1 : ", Scard)

        // const newItem = {
        //     text: cardNotesText
        // }

        // Scard.items.unshift(newItem)

        // //console.log("SCard 2 : ", Scard)

        // const createdSCard = await Scard.save()


        res.status(201).json(createdNote)

    }else{

        const newItem = {
            text: cardNotesText
        }

        lecCard.items.unshift(newItem)

        //lecCard.items.unshift(newItem)

        const updatedSCard = await lecCard.save()

        res.status(201).json(updatedSCard)

    }




})







// @desc Create a post
// @route POST /api/post
// @access Private route/Admin
const addExamFile = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user._id)

    const { ExamFile } = req.body;


    const card_id    = req.params.card_id

    console.log(card_id, ExamFile)

    const examCard = await Tycard.findById(card_id)

    console.log("Lec Card " , examCard)


    examCard.exam.questionpaperfile = ExamFile
    const updatedExamCard = await examCard.save()

    res.status(201).json(updatedExamCard)


})




// @desc Create a post
// @route POST /api/post
// @access Private route/Admin
const updateExamCard = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user._id)

    const { examDescription,  numQuestions, maxMarks,  startDate, startTime, DeadlineDate, DeadlineTime } = req.body;


    const card_id    = req.params.card_id

    console.log(card_id)

    const examCard = await Tycard.findById(card_id)

    console.log("Exam Card " , examCard)


    console.log("Update Exam : ", examDescription,  numQuestions, maxMarks)
    console.log("Update Exam Date: ", startDate, startTime, DeadlineDate, DeadlineTime)

    console.log("Start Date : ", startDate+" "+startTime+":00")

    const date_in = new Date(startDate+" "+startTime)
    console.log("date in : " ,date_in, Date.now())

    if(examDescription){
        examCard.exam.examdescription = examDescription
    }
    
    if(maxMarks){
        examCard.exam.totalMarks = maxMarks
    }
    
    if(startDate && startTime){
        examCard.exam.startTime = new Date(startDate + " " + startTime)
    }
    
    if(DeadlineDate && DeadlineTime){
        examCard.exam.endTime = new Date(DeadlineDate + " " + DeadlineTime)
    }
    
    if(numQuestions){
        examCard.exam.numQuestions = numQuestions
    }


    const updatedExamCard = await examCard.save()

    res.status(201).json(updatedExamCard)


})










//-------------------Live lecture -------------------------


//generate the token for a secure meeting

//start the conference and share the join link in the post

// @desc Post a Card
// @route PUT /api/products/:id
// @access Private route/Admin
const startLiveLecture = asyncHandler(async(req, res) => {

    //const {link} = req.body

    console.log("Card id ", req.params.card_id)

    const Scard = await Tycard.findById(req.params.card_id)

    console.log("Card ", Scard)


    //Generate a link - randomnumber+ teachyaarclassname + random_no
    const uuid = uuidv4();
    const random_name = generator.generate({
        length: 10,
        numbers: true
    });
    const link = uuid + "_" + Scard.title + "_" + random_name


    //Generate a password -  randmon number

    var password = generator.generate({
        length: 10,
        numbers: true
    });


    //generate token

    console.log("Random names : ", random_name, link, password)
    console.log("Test  : ", Scard.type, req.user._id.equals(Scard.user), req.user.isTeacher)


    if(Scard && Scard.type=="Live" && req.user._id.equals(Scard.user) && req.user.isTeacher){

        console.log("Updating the livvid")

        const livVid = {
            roomname: random_name,
            link: link,
            token: password,
            meetpassword: password,
            startedAt: Date.now(),
            completedAt: Date.now(),
            adminJoined: true,
            isStarted: true,
            numJoined: 1,
            timelimit: 90,
            numJoinedLimit: 20,
            joinedList: []

        }

        Scard.liveVideo = livVid

        // Scard.livevideo.link = link
        // Scard.livevideo.password = password
        // Scard.livevideo.startedAt = Date.now()
        // Scard.livevideo.adminJoined = true

        const createdSCard = await Scard.save()
        res.json(createdSCard)

    }else{
        res.status(404)
        throw new Error('Card not found')
    }

})



// @desc Post a Card
// @route PUT /api/products/:id
// @access Private route/Admin
const getLiveCard = asyncHandler(async(req, res) => {


    const channel_id = req.params.channel_id

    //Get the last live card
    const Scard = await Tycard.findOne({channel:channel_id,  type:'Live'})


    if(Scard){

        const item = {
            startedAt: Date.now()
        }

        Scard.liveVideo.items.unshift(item)

        res.json(Scard)

    }else{


        const cChannel = Channel.findById(channel_id)

        //Generate a link - randomnumber+ teachyaarclassname + random_no
        const uuid = uuidv4();
        const random_name = generator.generate({
            length: 10,
            numbers: true
        });
        const link = uuid + "_" + cChannel.name + "_" + random_name
    
    
        //Generate a password -  randmon number
    
        var password = generator.generate({
            length: 10,
            numbers: true
        });

        const livVid = {
            conftype: 'Jitsi',
            roomname: random_name,
            link: link,
            token: password,
            meetpassword: password,
            startedAt: Date.now(),
            completedAt: Date.now(),
            adminJoined: true,
            isStarted: true,
            numJoined: 1,
            timelimit: 90,
            numJoinedLimit: 20,
            joinedList: []

        }

        Scard.liveVideo = livVid

        // Scard.livevideo.link = link
        // Scard.livevideo.password = password
        // Scard.livevideo.startedAt = Date.now()
        // Scard.livevideo.adminJoined = true

        const createdSCard = await Scard.save()
        res.json(createdSCard)
    



    }

    //if the live card is not active and it is the next day, treat it asa  new lecture



    //const Scard = await Tycard.findById(req.params.card_id)

    // console.log("Card ", Scard)

    // if(Scard && Scard.liveVideo && Scard.liveVideo.isStarted && !Scard.liveVideo.isEnded){

    //     Scard.liveVideo.numJoined = Scard.liveVideo.numJoined + 1

    //     const updatedSCard = await Scard.save()
    //     res.json(updatedSCard)

    // }else{
    //     res.status(404)
    //     throw new Error('Card not found')
    // }



})




// @desc Post a Card
// @route PUT /api/products/:id
// @access Private route/Admin
const endLiveLecture = asyncHandler(async(req, res) => {

    const {} = req.body

    const Scard = await Tycard.findById(req.params.card_id)

    console.log("Card ", Scard)

    if(Scard && req.user._id.equals(Scard.user) && req.user.isTeacher){


        Scard.liveVideo.isEnded = true
        Scard.liveVideo.completedAt = Date.now()

        const completedSCard = await Scard.save()
        res.json(completedSCard)

    }else{
        res.status(404)
        throw new Error('Card not found')
    }

})




//Announcement ----------------





// @desc Create a post
// @route POST /api/post
// @access Private route/Admin
const addAnnouncementsCard = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user._id)

    const { announcementText } = req.body;

    const card_id    = req.params.card_id
    //const channel_id = req.params.channel_id

    console.log(card_id, announcementText)

    const ACard = await Tycard.findById(card_id)

    console.log("Lec Card " , ACard)

    if(ACard){


        ACard.description = announcementText

        const updatedACard = await ACard.save()


        res.status(201).json(updatedACard)

    }else{

        res.status(404)
        throw new Error('Card not found')

    }




})







//allow users to join the conference if they are authoried

//handle the closing of the  conference

//on close, ensure the conference is over, close jitsi and update post 







export {
    listTYCards,
    createTYCards,
    listLectureCardNotes,
    addLectureCardNotes,
    addTagsCards,
    addExamFile,
    updateExamCard,
    addItemStudyCards,
    postCard,
    deleteCard,
    updatelistTYCardsRT,

    getLiveCard,
    startLiveLecture,
    joinLiveLecture,
    leaveLiveLecture,
    endLiveLecture,
    takeExam,

    addAnnouncementsCard,
    deleteItemStudyCard
    

}