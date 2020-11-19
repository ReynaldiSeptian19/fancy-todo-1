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
                    res.status(200).json({access_token: decoded})
                }
        }
        catch(err){
            next(err)
        }
    }

    static googleLogin(req, res, next) {
        console.log('masuk controller')
        //verify token
        //dapetin token dari client
        // let { google_access_token } = req.body
        const client = new OAuth2Client(process.env.PRIVATE_GOOGLE_CLIENT);
        let email = ""
        //verify google token berdasarkan client id
        client.verifyIdToken({
          idToken: req.headers.google_access_token,
          audience: process.env.PRIVATE_GOOGLE_CLIENT
        })
          .then(ticket => {
              console.log('bapakluuuuu')
            let payload = ticket.getPayload()
            email = payload.email
            return User.findOne({
              where: { email }
            })
          })
          .then(user => {
              console.log('kakekluuuuu')
            if (!user) {
              let obj = {
                email: email,
                name: 'siapabilang',
                password: "randompassword"
              }
              console.log(obj)
              return User.create(obj)
            } else {
                console.log('eaaaaaaaa')
              return user
            }
          })
          .then(dataUser => {
            console.log('ini neneknya ironman');
            let access_token = SignToken({ id: dataUser.id, name: dataUser.name, email: dataUser.email })
            console.log(access_token,'T_T')
            return res.status(200).json({ access_token })
          })
          .catch(err => {
            next(err)
          })
      }
}

module.exports = Controller