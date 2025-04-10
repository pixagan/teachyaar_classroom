
// License : Proprietary
// Property of : Anil Variyar/ Pixagan Technologies Private Limited


import asyncHandler from 'express-async-handler'

import { v4 as uuidv4 } from 'uuid';
import generator from 'generate-password'
import mongoose from 'mongoose';

import {Notecards, Notebook, Noteitem} from '../models/notebookModel.js'

const DEFAULT_COURSE_ID = new mongoose.Types.ObjectId('000000000000000000000000');


const addNotecard = asyncHandler(async(req, res) => {

    const notebook_id = req.params.notebook_id

    const { item } = req.body;

    console.log("Adding Item to Notebook : ", notebook_id, item)


    const order = await Noteitem.countDocuments({ notebook_id: notebook_id })

    // try{

        console.log("Order : ", order)

        const newNote = await Noteitem.create({
            createdBy: req.user._id,
            notebook_id:notebook_id,
            order:order,
            item:item,
            itemType:item.type
        })

        console.log("New Note : ", newNote)

        res.status(201).json(newNote)
        

    // }catch(error){
    //     res.status(400).json({message: error.message})
    // }


})


const updateNoteCardNotebook = asyncHandler(async(req, res) => {

    const notebook_id = req.params.notebook_id
    const item_id = req.params.item_id

    const { item, itemType } = req.body;

    try{

        const currNote = await Notecards.findById(item_id)
        currNote.item = item
        updatedNote = await currNote.save()

        res.status(201).json(updatedNote)
        

    }catch(error){
        res.status(400).json({message: error.message})
    }


})

const deleteItemToNotebook = asyncHandler(async(req, res) => {

    const notebook_id = req.params.notebook_id
    const item_id = req.params.item_id

    try{

        const currNote = await Notecards.findById(item_id)

        await currNote.delete()

        res.status(201).json("Deleted")
        

    }catch(error){
        res.status(400).json({message: error.message})
    }


})



export {

    addItemToNotebook,
    deleteItemToNotebook,
    updateItemToNotebook,

}



