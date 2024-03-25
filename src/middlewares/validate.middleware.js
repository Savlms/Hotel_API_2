function validate(schema) {
    return function(req, res, next) {
        const {err, value} = schema.validate(req.body, {abortEarly: false})
        if (err) {
            let errMessage = []
            err.details.forEach(detail => {
                errMessage.push(detail.message)
            });
            return res.status(403).send({
                message: errMessage,
                success: false
            })
        } 
        req.body = value
        next()
    }
}


module.exports = validate