const {userModel} = require('../models/user.model');

class UserService {

    //create a user
    async create (data) {
        return await userModel.create(data)
    }

    //edit a user
    async update (id, update) {
        return await userModel.findByIdAndUpdate(id, update, {new: true})
    }

    //delete a user
    async delete (id) {
        return await userModel.findByIdAndDelete(id)
    }

    //find a single user
    async findById (id) {
        return await userModel.findById(id)
    }

    //find a single user
    async findByUsername (username) {
        return await userModel.findOne({username: username})
    }

    //find all users
    async findAll () {
        return await userModel.find({})
    }
}

module.exports = new UserService;