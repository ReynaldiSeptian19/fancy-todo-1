const { TokenExpiredError } = require('jsonwebtoken')
const { VerifyToken } = require('../helpers/jwt')
const jwt = require('../helpers/jwt')

async function Authenticate(req,res,next){
    try{
        const author = req.headers.Authorization
        if(!author){
            res.status(401).json({
                message: "Do not Have Access"
            })
        }else{
            const verifToken = VerifyToken(author)
            const user = await user.findOne({
                where:{
                    email: token.email
                }
            })
            if(!user){
                res.status(401).json(verifToken)
            }else{
                req.accessToken = verifToken
                next()
            }
        }
    }catch(error){
        res.status(500).json(err)
    }
}

module.exports = Authenticate