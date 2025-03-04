// Author : Anil Variyar
// License : Proprietary
// Property of : Anil Variyar/ Pixagan Technologies Private Limited


import mongoose from 'mongoose'



const notecardsSchema = mongoose.Schema({
    title:{type:String, required:true, unique:true},
    course_id:{type:mongoose.Schema.Types.ObjectId},
    session_id:{type:mongoose.Schema.Types.ObjectId},
    url:{type:String, unique:true},
    language:{type:String, default:'English'},
    hashtag:{type:String, required:true, unqiue:true},
    subject:{type:String,required:true},
    topic:{type:String, required:true},
    question:{type:String},
    nQs:{type:Number, default:0},
    nVideos:{type:Number, default:0},
    isTest:{type:Boolean, default:false},
    isExample:{type:Boolean, default:false},
    isVideo:{type:Boolean, default:false},
    items:[
        {
            type:{type:String},
            text:{type:String},
            equation:{type:String},
            list:{type:String},
            table:{type:Map},
            svg:{
                svgparams:{
                    height:{type:String},
                    width:{type:String}
                },
                opers:[
                    {
                        type:{type:String},
                        startx:{type:String},
                        starty:{type:String},
                        width:{type:String},
                        height:{type:String},
                        radius:{type:String},
                        text:{type:String},
                        startx1:{type:String},
                        starty1:{type:String},
                        startx2:{type:String},
                        starty2:{type:String},
                        startx3:{type:String},
                        starty3:{type:String},
                        fontsize:{type:String},
                        transform:{type:String},
                        points:{type:String}
                    }
                ]
            }

        }
    ]

}, {
    timestamps: true
})


const Notecards = mongoose.model('Notecards', notecardsSchema);





const notecoverSchema = mongoose.Schema({
    title:{type:String},
    notebook:{type:mongoose.Schema.Types.ObjectId},
    shelf:{type:String},
    url:{type:String}

}, {
    timestamps: true
})


const Notecover = mongoose.model('Notecover', notecoverSchema);



const notebookSchema = mongoose.Schema({
    url:{type:String,unqiue:true},
    title:{type:String, required:true},
    cards:[],
    isPosted: {type:Boolean, required:true, default:true}

}, {
    timestamps: true
})


const Notebook = mongoose.model('Notebook', notebookSchema);




const shelfSchema = mongoose.Schema({
    title:{type:String},
    covers:[notecoverSchema]

}, {
    timestamps: true
})


const Shelf = mongoose.model('Shelf', shelfSchema);






export {Notecards, Notebook, Notecover, Shelf};