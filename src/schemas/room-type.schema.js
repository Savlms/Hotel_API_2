const joi = require('joi')


const roomTypeSchema = joi.object({
    name: joi.string().required().trim().lowercase()
})

module.exports = roomTypeSchema