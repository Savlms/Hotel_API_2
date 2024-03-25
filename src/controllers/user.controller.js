const UserService = require('../services/user.service');
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const bcrypt = require('bcryptjs')


class UserController {

    //create a user
    async createUser(req, res) {
        try {
            //get the user data from req.body
        const data = req.body

        //checks to see if the name has been used since it is unique
        const foundUser =await UserService.findByUsername(username)
        console.log(foundUser)

        //if user found, send an error that username exists already
        if(foundUser) {
            return res.status(409).send({
                message:  'Name already exists',
                success: false
            })
        }

        // else we go ahead and create user
        const createdUser = await UserService.create(data)
        const token = jwt.sign({_id:createdUser._id, username:createdUser.username, role:createdUser.role}, SECRET, {expiresIn: (7 * 24 * 60 * 60 )})
        res.cookie("token", token, {httpOnly: true, maxAge: (7 * 24 * 60 * 60 * 1000)})
        return res.header("token", token).status(200).send({
            message: 'User created',
            success: true,
            data: createdUser
        })
    } catch(err) {
        res.status(500).send({
            message: "failed to create user",
            success: false,
            error: err.message
        })
    }
    }
    //edit a user
    async updateUser (req, res) {
        const update = req.body
        const id = req.params.id
        //check if user exists
        const user = userService.findById(id)
        if(!user) {
            return res.status(404).send({
                message: 'User not found',
                success: false
            })
        }
        //if it exists you update the user
        const updatedUser = await UserService.update(id, update)
        return res.status(200).send({
            message: 'Update successful',
            success: true,
            data: updatedUser
        })
    }

    //delete a user
    async deleteUser (req, res) {
        const id = req.params.id
        const user1 = userService.findById(id)
        if(!user1) {
            return res.status(404).send({
                message: 'User not found',
                success: false
            })
        }
        const user = userService.delete(id)
        return res.status(200).send({
            message: 'Deleted successfully',
            success: true,
        })
    }

    //find a single user
    async findOne (req, res) {
        const id = req.params.id
        const user = await UserService.findById(id)
        if(!user) {
            return res.status(404).send({
                message: 'User not found',
                success: false
            })
        }

        return res.status(200).send({
            message: 'User Found',
            success: true,
            data: user
        })
    } 

    //find all user
    async findAll (req, res) {
        const findAll = await UserService.findAll()
        return res.status(200).send({
            message: 'Users found Successfully',
            success: true,
            data: findAll
        })
    }

    //Login
    async login (req, res) {
        const userName = req.body.username
        const user = await userService.findByUsername(userName)
        if (!user) {
            return res.status(404).send({
                message: 'Invalid Username or Password',
                success: false
            })
        }

        const isValid = await bcrypt.compare(req.body.password, user.password)
        if (!isValid) {
            return res.status(404).send({
                message: 'Invalid Username or Password',
                success: false
            })
        } else {
            const token = jwt.sign({_id:user._id, username:user.username, role:user.role}, SECRET, {expiresIn: (7 * 24 * 60 * 60 )})
            res.cookie(token, token, {httpOnly: true, maxAge: (7 * 24 * 60 * 60 * 1000)})
            return res.status(200).send({
                message: 'Login Successfully',
                success: true,
                data: user
            })
        }
    }
}



module.exports = new UserController();
