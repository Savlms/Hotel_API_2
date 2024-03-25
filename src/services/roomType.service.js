const RoomType = require("../models/roomType.model");

class RoomTypeServices {
    //create roomtype
    async createRoomType (roomType) {
        const newRoomType = await RoomType.create(roomType)
        return newRoomType
    }
    //get roomtype
    async getRoomType (id) {
        const roomType = await RoomType.findById(id)
        return roomType
    }
    //get room with filter
    async getRoomTypeByFilter (filter) {
        const roomFilter = await RoomType.findOne(filter)
        return roomFilter
    }
    //get all roomtype
    async getAllRoomType () {
        const allRoomType = await RoomType.find({})
        return allRoomType
    }
}

module.exports = new RoomTypeServices();