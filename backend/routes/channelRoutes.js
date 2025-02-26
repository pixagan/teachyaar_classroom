// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import express from 'express'
import {getChannels, getChannelById, deleteChannel, createChannel, updateChannel, unsubscribeChannel, getChannelUpdateRT, enrollmentRequestChannel, approveEnrollmentRequestChannel} from '../controllers/channelController.js'
import { protect, admin, teacher } from '../middleware/authMiddleware.js'
import { logActivitypre,  logActivitypost} from '../middleware/activityMiddleware.js'
import { validateChannelCreate } from '../validators/createChannelValidator.js'

const router = express.Router()

// @desc Fetch all products 
// @route GET /api/products
// @access Public route
router.route('/').get(logActivitypre,protect,getChannels, logActivitypost).post(logActivitypre, protect, teacher, validateChannelCreate, createChannel);


// @desc Fetch single product by id
// @route GET /api/products/:id
// @access Public route
router.route('/:channel_id').get(logActivitypre, protect, teacher, getChannelById, logActivitypost).delete(logActivitypre, protect, teacher , deleteChannel).put(logActivitypre, protect, admin, teacher, updateChannel);


// @desc Get subscribers
// @route GET /api/products
// @access Private route
router.route('/enroll/:enrollmentCode').post(logActivitypre, protect, enrollmentRequestChannel, logActivitypost) //.delete(protect, unsubscribeChannel) //.get(protect, getChannelSubscribers)


// @desc Approve Subscription request
// @route GET /api/channels/enroll/approve/:channel_id
// @access Private route
router.route('/enroll/approve/:channel_id').post(logActivitypre, protect,teacher, approveEnrollmentRequestChannel , logActivitypost)




// // @desc Get subscribers
// // @route GET /api/products
// // @access Public route
router.route('/unsubscribe/:channel_id/:student_id').post(logActivitypre, protect, unsubscribeChannel, logActivitypost) 



// // @desc Get subscribers
// // @route GET /api/products
// // @access Public route
// //router.route('/subscribers/:channel_id').put(protect, subscribeChannel).delete(protect, unsubscribeChannel) //.get(protect, getChannelSubscribers)
// router.route('/subscribers/:channel_id').put(protect, subscribeChannel).delete(protect, unsubscribeChannel) //.get(protect, getChannelSubscribers)






// @desc Fetch single product by id
// @route GET /api/products/:id
// @access Public route
router.route('/RT/:channel_id').post(protect, getChannelUpdateRT);



export default router;