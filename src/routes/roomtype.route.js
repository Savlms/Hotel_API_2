const express = require('express')
const roomTypeControllers = require('../controllers/roomType.controller')
const authenticate = require('../middlewares/authentication.middleware')
const isAdmin = require('../middlewares/authorization.middleware')
const validate = require('../middlewares/validate.middleware')
const roomTypeSchema = require('../schemas/room-type.schema')
const router = express.Router()

router.post('/api/v1/rooms-types', authenticate, isAdmin, validate(roomTypeSchema), roomTypeControllers.createRoomType)
router.get('/api/v1/rooms-types', roomTypeControllers.getAllRoomType)

module.exports = router