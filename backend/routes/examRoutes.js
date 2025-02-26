// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import express from 'express'
import { getAllStudentExamSubmissions, getStudentExam, startStudentExam, getStudentExamById, submitStudentExam, gradeStudentExamById, downloadStudentExamSubmission } from '../controllers/examController.js'
import { protect, admin, teacher, subscribed } from '../middleware/authMiddleware.js'
import { logActivitypre,  logActivitypost} from '../middleware/activityMiddleware.js'

const router = express.Router()




// @desc Fetch all exams
// @route GET /api/products
// @access Public route
router.route('/:channel_id/:card_id').get(logActivitypre, protect, subscribed, getStudentExam);

// @desc Grade student exam
// @route GET /api/products
// @access Public route
router.route('/grade/:channel_id/:studentexam_id').get(logActivitypre, protect, teacher, getStudentExamById).post(logActivitypre, protect, teacher, gradeStudentExamById);









// @desc Fetch all exams
// @route GET /api/products
// @access Public route
router.route('/all/:channel_id/:card_id').get(logActivitypre, protect, getAllStudentExamSubmissions)



router.route('/byId/:submission_id').get(logActivitypre, protect, getStudentExamById);


// @desc Fetch all exams
// @route GET /api/products
// @access Public route
router.route('/start/:channel_id/:studentexam_id').post(logActivitypre, protect, startStudentExam);


// @desc Fetch all exams
// @route GET /api/products
// @access Public route
router.route('/submit/:channel_id/:studentexam_id').post(logActivitypre, protect, submitStudentExam);



// // @desc Fetch all exams
// // @route GET /api/products
// // @access Public route
// router.route('/:studentexam_id').get(protect, getStudentExamById).put(protect, submitStudentExam);



// @desc Fetch all exams
// @route GET /api/products
// @access Public route
router.route('/grade/downloadsubmission/:submission_id').get(logActivitypre, protect, downloadStudentExamSubmission);








export default router;