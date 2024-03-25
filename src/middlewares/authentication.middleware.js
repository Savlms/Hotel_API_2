const jwt = require('jsonwebtoken')
const userService = require('../services/user.service')

async function authenticate (req, res, next) {
    const SECRET = process.env.SECRET
    const token = await req.cookies.token
    if (!token) {
        return res.status(401).send({
            message: 'Token not provided',
            success: false,
        })
    }
    const decodedToken = jwt.verify(token, SECRET)
    const id = decodedToken._id
    const user = await userService.findById(id)
    if (!user) {
        return res.status(401).send({
            message: "User does not exist",
            success: false
        })
    }
    req.user = user
    next()
}

module.exports = authenticate;