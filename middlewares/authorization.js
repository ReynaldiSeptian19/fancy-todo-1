const { Todo } = require('../models/index')

async function authorization(req, res, next){
    try{
        const userid = req.accessToken
        if(!userid){
            res.status(500).json()
        }else{
            const id = req.params
            if(!id){
                res.status(404).json({
                    message : "Id Not Found"
                })
            }else{
                const todo = await Todo.findByPk(id)
                if(!todo){
                    res.status(404).json({
                        message : "Id Not Found"
                    })
                }else{
                    
                }
            }
        }
    }catch{
       

    }
}