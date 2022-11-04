require('dotenv').config()

const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    // This line gets and verifys the authorization token. 
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')
    // If token is not accepted, an error will be logged to user.
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}