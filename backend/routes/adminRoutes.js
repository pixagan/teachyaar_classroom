// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import express from 'express'
import {listTeachYaarChannels, createTeachYaarChannels, listUsersAdmin, listChannelsAdmin, listActivitiesAdmin,
    listTYAdminCards, createTYAdminCards, loadTeachYaarMetrics, listEnrollmentRequestsAdmin,
    verifyUsersAdmin, getAdminChannelUpdateRT, createNotifications, createFeedbackForm,
    resolveTickets, listTickets, getContactUsPosts} from '../controllers/adminController.js'

import {ActivateUserAccount} from '../controllers/userController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

import { logActivitypre,  logActivitypost} from '../middleware/activityMiddleware.js'

const router = express.Router()




// @desc Fetch all channels 
// @route GET /api/admin
// @access Public route
router.route('/channels/teachyaar/').get(logActivitypre, protect, admin, listTeachYaarChannels).post(logActivitypre, protect, admin, createTeachYaarChannels)



// @desc Fetch all channels 
// @route GET /api/admin
// @access Public route
router.route('/cards/teachyaar/:channel_id').get(logActivitypre, protect, admin, listTYAdminCards).post(logActivitypre, protect, admin, createTYAdminCards)



// @desc Fetch all users
// @route GET /api/admin
// @access Public route
router.route('/metrics').get(logActivitypre, protect,admin,loadTeachYaarMetrics);



// @desc Fetch all users
// @route GET /api/admin
// @access Public route
router.route('/enrollmentRequests').get(logActivitypre, protect,admin,listEnrollmentRequestsAdmin);


// @desc Fetch all users
// @route GET /api/admin
// @access Public route
router.route('/verifyUsers/:user_id').post(logActivitypre, protect,admin,verifyUsersAdmin, ActivateUserAccount);


// @desc Fetch all channels 
// @route GET /api/admin
// @access Public route
router.route('/RT/channels/:channel_id').get(logActivitypre, protect, admin, getAdminChannelUpdateRT)




// @desc Fetch all users
// @route GET /api/admin
// @access Public route
router.route('/viewSupportTickets').get(logActivitypre, protect,admin,listTickets);


// @desc Fetch all users
// @route GET /api/admin
// @access Public route
router.route('/viewContactus').get(logActivitypre, protect,admin, getContactUsPosts);




//Support -------------



//TY Channels --------------

//Notifications

router.route('/notifications/:card_id').post(logActivitypre, protect, admin, createNotifications)


router.route('/feedback/:card_id').post(logActivitypre, protect, admin, createFeedbackForm)


router.route('/resolveTicket/:ticket_id').post(logActivitypre, protect, admin, resolveTickets)








// @desc Fetch all users
// @route GET /api/admin
// @access Public route
router.route('/users').get(logActivitypre, protect,admin,listUsersAdmin);


// @desc Fetch all channels 
// @route GET /api/admin
// @access Public route
router.route('/channels').get(logActivitypre, protect, admin, listChannelsAdmin)


// @desc Fetch all activity 
// @route GET /api/activity
// @access Public route
router.route('/activity').get(logActivitypre, protect,admin, listActivitiesAdmin);


// // @desc Fetch all activity 
// // @route GET /api/activity
// // @access Public route
// router.route('/dataUsage').get(protect,getChannels);



export default router;