const roomServices = require("../services/room.service");

class RoomControllers {

    // create room
    async createRoom (req, res) {
        try {
          // get the data the user sends from the req.ody
        const data = req.body
        
        // checks to see if the name has already been used since the name field is unique
        const foundRoom = await roomServices.getRoomByFilter({name: data.name})
            // If found sends an error to the user that the room exists
            if(foundRoom) {
            return res.status(409).send({
                message: 'Name already exists',
                success: false
            })
        }

        // else we go ahead to create the room
        const createdRoom = await roomServices.createRoom(data)
        return res.status(201).send({
            message: 'Room created successfully',
            success: true,
            data: createdRoom
        })   
        } catch(err) {
            res.status(500).send({
                message: "Failed to create room",
                error: err.message
            })
        } 
       
    }

    //get all room
    async getAllRoom (req, res) {
        // retrieves all the rooms in the database
        const existingRoom = await roomServices.getAllRoom()
        // sends a response with the retrieved rooms
        return res.status(200).send({
            message: 'Rooms fetched successfully',
            success: true,
            data: existingRoom
        })
    }

    //get Room
    async getRoomById (req, res) {
        // get the id the user sends throught req.params
        const roomId = req.params.roomId
        // checks the database to see if a room with the id exists
        const room = await roomServices.getRoom(roomId)
        // sends an error if it doesn't exist
        if(!room) {
            return res.status(404).send({
                message: 'Room not found',
                success: false
            })
        }
        // else return the room to the user if it exists
        return res.status(200).send({
            message: 'Room found',
            success: true,
            data: room
        })
    }

    //update Room by id
    async updateRoom (req, res) {
        // gets the data the user send through req.body which contains the fields the user wishes to update 
        const data = req.body
        // get the id the user sends throught req.params
        const roomId= req.params.roomId
        // checks if the room exisits and sends an error if it doesn't
        const room = await roomServices.getRoom(roomId)
        // sends an error if it doesn't exist
        if(!room) {
            return res.status(404).send({
                message: 'Room not found',
                success: false
            })
        }

        // else update the room if a room is found and return the updated room to the user
        const updatedRoom = await roomServices.updateRoom(roomId, data)
        return res.status(200).send({
            message: 'Room updated',
            success: true,
            data: updatedRoom
        })
    }

    //delete Room by id
    async deleteRoom (req, res) {
        // get the id the user sends throught req.params
        const {roomId} = req.params
        // checks if the room exisits and sends an error if it doesn't
        const room = await roomServices.getRoom(roomId)
        // sends an error if it doesn't exist
        if(!room) {
            return res.status(404).send({
                message: 'Room not found',
                success: false
            })
        }

        // else delete the room if a room is found and return the deleted room to the user
        const deletedRoom = await roomServices.deleteRoom(roomId)
        return res.status(200).send({
            message: 'Room deleted successfully',
            success: true,
            data: deletedRoom
        })
    }

    //get Room by filter
    async getRoomByFilter (req, res) {
        // get the queries the user sends through req.query
        const {search, roomType, minPrice, maxPrice } = req.query
        // create an empty object which we will populate with the available queries since the query fields are optional and it's possible for the user not to include any of the queries
        let queries ={} 
        // checks if the user sent each of the keywords and attach them to queries object if they did
        if (search) {
            queries.search = search
        }
        if (roomType) {
            queries.roomType = roomType
        }
        if (minPrice) {
            queries.price = {$gte: parseInt(minPrice)} 
        }
        if (maxPrice) {
            queries.price = {$lte: parseInt(maxPrice)}
        }
        // we use the queries object to seach for the room that fits the description and sends it to the user
        const getRoomByFilter = await roomServices.getRoomByFilter(queries)
        return res.status(200).send({
            message: 'Room with filters found successfully',
            success: true,
            data: getRoomByFilter
        })
    }
}

module.exports = new RoomControllers();