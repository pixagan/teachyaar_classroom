// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import express from 'express'
import {getChannels, getChannelById, deleteChannel, createChannel, updateChannel, unsubscribeChannel, getChannelUpdateRT, enrollmentRequestChannel, approveEnrollmentRequestChannel} from '../controllers/channelController.js'
import { protect, admin, teacher } from '../middleware/authMiddleware.js'
import { logActivitypre,  logActivitypost} from '../middleware/activityMiddleware.js'
import { validateChannelCreate } from '../validators/createChannelValidator.js'
import { loadNotebooksByCourse } from '../controllers/notebookController.js'

const router = express.Router()


router.route('/').get(logActivitypre,protect,getChannels, logActivitypost).post(logActivitypre, protect, teacher, validateChannelCreate, createChannel);


router.route('/:channel_id').get(logActivitypre, protect, teacher, getChannelById, logActivitypost).delete(logActivitypre, protect, teacher , deleteChannel).put(logActivitypre, protect, admin, teacher, updateChannel);


router.route('/enroll/:enrollmentCode').post(logActivitypre, protect, enrollmentRequestChannel, logActivitypost) //.delete(protect, unsubscribeChannel) //.get(protect, getChannelSubscribers)


router.route('/enroll/approve/:channel_id').post(logActivitypre, protect,teacher, approveEnrollmentRequestChannel , logActivitypost)




router.route('/unsubscribe/:channel_id/:student_id').post(logActivitypre, protect, unsubscribeChannel, logActivitypost) 



router.route('/RT/:channel_id').post(protect, getChannelUpdateRT);


router.route('/notebooks/:channel_id').get(protect, teacher,loadNotebooksByCourse);


export default router;