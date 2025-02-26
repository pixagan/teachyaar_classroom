// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import mongoose from 'mongoose'


const appMetricsSchema = mongoose.Schema({
    type:{type:String, default:'user', required:true},
    description: {type: String, default:'Metric Tracking', required:true},
    userMets:{
        created:{type: Number, default:0},
        deleted:{type: Number,default:0},
        teachers:{type:Number,default:0},
        students:{type:Number,default:0}
    },
    channelMets:{
        created:{type: Number,default:0},
        deleted:{type: Number,default:0},
    },
    cardMets:{
        created:{type: Number,default:0},
        deleted:{type: Number,default:0},
        exams:{type:Number,default:0},
        notes:{type:Number,default:0},
        studentexam:{type:Number,default:0},
        live:{type:Number,default:0},
    },
    qandaMets:{
        created:{type: Number,default:0},
        deleted:{type: Number,default:0}
    },
    fileMets:{
        uploads:{type:Number,default:0},
        uploadSize:{type:Number,default:0},
        downloads:{type:Number,default:0},
        downloadSize:{type:Number,default:0},
        filedeleted:{type:Number, default:0},
        filedeletedSize:{type:Number, default:0}
    }

}, {
    timestamps: true
})


const Appmetrics = mongoose.model('Appmetrics', appMetricsSchema);

export default Appmetrics;