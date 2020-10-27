const { verify } = require('crypto')
const jwt = require('jsonwebtoken')

function SignToken(payload, b){
    const token = jwt.sign(payload, b)
    return token
}

function VerifyToken(payload){
    const token = jwt.verify(payload)
    return token
}

module.exports = { 
    SignToken,
    VerifyToken
 }
