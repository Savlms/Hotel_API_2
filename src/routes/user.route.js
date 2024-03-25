const express = require('express')
const userController = require('../controllers/user.controller')
const validate = require('../middlewares/validate.middleware')
const { createUserSchema, editUserSchema } = require('../schemas/user.schema')
const router = express.Router()

router.post('/api/v1/users', validate(createUserSchema), userController.createUser)
router.get('/api/v1/users', userController.findAll)
router.get('/api/v1/users/:id', userController.findOne)
router.patch('/api/v1/users/:id', validate(editUserSchema), userController.updateUser)
router.delete('/api/v1/users/:id',userController.deleteUser)
router.post('/api/v1/users/login',userController.login)

module.exports = router