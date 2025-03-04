// Author : Anil Variyar
// License : Proprietary
// Property of : Anil Variyar/ Pixagan Technologies Private Limited


import express from 'express'
import multer from 'multer'
import path from 'path'


import { v4 as uuidv4 } from 'uuid';



import {
    loadShelves,
    loadNotebook,
    loadNotebookURL
} from '../controllers/notebookController.js'

import moment from 'moment-timezone'

import dotenv from 'dotenv';



dotenv.config()


const router = express.Router()



// @route GET /api/notebooks
router.route('/:notebook_id').get(loadNotebookURL)


export default router;
