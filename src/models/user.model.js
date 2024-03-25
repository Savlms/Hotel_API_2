const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

//define user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    role: {
        type: String,
        lowercase: true,
        trim: true,
        enum: ['guest', 'admin'],
        default: 'guest'
    },
    password: {
        type: String,
        required: true
    }
})
userSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')) {
        const salt = await bcrypt.genSalt(4);
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
    }
    next()
})

const userModel = mongoose.model('user', userSchema)
module.exports = {userModel}