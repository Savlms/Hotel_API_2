async function isAdmin(req, res, next) {
    const user = req.user
    if (user.role === 'admin') {
        next()
    } else {
        return res.status(404).send({
            message: 'Restricted to Admins only',
            success: false
        })
    }
}


module.exports = isAdmin;