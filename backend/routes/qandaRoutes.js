// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import express from 'express'
import { getQPosts, getQPostsCard, createQPost, createQPostReply, deleteQPosts, removePostReply } from '../controllers/qandaController.js'
import { protect, admin, subscribed } from '../middleware/authMiddleware.js'
import { logActivitypre,  logActivitypost} from '../middleware/activityMiddleware.js'

const router = express.Router()


// @desc Fetch single product by id
// @route GET /api/products/:id
// @access Public route
router.route('/:channel_id').get(logActivitypre, protect, subscribed, getQPosts).post(logActivitypre, protect, subscribed, createQPost) //.delete(protect, admin, deleteChannel).put(protect, admin, updateChannel);



// @desc Fetch all products 
// @route GET /api/products
// @access Public route
router.route('/postreply/:channel_id/:qanda_id').post(logActivitypre, protect, subscribed, createQPostReply);







// @desc Fetch single product by id
// @route GET /api/products/:id
// @access Public route
router.route('/:channel_id/:qanda_id').delete(logActivitypre, protect, subscribed, deleteQPosts); //.put(protect, admin, updateChannel);



// // @desc Fetch all products 
// // @route GET /api/products
// // @access Public route
// router.route('/card/:channel_id/:card_id').get(protect, subscribed, getQPostsCard);




// @desc Fetch all products 
// @route GET /api/products
// @access Public route
router.route('/postreply/:channel_id/:qanda_id/:reply_id').delete(logActivitypre, protect, subscribed, removePostReply);



export default router;