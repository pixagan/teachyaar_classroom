// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import express from 'express'
import {listTYCards, createTYCards, listLectureCardNotes, addLectureCardNotes, addTagsCards, addExamFile, addItemStudyCards, postCard, deleteCard, startLiveLecture, joinLiveLecture, leaveLiveLecture, endLiveLecture, updateExamCard, takeExam,
    addAnnouncementsCard, getLiveCard, deleteItemStudyCard} from '../controllers/cardController.js'

import { protect, admin, teacher,  subscribed } from '../middleware/authMiddleware.js'
import { logActivitypre,  logActivitypost} from '../middleware/activityMiddleware.js'

const router = express.Router()

// @desc Fetch all products 
// @route GET /api/products
// @access Public route
router.route('/:channel_id').get(logActivitypre, protect, listTYCards, logActivitypost).post(logActivitypre, protect, teacher, createTYCards, logActivitypost);


// @desc Fetch all products 
// @route GET /api/products
// @access Public route
router.route('/:channel_id/:card_id').delete(logActivitypre, protect, teacher, deleteCard, logActivitypost);


// @desc Fetch all products 
// @route GET /api/products
// @access Public route
router.route('/items/:channel_id/:card_id').post(logActivitypre, protect, teacher, addItemStudyCards, logActivitypost);
// router.route('/item/:card_id/:item_id').delete(protect, deleteItemStudyCards);


// @desc Fetch all products 
// @route GET /api/products
// @access Public route
router.route('/items/:channel_id/:card_id/:item_id').delete(logActivitypre, protect, teacher, deleteItemStudyCard, logActivitypost);
// router.route('/item/:card_id/:item_id').delete(protect, deleteItemStudyCards);



// @desc Post your card
// @route GET /api/products
// @access Public route
router.route('/post/:channel_id/:card_id').post(logActivitypre, protect, teacher, postCard, logActivitypost);




// @desc Update Exam Info
// @route POST /exams/updateCard/:card_id
// @access Public route
router.route('/exams/updateCard/:card_id').post(logActivitypre, protect, updateExamCard, logActivitypost);


// @desc Update Live Lecture Card
// @route POST /live/
// @access Private route
router.route('/live/join/:channel_id').post(logActivitypre, protect, subscribed, joinLiveLecture, logActivitypost);

router.route('/live/leave/:channel_id').post(logActivitypre, protect, subscribed, leaveLiveLecture, logActivitypost);



// // @desc Fetch all products 
// // @route GET /api/products
// // @access Public route
// router.route('/update/:channel_id').get(protect, listTYCards);




// @desc Fetch all products 
// @route GET /api/products
// @access Public route
router.route('/notes/:channel_id/:card_id').get(logActivitypre, protect, listLectureCardNotes, logActivitypost).post(logActivitypre, protect, addLectureCardNotes, logActivitypost); //.delete(protect, deleteStudyCards)


// @desc Fetch all products 
// @route GET /api/products
// @access Public route
router.route('/tags/:card_id').post(logActivitypre, protect, teacher, addTagsCards, logActivitypost);
// router.route('/tags/:card_id/:tag_id').delete(protect, deleteTagStudyCards);



// @desc Fetch all products 
// @route GET /api/products
// @access Public route
//router.route('/exams/:channel_id/:card_id').post(logActivitypre, protect, subscribed, addExamFile, logActivitypost).get(logActivitypre, protect, takeExam, logActivitypost);

router.route('/exams/:channel_id/:card_id').get(logActivitypre, protect, subscribed, takeExam, logActivitypost);







// @desc Post your card
// @route GET /api/products
// @access Public routes

router.route('/live/getCard/:channel_id').get(logActivitypre, protect, getLiveCard, logActivitypost);

router.route('/live/start/:card_id').post(logActivitypre, protect, startLiveLecture, logActivitypost);


router.route('/live/end/:card_id').post(logActivitypre, protect, endLiveLecture, logActivitypost);


 // @desc Post your card
// @route GET /api/products
// @access Public route
router.route('/announcement/:card_id').post(logActivitypre, protect, addAnnouncementsCard, logActivitypost);



export default router;