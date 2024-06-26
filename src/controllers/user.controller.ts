import UserService from '../services/user.service'
import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express';
const {
    create,
    update,
    findAll,
    findById,
    findByUsername,
    erase
} = new UserService();


export default class UserController {

    //create a user
    async createUser(req: Request, res: Response) {
        try {
            //get the user data from req.body
        const data = req.body

        //checks to see if the name has been used since it is unique
        const foundUser = await findByUsername(data.username)
        console.log(foundUser)

        //if user found, send an error that username exists already
        if(foundUser) {
            return res.status(409).send({
                message:  'Name already exists',
                success: false
            })
        }

        // else we go ahead and create user
        const createdUser = await create(data)
        const token = jwt.sign({_id:createdUser._id, username:createdUser.username, role:createdUser.role}, SECRET!, {expiresIn: (7 * 24 * 60 * 60 )})
        res.cookie("token", token, {httpOnly: true, maxAge: (7 * 24 * 60 * 60 * 1000)})
        return res.header("token", token).status(200).send({
            message: 'User created',
            success: true,
            data: createdUser
        })
    } catch(err: any) {
        res.status(500).send({
            message: "failed to create user",
            success: false,
            error: err.message
        })
    }
    }
    //edit a user
    async updateUser (req: Request, res: Response) {
        const data = req.body
        const id = req.params.id
        //check if user exists
        const user = findById(id)
        if(!user) {
            return res.status(404).send({
                message: 'User not found',
                success: false
            })
        }
        //if it exists you update the user
        const updatedUser = update(id, data)
        return res.status(200).send({
            message: 'Update successful',
            success: true,
            data: updatedUser
        })
    }

    //delete a user
    async deleteUser (req: Request, res: Response) {
        const id = req.params.id
        const user1 = findById(id)
        if(!user1) {
            return res.status(404).send({
                message: 'User not found',
                success: false
            })
        }
        const user = erase(id)
        return res.status(200).send({
            message: 'Deleted successfully',
            success: true,
        })
    }

    //find a single user
    async findOne (req: Request, res: Response) {
        const id = req.params.id
        const user = await findById(id)
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
    async findAll (req: Request, res: Response) {
        const getAll = await findAll()
        return res.status(200).send({
            message: 'Users found Successfully',
            success: true,
            data: getAll
        })
    }

    //Login
    async login (req: Request, res: Response) {
        const userName = req.body.username
        const user = await findByUsername(userName)
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
            const token = jwt.sign({_id:user._id, username:user.username, role:user.role}, SECRET!, {expiresIn: (7 * 24 * 60 * 60 )})
            res.cookie(token, token, {httpOnly: true, maxAge: (7 * 24 * 60 * 60 * 1000)})
            return res.status(200).send({
                message: 'Login Successfully',
                success: true,
                data: user
            })
        }
    }
}
