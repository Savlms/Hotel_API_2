import joi from 'joi'


const createRoomSchema = joi.object({
    name: joi.string().required().trim().lowercase(),
    roomType: joi.string().regex(/^[0-9a-fA-F]{24}$/).trim().required(),
    price: joi.number().required()
})

const editRoomSchema = joi.object({
    name: joi.string().optional().trim().lowercase(),
    roomType: joi.string().regex(/^[0-9a-fA-F]{24}$/).trim().optional(),
    price: joi.number().optional()
})

export  {createRoomSchema, editRoomSchema};