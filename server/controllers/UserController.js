const { User } =  require('../models/index')
const {OAuth2Client} = require('google-auth-library');
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
        }catch(err){
            next(err)
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
                    }); 
                    res.status(200).json(decoded)
                }
        }
        catch(err){
            next(err)
        }
    }

    static async googleLogin(req,res,next){
        const {google_token} = req.body
        const client = new OAuth2Client(process.env.PRIVATE_GOOGLE_CLIENT);
            try {
                const ticket = await client.verifyIdToken({
                    idToken: google_token,
                    audience: process.env.PRIVATE_GOOGLE_CLIENT,
                });
                const payload = ticket.getPayload();
                const email = payload.email
                const full_name = payload.name
                const available = await User.findOne({where:{email}})
                if(available){
                    let access_token = jwt.signToken({id:available.id,email:available.email})
                    res.status(200).json({access_token})
                }else{
                    const newUser = await User.create({
                        full_name,
                        email,
                        password : process.env.PRIVATE_DEFAULT_PASSWORD
                    })
                    let access_token = jwt.signToken({id:newUser.id,email:newUser.email})
                    res.status(200).json({access_token})
                }
            } catch (err) {
                next(err);
        } 
    }
}

module.exports = Controller