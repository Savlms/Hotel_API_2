import IRoomType from "../interfaces/roomType.interface"
import RoomType from "../models/roomType.model"

export default class RoomTypeServices {
    //create roomtype
    async createRoomType (roomType: IRoomType) {
        const newRoomType = await RoomType.create(roomType)
        return newRoomType
    }
    //get roomtype
    async getRoomType (id: string) {
        const roomType = await RoomType.findById(id)
        return roomType
    }
    //get room with filter
    async getRoomTypeByFilter (filter: {}) {
        const roomFilter = await RoomType.findOne(filter)
        return roomFilter
    }
    //get all roomtype
    async getAllRoomType () {
        const allRoomType = await RoomType.find({})
        return allRoomType
    }
}