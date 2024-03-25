const mongoose = require('mongoose')

const RoomTypeSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    }
})

const RoomType = mongoose.model('roomtype', RoomTypeSchema)
module.exports = RoomType;