const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    price:{
        type: Number,
        unique: false,
        required: true,
    },
    roomType:{
        type: mongoose.Types.ObjectId,
        ref: 'roomType',
        trim: true
    }
})

const Room = mongoose.model('room', RoomSchema)
module.exports = Room;