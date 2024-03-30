import IUser from '../interfaces/user.interface'
import userModel from '../models/user.model'

export default class UserService {

    //create a user
    async create (data: IUser) {
        return await userModel.create(data)
    }

    //edit a user
    async update (id: string, update: Partial<IUser>) {
        return await userModel.findByIdAndUpdate(id, update, {new: true})
    }

    //delete a user
    async erase (id: string) {
        return await userModel.findByIdAndDelete(id)
    }

    //find a single user
    async findById (id: string) {
        return await userModel.findById(id)
    }

    //find a single user
    async findByUsername (username: string) {
        return await userModel.findOne({username: username})
    }

    //find all users
    async findAll () {
        return await userModel.find({})
    }
}