// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import express from 'express'
import {authUser,registerUser, logoutUser, getUserProfile, changePassword, resetPasswordRequest, resetPasswordSubmission,
    registerUserVerified, verifyPhoneOTP, verifyEmailOTP, ActivateUserAccount, resendEmailOTP, resendPhoneOTP,
    deleteUserConfirmation} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import { logActivitypre,  logActivitypost} from '../middleware/activityMiddleware.js'

//import { userValidationResult, validateUserRegister}  from '../validators/registerValidator.js'
import { validateUserRegister }  from '../validators/registerValidator.js'
//import {resendPhoneOTPTwilio, verifyPhoneOTPTwilio} from '../controllers/twilioController.js'

//validators
//import { validateUserRegister } from '../validators/registerValidator'

const router = express.Router()


// @desc Register a user
// @route Post /api/
//router.route('/').post(validateUserRegister, logActivitypre, registerUser) //.get(logActivitypre, protect, admin, getUsers);

router.route('/').post(validateUserRegister, logActivitypre, registerUserVerified);


router.route('/delete').post(logActivitypre, protect, deleteUserConfirmation);





// @desc Get the users profile
// @route Post /api/
router.route('/profile').get(logActivitypre, protect, getUserProfile);



// @desc Authenticate User
// @route POST /api/login
// @access Public route
router.post('/login',logActivitypre, authUser);


// @desc Authenticate User
// @route POST /api/login
// @access Public route
router.post('/logout',logActivitypre, logoutUser);



// @desc Change Password
// @route POST /api/users/changePassword
// @access Public route
router.post('/changePassword',logActivitypre, protect, changePassword);



// @desc Authenticate User
// @route POST /api/login
// @access Public route
//router.post('/resetPasswordRequest',logActivitypre, resetPasswordRequest);


// @desc Authenticate User
// @route POST /api/login
// @access Public route
//router.post('/resetPasswordOTP',logActivitypre, resetPasswordSubmission);


//router.route('/verifyPhone').post(logActivitypre, verifyPhoneOTPTwilio, ActivateUserAccount) //.get(logActivitypre, protect, admin, getUsers);
//router.route('/verifyEmail').post(logActivitypre, verifyEmailOTP, ActivateUserAccount) //.get(logActivitypre, protect, admin, getUsers);


// @desc Authenticate User
// @route POST /api/login
// @access Public route
//router.post('/resendEmailOTP',logActivitypre, resendEmailOTP);


// @desc Authenticate User
// @route POST /api/login
// @access Public route
//router.post('/resendPhoneOTP',logActivitypre, resendPhoneOTPTwilio);




export default router;