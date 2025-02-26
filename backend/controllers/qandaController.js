// Date Created: 02/02/2021
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import asyncHandler from 'express-async-handler'
import Channel from '../models/channelModel.js'
import User from '../models/userModel.js'
import Qanda from '../models/qandaModel.js'
import Tycard from '../models/tycardModel.js'
import Activity from '../models/activityModel.js';
import Appmetrics from '../models/appmetricsModel.js'



// @desc Create a product
// @route POST /api/products
// @access Private route/Admin
const createQPost = asyncHandler(async(req, res) => {


    const { question, post_type, card_id, isPrivate } = req.body;

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
        private: isPrivate
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
const getQPosts = asyncHandler(async (req,res) => {

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
const deleteQPosts = asyncHandler(async(req, res) => {

    const qanda = await Qanda.findById(req.params.qanda_id);
    

    if(qanda && req.user._id.equals(qanda.user)) {
        await qanda.remove()

        const appmet = await Appmetrics.findOne({type:'user'})
        appmet.qandaMets.deleted = appmet.qandaMets.deleted + 1
        await appmet.save()

        res.json({message: 'Qanda removed' })
    }else{

        res.status(404)
        throw new Error('Qanda not found')
    }

})






// @desc Create a product
// @route POST /api/products
// @access Private route/Admin
const createQPostReply = asyncHandler(async(req, res) => {


    const { reply } = req.body;

    const user_id = req.user._id;
    const channel_id = req.params.channel_id;
    const qanda_id = req.params.qanda_id;

    const user = await User.findById(req.user._id)
    const qanda = await Qanda.findById(qanda_id)

    console.log(reply)

    const postreply = {
        user: user_id,
        username: user.name,
        qanda: qanda_id,
        instructor: user.isTeacher,
        type: "text",
        channel: channel_id,
        responseText: reply
    }

    //board.posts.unshift()
    qanda.comments.unshift(postreply)

    const updatedQanda = await qanda.save()

    res.status(201).json(updatedQanda)

})





// @desc Remove QandA post reply
// @route POST /api/products
// @access Private route/Admin
const removePostReply = asyncHandler(async(req,res) =>{

    try{

        const qanda_id = req.params.qanda_id
        const channel_id = req.params.channel_id
        const reply_id = req.params.reply_id

        //get the post
        const qpost = await Qanda.findById(req.params.qanda_id);


        //Make sure comment exists
        if(!qpost){
            return res.status(404).json({ msg: 'Qanda does not exist'});
        }


        //based on the comment id
        const removeIndex = req.params.reply_id;

        if(removeIndex >= 0 ){

            if(req.user._id.equals(qpost.comments[removeIndex].user)){
                qpost.comments.splice(removeIndex,1);

                //save the updated like
                await qpost.save();

            }
            

        }
        
        console.log(qpost.comments)
        res.json(qpost);


    }catch(err){

        console.error(err.message);
        res.status(500).send('Server Error');
    }


});





// @desc Fetch all products 
// @route GET /api/products
// @access Public route
const getQPostsCard = asyncHandler(async (req,res) => {

    const user_id  = req.user._id;
    const channel_id = req.params.channel_id;
    const card_id  = req.params.card_id;

    console.log("Load Posts", channel_id, card_id)

    const card = await Tycard.findById(card_id)

    console.log("Card : ", card)

    const posts = await Qanda.find({_id: card.qanda})  //.limit(pageSize).skip(pageSize*(page-1))
   
    //const posts = await Qanda.find({channel: channel_id, card: card_id})  //.limit(pageSize).skip(pageSize*(page-1))
   
    console.log("Posts : ", posts)
    //res.status(201).json({boards});
    res.json(posts);

})



export {
    createQPost,
    getQPosts,
    getQPostsCard,
    createQPostReply,
    deleteQPosts,
    removePostReply
}