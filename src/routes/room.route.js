const express = require('express')
const roomControllers = require('../controllers/room.controller')
const authenticate = require('../middlewares/authentication.middleware')
const isAdmin = require('../middlewares/authorization.middleware')
const validate = require('../middlewares/validate.middleware')
const { createRoomSchema, editRoomSchema } = require('../schemas/room.schema')
const router = express.Router()

router.post('/api/v1/rooms', authenticate, isAdmin, validate(createRoomSchema), roomControllers.createRoom)
router.get('/api/v1/rooms', roomControllers.getRoomByFilter)
router.get('/api/v1/rooms/:roomId', roomControllers.getRoomById)
router.patch('/api/v1/rooms/:roomId', authenticate, isAdmin, validate(editRoomSchema), roomControllers.updateRoom)
router.delete('/api/v1/rooms/:roomId', authenticate, isAdmin, roomControllers.deleteRoom)


module.exports = router