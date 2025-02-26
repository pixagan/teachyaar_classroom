import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const UsernoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    channel: {
        type: Schema.Types.ObjectId,
        ref: 'channel',
        required: true
    },
    card:{
        type: Schema.Types.ObjectId,
        ref: 'tycard',
        required: true
    },
    items: [{
        text: {type: String},
        isPublic: {type: Boolean, default:false},
        tag:{type: String}
    }]

}, {
    timestamps: true
});



const Usernote = mongoose.model('usernote', UsernoteSchema);

export default Usernote;