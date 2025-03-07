// Author : Anil Variyar
// License : Proprietary
// Property of : Anil Variyar/ Pixagan Technologies Private Limited


import express from 'express'
import multer from 'multer'
import path from 'path'


import { v4 as uuidv4 } from 'uuid';


import {
    loadNotebooks,
    loadNotebookId,
    createNotebook,

    updateNotebookTitle,
    addItemToNotebook,
    deleteItemToNotebook,
    updateItemToNotebook,

    deleteNotebook
} from '../controllers/notebookController.js'

import { protect, admin, teacher,  subscribed } from '../middleware/authMiddleware.js'
import { logActivitypre,  logActivitypost} from '../middleware/activityMiddleware.js'



import dotenv from 'dotenv';



dotenv.config()


const router = express.Router()



// @route GET /api/notebooks
router.route('/').get(protect, teacher, loadNotebooks).post(protect, teacher, createNotebook);
router.route('/:notebook_id').get(protect, teacher, loadNotebookId).delete(protect, teacher, deleteNotebook);

router.route('/title/:notebook_id').put(protect, teacher, updateNotebookTitle)

router.route('/items/:notebook_id').post(protect, teacher, addItemToNotebook)

router.route('/items/:notebook_id/:item_id').put(protect, teacher, updateItemToNotebook).delete(protect, teacher, deleteItemToNotebook)


export default router;
