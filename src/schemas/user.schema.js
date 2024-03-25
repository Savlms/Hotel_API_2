const joi = require('joi')


const createUserSchema = joi.object({
    username: joi.string().required().trim().lowercase(),
    password: joi.string().trim().required(),
    role: joi.string().optional().lowercase().trim()
})

const editUserSchema = joi.object({
    username: joi.string().optional().trim().lowercase(),
    password: joi.string().trim().optional(),
    role: joi.string().optional().lowercase().trim()
})

module.exports = {createUserSchema, editUserSchema}