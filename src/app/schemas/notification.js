import mongoose, { mongo } from 'mongoose';
/**
 * this class represent ORM Notification with mongo
 */
const NotificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Number,
        required: true,    
    },
    read: {
        type: Boolean,
        required: true,
        default: false,
    },
},{
    timestamps: true, //audit
});

export default mongoose.model('Notification',NotificationSchema);