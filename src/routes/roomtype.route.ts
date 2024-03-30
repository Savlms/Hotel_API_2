import express from 'express'
import roomTypeControllers from '../controllers/roomType.controller'
import authenticate from '../middlewares/authentication.middleware'
import isAdmin from '../middlewares/authorization.middleware'
import validate from'../middlewares/validate.middleware'
import roomTypeSchema from '../schemas/room-type.schema'
const router = express.Router();

const {
    createRoomType,
    getAllRoomType
} = new roomTypeControllers()

router.post('/api/v1/rooms-types', authenticate, isAdmin, validate(roomTypeSchema), createRoomType)
router.get('/api/v1/rooms-types', getAllRoomType)

export default router