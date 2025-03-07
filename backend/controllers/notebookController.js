
// License : Proprietary
// Property of : Anil Variyar/ Pixagan Technologies Private Limited


import asyncHandler from 'express-async-handler'

import { v4 as uuidv4 } from 'uuid';
import generator from 'generate-password'
import mongoose from 'mongoose';

import {Notecards, Notebook, Noteitem} from '../models/notebookModel.js'

const DEFAULT_COURSE_ID = new mongoose.Types.ObjectId('000000000000000000000000');

// @desc load notebooks
const loadNotebooks = asyncHandler(async (req,res) => {

    console.log("Loading Notebooks")

    const course_id = req.params.course_id

    var books = await Notebook.find({course_id:course_id})

    return res.json(books)

})


// @desc load notebooks
const loadNotebooksByCourse = asyncHandler(async (req,res) => {

    console.log("Loading Notebooks by Course ")

    const channel_id = req.params.channel_id

    var books = await Notebook.find({course_id:channel_id})


    return res.json(books)

})




// @desc load notebook by id
const loadNotebookId = asyncHandler(async (req,res) => {

    console.log("Loading Notebooks")

    const notebook_id = req.params.notebook_id

    var cNotebook = await Notebook.findById(notebook_id)


    try{

        const noteitems = await Noteitem.find({notebook_id:notebook_id})


        console.log("Items : ", noteitems)

        res.status(201).json({notebook:cNotebook, items:noteitems})
        

    }catch(error){
        res.status(400).json({message: error.message})
    }


    return res.json(cNotebook)

})



const createNotebook = asyncHandler(async(req, res) => {

    const { title, course_id } = req.body;

    console.log("Creating Notebook : ", title, course_id)
        

    // try{

        if(course_id == undefined || course_id == null){
            course_id = DEFAULT_COURSE_ID
        }


        console.log("User Id : ", req.user._id)

        const newNotebook = await Notebook.create({
            createdBy: req.user._id,
            title: title,
            course_id: course_id
        })
    
        res.status(201).json(newNotebook)
        

    // }catch(error){
    //     res.status(400).json({message: error.message})
    // }


})




const  updateNotebookTitle = asyncHandler(async(req, res) => {

    const notebook_id = req.params.notebook_id

    const { title } = req.body;

    try{

        const currNotebook = await Notebook.findById(notebook_id)
        currNotebook.title = title
        await currNotebook.save()
    
        res.status(201).json(currNotebook)
        

    }catch(error){
        res.status(400).json({message: error.message})
    }


})




const addItemToNotebook = asyncHandler(async(req, res) => {

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


const updateItemToNotebook = asyncHandler(async(req, res) => {

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





const deleteNotebook = asyncHandler(async(req, res) => {

    const notebook_id = req.params.notebook_id

    try{

        //check if notebook exists

        const currNotebook = await Notebook.findById(notebook_id)

        if(!currNotebook){
            res.status(404).json({message: "Notebook not found"})
            return
        }

        //check for items in notebook

        const items = await Notecards.find({notebook_id:notebook_id})

        if(items.length > 0){
            for(var i=0; i<items.length; i++){
                await Notecards.findByIdAndDelete(items[i]._id)
            }
        }

        //delete notebook
        await currNotebook.delete()

        await Notebook.findByIdAndDelete(notebook_id)

        res.status(201).json(notebook_id)
        

    }catch(error){
        res.status(400).json({message: error.message})
    }


})




export {
    loadNotebooks,
    loadNotebookId,
    loadNotebooksByCourse,

    createNotebook,
    updateNotebookTitle,
    addItemToNotebook,
    deleteItemToNotebook,
    updateItemToNotebook,
    deleteNotebook

   
}



