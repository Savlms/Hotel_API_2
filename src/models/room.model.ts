import {Schema, model, Types} from 'mongoose'

const RoomSchema = new Schema({
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
        type: Types.ObjectId,
        ref: 'roomType',
        trim: true
    }
})

const Room = model('room', RoomSchema)
export default Room;