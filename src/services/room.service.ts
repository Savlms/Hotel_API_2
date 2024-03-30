import IRoom from "../interfaces/room.interface"
import Room from "../models/room.model"

export default class RoomServices {
    //create room
    async createRoom (room: IRoom) {
        const newRoom = await Room.create(room)
        return newRoom
    }
    //get room
    async getRoom (id: string) {
        const room = await Room.findById(id)
        return room
    }
    //get all rooms
    async getAllRoom () {
        const allRoom = await Room.find({})
        return allRoom
    }
    //get room with filter
    async getRoomByFilter (filter: {}) {
        const roomFilter = await Room.findOne(filter)
        return roomFilter
    }
    //update room
    async updateRoom (id: string, data: Partial<IRoom>) {
        const updateRoom = await Room.findByIdAndUpdate(id, data, {new: true})
        return updateRoom
    }
    //delete room
    async deleteRoom (id: string) {
        const deleteRoom = await Room.findByIdAndDelete(id)
        return deleteRoom
    }
}