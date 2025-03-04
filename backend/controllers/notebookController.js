
// License : Proprietary
// Property of : Anil Variyar/ Pixagan Technologies Private Limited


import asyncHandler from 'express-async-handler'

import { v4 as uuidv4 } from 'uuid';
import generator from 'generate-password'

import {Notecards, Notebook, Shelf} from '../models/notebookModel.js'



// @desc load searched topics
const loadNotebook = asyncHandler(async (req,res) => {

    console.log("Loading Notebooks")

    const book_id = req.params.book_id

    var cNotebook = await Notebook.findById(book_id)

    return res.json(cNotebook)

})





export {
    
    loadNotebook,
   
}



