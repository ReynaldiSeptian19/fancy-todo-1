const { User } =  require('../models/index')
const { Hash, CompareHash } = require('../helpers/hash')
const { SignToken } = require('../helpers/jwt')


class Controller{
    static async register(req, res, next){
        try{
            const obj = {
                email:req.body.email,
                password:Hash(req.body.password),
                name:req.body.name
            }
        const user = await User.create(obj)
        return res.status(201).json({
            message: "suscces register an acount"
        })
        }catch(error){
            let status = 500
            if(err.name === 'SequelizeValidationError'){
                    status = 400
                    return err.errors[0].message
            } 
            res.status(status).json(err)
        }
    }

    static async login(req, res, next){
        try{
            const input = {
                email:req.body.email,
                password:req.body.password,
            }
            const user = await User.findOne({
                    where:{
                        email: input.email
                    }
                })
                if(!user){
                    res.status(401).json({
                        message: "Wrong email or Password"
                    })
                }else if(!CompareHash(input.password, user.password)){
                    res.status(401).json({
                        message: "Wrong email or Password"
                    })
                }else{
                    const decoded = SignToken({
                        id: user.id,
                        name: user.name,
                        email: user.email
                    },process.env.SECRET); 
                    res.status(200).json(decoded)
                }
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = Controller