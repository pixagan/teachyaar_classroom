// Author : Anil Variyar
// License : Proprietary
// Property of : Anil Variyar/ Pixagan Technologies Private Limited


import mongoose from 'mongoose'



const noteitemSchema = mongoose.Schema({
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    notebook_id:{type:mongoose.Schema.Types.ObjectId},
    order:{type:Number, required:true},
    item:{type:Object, required:true},
    itemType:{type:String, required:true},
}, {
    timestamps: true
})


const Noteitem = mongoose.model('Noteitem', noteitemSchema);




const notecardsSchema = mongoose.Schema({
    title:{type:String, required:true, unique:true},
    notebook_id:{type:mongoose.Schema.Types.ObjectId},
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





const notebookSchema = mongoose.Schema({
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    course_id:{type:mongoose.Schema.Types.ObjectId},
    title:{type:String, required:true, unique:true},
    cards:[{type:mongoose.Schema.Types.ObjectId, ref:'Notecards'}],
    isPosted: {type:Boolean, required:true, default:false}

}, {
    timestamps: true
})


const Notebook = mongoose.model('Notebook', notebookSchema);




export {Notecards, Notebook, Noteitem};