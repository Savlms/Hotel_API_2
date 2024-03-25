const Room = require("../models/room.model");

class RoomServices {
    //create room
    async createRoom (room) {
        const newRoom = await Room.create(room)
        return newRoom
    }
    //get room
    async getRoom (id) {
        const room = await Room.findById(id)
        return room
    }
    //get all rooms
    async getAllRoom () {
        const allRoom = await Room.find({})
        return allRoom
    }
    //get room with filter
    async getRoomByFilter (filter) {
        const roomFilter = await Room.findOne(filter)
        return roomFilter
    }
    //update room
    async updateRoom (id, data) {
        const updateRoom = await Room.findByIdAndUpdate(id, data, {new: true})
        return updateRoom
    }
    //delete room
    async deleteRoom (id) {
        const deleteRoom = await Room.findByIdAndDelete(id)
        return deleteRoom
    }
}


module.exports = new RoomServices ();


