import { Request, Response } from "express"
import roomTypeServices from "../services/roomType.service"
const {
    getRoomTypeByFilter,
    getAllRoomType,
    createRoomType,
} = new roomTypeServices

export default class RoomTypeControllers {

    // create roomtype
    async createRoomType (req: Request, res: Response) {
        try {
            // get the data the user sends from the req.ody
            const data = req.body
            
            // checks to see if the name has already been used since the name field is unique
            const foundRoomType = await getRoomTypeByFilter({name: data.name})
            console.log(foundRoomType)
            // If found sends an error to the user that the roomtype exists
            if(foundRoomType) {
                return res.status(409).send({
                    message: 'Name already exists',
                    success: false
                })
            }
            // else we go ahead to create the roomtype and send the created roomtype to the user
            const createdRoomType = await createRoomType(data)
            return res.status(201).send({
                message: 'Roomtype created successfully',
                success: true,
                data: createdRoomType
            })    
        } catch(err: any) {
            res.status(500).send({
                message: "Failed to create room",
                error: err.message
            })
        }
    }
    
    // get all roomtype
    async getAllRoomType (req: Request, res: Response) {
        // retrieves all the roomtypes in the database
        const existingRoomType = await getAllRoomType()
        // sends a response with the retrieved roomtypes
        return res.status(200).send({
            message: 'Roomtype fetched successfully',
            success: true,
            data: existingRoomType
        })
    }
}