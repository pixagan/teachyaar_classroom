// Author : Anil Variyar
// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited



import mongoose from 'mongoose'


const notificationSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    notificationTo: {
        type: String,
    },
    type:{
        type: String,
        required: true,
        default: 'Text'
    },
    notificationText:{
        type: String,
        required: true,
    },
}, {
    timestamps: true
})



const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;