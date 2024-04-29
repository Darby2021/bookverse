const jwt = require('jsonwebtoken')
const secret = require('../../secret/token-key.json')
const JWT = {
    Create(object){
        return jwt.sign(object, secret.PRIVATE_KEY)
    },
    Verify(token){
        try{
            return jwt.verify(token, secret.PRIVATE_KEY)
        } catch (error){
            return false
        }
    }
}

module.exports = JWT